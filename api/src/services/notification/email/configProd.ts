import nodemailer from "nodemailer";
import notificationConfig from "../../../config/notification";

const transporterProd = nodemailer.createTransport({
  host: notificationConfig.email_host,
  port: notificationConfig.email_port,
  secure: notificationConfig.email_secure,
});

export default transporterProd;
