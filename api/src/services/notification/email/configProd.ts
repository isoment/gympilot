import nodemailer from "nodemailer";
import { notificationConfig } from "../../../config/notification";

const transporterProd = nodemailer.createTransport({
  host: notificationConfig.emailHost,
  port: notificationConfig.emailPort,
  secure: notificationConfig.emailSecure,
});

export default transporterProd;
