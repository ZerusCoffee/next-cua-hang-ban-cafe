import { PayPalPaymentButtons } from "@/components/button/button-paypal";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Address } from "@/types/address.type";
import { PayPalCaptureDetails } from "@/types/paypal.type";
import { Cart, CartItem } from "@/validation/cart.schema";
import { Check, CreditCard, MapPin, Package } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface Props {
  selectedAddress: Address | null;
  cart: Cart;
  onPayPalSuccess?: (details: PayPalCaptureDetails) => void;
}

export function ReviewStep({ selectedAddress, cart, onPayPalSuccess }: Props) {
  const { watch } = useFormContext();
  const paymentMethod = watch("payment_method");
  const notes = watch("customer_notes");

  const totalAmount =
    cart?.items.reduce(
      (acc, item) => acc + item.unit_price * item.quantity,
      0,
    ) || 0;

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
        {/* Địa chỉ */}
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

        {/* Thanh toán */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Thanh toán
          </h3>
          <p className="text-sm uppercase font-medium text-primary">
            {paymentMethod === "paypal"
              ? "PayPal / Credit Card"
              : paymentMethod}
          </p>
        </div>

        {/* Sản phẩm */}
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
          <div className="mt-4 pt-4 border-t flex justify-between font-bold text-lg">
            <span>Tổng cộng:</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
        </div>

        {notes && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-1 text-sm">Ghi chú:</h3>
            <p className="text-sm italic text-gray-600">{notes}</p>
          </div>
        )}

        {/* Nút PayPal */}
        {paymentMethod === "paypal" && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-center font-medium mb-4">
              Hoàn tất thanh toán qua PayPal
            </h3>
            <PayPalPaymentButtons onSuccess={onPayPalSuccess} />
          </div>
        )}
      </CardContent>
    </>
  );
}
