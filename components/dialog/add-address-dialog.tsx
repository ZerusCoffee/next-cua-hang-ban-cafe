"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { createAddress, useProvinces, useWards } from "@/services/address";
import { AddressFormData, addressSchema } from "@/validation/addressSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddAddressDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function AddAddressDialog({
  isOpen,
  onOpenChange,
  onSuccess,
}: AddAddressDialogProps) {
  const { provinces, isLoading: isLoadingProvinces } = useProvinces();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      province: "",
      ward: "",
      details: "",
      is_default: false,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = form;

  // Theo dõi tỉnh để lấy danh sách phường/xã
  const selectedProvinceName = watch("province");
  const provinceCode = provinces?.find(
    (p) => p.name === selectedProvinceName,
  )?.code;
  const { wards, isLoading: isLoadingWards } = useWards(provinceCode);

  // Reset form khi đóng/mở dialog
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: AddressFormData) => {
    try {
      const res = await createAddress(data);
      if (res.status === "success") {
        toast.success("Thêm địa chỉ thành công!");
        onSuccess(); // Load lại danh sách địa chỉ ở trang cha
        onOpenChange(false); // Đóng dialog
      } else {
        toast.error(res.message || "Không thể thêm địa chỉ");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi, vui lòng thử lại");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm địa chỉ mới</DialogTitle>
          <DialogDescription>
            Thêm địa chỉ giao hàng mới để thuận tiện cho việc mua sắm
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nguyễn Văn A"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0987654321"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố *</FormLabel>
                    <Select
                      disabled={isSubmitting || isLoadingProvinces}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setValue("ward", ""); // Reset phường khi đổi tỉnh
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              isLoadingProvinces
                                ? "Đang tải..."
                                : "Chọn tỉnh/thành phố"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces?.map((p) => (
                          <SelectItem key={p.code} value={p.name}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phường/Xã *</FormLabel>
                    <Select
                      disabled={
                        isSubmitting || !selectedProvinceName || isLoadingWards
                      }
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
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
                      </FormControl>
                      <SelectContent>
                        {wards?.map((w) => (
                          <SelectItem key={w.code} value={w.name}>
                            {w.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ chi tiết *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Số nhà, tên đường..."
                      className="resize-none"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="is_default"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4 space-y-0">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Đặt làm địa chỉ mặc định
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Sử dụng địa chỉ này cho lần mua sau
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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
                {isSubmitting ? "Đang xử lý..." : "Thêm địa chỉ"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
