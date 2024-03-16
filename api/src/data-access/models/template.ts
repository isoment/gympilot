import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";

export interface TemplateFields extends Model<InferAttributes<TemplateFields>, InferCreationAttributes<TemplateFields>> {
  id: CreationOptional<number>;
  name: string;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const Template = database.get().define<TemplateFields>(
  "Template",
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
  { tableName: "templates", createdAt: "created_at", updatedAt: "updated_at" },
);

export default Template;
