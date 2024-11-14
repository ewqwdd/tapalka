import { In } from "typeorm";
import { Room } from "../entitties/Room";
import { User } from "../entitties/User";
import { db } from "../utlis/postgres_connector";

export interface RoomUser {
  id: number;
  lastClicked?: Date;
  socketId: string;
  amount: number;
}

class RoomService {
  async createRoom(room: Omit<Room, "id" | "players">, players?: number[], loserId?: number): Promise<Room> {
    const newRoom = new Room();
    const found = await db.manager.findBy(User, { id: In(players ?? []) });
    const loser = await db.manager.findOneBy(User, { id: loserId });

    newRoom.amount = room.amount;
    newRoom.counter = room.counter;
    newRoom.players = found;
    newRoom.room_size = room.room_size;
    newRoom.status = room.status;
    if (loser) {
      newRoom.loser = loser;
    }
    await db.manager.save(newRoom);
    return newRoom;
  }
}

export const roomService = new RoomService();
