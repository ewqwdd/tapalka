import { RedisRoom } from "../entitties/RedisRoom";
import { JWTData } from "../services/jwtService";
import { AuthenticatedSocket } from "../types/socket";

export const rejoin = async (socket: AuthenticatedSocket, { roomId: room_id }: { roomId: string }) => {
  const { id } = socket.user as JWTData;
  if (!room_id) return;
  const room = await RedisRoom.load(room_id);
  const player = room?.players?.findIndex((elem) => elem.id == id) ?? -1;
  console.log(player, room?.players);

  if (room && player > -1) {
    room.players[player].socketId = socket.id;
    await room.save();
    socket.emit("join", { success: true, roomId: room.id });
    return room.id;
  }
  return;
};
