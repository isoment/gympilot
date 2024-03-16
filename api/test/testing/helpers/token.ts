import { UserFieldsWithRoles } from "../../../src/data-access/models/user";
import authToken from "../../../src/services/authToken";
import tokenPayload from "../../../src/services/tokenPayload";

const createAccessToken = async (user: UserFieldsWithRoles, exp: number = 99999) => {
  const payload = tokenPayload.prepare(user!);
  const accessToken = await authToken.create(payload, { expiresIn: exp });
  return `Bearer ${accessToken}`;
};

export { createAccessToken };
