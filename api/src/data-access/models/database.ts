import { Sequelize } from "sequelize";
import { logger } from "../../logger/logger";
import { dataAccessConfig } from "../../config/dataAccess";
import { appConfig } from "../../config/app";

export class Database {
  #underlyingDatabase: Sequelize | null = null;

  get(): Sequelize {
    if (!this.#underlyingDatabase) {
      this.configure();
    }
    return this.#underlyingDatabase!;
  }

  configure(): void {
    if (!this.#underlyingDatabase) {
      const name = appConfig.node === "test" ? dataAccessConfig.testDatabase : dataAccessConfig.database;
      this.#underlyingDatabase = new Sequelize(name, dataAccessConfig.dbUser, dataAccessConfig.dbPassword, {
        host: dataAccessConfig.dbHost,
        port: dataAccessConfig.dbPort,
        dialect: "mysql",
        benchmark: true,
        logging: (sql: string, duration?: number) => {
          logger.info(`Sequelize operation was just executed in ${duration} ms with sql: ${sql}`);
        },
        logQueryParameters: true,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });
    }
  }

  async close(): Promise<void> {
    if (this.#underlyingDatabase) {
      await this.#underlyingDatabase.close();
    }
  }
}

export const database = new Database();
