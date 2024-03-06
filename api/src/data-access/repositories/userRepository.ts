import { WhereOptions, InferAttributes, Model } from "sequelize";

import model from "../models";
import { logger } from "../../logger/logger";
import { UserFields, UserFieldsWithRoles } from "../models/user";

/**
 * Searches for a user with the given field. Include their roles as well.
 * @param field in the users table to search by
 * @param value value to search
 * @param excludeSensitive will exclude the sensitive values like password by default
 * @returns Promise<User | null>
 */
export async function getUser<T extends keyof UserFields>(
  field: T,
  value: UserFields[T],
  excludeSensitive: boolean = true,
): Promise<UserFieldsWithRoles | null> {
  const whereClause: WhereOptions<InferAttributes<UserFields>> = { [field]: value };

  const withSensitive = {
    where: whereClause,
    include: [
      {
        model: model.Role,
        as: "Roles",
        // Only include these fields
        attributes: ["name"],
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
        attributes: ["name"],
        through: { attributes: [] },
      },
    ],
    nest: true,
  };

  const options = excludeSensitive ? withoutSensitive : withSensitive;

  const user = (await model.User.findOne(options)) as UserFieldsWithRoles;

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
export async function createUserWithRole(params: CreateUserWithRoleParams, roles: string[]): Promise<UserFields | null> {
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
      await model.UserRole.create({
        user_id: user.id,
        role_id: userRole.id,
      });
    } else {
      logger.error(`Role Not Found: Attempt to attach role ${role} to the user failed`, user);
    }
  }

  return user as UserFields;
}

type UserPartialUpdate = Partial<InferAttributes<UserFields>>;

/**
 * Update a user record in the database, we can search by any of the columns and update one or all values
 * @param field the column name to search by
 * @param value the column value to search by
 * @param data an object of user data to update
 * @returns number of rows updated
 */
export async function updateUser<T extends keyof UserFields>(field: T, value: UserFields[T], data: UserPartialUpdate): Promise<number> {
  const whereClause: WhereOptions<InferAttributes<UserFields>> = { [field]: value };

  const user = await model.User.update(data, {
    where: whereClause,
  });

  return user[0];
}
