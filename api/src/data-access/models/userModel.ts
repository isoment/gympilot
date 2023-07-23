import getDbConnection from "./databaseConnection";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import roleModel from "./roleModel";
import userRolesModel from "./userRolesModel";

export interface UserModelFields extends Model<InferAttributes<UserModelFields>, InferCreationAttributes<UserModelFields>> {
  id: CreationOptional<number>;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  { tableName: "users", createdAt: "created_at", updatedAt: "updated_at" },
);

export default userModel;
