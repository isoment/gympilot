import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";
import userModel from "./user";
import locationModel from "./location";

export interface UserLocationFields extends Model<InferAttributes<UserLocationFields>, InferCreationAttributes<UserLocationFields>> {
  id: CreationOptional<number>;
  user_id: number;
  location_id: number;
  type: string;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const UserLocation = database.get().define<UserLocationFields>(
  "UserLocation",
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
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: locationModel,
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
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
  { tableName: "user_locations", createdAt: "created_at", updatedAt: "updated_at" },
);

export default UserLocation;
