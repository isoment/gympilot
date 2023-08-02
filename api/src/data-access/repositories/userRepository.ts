import model from "../models";
import { WhereOptions, InferAttributes, Model } from "sequelize";
import { RoleFields } from "../models/role";

export interface User extends Model {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithRoles extends User {
  roles: RoleFields[];
}

/**
 * Searches for a user with the given field. Include their roles as well.
 * @param field in the users table to search by
 * @param value value to search
 * @returns Promise<User | null>
 */
export async function getUser<T extends keyof User>(field: T, value: User[T]): Promise<UserWithRoles | null> {
  const whereClause: WhereOptions<InferAttributes<User>> = { [field]: value };

  const user = (await model.User.findOne({
    where: whereClause,
    attributes: { exclude: ["password"] },
    include: [
      {
        model: model.Role,
        as: "Roles",
        // Only include the role name
        attributes: ["name", "created_at"],
        // Exclude the join table
        through: { attributes: [] },
      },
    ],
    nest: true,
  })) as UserWithRoles;

  return user;
}
