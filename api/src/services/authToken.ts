import jwt from "jsonwebtoken";
import { appConfig } from "../config/app";
import { logger } from "../logger/logger";

/**
 * We can generate a jwt token asynchronously by using a callback
 * @param payload to include in the token.
 * @param options to set for the token, encryption, expiration etc.
 * @returns Promise<string>
 */
const create = async (payload: any, options: jwt.SignOptions = {}): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, appConfig.jwtPrivateKey, options, (error: Error | null, token?: string) => {
      if (error) {
        logger.error(`Failed to generate a jwt token.`, error);
        reject(error);
      } else {
        resolve(token!);
      }
    });
  });
};

type VerifyTokenDecoded = string | jwt.JwtPayload | undefined;

/**
 * We can verify a token asynchronously by using a callback
 * @param token to verify
 * @returns Promise<VerifyTokenDecoded>
 */
const verify = async (token: string): Promise<VerifyTokenDecoded> => {
  return new Promise<VerifyTokenDecoded>((resolve, reject) => {
    jwt.verify(token, appConfig.jwtPrivateKey, (error: jwt.VerifyErrors | null, decoded: VerifyTokenDecoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};

export default {
  create,
  verify,
};
