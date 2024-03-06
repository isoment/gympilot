import { UserFieldsWithRoles } from "@base/data-access/models/user";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  roles: string[];
}

/**
 * This function will prepare the user data in a standardized way for inclusion in
 * the access or fresh tokens. This can be used in the frontend store.
 */
const prepare = (user: UserFieldsWithRoles): UserData => {
  const roles: string[] = [];

  user.Roles.forEach((role) => {
    roles.push(role.name);
  });

  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    roles,
  };
};

export default { prepare };
