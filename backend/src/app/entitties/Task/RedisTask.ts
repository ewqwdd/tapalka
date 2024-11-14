import { redis } from "../../utlis/redis_connector";

interface TaskContructor {
  taskId: number;
  userId: number;
  startedAt?: Date;
  completedAt?: Date;
}

export class RedisTask {
  id: number;
  userId: number;
  startedAt?: Date;
  completedAt?: Date;

  constructor({ taskId, userId, completedAt, startedAt }: TaskContructor) {
    this.id = taskId;
    this.userId = userId;
    this.completedAt = completedAt;
    this.startedAt = startedAt;
  }

  async save() {
    const completedKey = `task:${this.id}:${this.userId}:completedAt`;
    const startedKey = `task:${this.id}:${this.userId}:startedAt`;

    const promises = [];

    if (this.completedAt) {
      console.log(this.completedAt);
      promises.push(redis.set(completedKey, this.completedAt.getTime()));
    }
    if (this.startedAt) {
      promises.push(redis.set(startedKey, this.startedAt.getTime()));
    }

    await Promise.all(promises);
  }

  static async load(id: number, userId: number): Promise<RedisTask> {
    const completedKey = `task:${id}:${userId}:completedAt`;
    const startedKey = `task:${id}:${userId}:startedAt`;

    const [cmp, st] = await Promise.all([redis.get(completedKey), redis.get(startedKey)]);

    let completedAt, startedAt;

    if (cmp) {
      completedAt = new Date(Number(cmp));
    }
    if (st) {
      startedAt = new Date(Number(st));
    }

    return new RedisTask({
      taskId: id,
      userId,
      completedAt,
      startedAt,
    });
  }

  async delete(id: number, userId: number) {
    const completedKey = `task:${id}:${userId}:completedAt`;
    const startedKey = `task:${id}:${userId}:startedAt`;

    await Promise.all([redis.del(completedKey), redis.del(startedKey)]);
  }
}
