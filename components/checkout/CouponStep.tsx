"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCoupon, useCouponPreview } from "@/services/coupon";
import { CheckoutRequest } from "@/validation/checkout.schema";
import { AlertCircle, Check, Loader2, Ticket, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function CouponStep() {
  const { coupons, isLoading } = useCoupon();
  const { setValue, watch } = useFormContext<CheckoutRequest>();
  const selectedCoupon = watch("coupon_code");
  const [customCode, setCustomCode] = useState("");

  // Use the preview hook to show current status in this step too
  const {
    preview,
    isLoading: isChecking,
    error,
  } = useCouponPreview(selectedCoupon || null);

  const handleSelectCoupon = (code: string) => {
    if (selectedCoupon === code) {
      setValue("coupon_code", "");
    } else {
      setValue("coupon_code", code);
    }
  };

  const handleApplyCustomCode = () => {
    if (customCode.trim()) {
      setValue("coupon_code", customCode.trim());
      setCustomCode("");
    }
  };

  return (
    <>
      <CardHeader className="bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Ticket className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl text-gray-900">
              Mã giảm giá
            </CardTitle>
            <CardDescription>
              Chọn mã giảm giá có sẵn hoặc nhập mã của bạn
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-2 mb-8">
          <Input
            placeholder="Nhập mã giảm giá..."
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            className="flex-1"
          />
          <Button type="button" onClick={handleApplyCustomCode}>
            Áp dụng
          </Button>
        </div>

        {selectedCoupon && (
          <div className="mb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Mã đang chọn
            </h3>
            <div
              className={`p-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                error
                  ? "bg-rose-50 border-rose-200"
                  : "bg-primary/5 border-primary/20 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full transition-colors duration-300 ${error ? "bg-rose-500" : "bg-primary"} text-white shadow-lg`}
                >
                  {isChecking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : error ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm font-bold ${error ? "text-rose-600" : "text-primary"}`}
                  >
                    {selectedCoupon}
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium">
                    {isChecking
                      ? "Đang kiểm tra điều kiện..."
                      : error
                        ? error
                        : preview?.coupon?.name || "Mã hợp lệ"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setValue("coupon_code", "")}
                className="text-gray-400 hover:text-red-500 hover:bg-transparent"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Ưu đãi dành cho bạn
          </h3>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-100 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : coupons && coupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  onClick={() => handleSelectCoupon(coupon.code)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedCoupon === coupon.code
                      ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                      : "border-gray-100 hover:border-primary/20 hover:bg-gray-50/50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <Badge
                      variant="outline"
                      className="font-mono font-black text-[#D94E28] border-orange-100 bg-orange-50 px-2 py-0.5"
                    >
                      {coupon.code}
                    </Badge>
                    {selectedCoupon === coupon.code && (
                      <div className="p-1 bg-primary rounded-full text-white">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                    {coupon.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {coupon.description}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    <span>HSD: {coupon.expires_at}</span>
                    <span className="text-primary font-black">Áp dụng</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <Ticket className="h-10 w-10 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-medium">
                Hiện tại không có mã giảm giá nào
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </>
  );
}
