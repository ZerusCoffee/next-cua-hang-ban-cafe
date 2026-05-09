export interface Coupon {
  code: string;
  name: string;
  description: string;
  type_label: string;
  minimum_order_amount: string;
  maximum_discount_amount: string | null;
  expires_at: string;
}

export interface CouponAPIResponse {
  status: string;
  message: string;
  data: Coupon[];
}
