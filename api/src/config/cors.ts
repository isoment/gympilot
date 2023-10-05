import { CorsOptions } from "cors";
import { appConfig } from "./app";

const allowedOriginsDev = ["http://localhost", "http://localhost:8080", "127.0.0.1", "127.0.0.1:8080"];
const allowedOriginsProd = ["http://localhost"];

const devEnv = appConfig.node === "development" || appConfig.node === "test";

export const corsOptions: CorsOptions = {
  origin: devEnv ? allowedOriginsDev : allowedOriginsProd,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  credentials: true,
};
