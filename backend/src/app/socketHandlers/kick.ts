import { RedisRoom } from "../entitties/RedisRoom";
import { AuthenticatedSocket } from "../types/socket";

export const kick = async (roomId: string, socket: AuthenticatedSocket): Promise<RedisRoom["status"]> => {
  const room = await RedisRoom.load(roomId);
  if (!room) return "finished";
  if (room?.status === "active") {
    room.players = room.players.filter((p) => p.id !== socket.user?.id);
    room.status = "pending";
    await room.save();
    await RedisRoom.addToQueue(room.amount, room.id);
    socket.emit("kick");
    return "active";
  }
  return "pending";
};
