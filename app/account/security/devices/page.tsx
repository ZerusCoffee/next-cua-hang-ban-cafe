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
import { Laptop, LogOut, Smartphone } from "lucide-react";

// Mock data, should be replaced with API call
const loginDevices = [
  {
    id: 1,
    device: "iPhone 13 Pro",
    os: "iOS 16.1",
    browser: "Safari",
    location: "Hà Nội, Việt Nam",
    lastActive: "2 giờ trước",
    current: true,
    trusted: true,
  },
  {
    id: 2,
    device: "MacBook Pro",
    os: "macOS 13.0",
    browser: "Chrome 120",
    location: "Hà Nội, Việt Nam",
    lastActive: "1 ngày trước",
    current: false,
    trusted: true,
  },
  {
    id: 3,
    device: "Windows Desktop",
    os: "Windows 11",
    browser: "Firefox 121",
    location: "TP. Hồ Chí Minh",
    lastActive: "1 tuần trước",
    current: false,
    trusted: false,
  },
];

export default function DevicesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thiết bị đăng nhập</CardTitle>
        <CardDescription>
          Quản lý các thiết bị đã đăng nhập vào tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loginDevices.map((device) => (
            <div
              key={device.id}
              className="p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {device.device.includes("iPhone") ? (
                      <Smartphone className="h-5 w-5" />
                    ) : device.device.includes("Mac") ? (
                      <Laptop className="h-5 w-5" />
                    ) : (
                      <Laptop className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{device.device}</h3>
                      {device.current && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Hiện tại
                        </Badge>
                      )}
                      {device.trusted && (
                        <Badge className="bg-green-100 text-green-800">
                          Tin cậy
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {device.browser} • {device.os}
                    </p>
                    <p className="text-sm text-gray-500">{device.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{device.lastActive}</p>
                  {!device.current && (
                    <Button variant="outline" size="sm" className="mt-2">
                      Đăng xuất
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Đăng xuất khỏi tất cả thiết bị</h3>
            <p className="text-sm text-gray-600">
              Đăng xuất khỏi tất cả thiết bị ngoại trừ thiết bị hiện tại
            </p>
          </div>
          <Button variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất tất cả
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
