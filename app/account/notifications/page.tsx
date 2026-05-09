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
    console.log("Mark all as read");
  };

  const deleteAllRead = () => {
    console.log("Delete all read");
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý thông báo và cài đặt nhận thông báo
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Đánh dấu đã đọc
          </Button>
          <Button variant="outline" size="sm" onClick={deleteAllRead}>
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa đã đọc
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Notification Types Sidebar */}
        <div className="xl:col-span-1">
          <Card className="shadow-sm border-gray-200/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Loại thông báo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {notificationTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setActiveTab(type.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-sm ${
                        activeTab === type.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                      {type.count > 0 && (
                        <Badge
                          variant={type.id === "unread" ? "default" : "outline"}
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

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Bell className="h-4 w-4" />
                    <span>Tổng số</span>
                  </div>
                  <Badge variant="outline">5</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Bell className="h-4 w-4" />
                    <span>Chưa đọc</span>
                  </div>
                  <Badge variant="destructive">2</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3">
          <Tabs defaultValue="list" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">Danh sách thông báo</TabsTrigger>
              <TabsTrigger value="settings">Cài đặt thông báo</TabsTrigger>
            </TabsList>

            {/* Notifications List */}
            <TabsContent value="list" className="space-y-4 outline-none">
              <Card className="shadow-sm border-gray-200/80">
                <CardHeader>
                  <CardTitle className="text-base">Thông báo của bạn</CardTitle>
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
                          className={`p-4 rounded-lg border transition-colors ${
                            notification.read
                              ? "bg-white border-gray-100"
                              : "bg-blue-50/50 border-blue-100"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                              <Icon className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3
                                    className={`font-semibold text-sm ${!notification.read ? "text-blue-900" : "text-gray-900"}`}
                                  >
                                    {notification.title}
                                  </h3>
                                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                    {notification.description}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <Badge className="bg-blue-500 hover:bg-blue-600 text-[10px] h-5">
                                    Mới
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                <span className="text-[11px] text-gray-400">
                                  {notification.time}
                                </span>
                                <div className="flex gap-2">
                                  {!notification.read && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 text-[11px] text-blue-600 hover:text-blue-700 hover:bg-blue-100/50"
                                    >
                                      Đánh dấu đã đọc
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {filteredNotifications.length === 0 && (
                      <div className="text-center py-16">
                        <BellOff className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Không có thông báo
                        </h3>
                        <p className="text-sm text-gray-500">
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
            <TabsContent value="settings" className="outline-none">
              <Card className="shadow-sm border-gray-200/80">
                <CardHeader>
                  <CardTitle className="text-base">Cài đặt thông báo</CardTitle>
                  <CardDescription>
                    Tùy chỉnh cách bạn nhận thông báo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* General Settings */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Cài đặt chung
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">
                              Thông báo qua email
                            </p>
                            <p className="text-xs text-gray-500">
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
                            <p className="text-sm font-medium">Thông báo đẩy</p>
                            <p className="text-xs text-gray-500">
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
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Loại thông báo
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <Package className="h-4 w-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                Cập nhật đơn hàng
                              </p>
                              <p className="text-xs text-gray-500">
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
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <Tag className="h-4 w-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                Khuyến mãi & Ưu đãi
                              </p>
                              <p className="text-xs text-gray-500">
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
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <Shield className="h-4 w-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                Cảnh báo bảo mật
                              </p>
                              <p className="text-xs text-gray-500">
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
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <Mail className="h-4 w-4 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Bản tin</p>
                              <p className="text-xs text-gray-500">
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
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        Tần suất thông báo
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button className="flex flex-col items-start p-3 border rounded-lg text-left bg-primary/5 border-primary">
                          <p className="text-sm font-medium text-primary">
                            Ngay lập tức
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            Nhận ngay khi có sự kiện
                          </p>
                        </button>
                        <button className="flex flex-col items-start p-3 border rounded-lg text-left hover:bg-gray-50 transition-colors">
                          <p className="text-sm font-medium">Hàng ngày</p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            Tổng hợp một lần mỗi ngày
                          </p>
                        </button>
                        <button className="flex flex-col items-start p-3 border rounded-lg text-left hover:bg-gray-50 transition-colors">
                          <p className="text-sm font-medium">Hàng tuần</p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            Tổng hợp một lần mỗi tuần
                          </p>
                        </button>
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
  );
}
