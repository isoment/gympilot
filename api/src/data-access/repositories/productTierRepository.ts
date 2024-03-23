import { WhereOptions, InferAttributes, Model } from "sequelize";
import model from "../models";
import { ProductTierFields } from "../models/productTier";

export async function getProductTier<T extends keyof ProductTierFields>(field: T, value: ProductTierFields[T]): Promise<ProductTierFields | null> {
  const whereClause: WhereOptions<InferAttributes<ProductTierFields>> = { [field]: value };
  return await model.ProductTier.findOne({
    where: whereClause,
  });
}
