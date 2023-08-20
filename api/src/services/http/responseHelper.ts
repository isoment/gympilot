import { Response } from "express";

export function internalError(res: Response, message: string = "Internal server error", data = {}) {
  res.status(500).json({
    message,
    data,
  });
}
