import { Redis } from "ioredis";
import { dataAccessConfig } from "../../config/dataAccess";
import { appConfig } from "../../config/app";
import { logger } from "../../logger/logger";

export class MemoryStore {
  #underlyingStore: Redis | null = null;

  async configureMemoryStore(): Promise<void> {
    if (!this.#underlyingStore) {
      const database = appConfig.node === "test" ? dataAccessConfig.redisTestDb : dataAccessConfig.redisDB;
      const redis = new Redis({
        host: dataAccessConfig.redisHost,
        port: dataAccessConfig.redisPort,
      });

      redis.on("error", (error) => {
        logger.error("Redis connection error:", error);
      });

      await redis.select(database);
      this.#underlyingStore = redis;
    }
  }
}

export const memoryStore = new MemoryStore();
