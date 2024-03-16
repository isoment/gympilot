import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";

export interface PasswordResetFields extends Model<InferAttributes<PasswordResetFields>, InferCreationAttributes<PasswordResetFields>> {
  id: CreationOptional<number>;
  email: string;
  token: string;
  expires: CreationOptional<Date>;
}

const PasswordReset = database.get().define<PasswordResetFields>(
  "PasswordReset",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { tableName: "password_resets", timestamps: false },
);

export default PasswordReset;
