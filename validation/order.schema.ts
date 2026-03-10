import z from "zod";

export const checkoutSchema = z.object({
  cart_token: z.string().min(1, "CartToken không được để trống")
});
