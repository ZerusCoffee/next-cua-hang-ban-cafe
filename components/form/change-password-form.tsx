"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { changePassword } from "@/services/user";
import { changePasswordSchema } from "@/validation/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
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

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps extends React.ComponentProps<"div"> {
  onSuccess?: () => void;
}

export function ChangePasswordForm({
  className,
  onSuccess,
  ...props
}: ChangePasswordFormProps) {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ChangePasswordFormData) => {
    const res = await changePassword(data);
    if (res.status === "success") {
      toast.success("Đổi mật khẩu thành công");
      onSuccess?.();
      form.reset();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="current_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Mật khẩu hiện tại
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      className="h-11 focus-visible:ring-[#D94E28]"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      className="h-11 focus-visible:ring-[#D94E28]"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Xác nhận mật khẩu mới
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      className="h-11 focus-visible:ring-[#D94E28]"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 text-base font-bold uppercase tracking-widest bg-[#D94E28] hover:bg-[#BF4423] shadow-lg shadow-orange-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Đổi mật khẩu"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
