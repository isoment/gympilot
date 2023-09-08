import { logger } from "../../logger/logger";
import { memoryStore } from "./memoryStore";

/**
 * Store the users refresh token in the memory store
 * @param id of the user
 * @param token to store
 * @param expiration in seconds
 * @returns Promise<boolean>
 */
export async function set(id: number, token: string, expiration: number): Promise<boolean> {
  const redis = memoryStore.get();
  const key = `user:${id}:refreshToken`;
  try {
    await redis.set(key, token, "EX", expiration);
    return true;
  } catch (error) {
    logger.error(`Error setting refrsh token for user id: ${id} in redis`, error);
    return false;
  }
}

/**
 * Get the users refresh token from the memory store
 * @param id of the user
 * @returns Promise<string | null>
 */
export async function get(id: number): Promise<string | null> {
  const redis = memoryStore.get();
  const key = `user:${id}:refreshToken`;
  try {
    const refreshToken = await redis.get(key);
    return refreshToken;
  } catch (error) {
    logger.error(`Error getting refresh token for user id: ${id} in redis`, error);
    return null;
  }
}

/**
 * Delete the users refresh token from the memory store
 */
export async function remove(id: number): Promise<boolean> {
  const redis = memoryStore.get();
  const key = `user:${id}:refreshToken`;
  try {
    const deleteCount = await redis.del(key);
    return deleteCount > 0;
  } catch (error) {
    logger.error(`Error deleting refresh token for user id: ${id} in redis`, error);
    return false;
  }
}
