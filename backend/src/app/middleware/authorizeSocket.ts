import { Socket } from "socket.io";
import { JWTData, jwtService } from "../services/jwtService"; // Предполагается, что есть такой сервис
import { logger } from "../utlis/logger";

interface AuthenticatedSocket extends Socket {
  user?: JWTData;
}

export function authorizeSocket(socket: AuthenticatedSocket, next: (err?: Error) => void) {
  try {
    const token = socket.handshake?.query?.token as string;
    if (!token) {
      next(new Error("Authentication error"));
      return;
    }
    const decoded = jwtService.verify(token);
    if (!decoded) {
      next(new Error("Invalid token"));
      return;
    }
    socket.user = decoded;
    next();
  } catch (err) {
    logger.error(err);
    next(new Error("Server error"));
  }
}
