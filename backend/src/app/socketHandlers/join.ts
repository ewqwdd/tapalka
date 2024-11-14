import { RedisRoom } from "../entitties/RedisRoom";
import { User } from "../entitties/User";
import { redis } from "../utlis/redis_connector";
import { db } from "../utlis/postgres_connector";
import { JWTData } from "../services/jwtService";
import { AuthenticatedSocket } from "../types/socket";
import { v4 as uuidv4 } from "uuid";

export const join = async (socket: AuthenticatedSocket) => {
  const { id } = socket.user as JWTData;
  const amount = 50;
  const avaliableKey = `avaliable_rooms:${amount}`;
  const avaliableRooms = await redis.lrange(avaliableKey, 0, 1);
  const user = await db.getRepository(User).findOneBy({ id });
  if ((user?.balance ?? 0) + (user?.bonusBalance ?? 0) < amount) return;
  let room;
  if (avaliableRooms?.[0]) {
    room = await RedisRoom.load(avaliableRooms?.[0]);
    if (!room) {
      redis.lpop(avaliableKey);
    }
    room?.players.push({
      id,
      socketId: socket.id,
    });
  }
  if (!room) {
    room = new RedisRoom({
      amount,
      id: uuidv4(),
      room_size: 2,
      players: [
        {
          id,
          socketId: socket.id,
        },
      ],
      commission_percent: 0.1,
      status: "pending",
    });
    redis.rpush(avaliableKey, room.id);
  }
  socket.emit("join", { success: true, roomId: room.id });
  console.log(room.players);
  if (room.players.length >= room.room_size) {
    room.status = "active";
    redis.lpop(avaliableKey);
  }
  await room.save();
  return room.id;
};
