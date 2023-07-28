import model from "../models";
import { WhereOptions, InferAttributes, Model } from "sequelize";

interface User extends Model {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * Searches for a user with the given field.
 * @param field in the users table to search by
 * @param value value to search
 * @returns Promise<User | null>
 */
export async function getUser<T extends keyof User>(field: T, value: User[T]): Promise<User | null> {
  const whereClause: WhereOptions<InferAttributes<User>> = { [field]: value };
  const user = await model.User.findOne({
    where: whereClause,
    attributes: { exclude: ["password"] },
    nest: true,
  });
  return user;
}