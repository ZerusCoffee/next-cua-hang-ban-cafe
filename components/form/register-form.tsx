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

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { mutate } = useUser();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: RegisterFormData) => {
    const res = await register(data);

    if (res.status === "success" && res.data?.access_token) {
      await setJWTtoCookie(res.data.access_token);
      toast.success(res.message);
      router.push("/");
      mutate();
      return;
    }

    if (res.status === "error") {
      // Xử lý errors mới từ response
      if (res.errors) {
        Object.keys(res.errors).forEach((field) => {
          const fieldName = field as keyof RegisterFormData;
          const errorMessages = res.errors?.[field];

          if (errorMessages && errorMessages.length > 0) {
            form.setError(fieldName, {
              type: "manual",
              message: errorMessages.join(", "),
            });
          }
        });
      }

      // Hiển thị thông báo lỗi chung
      toast.error(res.message || "Đăng ký thất bại", {
        description: "Vui lòng kiểm tra lại thông tin đã nhập.",
      });
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

                <Button
                  type="submit"
                  className="w-full h-11 text-base font-medium"
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
