import { appConfig } from "../config/app";
import jwt from "jsonwebtoken";

interface TokenPayload {}

const generate = (payload: TokenPayload) => {
  const token = jwt.sign(payload, appConfig.jwtPrivateKey);
  return token;
};

export default {
  generate,
};
