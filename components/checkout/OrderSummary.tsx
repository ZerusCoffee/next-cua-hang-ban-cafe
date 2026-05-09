"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCouponPreview } from "@/services/coupon";
import { Address } from "@/types/address.type";
import { Cart, CartItem } from "@/validation/cart.schema";
import { AlertCircle, Loader2, MapPin, Package, Ticket } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function OrderSummary({
  cart,
  selectedAddress,
}: {
  cart: Cart;
  selectedAddress: Address | null;
}) {
  const { watch } = useFormContext();
  const couponCode = watch("coupon_code");

  // Call API preview when couponCode changes
  const { preview, isLoading, error } = useCouponPreview(couponCode);

  const subtotal = cart?.subtotal || 0;

  // Only apply discount if we have a successful preview AND no error message
  const isPreviewValid = !!(preview && !error && !isLoading);
  const discountAmount = isPreviewValid ? preview.discount_amount : 0;
  const finalTotal = isPreviewValid ? preview.total_after_discount : subtotal;

  return (
    <Card className="border-none shadow-lg sticky top-4 overflow-hidden bg-white">
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-[#D94E28]" />
            <p className="text-[10px] font-black text-[#D94E28] uppercase tracking-[0.2em]">
              Đang tính toán
            </p>
          </div>
        </div>
      )}

      <CardHeader className="bg-stone-50/50 border-b border-stone-100 p-5">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <Package className="h-5 w-5 text-[#D94E28]" /> Đơn hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {/* Items List */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {cart?.items.map((item: CartItem) => (
            <div
              key={item.item_key}
              className="flex justify-between text-sm group"
            >
              <span className="line-clamp-1 flex-1 pr-4 font-medium text-stone-600 group-hover:text-gray-900 transition-colors">
                {item.product_name}
              </span>
              <span className="text-stone-400 whitespace-nowrap tabular-nums">
                x{item.quantity}
              </span>
              <span className="font-bold ml-3 text-gray-900 tabular-nums">
                {formatPrice(item.unit_price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="opacity-50" />

        {/* Price Breakdown */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-stone-500">
            <span>Tạm tính:</span>
            <span className="font-bold text-gray-900 tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-emerald-600">
            <span>Vận chuyển:</span>
            <span className="font-black uppercase text-[10px] tracking-widest">
              Miễn phí
            </span>
          </div>

          {/* Discount Row - Only shown if code exists and is valid */}
          {couponCode && isPreviewValid && (
            <div className="flex justify-between text-[#D94E28] animate-in fade-in slide-in-from-top-1 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100/50">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-[#D94E28] rounded-md">
                  <Ticket className="h-3 w-3 text-white" />
                </div>
                <span className="font-bold text-[13px]">
                  Giảm giá ({couponCode}):
                </span>
              </div>
              <span className="font-black tabular-nums">
                -{formatPrice(discountAmount)}
              </span>
            </div>
          )}

          {/* Error Message - Show dynamic backend message */}
          {couponCode && !isLoading && error && (
            <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-start gap-2 animate-in shake-in-1">
              <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-rose-600 font-bold leading-relaxed italic">
                {error}
              </p>
            </div>
          )}

          <Separator className="opacity-50" />

          <div className="flex justify-between items-center pt-2">
            <span className="font-black text-gray-900 uppercase text-[11px] tracking-widest">
              Tổng thanh toán:
            </span>
            <span className="text-[#D94E28] text-2xl font-black tracking-tighter italic tabular-nums">
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>

        {/* Shipping Info Overlay */}
        {selectedAddress && (
          <div className="mt-6 p-4 bg-stone-50 rounded-2xl text-[11px] text-stone-600 border border-stone-100 shadow-inner relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-2 text-[#D94E28]">
              <MapPin className="h-3.5 w-3.5" />
              <p className="font-black uppercase tracking-[0.1em]">Giao đến</p>
            </div>
            <div className="relative z-10">
              <p className="font-black text-stone-900 mb-1">
                {selectedAddress.full_name}{" "}
                <span className="text-stone-300 mx-1">|</span>{" "}
                {selectedAddress.phone}
              </p>
              <p className="line-clamp-2 leading-relaxed font-medium">
                {selectedAddress.details}, {addressPart(selectedAddress.ward)},{" "}
                {addressPart(selectedAddress.province)}
              </p>
            </div>
            <MapPin className="absolute -bottom-2 -right-2 h-12 w-12 text-stone-200/50 -rotate-12 transition-transform group-hover:rotate-0" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function addressPart(str: string) {
  return str?.replace(/^(Phường|Xã|Quận|Huyện|Tỉnh|Thành phố)\s+/i, "") || str;
}
