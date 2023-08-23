import nodemailer from "nodemailer";

const transporterProd = nodemailer.createTransport({
  host: "mailhog",
  port: 1025,
  secure: false,
});

export default transporterProd;
