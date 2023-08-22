import model from "../models";
import { Model } from "sequelize";
import { logger } from "../../logger/logger";
import { plusHours } from "../../services/dateTime";

interface PasswordReset extends Model {
  id: number;
  email: string;
  token: string;
  expires: Date;
}

interface CreatePasswordResetParams {
  email: string;
  token: string;
}

export async function createPasswordReset(params: CreatePasswordResetParams): Promise<PasswordReset | null> {
  const passwordReset = await model.PasswordReset.create({
    email: params.email,
    token: params.token,
    expires: plusHours(new Date(), 1),
  });
  if (!passwordReset) {
    logger.error("There was an error creating an entry for password reset", params);
  }
  return passwordReset;
}
