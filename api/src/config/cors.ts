import { CorsOptions } from "cors";
import { appConfig } from "./app";
import { env } from "../utils/env";

const allowedOriginsDev = env("CORS_DOMAINS_DEV").split(",");
const allowedOriginsProd = env("CORS_DOMAINS").split(",");

const devEnv = appConfig.node === "development" || appConfig.node === "test";

export const corsOptions: CorsOptions = {
  origin: devEnv ? allowedOriginsDev : allowedOriginsProd,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  exposedHeaders: ["Authorization"],
  credentials: true,
};
