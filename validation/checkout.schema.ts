import { z } from "zod";

// Schema cho shipping address
export const ShippingAddressSchema = z.object({
  shipping_full_name: z.string().min(1, "Vui lòng nhập họ tên"),
  shipping_phone: z
    .string()
    .regex(/(0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ"),
  shipping_address_details: z.string().min(1, "Vui lòng nhập địa chỉ"),
  shipping_ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  shipping_province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  customer_notes: z.string().optional(),
});

// Schema cho checkout request
export const CheckoutRequestSchema = z.object({
  ...ShippingAddressSchema.shape,
  payment_method: z.enum(["cod", "vnpay", "momo", "paypal"], {
    message: "Phương thức thanh toán không đúng",
  }),
  coupon_code: z.string().optional(),
});

// Schema cho checkout response
export const OrderSchema = z.object({
  order_number: z.string(),
  total: z.number(),
  status: z.string(),
  payment_url: z.string().optional(), // Cho VNPAY/MOMO/PayPal
});

export const CheckoutResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: OrderSchema,
});

// Types
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
export type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>;
export type CheckoutResponse = z.infer<typeof CheckoutResponseSchema>;

// Interface cho checkout state
export interface CheckoutState {
  step: "address" | "shipping" | "payment" | "review";
  address: ShippingAddress | null;
  paymentMethod: string | null;
  couponCode: string | null;
  discount: number;
  loading: boolean;
  error: string | null;
}
