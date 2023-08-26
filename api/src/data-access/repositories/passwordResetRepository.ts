import model from "../models";
import { WhereOptions, InferAttributes, Model } from "sequelize";
import { logger } from "../../logger/logger";
import { plusHours } from "../../services/dateTime";
import { v4 as uuid } from "uuid";

interface PasswordReset extends Model {
  id: number;
  email: string;
  token: string;
  expires: Date;
}

export async function findPasswordReset<T extends keyof PasswordReset>(field: T, value: PasswordReset[T]): Promise<PasswordReset | null> {
  const whereClause: WhereOptions<InferAttributes<PasswordReset>> = { [field]: value };
  const passwordReset = await model.PasswordReset.findOne({ where: whereClause });
  return passwordReset;
}

interface CreatePasswordResetParams {
  email: string;
}

export async function createPasswordReset(params: CreatePasswordResetParams): Promise<PasswordReset | null> {
  const passwordReset = await model.PasswordReset.create({
    email: params.email,
    token: uuid(),
    expires: plusHours(new Date(), 1),
  });
  if (!passwordReset) {
    logger.error("There was an error creating an entry for password reset", params);
  }
  return passwordReset;
}

export async function updatePasswordReset(email: string): Promise<number> {
  const passwordReset = await model.PasswordReset.update(
    { token: uuid(), expires: plusHours(new Date(), 1) },
    {
      where: {
        email: email,
      },
    },
  );
  return passwordReset[0];
}

export async function deletePasswordReset(email: string): Promise<number> {
  return await model.PasswordReset.destroy({
    where: {
      email: email,
    },
  });
}
