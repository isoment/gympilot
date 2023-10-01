import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";
import userModel from "./user";
import roleModel from "./role";

export interface UserRolesFields extends Model<InferAttributes<UserRolesFields>, InferCreationAttributes<UserRolesFields>> {
  id: CreationOptional<number>;
  user_id: number;
  role_id: number;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const UserRole = database.get().define<UserRolesFields>(
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

export default UserRole;
