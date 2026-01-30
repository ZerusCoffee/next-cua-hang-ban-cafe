import z from "zod";

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(6, "Mật khẩu phải từ 6 ký tự"),
    new_password: z.string().min(6, "Mật khẩu mới phải từ 6 ký tự"),
    new_password_confirmation: z
      .string()
      .min(6, "Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["new_password_confirmation"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Tên phải từ 2 ký tự"),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .optional()
    .or(z.literal("")),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
