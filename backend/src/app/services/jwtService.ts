import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface JWTData {
  id: number;
  telegramId: number;
}

class JWTService {
  generate(telegramId: number, id: number) {
    return jwt.sign(
      {
        telegramId,
        id,
      },
      process.env.SERET_KEY!,
      {
        expiresIn: "96h",
      }
    );
  }
  verify(token: string) {
    return jwt.verify(token, process.env.SERET_KEY!) as JWTData;
  }
}

export const jwtService = new JWTService();
