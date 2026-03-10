import { Category } from "./category.type";

export interface Product {
  id: number;
  category: Category;
  name: string;
  slug: string;
  sku: string;
  price: number;
  shortDescription: string;
  description: string;
  isFeatured: true;
  isActive: true;
  viewCount: number;
  primaryImage: string | null;
  created_at: Date;
  updated_at: Date;
}

export type ProductCardType = Pick<
  Product,
  | "id"
  | "category"
  | "name"
  | "slug"
  | "price"
  | "shortDescription"
  | "viewCount"
  | "sku"
  | "primaryImage"
>;

export type ProductQueryParams = {
  category_id?: number;
  page?: number;
  limit?: number;
  min_price?: number;
  max_price?: number;
  name?: string;
  sort_by?: string;
};
