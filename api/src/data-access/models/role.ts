import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";

export interface RoleFields extends Model<InferAttributes<RoleFields>, InferCreationAttributes<RoleFields>> {
  id: CreationOptional<number>;
  name: string;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const Role = database.get().define<RoleFields>(
  "Role",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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
  { tableName: "roles", createdAt: "created_at", updatedAt: "updated_at" },
);

export default Role;
