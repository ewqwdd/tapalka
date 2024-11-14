import path from "path";
import { User } from "../types/user";
import fs from "fs";

const dbPath = path.resolve(__dirname, "..", "db.json");

class AuthService {
  authorize(user: User): User {
    const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    const users = db.users as User[];
    const index = users.findIndex((elem) => elem.telegramId === user.telegramId);
    if (index < 0) {
      users.push({ ...user, balance: 500 });
      console.log(db);
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
      return { ...user, balance: 500 };
    }
    const userExists = users[index];
    return userExists;
  }
}

export const authService = new AuthService();
