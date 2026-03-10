import z from "zod";

export const CartItemOptionSchema = z.object({
  product_option_id: z
    .number()
    .int()
    .positive("ID product option không hợp lệ"),
  option_id: z.number().int().positive("ID option không hợp lệ"),
  group_name: z.string().min(1, "Tên nhóm không được để trống"),
  option_value: z.string().min(1, "Giá trị option không được để trống"),
  additional_price: z.number().min(0, "Giá thêm phải >= 0"),
});

export const AddItemPayloadSchema = z.object({
  product_id: z.number().int().positive("ID sản phẩm không hợp lệ"),
  quantity: z.number().int().min(1, "Số lượng phải >= 1"),
  options: z.array(CartItemOptionSchema).optional(),
});

export const UpdateItemPayloadSchema = z.object({
  quantity: z.number().int().min(1, "Số lượng phải > 0"),
});

export const CartItemSchema = z.object({
  product_id: z.number(),
  product_name: z.string(),
  product_sku: z.string(),
  unit_price: z.number(),
  quantity: z.number(),
  options: z.array(CartItemOptionSchema).optional(),
  image: z.string().nullable().optional(),
});

export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  count: z.number(),
  subtotal: z.number(),
});

export type CartItemOption = z.infer<typeof CartItemOptionSchema>;
export type AddItemPayload = z.infer<typeof AddItemPayloadSchema>;
export type UpdateItemPayload = z.infer<typeof UpdateItemPayloadSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
