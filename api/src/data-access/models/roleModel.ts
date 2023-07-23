import getDbConnection from "./databaseConnection";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import userModel from "./userModel";
import userRolesModel from "./userRolesModel";

export interface RoleModelFields extends Model<InferAttributes<RoleModelFields>, InferCreationAttributes<RoleModelFields>> {
  id: CreationOptional<number>;
  name: string;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const roleModel = getDbConnection().define<RoleModelFields>(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
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

export default roleModel;
