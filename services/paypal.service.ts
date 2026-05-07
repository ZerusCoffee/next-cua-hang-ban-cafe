import api from "@/config/axios";
import {
  PayPalCaptureResponse,
  PayPalCreateOrderResponse,
} from "@/types/paypal.type";
import { CheckoutRequest } from "@/validation/checkout.schema";

export async function createPaypalOrder(
  data: CheckoutRequest,
): Promise<PayPalCreateOrderResponse> {
  const res = await api.post("/checkout/paypal/create-order", data);
  return res.data;
}

// Capture PayPal order sau khi người dùng approve
export async function capturePaypalOrder(
  orderId: string,
): Promise<PayPalCaptureResponse> {
  const res = await api.post("/checkout/paypal/capture-order", {
    order_id: orderId,
  });
  return res.data;
}
