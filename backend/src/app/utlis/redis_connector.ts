import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis({
  username: process.env.REDIS_USER,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: Number(process.env.REDIS_PORT),
});
