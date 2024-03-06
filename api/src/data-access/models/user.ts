import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { RoleFields } from "./role";
import { database } from "./database";

export interface UserFields extends Model<InferAttributes<UserFields>, InferCreationAttributes<UserFields>> {
  id: CreationOptional<number>;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  owner_onboarding_complete: 1 | 0 | null;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

export interface UserFieldsWithRoles extends UserFields {
  Roles: RoleFields[];
}

const User = database.get().define<UserFields>(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
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
    owner_onboarding_complete: {
      type: DataTypes.BOOLEAN,
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

export default User;
