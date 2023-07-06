import express, { Request, Response } from "express";

const experimentsController = express.Router();

experimentsController.get("/", (req: Request, res: Response) => {
  res.status(200).json({ test: "Hello World" });
});

experimentsController.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ test: "Test" });
});

export default experimentsController;
