import { Socket } from "socket.io";
import { JWTData } from "../services/jwtService";

export interface ServerToClientEvents {
  noArg: () => void;
}

export interface ClientToServerEvents {
  connection: (id: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface AuthenticatedSocket extends Socket {
  user?: JWTData;
}
