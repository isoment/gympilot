import nodemailer from "nodemailer";
import { notificationConfig } from "../../../config/notification";

const transporterDev = nodemailer.createTransport({
  host: notificationConfig.emailHostDev,
  port: notificationConfig.emailPortDev,
  secure: notificationConfig.emailSecureDev,
});

export default transporterDev;
