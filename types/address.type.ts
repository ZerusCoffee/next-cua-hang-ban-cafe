export interface Address {
  id: number;
  customer_id: number;
  full_name: string;
  phone: string;
  details: string;
  ward: string;
  province: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}