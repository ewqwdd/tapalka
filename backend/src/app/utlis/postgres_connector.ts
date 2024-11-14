import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../entitties/User";
import dotenv from "dotenv";
import { Room } from "../entitties/Room";
import { Task } from "../entitties/Task/Task";
dotenv.config();

export const db = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Room, Task],
  migrations: ["src/app/migrations/**/*.ts"],
  subscribers: [],
});
