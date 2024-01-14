import { env, envOrFail } from "../utils/env";

export const appConfig = {
  apiRootURL: env("API_ROOT_URL"),
  frontendRootURL: env("FRONTEND_ROOT_URL"),
  node: env("NODE_ENV") || "development",
  port: Number(env("PORT")) || 5000,
  testPort: Number(env("TEST_PORT")) || 0,
  jwtPrivateKey: envOrFail("JWT_PRIVATE_KEY"),
  accessTokenExp: Number(envOrFail("ACCESS_TOKEN_EXP")),
  refreshTokenExp: Number(envOrFail("REFRESH_TOKEN_EXP")),
};
