import api from "@/config/axios";
import {
  CheckoutRequest,
  CheckoutResponse,
} from "@/validation/checkout.schema";
import { AxiosError } from "axios";

export async function CheckOut(
  data: CheckoutRequest,
): Promise<CheckoutResponse> {
  return api
    .post("/checkout", data)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function cancelOrder(orderNumber: string): Promise<void> {
  return api.delete(`/checkout/cancel/${orderNumber}`);
}
