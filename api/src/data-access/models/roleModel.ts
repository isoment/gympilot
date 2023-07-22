import getDbConnection from "./databaseConnection";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { getUserModel } from "./userModel";
import { getUserRolesModel } from "./userRolesModel";

export interface RoleModelFields extends Model<InferAttributes<RoleModelFields>, InferCreationAttributes<RoleModelFields>> {
  id: CreationOptional<number>;
  name: string;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

export function getRoleModel() {
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
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { tableName: "roles" },
  );

  roleModel.belongsToMany(getUserModel(), { through: getUserRolesModel(), foreignKey: "role_id" });

  return roleModel;
}
