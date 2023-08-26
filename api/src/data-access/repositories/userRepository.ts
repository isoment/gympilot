import { WhereOptions, InferAttributes, Model } from "sequelize";

import model from "../models";
import { RoleFields } from "../models/role";
import { logger } from "../../logger/logger";

export interface User extends Model {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
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
 * @param excludeSensitive will exclude the sensitive values like password by default
 * @returns Promise<User | null>
 */
export async function getUser<T extends keyof User>(field: T, value: User[T], excludeSensitive: boolean = true): Promise<UserWithRoles | null> {
  const whereClause: WhereOptions<InferAttributes<User>> = { [field]: value };

  const withSensitive = {
    where: whereClause,
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
  };

  const withoutSensitive = {
    where: whereClause,
    attributes: { exclude: ["password"] },
    include: [
      {
        model: model.Role,
        as: "Roles",
        attributes: ["name", "created_at"],
        through: { attributes: [] },
      },
    ],
    nest: true,
  };

  const options = excludeSensitive ? withoutSensitive : withSensitive;

  const user = (await model.User.findOne(options)) as UserWithRoles;

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
export async function createUserWithRole(params: CreateUserWithRoleParams, roles: string[]): Promise<User | null> {
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

  return user as User;
}

type UserPartialUpdate = Partial<InferAttributes<User>>;

/**
 * Update a user record in the database, we can search by any of the columns and update one or all values
 * @param field the column name to search by
 * @param value the column value to search by
 * @param data an object of user data to update
 * @returns number of rows updated
 */
export async function updateUser<T extends keyof User>(field: T, value: User[T], data: UserPartialUpdate): Promise<number> {
  const whereClause: WhereOptions<InferAttributes<User>> = { [field]: value };

  const user = await model.User.update(data, {
    where: whereClause,
  });

  return user[0];
}
