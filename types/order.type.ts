export interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  coupon_id: number | null;
  subtotal: string;
  total: string;
  shipping_full_name: string;
  shipping_phone: string;
  shipping_address_details: string;
  shipping_ward: string;
  shipping_province: string;
  payment_method: string;
  payment_status: "pending" | "paid" | "failed";
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  customer_notes: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface OrderDetail {
  id: number;
  order_number: string;
  customer_id: number;
  coupon_id: number | null;
  subtotal: number;
  total: number;
  shipping_full_name: string;
  shipping_phone: string;
  shipping_address_details: string;
  shipping_ward: string;
  shipping_province: string;
  payment_method: string;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  customer_notes: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  items: ItemDetail[];
}
export interface ItemDetail {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  product_sku: string;
  product_image: string;
  price: number;
  unit_cost: number;
  quantity: number;
  options: OptionItemDetail[];
  subtotal: number;
}
export interface OptionItemDetail {
  option_id: number;
  group_name: string;
  option_value: string;
  additional_price: string;
  product_option_id: number;
}
export interface OrderAPIResponse {
  status: string;
  message: string;
  data: OrderPaginationResponse;
}
export interface OrderPaginationResponse {
  current_page: number;
  data: Order[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
