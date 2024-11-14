import { type JWTData } from "./services/jwtService";

declare global {
  namespace Express {
    interface Request {
      user?: JWTData; // Adjust this based on your actual decoded token type
    }
  }
}
