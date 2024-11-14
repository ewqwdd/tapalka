import express, { type Request, type Response } from "express";
import { ApiAuthBody } from "../types/api";
import { isHashValid } from "../utlis/verifyTelegramData";
import { TelegramData, TelegramUser } from "../types/telegram";
import { userService } from "../services/userService";
import { User } from "../entitties/User";
import { jwtService } from "../services/jwtService";
import authenticateJWT from "../middleware/authenticateJWT";
import { logger } from "../utlis/logger";
import { db } from "../utlis/postgres_connector";
import { Room } from "../entitties/Room";

const router = express.Router();

router.post("/auth", async (req: Request<unknown, unknown, ApiAuthBody>, res: Response) => {
  try {
    const { initData, refId } = req.body;
    const ipAddress = (req.headers["cf-connecting-ip"] as string) || "127.0.0.1";
    const userAgent = (req.headers["user-agent"] as string) || "N/A";
    const country = (req.headers["cf-ipcountry"] as string) || "XX";
    console.log(refId);
    if (!initData) {
      res.status(400).json({
        success: false,
        message: "No initData provided",
      });
      return;
    }
    const tgData = Object.fromEntries(new URLSearchParams(initData)) as TelegramData;
    const verified = await isHashValid(tgData);
    console.log("verified: ", verified);
    const tgUser = JSON.parse(tgData.user) as TelegramUser;
    console.log(tgUser);
    const telegramId = tgUser["id"];

    if (!telegramId) {
      res.status(400).json({
        success: false,
        message: "No id provided",
      });
      return;
    }

    const userExists = await userService.findUser(telegramId);
    let user;
    const data: Omit<User, "id"> = {
      telegramId,
      username: tgUser["username"] ?? "",
      name: tgUser["first_name"] ?? "",
      isPremium: tgUser["is_premium"] ?? false,
      bonusBalance: userExists?.bonusBalance ?? 0,
      country,
      ipAddress,
      userAgent,
      lang: tgUser["language_code"] ?? "",
      balance: userExists?.balance ?? 0,
    };
    if (userExists) {
      user = await userService.updateUser(telegramId, data);
    } else {
      user = await userService.createUser({ ...data, referralId: Number(refId) });
    }
    if (refId) {
      await userService.checkReferals(Number(refId));
    }
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "no user found",
      });
    }
    const token = jwtService.generate(telegramId, user.id);
    res.json({
      user,
      token,
      success: true,
    });
  } catch (err) {
    logger.error({
      err,
      url: req.originalUrl,
    });
    res.status(500).json({
      success: false,
      message: JSON.stringify(err),
      url: req.originalUrl,
    });
    return;
  }
});

router.post("/info", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = req?.user;
    if (!user?.telegramId) {
      return res.status(400).json({
        success: false,
        message: "No user id",
      });
    }
    const findUser = await userService.findUser(user.telegramId);

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }

    return res.status(400).json({
      user: findUser,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      success: false,
      message: JSON.stringify(err),
      url: req.originalUrl,
    });
    return;
  }
});

router.get("/referals", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;

    if (!id) {
      logger.error("No id in token");
      res.status(401).json({
        success: false,
      });
      return;
    }

    const refs = await db.getRepository(User).find({
      where: {
        invitedBy: {
          id,
        },
      },
    });

    return res.json({
      status: true,
      data: refs,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      success: false,
      message: JSON.stringify(err),
      url: req.originalUrl,
    });
    return;
  }
});

router.get("/rooms", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { page = 1, limit = 20 } = req.query;

    if (!user?.id) {
      return res.status(401).json({
        success: false,
        message: JSON.stringify("No id provided"),
      });
    }
    const rooms = await db
      .getRepository(Room)
      .createQueryBuilder("room")
      // Первое объединение для фильтрации комнат с игроком id
      .innerJoin("room.players", "playerFilter", "playerFilter.id = :playerId", { playerId: user.id })
      // Второе объединение для загрузки всех игроков в отфильтрованных комнатах
      .leftJoinAndSelect("room.players", "player")
      .leftJoinAndSelect("room.loser", "loser")
      // Пагинация
      .take(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .getMany();

    const result = rooms.map((room) => ({
      ...room,
      players: room.players.map((player) => ({
        name: player.username?.slice(0, 2).padEnd(5, "*"),
        id: player.id,
      })),
      loserId: room.loser ? room.loser.id : null,
    }));

    res.json({ data: result, success: true });
    return;
  } catch (err) {
    logger.error({ err, url: req.originalUrl });
    res.status(500).json({
      success: false,
      message: JSON.stringify(err),
      url: req.originalUrl,
    });
    return;
  }
});

router.get("/top", async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const users = await db
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoin("user.rooms", "room")
      .leftJoin("room.loser", "loser")
      .select(["user.id AS id", "user.username AS username", "user.balance AS balance"])
      .addSelect(
        `SUM(CASE 
            WHEN loser.id = user.id THEN -room.amount 
            ELSE room.amount / 10 
          END)`,
        "totalEarnings"
      )
      .groupBy("user.id")
      .orderBy('"totalEarnings"', "DESC") // Обратите внимание на кавычки вокруг имени поля
      .addOrderBy("user.id", "ASC") // Для разрешения конфликта сортировки
      .take(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .getRawMany();

    res.json({ data: users, success: true });
    return;
  } catch (err) {
    console.log(err);
    logger.error({ err, url: req.originalUrl });
    res.status(500).json({
      success: false,
      message: JSON.stringify(err),
      url: req.originalUrl,
    });
    return;
  }
});

export default router;
