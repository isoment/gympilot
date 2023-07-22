import getDbConnection from "./databaseConnection";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { getUserModel } from "./userModel";
import { getRoleModel } from "./roleModel";

export interface UserRolesModelFields extends Model<InferAttributes<UserRolesModelFields>, InferCreationAttributes<UserRolesModelFields>> {
  id: CreationOptional<number>;
  user_id: number;
  role_id: number;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

export function getUserRolesModel() {
  const userRoleModel = getDbConnection().define<UserRolesModelFields>(
    "UserRoles",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: getUserModel(),
          key: "id",
        },
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: getRoleModel(),
          key: "id",
        },
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
    { tableName: "user_roles" },
  );

  return userRoleModel;
}
