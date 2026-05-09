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
import { useCoupon } from "@/services/coupon";
import { Check, Ticket, X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function CouponStep() {
  const { coupons, isLoading } = useCoupon();
  const { setValue, watch } = useFormContext();
  const selectedCoupon = watch("coupon_code");
  const [customCode, setCustomCode] = useState("");

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
          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary text-white rounded-full">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">
                  Đã chọn mã: {selectedCoupon}
                </p>
                <p className="text-xs text-gray-500">
                  Mã sẽ được áp dụng cho đơn hàng của bạn
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setValue("coupon_code", "")}
              className="text-gray-400 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Mã giảm giá có sẵn
          </h3>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-100 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : coupons && coupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  onClick={() => handleSelectCoupon(coupon.code)}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCoupon === coupon.code
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/30"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="font-mono font-bold">
                      {coupon.code}
                    </Badge>
                    {selectedCoupon === coupon.code && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                    {coupon.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                    {coupon.description}
                  </p>
                  <div className="mt-2 text-[10px] text-gray-400 font-medium">
                    HSD: {coupon.expires_at}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed">
              <Ticket className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                Hiện tại không có mã giảm giá nào
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </>
  );
}
