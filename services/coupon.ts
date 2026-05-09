import api from "@/config/axios";
import { Coupon, CouponPreviewAPIResponse } from "@/types/coupon.type";
import { AxiosError } from "axios";
import useSWR from "swr";

export function useCoupon() {
  const { data, error, isLoading, mutate } = useSWR(`/coupon`);
  return { coupons: data?.data as Coupon[], error, isLoading, mutate };
}

export function applyCoupon(code: string) {
  return api
    .post<CouponPreviewAPIResponse>(`/coupon/preview`, { code })
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export function useCouponPreview(code: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    code ? [`/coupon/preview`, code] : null,
    async ([url, code]) => {
      try {
        const res = await api.post(url, { code });
        return { data: res.data.data, error: null };
      } catch (err: any) {
        // Return the specific message from backend
        return {
          data: null,
          error: err.response?.data?.message || "Mã giảm giá không hợp lệ",
        };
      }
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  return {
    preview: data?.data,
    error: data?.error || error,
    isLoading,
    mutate,
  };
}
