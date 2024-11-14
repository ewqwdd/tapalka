import express, { type Request, type Response } from "express";
import { logger } from "../utlis/logger";
import authenticateJWT from "../middleware/authenticateJWT";
import { TaskEntity, TaskTypes } from "../entitties/Task/Task";
import { db } from "../utlis/postgres_connector";
import { User } from "../entitties/User";
import { RedisTask } from "../entitties/Task/RedisTask";

const router = express.Router();

interface CompleteRoute {
  id: number;
}

router.get("/", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user?.id) {
      return res.status(401).json({
        success: false,
        message: JSON.stringify("No id provided"),
      });
    }

    const tasks = await TaskEntity.loadMany({ where: { active: true } });
    const promises = tasks?.map(async (elem) => {
      const data = await elem.getUserData(user?.id);
      return { completedAt: data.completedAt, startedAt: data.startedAt, ...elem };
    });
    const data = await Promise.all(promises ?? []);

    res.json({
      data,
      success: true,
    });
    return;
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

router.post(
  "/complete",
  authenticateJWT,
  async (req: Request<unknown, unknown, CompleteRoute>, res: Response) => {
    try {
      const { id } = req.body;
      const userId = req.user?.id;
      const userRep = db.getRepository(User);

      if (!id || !userId) {
        return res.status(401).json({
          success: false,
          message: JSON.stringify("No id provided"),
        });
      }
      const task = await TaskEntity.load({
        where: { id },
      });
      if (!task) {
        return res.status(400).json({
          success: false,
          message: JSON.stringify("No task found"),
        });
      }
      const user = await userRep.findOneBy({ id: userId });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: JSON.stringify("No user found"),
        });
      }
      const taskData = await RedisTask.load(id, userId);
      if (taskData?.completedAt && task.type !== TaskTypes.DAILY) {
        return res.json({ startedAt: taskData.startedAt, completedAt: taskData.completedAt });
      }

      const isComplete = await task?.check(user, taskData);

      if (isComplete) {
        taskData.completedAt = new Date();
        user.bonusBalance += task.reward;
        user.tasks?.push(task);
        await userRep.save(user);
      }
      await taskData.save();
      return res.json({ startedAt: taskData.startedAt, completedAt: taskData.completedAt });
    } catch (err) {
      logger.error(err);
      res.status(500).json({
        success: false,
        message: JSON.stringify(err),
        url: req.originalUrl,
      });
      return;
    }
  }
);

export default router;
