import { env } from "../utils/env";

export default {
  email_host_dev: env("EMAIL_HOST_DEV"),
  email_port_dev: Number(env("EMAIL_PORT_DEV")),
  email_secure_dev: Boolean(env("EMAIL_SECURE_DEV") === "true"),

  email_host: env("EMAIL_HOST"),
  email_port: Number(env("EMAIL_PORT")),
  email_secure: Boolean(env("EMAIL_SECURE") === "true"),
};
