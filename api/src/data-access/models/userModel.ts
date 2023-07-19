import getDbConnection from "./databaseConnection";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export interface UserModelFields extends Model<InferAttributes<UserModelFields>, InferCreationAttributes<UserModelFields>> {
  id: CreationOptional<number>;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export function getUserModel() {
  const userModel = getDbConnection().define<UserModelFields>(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    { tableName: "users" },
  );

  return userModel;
}
