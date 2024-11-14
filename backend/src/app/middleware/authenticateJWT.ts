import { NextFunction, type Request, type Response } from "express";
import { jwtService } from "../services/jwtService";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization as string;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token is not provided",
      });
    }
    const decoded = jwtService.verify(token.split("Bearer ")[1]);
    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "invalid token",
      });
    }
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server error",
    });
  }
}
