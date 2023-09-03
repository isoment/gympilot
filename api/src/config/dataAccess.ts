import { env, envOrFail } from "../utils/env";

export const dataAccessConfig = {
  dbUser: env("DB_USER") || "root",
  dbPassword: env("DB_PASSWORD") || "secret",
  dbHost: env("DB_HOST") || "mysql",
  dbPort: Number(env("DB_PORT")) || 3306,
  database: env("DB_DATABASE"),
  testDatabase: env("DB_DATABASE_TEST"),

  redisHost: envOrFail("REDIS_HOST"),
  redisPort: Number(envOrFail("REDIS_PORT")),
  redisDB: Number(envOrFail("REDIS_DB")),
  redisTestDb: Number(envOrFail("REDIS_TEST_DB")),
};
