import api from "@/config/axios";
import { Coupon } from "@/types/coupon.type";
import axios from "axios";
import useSWR from "swr";

export function useCoupon() {
  const { data, error, isLoading, mutate } = useSWR(`/coupon`);
  return { coupons: data?.data as Coupon[], error, isLoading, mutate };
}

export function useCouponPreview(code: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    code ? [`/coupon/preview`, code] : null,
    async ([url, code]) => {
      try {
        const res = await api.post(url, { code });
        return { data: res.data.data, error: null };
      } catch (err: unknown) {
        return {
          data: null,
          error: axios.isAxiosError(err)
            ? err.response?.data?.message || "Mã giảm giá không hợp lệ"
            : "Mã giảm giá không hợp lệ",
        };
      }
    },
  );

  return {
    preview: data?.data,
    error: data?.error || error,
    isLoading,
    mutate,
  };
}
