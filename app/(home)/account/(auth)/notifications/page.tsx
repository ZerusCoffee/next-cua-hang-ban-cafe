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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  BellOff,
  CheckCheck,
  CreditCard,
  Mail,
  MessageSquare,
  Package,
  Settings,
  Shield,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const notifications = [
  {
    id: 1,
    title: "Đơn hàng đã được giao",
    description: "Đơn hàng #ORD-2024-001 đã được giao thành công",
    time: "2 giờ trước",
    type: "order" as const,
    read: false,
    icon: Package,
  },
  {
    id: 2,
    title: "Khuyến mãi mới",
    description: "Giảm 30% cho tất cả sản phẩm điện tử",
    time: "5 giờ trước",
    type: "promotion" as const,
    read: false,
    icon: Tag,
  },
  {
    id: 3,
    title: "Thanh toán thành công",
    description: "Thanh toán cho đơn hàng #ORD-2024-002 đã thành công",
    time: "1 ngày trước",
    type: "payment" as const,
    read: true,
    icon: CreditCard,
  },
  {
    id: 4,
    title: "Bảo mật tài khoản",
    description: "Có thiết bị mới đăng nhập vào tài khoản của bạn",
    time: "2 ngày trước",
    type: "security" as const,
    read: true,
    icon: Shield,
  },
  {
    id: 5,
    title: "Phản hồi từ cửa hàng",
    description: "Cửa hàng đã phản hồi đánh giá của bạn",
    time: "3 ngày trước",
    type: "feedback" as const,
    read: true,
    icon: MessageSquare,
  },
];

const notificationTypes = [
  { id: "all", label: "Tất cả", icon: Bell, count: 5 },
  { id: "unread", label: "Chưa đọc", icon: Bell, count: 2 },
  { id: "order", label: "Đơn hàng", icon: Package, count: 1 },
  { id: "promotion", label: "Khuyến mãi", icon: Tag, count: 1 },
  { id: "payment", label: "Thanh toán", icon: CreditCard, count: 1 },
  { id: "security", label: "Bảo mật", icon: Shield, count: 1 },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "order":
      return Package;
    case "promotion":
      return Tag;
    case "payment":
      return CreditCard;
    case "security":
      return Shield;
    case "feedback":
      return MessageSquare;
    default:
      return Bell;
  }
};

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    securityAlerts: true,
    newsletter: false,
  });

  const [activeTab, setActiveTab] = useState("all");

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notif.read;
    return notif.type === activeTab;
  });

  const markAllAsRead = () => {
    // Logic to mark all as read
    console.log("Mark all as read");
  };

  const deleteAllRead = () => {
    // Logic to delete all read notifications
    console.log("Delete all read");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Thông báo</h1>
              <p className="text-gray-600 mt-2">
                Quản lý thông báo và cài đặt nhận thông báo
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Đánh dấu đã đọc
              </Button>
              <Button variant="outline" onClick={deleteAllRead}>
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa đã đọc
              </Button>
            </div>
          </div>
          <Separator />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Notification Types Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Loại thông báo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {notificationTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setActiveTab(type.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          activeTab === type.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                        {type.count > 0 && (
                          <Badge
                            variant={
                              type.id === "unread" ? "default" : "outline"
                            }
                            className={
                              type.id === "unread"
                                ? "bg-primary"
                                : "bg-gray-100 text-gray-700"
                            }
                          >
                            {type.count}
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Tổng số thông báo
                      </span>
                    </div>
                    <Badge>5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span className="text-sm font-medium">Chưa đọc</span>
                    </div>
                    <Badge variant="destructive">2</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="list" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">Danh sách thông báo</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt thông báo</TabsTrigger>
              </TabsList>

              {/* Notifications List */}
              <TabsContent value="list" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông báo của bạn</CardTitle>
                    <CardDescription>
                      {filteredNotifications.length} thông báo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => {
                        const Icon = getNotificationIcon(notification.type);
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 rounded-lg border ${
                              notification.read
                                ? "bg-white"
                                : "bg-blue-50 border-blue-200"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="font-semibold">
                                      {notification.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {notification.description}
                                    </p>
                                  </div>
                                  {!notification.read && (
                                    <Badge className="bg-blue-100 text-blue-800">
                                      Mới
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                  <span className="text-sm text-gray-500">
                                    {notification.time}
                                  </span>
                                  <div className="flex gap-2">
                                    {!notification.read && (
                                      <Button size="sm" variant="outline">
                                        Đánh dấu đã đọc
                                      </Button>
                                    )}
                                    <Button size="sm" variant="outline">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Empty State */}
                      {filteredNotifications.length === 0 && (
                        <div className="text-center py-12">
                          <BellOff className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Không có thông báo
                          </h3>
                          <p className="text-gray-500">
                            {activeTab === "unread"
                              ? "Bạn đã đọc tất cả thông báo"
                              : "Chưa có thông báo nào"}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Cài đặt thông báo</CardTitle>
                    <CardDescription>
                      Tùy chỉnh cách bạn nhận thông báo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* General Settings */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Cài đặt chung
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Thông báo qua email</p>
                              <p className="text-sm text-gray-500">
                                Nhận thông báo qua email đăng ký
                              </p>
                            </div>
                            <Switch
                              checked={settings.emailNotifications}
                              onCheckedChange={(checked) =>
                                setSettings({
                                  ...settings,
                                  emailNotifications: checked,
                                })
                              }
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Thông báo đẩy</p>
                              <p className="text-sm text-gray-500">
                                Hiển thị thông báo trên trình duyệt
                              </p>
                            </div>
                            <Switch
                              checked={settings.pushNotifications}
                              onCheckedChange={(checked) =>
                                setSettings({
                                  ...settings,
                                  pushNotifications: checked,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Notification Types */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Loại thông báo
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Package className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="font-medium">Cập nhật đơn hàng</p>
                                <p className="text-sm text-gray-500">
                                  Thông báo về trạng thái đơn hàng
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.orderUpdates}
                              onCheckedChange={(checked) =>
                                setSettings({
                                  ...settings,
                                  orderUpdates: checked,
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Tag className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="font-medium">
                                  Khuyến mãi & Ưu đãi
                                </p>
                                <p className="text-sm text-gray-500">
                                  Thông báo về chương trình khuyến mãi
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.promotions}
                              onCheckedChange={(checked) =>
                                setSettings({
                                  ...settings,
                                  promotions: checked,
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Shield className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="font-medium">Cảnh báo bảo mật</p>
                                <p className="text-sm text-gray-500">
                                  Thông báo về hoạt động đăng nhập
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.securityAlerts}
                              onCheckedChange={(checked) =>
                                setSettings({
                                  ...settings,
                                  securityAlerts: checked,
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Mail className="h-5 w-5 text-gray-400" />
                              <div>
                                <p className="font-medium">Bản tin</p>
                                <p className="text-sm text-gray-500">
                                  Nhận bản tin định kỳ qua email
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings.newsletter}
                              onCheckedChange={(checked) =>
                                setSettings({
                                  ...settings,
                                  newsletter: checked,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Notification Frequency */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Tần suất thông báo
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">Ngay lập tức</p>
                              <p className="text-sm text-gray-500">
                                Nhận thông báo ngay khi có sự kiện
                              </p>
                            </div>
                            <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary"></div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">Hàng ngày</p>
                              <p className="text-sm text-gray-500">
                                Tổng hợp thông báo một lần mỗi ngày
                              </p>
                            </div>
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">Hàng tuần</p>
                              <p className="text-sm text-gray-500">
                                Tổng hợp thông báo một lần mỗi tuần
                              </p>
                            </div>
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button>
                          <Settings className="h-4 w-4 mr-2" />
                          Lưu cài đặt
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
