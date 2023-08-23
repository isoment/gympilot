import nodemailer from "nodemailer";

const transporterDev = nodemailer.createTransport({
  host: "mailhog",
  port: 1025,
  secure: false,
});

export default transporterDev;
