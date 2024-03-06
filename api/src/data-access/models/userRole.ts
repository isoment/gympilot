import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";
import userModel from "./user";
import roleModel from "./role";

export interface UserRoleFields extends Model<InferAttributes<UserRoleFields>, InferCreationAttributes<UserRoleFields>> {
  id: CreationOptional<number>;
  user_id: number;
  role_id: number;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const UserRole = database.get().define<UserRoleFields>(
  "UserRole",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: userModel,
        key: "id",
      },
    },
    role_id: {
      type: DataTypes.BIGINT,
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
