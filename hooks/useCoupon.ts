import { CouponAPIResponse } from "@/types/coupon.type";
import useSWR from "swr";

export function useCoupon() {
  const { data, error, isLoading, mutate } =
    useSWR<CouponAPIResponse>(`/coupon`);
  return {
    coupons: data?.data,
    isLoading,
    error,
    mutate,
  };
}
