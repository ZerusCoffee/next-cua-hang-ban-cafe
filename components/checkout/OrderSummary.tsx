import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Address } from "@/types/address.type";
import { Cart, CartItem } from "@/validation/cart.schema";
import { Package, Ticket } from "lucide-react";
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

  return (
    <Card className="border-none shadow-lg sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Package className="h-5 w-5 text-primary" /> Đơn hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {cart?.items.map((item: CartItem) => (
            <div key={item.item_key} className="flex justify-between text-sm">
              <span className="line-clamp-1 flex-1 pr-4">
                {item.product_name}
              </span>
              <span className="text-gray-500 whitespace-nowrap">
                x{item.quantity}
              </span>
              <span className="font-medium ml-3">
                {formatPrice(item.unit_price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Tạm tính:</span>
            <span>{formatPrice(cart?.subtotal || 0)}</span>
          </div>
          <div className="flex justify-between text-green-600 font-medium">
            <span>Vận chuyển:</span>
            <span>Miễn phí</span>
          </div>

          {couponCode && (
            <div className="flex justify-between text-orange-600 font-medium">
              <div className="flex items-center gap-1">
                <Ticket className="h-3 w-3" />
                <span>Mã giảm giá:</span>
              </div>
              <span>{couponCode}</span>
            </div>
          )}

          <Separator />
          <div className="flex justify-between font-bold text-base pt-2">
            <span>Tổng cộng:</span>
            <span className="text-primary text-xl">
              {formatPrice(cart?.subtotal || 0)}
            </span>
          </div>
          {couponCode && (
            <p className="text-[10px] text-gray-400 italic text-right">
              * Giảm giá sẽ được áp dụng khi đặt hàng thành công
            </p>
          )}
        </div>

        {selectedAddress && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 border border-gray-100">
            <p className="font-semibold text-gray-900 mb-1">Giao đến:</p>
            <p className="truncate">
              {selectedAddress.full_name} | {selectedAddress.phone}
            </p>
            <p className="line-clamp-1">
              {selectedAddress.details}, {selectedAddress.ward}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
