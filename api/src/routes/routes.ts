import express, { Request, Response } from "express";

export default function defineRoutes(expressApp: express.Application) {
  const router = express.Router();

  router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ test: "Hello World" });
  });

  expressApp.use("/test", router);
}
