import api from "@/config/axios";
import { ProductSuggestion } from "@/types/search.type";
import { AxiosError } from "axios";

export async function ProductSuggestions(
  query: string,
): Promise<ProductSuggestion[]> {
  if (query.length < 2) return [];
  return api
    .get(`/search/suggest?q=${encodeURIComponent(query)}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}
