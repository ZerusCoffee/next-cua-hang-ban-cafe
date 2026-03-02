export interface Coupon {
  id: number;
  code: string;
  name: string;
  description: string;
  type: "percentage" | "fixed";
  value: number; // percentage (e.g., 20 for 20%) or fixed amount (e.g., 50000)
  minimum_order_amount: number;
  maximum_discount_amount: number | null;
  usage_limit: number | null;
  usage_limit_per_customer: number | null;
  starts_at: string | null;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
