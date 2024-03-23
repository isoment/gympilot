import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";

export interface ProductTier extends Model<InferAttributes<ProductTier>, InferCreationAttributes<ProductTier>> {
  id: CreationOptional<number>;
  name: string;
  price_usd_cents: number;
  max_active_members: number;
  max_locations: number;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const ProductTier = database.get().define<ProductTier>(
  "ProductTier",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_usd_cents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_active_members: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_locations: {
      type: DataTypes.INTEGER,
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
  { tableName: "product_tiers", createdAt: "created_at", updatedAt: "updated_at" },
);

export default ProductTier;
