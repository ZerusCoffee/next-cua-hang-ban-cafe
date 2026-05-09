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
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Laptop,
  Shield,
} from "lucide-react";

const securityLogs = [
  {
    id: 1,
    action: "Đăng nhập thành công",
    device: "iPhone 13 Pro",
    location: "Hà Nội, Việt Nam",
    time: "2 giờ trước",
    status: "success",
  },
  {
    id: 2,
    action: "Thay đổi mật khẩu",
    device: "MacBook Pro",
    location: "Hà Nội, Việt Nam",
    time: "3 ngày trước",
    status: "success",
  },
  {
    id: 3,
    action: "Đăng nhập thất bại",
    device: "Unknown",
    location: "Tokyo, Nhật Bản",
    time: "1 tuần trước",
    status: "warning",
  },
  {
    id: 4,
    action: "Kích hoạt xác thực 2 lớp",
    device: "iPhone 13 Pro",
    location: "Hà Nội, Việt Nam",
    time: "2 tuần trước",
    status: "success",
  },
];

export default function ActivityPage() {
  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Nhật ký hoạt động</CardTitle>
          <CardDescription>
            Theo dõi các hoạt động gần đây trên tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                <div>
                  {log.status === "success" ? (
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{log.action}</h3>
                    <Badge
                      variant="outline"
                      className={
                        log.status === "success"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                    >
                      {log.status === "success" ? "Thành công" : "Cảnh báo"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {log.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Laptop className="h-3 w-3" />
                      {log.device}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {log.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline">Xem thêm hoạt động</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Mẹo bảo mật</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Không chia sẻ mật khẩu với bất kỳ ai",
              "Sử dụng mật khẩu khác nhau cho các tài khoản",
              "Kích hoạt xác thực 2 lớp",
              "Thường xuyên kiểm tra thiết bị đăng nhập",
              "Cập nhật mật khẩu mỗi 3 tháng",
              "Không đăng nhập trên thiết bị công cộng",
            ].map((tip, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <Shield className="h-4 w-4 text-primary" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
