import model from "../models";
import { WhereOptions, InferAttributes, Model } from "sequelize";
import { RoleFields } from "../models/role";
import { logger } from "../../logger/logger";

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
        // Only include these fields
        attributes: ["name", "created_at"],
        // Exclude the join table
        through: { attributes: [] },
      },
    ],
    nest: true,
  })) as UserWithRoles;

  return user;
}

export interface CreateUserWithRoleParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

/**
 * Create a new user with a given role(s)
 * @param params user table fields
 * @param roles to assign the user
 * @returns Promise<UserWithRoles | null>
 */
export async function createUserWithRole(params: CreateUserWithRoleParams, roles: string[]): Promise<UserWithRoles | null> {
  const user = await model.User.create({
    first_name: params.first_name,
    last_name: params.last_name,
    email: params.email,
    password: params.password,
  });

  for (const role of roles) {
    // Find the role in the database
    const userRole = await model.Role.findOne({
      where: { name: role },
    });

    if (userRole) {
      await model.UserRoles.create({
        user_id: user.id,
        role_id: userRole.id,
      });
    } else {
      logger.error(`Role Not Found: Attempt to attach role ${role} to the user failed`, user);
    }
  }

  return user as UserWithRoles;
}
