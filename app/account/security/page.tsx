"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CheckCircle, Clock, Lock, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <div className="space-y-6 pt-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Bảo mật tài khoản</h1>
        <p className="text-sm text-gray-500 mt-1 ml-2">
          Quản lý bảo mật và hoạt động đăng nhập
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Security Score */}
          <Card className="shadow-sm border-gray-200/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4 text-primary" />
                Điểm bảo mật
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-primary/20 relative mb-3">
                  <span className="text-2xl font-bold">85%</span>
                </div>
                <p className="text-xs text-gray-500">
                  Tốt - Bạn đã bảo vệ tốt tài khoản
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 2FA Status */}
          <Card className="shadow-sm border-gray-200/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Lock className="h-4 w-4 text-primary" />
                Xác thực 2 lớp
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Đã bật</p>
                      <p className="text-[10px] text-gray-500">
                        Qua ứng dụng xác thực
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs h-9"
                >
                  Quản lý xác thực 2 lớp
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-sm border-gray-200/80">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-primary" />
                Hoạt động gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">1 cảnh báo mới</p>
                      <p className="text-[10px] text-gray-500">
                        Đăng nhập thất bại
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 text-[10px] hover:bg-yellow-100 border-0 h-5">
                    Mới
                  </Badge>
                </div>
                <Link
                  href="/account/security/activity"
                  passHref
                  className="block w-full"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-9"
                  >
                    Xem tất cả hoạt động
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Recommendations */}
        <Card className="shadow-sm border-gray-200/80">
          <CardHeader>
            <CardTitle className="text-base">Đề xuất bảo mật</CardTitle>
            <CardDescription className="text-xs">
              Các bước để tăng cường bảo mật tài khoản
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  title: "Cập nhật mật khẩu",
                  description: "Đã 90 ngày chưa đổi mật khẩu",
                  status: "warning",
                  action: "Đổi ngay",
                  link: "/account/security/change-password",
                },
                {
                  title: "Xem lại thiết bị đăng nhập",
                  description: "Có thiết bị đăng nhập từ vị trí lạ",
                  status: "warning",
                  action: "Kiểm tra",
                  link: "/account/security/devices",
                },
                {
                  title: "Thêm số điện thoại khôi phục",
                  description: "Chưa thêm số điện thoại khôi phục",
                  status: "info",
                  action: "Thêm",
                  link: "/account",
                },
              ].map((rec, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-50 rounded-lg hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                      {rec.status === "warning" ? (
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <Shield className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{rec.title}</h3>
                      <p className="text-[11px] text-gray-500">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                  <Link href={rec.link} passHref>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      {rec.action}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
