import { Server } from "socket.io";
import { RedisRoom } from "../entitties/RedisRoom";
import { AuthenticatedSocket } from "../types/socket";
import { userService } from "../services/userService";
import { roomService } from "../services/roomService";
import { JWTData } from "../services/jwtService";

export const click = async (io: Server, socket: AuthenticatedSocket, roomId?: string) => {
  const room = await RedisRoom.load(roomId ?? "");
  const { id } = socket.user as JWTData;

  console.log(`user with id ${id} clicked.`);
  let loser;

  if (room && room.status === "active") {
    room.counter++;
    if (room.counter === 10) {
      loser = id;
      room.status = "finished";
      const prize = room.amount * (1 - room.commission_percent);
      Object.values(room.players).forEach(({ id: userId, socketId }) => {
        const userSocket = io.sockets.sockets.get(socketId);
        if (Number(userId) !== id) {
          userService.updateBalance(Number(userId), prize).then((data) => {
            userSocket?.emit("game_end", {
              status: "win",
              balance: (data?.balance ?? 0) + (data?.bonusBalance ?? 0),
            });
          });
        } else {
          userService.updateBalance(Number(userId), -room.amount).then((data) => {
            userSocket?.emit("game_end", {
              status: "lose",
              balance: (data?.balance ?? 0) + (data?.bonusBalance ?? 0),
            });
          });
        }
      });
      await Promise.all([
        room.delete(),
        roomService.createRoom(
          room,
          room.players.map((elem) => elem.id),
          loser
        ),
      ]);
      return;
    } else {
      await room.save();
      return room;
    }
  }
};
