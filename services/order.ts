import api from "@/config/axios";
import { AxiosError } from "axios";

export async function getOrderDetail(orderNumber: string) {
  return api
    .get(`/order/${orderNumber}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function cancelOrder(orderNumber: string) {
  return api
    .delete(`/order/cancel/${orderNumber}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}
