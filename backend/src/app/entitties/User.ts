import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Room } from "./Room";
import { Task } from "./Task/Task";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: "bigint" })
  telegramId?: number;

  @Column({ nullable: true })
  username?: string;

  @Column()
  balance: number;

  @Column({ nullable: true })
  bonusBalance: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  isPremium?: boolean;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  lang?: string;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ nullable: true })
  ipAddress?: string;

  @ManyToOne(() => User, (user) => user.referrals)
  @JoinColumn()
  invitedBy?: User;

  @OneToMany(() => User, (user) => user.invitedBy)
  referrals?: User[];

  @Column({ nullable: true })
  sourceId?: string;

  @ManyToMany(() => Room, (room) => room.players)
  rooms?: Room[];

  @ManyToMany(() => Task, (task) => task.completedBy)
  tasks?: Task[];

  @OneToMany(() => Room, (room) => room.loser)
  roomLost?: Room[];
}
