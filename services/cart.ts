import api from "@/config/axios";
import { AddItemPayload, Cart } from "@/validation/cart.schema";
import { AxiosError } from "axios";
import useSWR from "swr";

export function useCart() {
  const { data, error, isLoading, mutate } = useSWR(`/cart`);
  return { cart: data?.data as Cart, error, isLoading, mutate };
}

export async function addItemToCart(payload: AddItemPayload) {
  return api
    .post("/cart/items", payload)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function updateItemQuantity(itemKey: string, quantity: number) {
  return api
    .patch(`/cart/items/${itemKey}`, { quantity })
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function removeItemFromCart(itemKey: string) {
  return api
    .delete(`/cart/items/${itemKey}`)
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}

export async function clearCart() {
  return api
    .delete("/cart")
    .then((res) => res.data)
    .catch((error: AxiosError) => error.response?.data);
}
