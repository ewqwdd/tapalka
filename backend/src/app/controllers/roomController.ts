import express, { type Request, type Response } from "express";
import { db } from "../utlis/postgres_connector";
import { logger } from "../utlis/logger";
import { Room } from "../entitties/Room";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const rooms = await db.getRepository(Room).find({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      select: {
        loser: {
          id: true,
        },
      },
      relations: ["players", "loser"],
    });

    const result = rooms.map((room) => ({
      ...room,
      players: room.players.map((player) => ({
        name: player.username?.slice(0, 2).padEnd(5, "*"),
        id: player.id,
      })),
    }));

    res.json({ data: result, success: true });
    return;
  } catch (err) {
    logger.error({ err, url: req.originalUrl });
    console.log(err);
    res.status(500).json({
      success: false,
      message: JSON.stringify(err),
      url: req.originalUrl,
    });
    return;
  }
});

export default router;
