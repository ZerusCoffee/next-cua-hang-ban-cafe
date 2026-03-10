"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateAddress, useProvinces, useWards } from "@/services/address";
import { Address } from "@/types/address.type";
import { AddressFormData, addressSchema } from "@/validation/address.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

interface EditAddressDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingAddress: Address;
  onSuccess: () => void;
}

export default function EditAddressDialog({
  isOpen,
  onOpenChange,
  editingAddress,
  onSuccess,
}: EditAddressDialogProps) {
  const { provinces, isLoading: isLoadingProvinces } = useProvinces();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      is_default: editingAddress?.is_default || false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
  } = form;

  const selectedProvinceName = useWatch({ control, name: "province" });
  const selectedWard = useWatch({ control, name: "ward" });
  const isDefault = useWatch({ control, name: "is_default" });

  // Lấy giá trị ban đầu của is_default từ editingAddress
  const initialIsDefault = editingAddress?.is_default || false;

  const provinceCode = provinces?.find(
    (p) => p.name === selectedProvinceName,
  )?.code;
  const { wards, isLoading: isLoadingWards } = useWards(provinceCode);

  const onSubmit = async (data: AddressFormData) => {
    const res = await updateAddress(data, editingAddress.id);
    if (res.status === "success") {
      toast.success("Cập nhật địa chỉ thành công!");
      onOpenChange(false);
      onSuccess();
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    if (editingAddress) {
      reset({
        full_name: editingAddress.full_name,
        phone: editingAddress.phone,
        province: editingAddress.province,
        ward: editingAddress.ward,
        details: editingAddress.details,
        is_default: editingAddress.is_default,
      });
    }
  }, [editingAddress, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa địa chỉ</DialogTitle>
          <DialogDescription>
            Cập nhật địa chỉ giao hàng của bạn
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormLabel>Họ và tên *</FormLabel>
                <Input
                  placeholder="Nguyễn Văn A"
                  {...register("full_name")}
                  disabled={isSubmitting}
                />
                {errors.full_name && (
                  <p className="text-sm text-red-500">
                    {errors.full_name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <FormLabel>Số điện thoại *</FormLabel>
                <Input
                  placeholder="0987654321"
                  {...register("phone")}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormLabel>Tỉnh/Thành phố *</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setValue("province", value);
                    setValue("ward", "");
                  }}
                  value={selectedProvinceName}
                  disabled={isSubmitting || isLoadingProvinces}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isLoadingProvinces
                          ? "Đang tải..."
                          : "Chọn tỉnh/thành phố"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces?.map((province) => (
                      <SelectItem key={province.code} value={province.name}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.province && (
                  <p className="text-sm text-red-500">
                    {errors.province.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <FormLabel>Phường/Xã *</FormLabel>
                <Select
                  onValueChange={(value) => setValue("ward", value)}
                  value={selectedWard}
                  disabled={
                    isSubmitting || !selectedProvinceName || isLoadingWards
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        !selectedProvinceName
                          ? "Chọn tỉnh trước"
                          : isLoadingWards
                            ? "Đang tải..."
                            : "Chọn phường/xã"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {wards?.map((ward) => (
                      <SelectItem key={ward.code} value={ward.name}>
                        {ward.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ward && (
                  <p className="text-sm text-red-500">{errors.ward.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel>Địa chỉ chi tiết *</FormLabel>
              <Textarea
                placeholder="Số nhà, tên đường, tòa nhà..."
                className="resize-none"
                {...register("details")}
                disabled={isSubmitting}
              />
              {errors.details && (
                <p className="text-sm text-red-500">{errors.details.message}</p>
              )}
            </div>

            {initialIsDefault ? (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base text-blue-700">
                      Địa chỉ mặc định
                    </FormLabel>
                    <p className="text-sm text-blue-600">
                      Đây là địa chỉ mặc định hiện tại. Để thay đổi, vui lòng
                      đặt một địa chỉ khác làm mặc định.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={initialIsDefault}
                      disabled
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Đặt làm địa chỉ mặc định
                  </FormLabel>
                  <p className="text-sm text-gray-500">
                    Sử dụng địa chỉ này làm mặc định
                  </p>
                </div>
                <Switch
                  checked={isDefault}
                  onCheckedChange={(checked) => setValue("is_default", checked)}
                  disabled={isSubmitting}
                  className="data-[state=checked]:bg-green-600"
                />
              </div>
            )}

            {errors.root && (
              <p className="text-sm text-red-500">{errors.root.message}</p>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
