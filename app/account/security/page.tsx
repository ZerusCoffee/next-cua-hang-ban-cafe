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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CheckCircle, Clock, Lock, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bảo mật tài khoản
              </h1>
              <p className="text-gray-600 mt-2">
                Quản lý bảo mật và hoạt động đăng nhập
              </p>
            </div>
          </div>
          <Separator />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Security Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Điểm bảo mật
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-primary/20 relative mb-4">
                    <span className="text-3xl font-bold">85%</span>
                  </div>
                  <p className="text-gray-600">
                    Tốt - Bạn đã bảo vệ tốt tài khoản
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 2FA Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Xác thực 2 lớp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Đã bật</p>
                        <p className="text-sm text-gray-500">
                          Qua ứng dụng xác thực
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    Quản lý xác thực 2 lớp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Hoạt động gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">1 cảnh báo mới</p>
                        <p className="text-sm text-gray-500">
                          Đăng nhập thất bại
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Mới</Badge>
                  </div>
                  <Link href="/account/security/activity" passHref>
                    <Button variant="outline" className="w-full">
                      Xem tất cả hoạt động
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Đề xuất bảo mật</CardTitle>
              <CardDescription>
                Các bước để tăng cường bảo mật tài khoản
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
                    link: "/account/profile", // Assuming a profile page exists
                  },
                ].map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {rec.status === "warning" ? (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <Shield className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{rec.title}</h3>
                        <p className="text-sm text-gray-600">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                    <Link href={rec.link} passHref>
                      <Button variant="outline" size="sm">
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
    </div>
  );
}
