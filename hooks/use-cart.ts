import { Cart } from "@/validation/cart.schema";
import useSWR from "swr";

export function useCart() {
  const { data, error, isLoading, mutate } = useSWR(`/cart`);
  return { cart: data?.data as Cart, error, isLoading, mutate };
}
