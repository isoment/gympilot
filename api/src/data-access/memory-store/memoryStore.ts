import { Redis } from "ioredis";
import { dataAccessConfig } from "../../config/dataAccess";
import { appConfig } from "../../config/app";
import { logger } from "../../logger/logger";

export class MemoryStore {
  #underlyingStore: Redis | null = null;

  async get(): Promise<Redis> {
    if (!this.#underlyingStore) {
      await this.configure();
    }
    return this.#underlyingStore!;
  }

  async configure(): Promise<void> {
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

  async close(): Promise<void> {
    if (this.#underlyingStore) {
      await this.#underlyingStore.quit();
    }
  }
}

export const memoryStore = new MemoryStore();
