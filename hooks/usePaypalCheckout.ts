import {
  capturePaypalOrder,
  createPaypalOrder,
} from "@/services/paypal.service";
import type { PayPalCaptureDetails } from "@/types/paypal.type";
import type { CheckoutRequest } from "@/validation/checkout.schema";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function usePayPalCheckout(
  checkoutData: CheckoutRequest,
  onSuccess?: (details: PayPalCaptureDetails) => void,
) {
  const [orderId, setOrderId] = useState<string | null>(null);

  const createOrder = useCallback(async () => {
    try {
      const res = await createPaypalOrder(checkoutData);
      if (res.status !== "success" || !res.data?.order_id) {
        throw new Error(res.message || "Không thể tạo đơn hàng PayPal");
      }
      setOrderId(res.data.order_id);
      return res.data.order_id;
    } catch (err) {
      console.error(err);
      throw err; // PayPalButtons cần nhận lỗi
    }
  }, [checkoutData]);

  const onApprove = useCallback(
    async (data: { orderID: string }) => {
      try {
        const res = await capturePaypalOrder(data.orderID);
        if (res.status !== "success") {
          throw new Error(res.message || "Thanh toán thất bại");
        }
        toast.success("Thanh toán PayPal thành công!");

        // Truyền details lên component cha
        if (res.details) {
          onSuccess?.({
            id: res.details.id,
            status: res.details.status,
            order_number: res.details.order_number, // đảm bảo backend trả về
            payer: res.details.payer,
          } as PayPalCaptureDetails);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    [onSuccess],
  );

  return { orderId, createOrder, onApprove };
}
