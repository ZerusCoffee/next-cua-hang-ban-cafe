"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setJWTtoCookie } from "@/lib/cookie";
import { cn } from "@/lib/utils";
import { register } from "@/services/auth";
import { useUser } from "@/services/user";
import { registerSchema } from "@/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AddressFormData, addressSchema } from "@/validation/address.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { createAddress, useProvinces, useWards } from "@/services/address";

type RegisterFormData = z.infer<typeof registerSchema> & Omit<AddressFormData, 'full_name' | 'is_default'>

const formSchema = registerSchema.merge(addressSchema).omit({
  full_name: true,
  is_default: true
})

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { mutate } = useUser();

  const { provinces, isLoading: isLoadingProvinces } = useProvinces();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      province: "",
      ward: "",
      details: "",
    },
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
    watch,
    setValue,
  } = form;

  // Theo dõi tỉnh để lấy danh sách phường/xã
  const selectedProvinceName = watch("province");
  const provinceCode = provinces?.find(
    (p) => p.name === selectedProvinceName,
  )?.code;
  const { wards, isLoading: isLoadingWards } = useWards(provinceCode);

  const onSubmit = async (data: RegisterFormData) => {
    const registerRes = await register(data);

    // console.log(data)

    if (registerRes.status === "success" && registerRes.data?.access_token) {

      await setJWTtoCookie(registerRes.data.access_token);
      mutate({ data: registerRes.data.customer }, { revalidate: false });
      router.push("/");
      toast.success(registerRes.message);
      await createAddress({
        full_name: data.name,
        phone: data.phone,
        province: data.province,
        ward: data.ward,
        details: data.details,
        is_default: true
      });
      // console.log("Tao dia chi thanh cong")
      return;
    }

    if (registerRes.status === "error") {
      // Xử lý errors mới từ response
      if (registerRes.errors) {
        Object.keys(registerRes.errors).forEach((field) => {
          const fieldName = field as keyof RegisterFormData;
          const errorMessages = registerRes.errors?.[field];

          if (errorMessages && errorMessages.length > 0) {
            form.setError(fieldName, {
              type: "manual",
              message: errorMessages.join(", "),
            });
          }
        });
      }

      // Hiển thị thông báo lỗi chung
      toast.error(registerRes.message || "Đăng ký thất bại", {
        description: "Vui lòng kiểm tra lại thông tin đã nhập.",
      });
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(
              onSubmit,
              (errors) => {
                console.log("ERRORS:", errors)
              }
            )} className="space-y-5" >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Grid column 1 */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Họ và tên</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Nhập họ và tên của bạn"
                            className="h-11"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="example@email.com"
                            className="h-11"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Mật khẩu</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="••••••••"
                            className="h-11"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Xác nhận mật khẩu
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="••••••••"
                            className="h-11"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Grid column2 */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0987654321"
                            {...field}
                            disabled={isSubmitting}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
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
                            <SelectTrigger className="w-full h-11!">
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
                    control={form.control}
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
                            <SelectTrigger className="w-full h-11!">
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

                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ chi tiết *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Số nhà, tên đường..."
                            className="h-11!"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <Button
                  type="submit"
                  className="w-[90%] h-11 text-base font-medium mx-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                </Button>
              </div>

              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm">
                  Đã có tài khoản?{" "}
                  <a
                    href="/account/login"
                    className="text-amber-700 hover:text-amber-800 font-medium p-0 h-auto underline"
                  >
                    Đăng nhập ngay
                  </a>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
