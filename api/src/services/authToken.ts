import jwt from "jsonwebtoken";
import { appConfig } from "@base/config/app";
import { logger } from "@base/logger/logger";

/**
 * We can generate a jwt token asynchronously by using a callback
 * @param payload to include in the token.
 * @param options to set for the token, encryption, expiration etc.
 * @returns Promise<string>
 */
const generate = async (payload: object, options: jwt.SignOptions = {}): Promise<string> => {
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

export default {
  generate,
};
