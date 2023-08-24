import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";

import transporterDev from "./configDev";
import transporterProd from "./configProd";
import { appConfig } from "../../../config/app";
import { logger } from "../../../logger/logger";

export class Email {
  #underlyingTransport: nodemailer.Transporter | null = null;

  configureEmail(): void {
    const emailTransport = appConfig.node === "production" ? transporterProd : transporterDev;
    this.#underlyingTransport = emailTransport;
  }

  sendEmail(template: string, mailOptions: nodemailer.SendMailOptions) {
    if (this.#underlyingTransport) {
      this.#underlyingTransport.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
          logger.error(`There was an error sending the ${template} email template`, mailOptions, error);
        } else {
          logger.info(`Email template ${template} sent`, info.response);
        }
      });
    }
  }

  passwordReset(emailAddress: string, token: string): void {
    const templatePath = path.join(__dirname, "templates/passwordReset.ejs");
    const template = fs.readFileSync(templatePath, "utf-8");

    const compiledTemplate = ejs.compile(template);
    const emailHtml = compiledTemplate({ resetToken: token });

    const mailOptions = {
      from: "gympilot@gympilot.com",
      to: emailAddress,
      subject: "GymPilot | Reset Password",
      html: emailHtml,
    };
    this.sendEmail("testEmail", mailOptions);
  }
}

export const email = new Email();
