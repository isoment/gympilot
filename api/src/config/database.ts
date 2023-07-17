import { env } from "../utils/env";

export default {
  user: env("DB_USER") || "root",
  password: env("DB_PASSWORD") || "secret",
  host: env("DB_HOST") || "mysql",
  port: Number(env("DB_PORT")) || 3306,
  database: env("DB_DATABASE"),
  test_database: env("DB_DATABASE_TEST"),
};
