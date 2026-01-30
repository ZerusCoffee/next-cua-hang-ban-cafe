"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile, useUser } from "@/services/user";
import {
  UpdateProfileFormData,
  updateProfileSchema,
} from "@/validation/userSchema";
import { useEffect } from "react";

export function UpdateProfileForm() {
  const { user, mutate } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<UpdateProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      console.log("Resetting form with user data:", user);
      reset({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UpdateProfileFormData) => {
    const res = await updateProfile(data);
    if (res.status === "success") {
      toast.success("Cập nhật thông tin thành công", {
        description: "Thông tin cá nhân của bạn đã được cập nhật",
      });
      await mutate();
      reset({ name: data.name, phone: data.phone || "" });
    } else {
      toast.error("Cập nhật thất bại", {
        description: res?.message || "Vui lòng thử lại sau",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label className="text-base font-medium">Họ và tên</label>
        <p className="text-sm text-muted-foreground">
          Tên này sẽ được hiển thị trong hồ sơ và đơn hàng của bạn
        </p>
        <Input
          placeholder="Nhập họ và tên của bạn"
          {...register("name")}
          className="h-11 text-base"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-sm font-medium text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label className="text-base font-medium">Số điện thoại</label>
        <p className="text-sm text-muted-foreground">
          Số điện thoại dùng để nhận thông báo và hỗ trợ đơn hàng
        </p>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Nhập số điện thoại"
            {...register("phone")}
            className="h-11 text-base pl-10"
            disabled={isSubmitting}
          />
        </div>
        {errors.phone && (
          <p className="text-sm font-medium text-destructive">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          {isDirty && "Bạn có thay đổi chưa được lưu"}
        </div>
        <Button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="min-w-30"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang lưu...
            </>
          ) : (
            "Lưu thay đổi"
          )}
        </Button>
      </div>
    </form>
  );
}
