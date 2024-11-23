import { Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export async function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  const now = Date.now();
  next();
  Logger.log(
    `${req.headers["x-real-ip"] || req.socket.remoteAddress} ${req.method} ${req.url} ${Date.now() - now}ms`,
  );
}
