import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";
import organizationModel from "./organization";
import { TemplateFields } from "./template";

export interface LocationFields extends Model<InferAttributes<LocationFields>, InferCreationAttributes<LocationFields>> {
  id: CreationOptional<number>;
  organization_id: number;
  name: string;
  street_address: string;
  state_province: string;
  city: string;
  postal_code: string;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

export interface LocationFieldsWithTemplates extends LocationFields {
  Templates: TemplateFields[];
}

const Location = database.get().define<LocationFields>(
  "Location",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    organization_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: organizationModel,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state_province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
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
  { tableName: "locations", createdAt: "created_at", updatedAt: "updated_at" },
);

export default Location;
