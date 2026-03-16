import api from "@/config/axios";
import { AddItemPayload } from "@/validation/cart.schema";
import { AxiosError } from "axios";

export async function addItemToCart(payload: AddItemPayload) {
  return api
    .post("/cart/add", payload)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function updateItemQuantity(itemKey: string, quantity: number) {
  return api
    .put(`/cart/item/${itemKey}`, { quantity })
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function removeItemFromCart(itemKey: string) {
  return api
    .delete(`/cart/item/${itemKey}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function clearCart() {
  return api
    .delete("/cart")
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}
