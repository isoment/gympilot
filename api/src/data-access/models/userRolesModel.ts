import getDbConnection from "./databaseConnection";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import userModel from "./userModel";
import roleModel from "./roleModel";

export interface UserRolesModelFields extends Model<InferAttributes<UserRolesModelFields>, InferCreationAttributes<UserRolesModelFields>> {
  id: CreationOptional<number>;
  user_id: number;
  role_id: number;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

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
        model: userModel,
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: roleModel,
        key: "id",
      },
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
  { tableName: "user_roles", createdAt: "created_at", updatedAt: "updated_at" },
);

export default userRoleModel;
