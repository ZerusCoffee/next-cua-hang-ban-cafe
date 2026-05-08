export interface ProductSuggestion {
  id: number;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  price: string; // dạng chuỗi decimal từ backend
  image: string; // URL ảnh
  is_featured: boolean;
  is_active: boolean;
}
