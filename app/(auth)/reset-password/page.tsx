"use client";
import { ResetPasswordForm } from "@/components/form/reset-password-form";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Component để xử lý logic kiểm tra params
function ResetPasswordContent() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 p-4">
        <div className="lg:col-span-2">
          <div className="p-8 rounded-2xl bg-white shadow-lg">
            <Link href={"/"}>
              <Image
                src="/assets/images/logo.jpg"
                alt="logo"
                width={150}
                height={150}
                className="mx-auto"
              />
            </Link>
            <div className="text-center mt-4">
              <h1 className="text-2xl font-bold text-amber-700">
                Đặt lại mật khẩu
              </h1>
              <p className="text-gray-600 text-sm mt-2">
                Vui lòng nhập mật khẩu mới của bạn.
              </p>
            </div>

            <div className="mt-8">
              <ResetPasswordForm />
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-3">
          <Image
            src="/assets/images/banner-login.png"
            alt="banner-login"
            width={1920}
            height={1080}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

// Component để kiểm tra query params
function ResetPasswordChecker() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    redirect("/account/forgot-password"); // Redirect về trang chủ nếu thiếu token hoặc email
  }

  return <ResetPasswordContent />;
}

function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordChecker />
    </Suspense>
  );
}

export default ResetPasswordPage;
