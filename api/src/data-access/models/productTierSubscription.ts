import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { database } from "./database";
import organizationModel from "./organization";
import productTierModel from "./productTier";

export interface ProductTierSubscriptionFields
  extends Model<InferAttributes<ProductTierSubscriptionFields>, InferCreationAttributes<ProductTierSubscriptionFields>> {
  id: CreationOptional<number>;
  organization_id: number;
  product_tier_id: number;
  start_date: Date;
  end_date: Date;
  status: string;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const ProductTierSubscription = database.get().define<ProductTierSubscriptionFields>(
  "ProductTierSubscription",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    organization_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: organizationModel,
        key: "id",
      },
    },
    product_tier_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: productTierModel,
        key: "id",
      },
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
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
  { tableName: "product_tier_subscriptions", createdAt: "created_at", updatedAt: "updated_at" },
);

export default ProductTierSubscription;
