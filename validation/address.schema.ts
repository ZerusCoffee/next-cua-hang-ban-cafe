// validation/addressSchema.ts
import { z } from "zod";

export const addressSchema = z.object({
  full_name: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(255, "Họ tên không quá 255 ký tự"),
  phone: z
    .string()
    .regex(/^(0|\+84)(\d{9,10})$/, "Số điện thoại không hợp lệ")
    .max(10, "Số điện thoại không quá 10 số"),
  details: z
    .string()
    .min(5, "Địa chỉ chi tiết quá ngắn")
    .max(500, "Địa chỉ chi tiết không quá 500 ký tự"),
  province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  is_default: z.boolean(),
});

export type AddressFormData = z.infer<typeof addressSchema>;
