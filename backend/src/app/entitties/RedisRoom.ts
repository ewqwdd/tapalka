import { redis } from "../utlis/redis_connector";

interface RoomUser {
  id: number;
  socketId: string;
}
type RoomStatus = "pending" | "active" | "finished";

interface RoomContructor {
  id: string;
  counter?: number;
  players?: RoomUser[];
  status?: RoomStatus;
  room_size: number;
  amount: number;
  commission_percent: number;
}

export class RedisRoom {
  id: string;
  counter: number;
  players: RoomUser[];
  status: RoomStatus;
  room_size: number;
  amount: number;
  commission_percent: number;

  constructor({ amount, id, room_size, status, counter, players, commission_percent }: RoomContructor) {
    this.amount = amount;
    this.id = id;
    this.room_size = room_size;
    this.status = status ?? "pending";
    this.counter = counter ?? 0;
    this.players = players ?? [];
    this.commission_percent = commission_percent;
  }

  static async addToQueue(amount: number, id: string) {
    const avaliableKey = `avaliable_rooms:${amount}`;
    return redis.rpush(avaliableKey, id);
  }

  async save() {
    const roomKey = `room:${this.id}`;
    const playersKey = `room:${this.id}:players`;

    const counter = redis.hset(roomKey, "counter", this.counter);
    const status = redis.hset(roomKey, "status", this.status);
    const size = redis.hset(roomKey, "room_size", this.room_size);
    const amount = redis.hset(roomKey, "amount", this.amount);
    const commission_percent = redis.hset(roomKey, "commission_percent", this.commission_percent);

    const players = redis.hkeys(playersKey).then((existingPlayers): unknown => {
      if (this.players.length > 0) {
        const playersHash: Record<string, string> = {};
        this.players.forEach((player) => {
          playersHash[player.id.toString()] = player.socketId;
        });

        const playersToDelete = existingPlayers.filter((id) => !playersHash[id]);

        let deletePromises: Promise<number>[] = [];
        if (playersToDelete.length > 0) {
          deletePromises = playersToDelete.map((id) => redis.hdel(playersKey, id));
        }

        const savePlayers = redis.hmset(playersKey, playersHash);

        return Promise.all([...deletePromises, savePlayers]);
      } else {
        return redis.del(playersKey);
      }
    });

    await Promise.all([counter, status, size, amount, players, commission_percent]);
  }

  static async load(id: string): Promise<RedisRoom | undefined> {
    const roomKey = `room:${id}`;
    const playersKey = `room:${id}:players`;

    const roomData = await redis.hgetall(roomKey);
    if (!roomData) return;
    const playersData = await redis.hgetall(playersKey);

    const players: RoomUser[] = Object.entries(playersData).map(([key, val]) => ({
      id: Number(key),
      socketId: val,
    }));

    return new RedisRoom({
      id,
      counter: Number(roomData.counter),
      players,
      status: roomData.status as RoomStatus,
      room_size: Number(roomData.room_size),
      amount: Number(roomData.amount),
      commission_percent: Number(roomData.commission_percent),
    });
  }

  async delete() {
    const roomKey = `room:${this.id}`;
    const playersKey = `room:${this.id}:players`;

    await Promise.all([redis.del(roomKey), redis.del(playersKey)]);
  }
}
