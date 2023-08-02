import { UserWithRoles } from "@base/data-access/repositories/userRepository";
import { appConfig } from "../config/app";
import jwt from "jsonwebtoken";

const generate = (payload: UserWithRoles) => {
  const token = jwt.sign(payload, appConfig.jwtPrivateKey);
  return token;
};

export default {
  generate,
};
