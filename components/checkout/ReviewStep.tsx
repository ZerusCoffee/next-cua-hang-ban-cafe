import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Address } from "@/types/address.type";
import { Cart, CartItem } from "@/validation/cart.schema";
import { Check, CreditCard, MapPin, Package } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function ReviewStep({
  selectedAddress,
  cart,
}: {
  selectedAddress: Address | null;
  cart: Cart;
}) {
  const { watch } = useFormContext();
  const paymentMethod = watch("payment_method");
  const notes = watch("customer_notes");

  return (
    <>
      <CardHeader className="bg-linear-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl text-gray-900">
              Xác nhận đơn hàng
            </CardTitle>
            <CardDescription>
              Kiểm tra lại thông tin trước khi đặt hàng
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Địa chỉ
          </h3>
          <p className="text-sm">
            {selectedAddress?.full_name} - {selectedAddress?.phone}
            <br />
            {selectedAddress?.details}, {selectedAddress?.ward},{" "}
            {selectedAddress?.province}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Thanh toán
          </h3>
          <p className="text-sm uppercase font-medium text-primary">
            {paymentMethod}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Package className="h-4 w-4" /> Sản phẩm
          </h3>
          {cart?.items.map((item: CartItem) => (
            <div key={item.item_key} className="flex justify-between text-sm">
              <span>
                {item.product_name} x {item.quantity}
              </span>
              <span className="font-medium">
                {formatPrice(item.unit_price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        {notes && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-1 text-sm">Ghi chú:</h3>
            <p className="text-sm italic text-gray-600">{notes}</p>
          </div>
        )}
      </CardContent>
    </>
  );
}
