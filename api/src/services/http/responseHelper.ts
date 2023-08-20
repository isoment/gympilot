import { Response } from "express";

export function internalError(res: Response, message: string = "There was an error", data = {}) {
  res.status(500).json({
    message,
    data,
  });
}
