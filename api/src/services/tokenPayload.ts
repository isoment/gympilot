import { UserFieldsWithRoles } from "../data-access/models/user";

interface OwnerPayload {
  id: number;
  name: string;
  onboarding_complete: boolean | null;
  roles: string[];
}

/**
 * This function will prepare the user data in a standardized way for inclusion in
 * the access or fresh tokens. This can be used in the frontend store.
 */
const prepare = (user: UserFieldsWithRoles): OwnerPayload => {
  const roles: string[] = [];

  user.Roles.forEach((role) => {
    roles.push(role.name);
  });

  return {
    id: user.id,
    name: `${user.first_name} ${user.last_name}`,
    onboarding_complete: user.owner_onboarding_complete,
    roles,
  };
};

export default { prepare };
