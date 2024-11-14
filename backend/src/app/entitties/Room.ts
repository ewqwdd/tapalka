import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User"; // Adjust the import path as needed

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  counter: number;

  @ManyToMany(() => User, (player) => player.rooms)
  @JoinTable()
  players: User[];

  @Column({
    type: "enum",
    enum: ["active", "finished", "pending"],
  })
  status: string;

  @Column()
  room_size: number;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.roomLost)
  @JoinColumn()
  loser?: User;
}
