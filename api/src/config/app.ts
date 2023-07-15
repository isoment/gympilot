import { env } from "../utils/env";

export const appConfig = {
  node: env("NODE_ENV") || "development",
  port: Number(env("PORT")) || 5000,
  testPort: Number(env("TEST_PORT")) || 0,
};
