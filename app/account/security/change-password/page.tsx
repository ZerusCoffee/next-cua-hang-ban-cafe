"use client";
import { ChangePasswordForm } from "@/components/form/change-password-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ChangePasswordPage() {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center gap-4">
        {" "}
        <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
          <Link href="/account/security">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Đổi mật khẩu</h1>
      </div>

      <div className="max-w-md">
        <Card className="shadow-lg border-gray-200/80">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Cập nhật mật khẩu</CardTitle>
            <CardDescription className="text-xs">
              Đảm bảo mật khẩu của bạn mạnh để bảo vệ tài khoản tốt nhất.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
