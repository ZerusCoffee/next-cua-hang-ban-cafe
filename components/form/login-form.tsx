"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { setJWTtoCookie } from "@/lib/cookie";
import { login } from "@/services/auth";
import { useUser } from "@/services/user";
import { LoginFormData, loginSchema } from "@/validation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ButtonLoginGoogle } from "../button/button-login-google";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { mutate } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: LoginFormData) => {
    const res = await login(data);
    if (res.status === "success" && res.data?.access_token) {
      await setJWTtoCookie(res.data.access_token);
      toast.success(res.message);
      router.push("/");
      mutate();
      return;
    } else {
      toast.error(res.message);
      setError("password", {
        type: "manual",
        message: res.message,
      });
      return;
    }
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-6">
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          <ButtonLoginGoogle />
        </GoogleOAuthProvider>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Hoặc đăng nhập bằng
          </span>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            {...register("email")}
            placeholder="example@yahoo.com"
          />
          <div>
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu</Label>
            <Link
              href="/account/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline text-amber-700"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="******"
          />
          <div>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Chưa có tài khoản?{" "}
        <a
          href="/account/register"
          className="hover:underline underline-offset-4 text-amber-700"
        >
          Đăng ký
        </a>
      </div>
    </form>
  );
}
