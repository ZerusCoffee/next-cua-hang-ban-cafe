import { Coupon } from "@/types/coupon.type";
import useSWR from "swr";

export function useCoupon() {
  const { data, error, isLoading, mutate } = useSWR(
    `/coupon`,
  );
  return { coupons: data?.data as Coupon[], error, isLoading, mutate };
}
