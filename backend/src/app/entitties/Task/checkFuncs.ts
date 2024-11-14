import { db } from "../../utlis/postgres_connector";
import { User } from "../User";
import { RedisTask } from "./RedisTask";
import { Task, type CHECK_FUNCS } from "./Task";

export const checkFuncs: Record<
  CHECK_FUNCS,
  (task: Task, user: User, taskData?: RedisTask) => Promise<boolean>
> = {
  daily_reward: async (task: Task, user: User, taskData?: RedisTask) => {
    if (!taskData?.completedAt || Date.now() - taskData.completedAt.getTime() > (task.period ?? 0)) {
      return true;
    }
    return false;
  },
  invite_3: async (task, user) => {
    const userRep = db.getRepository(User);
    const allInvited = await userRep.find({
      where: {
        invitedBy: user,
      },
    });
    if (allInvited.length > 0) {
      return true;
    }
    return false;
  },
  youtube_subscribe: async (task, user, taskData) => {
    if (!taskData?.startedAt) {
      taskData!.startedAt = new Date();

      return false;
    }
    if (taskData.startedAt.getTime() + (task?.period ?? 0) < Date.now()) {
      return true;
    }

    return false;
  },
};
