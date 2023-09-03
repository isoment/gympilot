import { env } from "../utils/env";

export const notificationConfig = {
  emailHostDev: env("EMAIL_HOST_DEV"),
  emailPortDev: Number(env("EMAIL_PORT_DEV")),
  emailSecureDev: Boolean(env("EMAIL_SECURE_DEV") === "true"),

  emailHost: env("EMAIL_HOST"),
  emailPort: Number(env("EMAIL_PORT")),
  emailSecure: Boolean(env("EMAIL_SECURE") === "true"),
};
