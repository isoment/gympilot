import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";
import userModel from "./user";
import productTier from "./productTier";

export interface OrganizationFields extends Model<InferAttributes<OrganizationFields>, InferCreationAttributes<OrganizationFields>> {
  id: CreationOptional<number>;
  owner_id: number;
  product_tier_id: number;
  name: string;
  country: string;
  timezone: string;
  date_format: string;
  time_format: string;
  currency: string;
  billing_date: string;
  allow_cancellation: boolean;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const Organization = database.get().define<OrganizationFields>(
  "Organization",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      references: {
        model: userModel,
        key: "id",
      },
    },
    product_tier_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: productTier,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time_format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billing_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    allow_cancellation: {
      type: DataTypes.BOOLEAN,
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
  { tableName: "organizations", createdAt: "created_at", updatedAt: "updated_at" },
);

export default Organization;
