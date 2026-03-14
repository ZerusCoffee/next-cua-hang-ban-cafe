import { OrderAPIResponse } from "@/types/order.type";
import useSWR from "swr";

export function useOrder() {
  const { data, error, isLoading, mutate } = useSWR<OrderAPIResponse>(`/order`);
  return {
    orders: data,
    isLoading,
    error,
    mutate,
  };
}
