import { Sequelize } from "sequelize";
import { logger } from "../../logger/logger";
import { dataAccessConfig } from "../../config/dataAccess";
import { appConfig } from "../../config/app";

// ️️️Best Practice: Keep a singleton DB connection pool in a process
let dbConnection: Sequelize;

export default function getDbConnection() {
  if (!dbConnection) {
    const name = appConfig.node === "test" ? dataAccessConfig.testDatabase : dataAccessConfig.database;
    dbConnection = new Sequelize(name, dataAccessConfig.dbUser, dataAccessConfig.dbPassword, {
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

  return dbConnection;
}
