import model from "../models";
import { ProductTierSubscriptionFields } from "../models/productTierSubscription";

type SubscriptionStatus = "active" | "expired";

interface CreateSubscriptionParams {
  organization_id: number;
  product_tier_id: number;
  start_date: Date;
  end_date: Date | null;
  status: SubscriptionStatus;
}

export async function createSubscription(params: CreateSubscriptionParams): Promise<ProductTierSubscriptionFields | null> {
  return await model.ProductTierSubscription.create(params);
}
