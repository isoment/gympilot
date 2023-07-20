import getDbConnection from "./databaseConnection";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { getRoleModel } from "./roleModel";
import { getUserRolesModel } from "./userRolesModel";

export interface UserModelFields extends Model<InferAttributes<UserModelFields>, InferCreationAttributes<UserModelFields>> {
  id: CreationOptional<number>;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { tableName: "users" },
  );

  userModel.belongsToMany(getRoleModel(), { through: getUserRolesModel(), foreignKey: "user_id" });

  return userModel;
}
