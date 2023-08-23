import transporterDev from "./configDev";
import transporterProd from "./configProd";
import nodemailer from "nodemailer";
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

  /**
   *  Send a test email, just for testing
   */
  testEmail() {
    const mailOptions = {
      from: "app@gympilot.com",
      to: "user@test.com",
      subject: "Test Email",
      text: "This is a test email.",
    };
    this.sendEmail("testEmail", mailOptions);
  }
}

export const email = new Email();
