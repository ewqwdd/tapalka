import { Column, Entity, FindManyOptions, FindOneOptions, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { db } from "../../utlis/postgres_connector";
import { User } from "../User";
import { checkFuncs } from "./checkFuncs";
import { RedisTask } from "./RedisTask";

export enum CHECK_FUNCS {
  DAILY_REWARD = "daily_reward",
  INVITE_3 = "invite_3",
  YOUTUBE_SUBSCRIBE = "youtube_subscribe",
}

export enum TaskTypes {
  DEFAULT = "default",
  DAILY = "daily",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reward: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "enum", enum: TaskTypes, default: TaskTypes.DEFAULT })
  type: TaskTypes;

  @Column()
  active: boolean;

  @Column()
  icon: string;

  @Column({ nullable: true })
  url: string;

  @Column({ type: "enum", enum: CHECK_FUNCS })
  checkFunc: CHECK_FUNCS;

  @Column({ nullable: true })
  period?: number;

  @ManyToMany(() => User, (user) => user.tasks)
  completedBy?: User[];
}

export class TaskEntity extends Task {
  constructor(task: Task) {
    super();
    Object.entries(task).forEach(([key, value]) => {
      // @ts-expect-error TODO
      this[key] = value;
    });
  }

  async check(user: User, taskData: RedisTask) {
    return await checkFuncs[this.checkFunc](this, user, taskData);
  }

  save() {
    return db.getRepository(Task).save(this);
  }

  static async load(ops: FindOneOptions<Task>) {
    const data = await db.getRepository(Task).findOne(ops);
    if (!data) return;
    return new TaskEntity(data);
  }

  static async loadMany(ops: FindManyOptions<Task>) {
    const data = await db.getRepository(Task).find(ops);
    if (!data) return;
    return data.map((elem) => new TaskEntity(elem));
  }

  async setDone(userId: number) {
    const redis = new RedisTask({ taskId: this.id, userId });
    redis.completedAt = new Date();
    await redis.save();
    return redis.completedAt;
  }

  async setStarted(userId: number) {
    const redis = new RedisTask({ taskId: this.id, userId });
    redis.startedAt = new Date();
    await redis.save();
    return redis.startedAt;
  }

  async getUserData(userId: number) {
    return await RedisTask.load(this.id, userId);
  }
}
