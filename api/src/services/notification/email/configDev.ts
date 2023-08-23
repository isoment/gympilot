import nodemailer from "nodemailer";
import notificationConfig from "../../../config/notification";

const transporterDev = nodemailer.createTransport({
  host: notificationConfig.email_host_dev,
  port: notificationConfig.email_port_dev,
  secure: notificationConfig.email_secure_dev,
});

export default transporterDev;
