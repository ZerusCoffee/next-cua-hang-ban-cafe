"use client";

import { UpdateProfileForm } from "@/components/form/update-profile-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { useUser } from "@/services/user";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import dayjs from "dayjs";
import {
  Bell,
  Camera,
  CheckCircle,
  Clock,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AccountPage() {
  const { user } = useUser();

  const handleAvatarClick = () => {
    toast.info("Avatar clicked - open file picker"); // Sai react-dropzone
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-linear-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="cursor-pointer" onClick={handleAvatarClick}>
                  <Avatar className="h-20 w-20 border-4 border-white/30 group-hover:border-blue-400 transition-all duration-200">
                    <AvatarImage
                      src={user?.avatar || "/assets/svg/default-avatar.png"}
                    />
                  </Avatar>

                  {/* Overlay khi hover */}
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {user?.name || "Người dùng"}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  {user?.email_verified_at ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-500 text-white border-0"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Tài khoản đã xác thực
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-500 text-white border-0"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Chưa xác thực
                    </Badge>
                  )}
                  {user?.created_at && (
                    <Badge
                      variant="secondary"
                      className=" bg-blue-500 text-white border-0"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Thành viên từ {dayjs(user.created_at).format("MM/YYYY")}
                    </Badge>
                  )}
                  {user?.updated_at && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-500 text-white border-0"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Cập nhật lần cuối{" "}
                      {dayjs(user?.updated_at).format("DD/MM/YYYY")}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border shadow-lg">
              <CardContent className="p-6">
                <nav className="space-y-1">
                  <Link
                    href="/account"
                    className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary font-medium"
                  >
                    <User className="h-5 w-5" />
                    Thông tin cá nhân
                  </Link>

                  <Link
                    href="/account/orders"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    <Package className="h-5 w-5" />
                    Đơn hàng của tôi
                    <Badge className="ml-auto bg-primary">3</Badge>
                  </Link>

                  <Link
                    href="/account/address"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    <MapPin className="h-5 w-5" />
                    Sổ địa chỉ
                  </Link>

                  <Link
                    href="/account/payment"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    <CreditCard className="h-5 w-5" />
                    Phương thức thanh toán
                  </Link>

                  <Link
                    href="/account/notifications"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    Thông báo
                    <Badge variant="destructive" className="ml-auto">
                      5
                    </Badge>
                  </Link>

                  <Link
                    href="/account/security"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    <Shield className="h-5 w-5" />
                    Bảo mật
                  </Link>
                </nav>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">
                      Mức độ hoàn thiện hồ sơ
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      75% đã hoàn thành
                    </p>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/help">Trung tâm trợ giúp</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <Card className="border shadow-lg overflow-hidden">
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Xin chào, {user?.name || "bạn"}! 👋
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Cập nhật thông tin của bạn để có trải nghiệm mua sắm tốt
                      nhất
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Hôm nay là</p>
                      <p className="text-lg font-semibold">
                        {format(new Date(), "EEEE, dd/MM/yyyy", { locale: vi })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Card */}
              <Card className="border shadow-lg">
                <CardHeader className="bg-linear-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        Thông tin cá nhân
                      </CardTitle>
                      <CardDescription>
                        Quản lý thông tin cá nhân của bạn
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-gray-500">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        {user?.email_verified_at ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            Đã xác thực
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700"
                          >
                            Chưa xác thực
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <UpdateProfileForm />
                  </div>
                </CardContent>
              </Card>

              {/* Security & Address Quick Actions */}
              <div className="space-y-6">
                {/* Address Card */}
                <Card className="border shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle>Địa chỉ giao hàng</CardTitle>
                          <CardDescription>
                            Thêm địa chỉ nhận hàng
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">0 địa chỉ</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                      <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 mb-4">
                        Bạn chưa thêm địa chỉ giao hàng nào
                      </p>
                      <Button className="w-full" asChild>
                        <Link href="/account/address/new">
                          <MapPin className="h-4 w-4 mr-2" />
                          Thêm địa chỉ mới
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Card */}
                <Card className="border shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle>Bảo mật tài khoản</CardTitle>
                        <CardDescription>
                          Bảo vệ tài khoản của bạn
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Mật khẩu</h4>
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-700"
                          >
                            Cần cập nhật
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Đã 90 ngày chưa đổi mật khẩu
                        </p>
                        <Button className="w-full" variant="outline" asChild>
                          <Link href="/account/security/change-password">
                            <Shield className="h-4 w-4 mr-2" />
                            Đổi mật khẩu ngay
                          </Link>
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          className="h-auto py-3"
                          asChild
                        >
                          <Link href="/account/security/devices">
                            <div className="text-left">
                              <p className="font-medium text-sm">
                                Thiết bị đăng nhập
                              </p>
                              <p className="text-xs text-gray-500">
                                2 thiết bị
                              </p>
                            </div>
                          </Link>
                        </Button>

                        <Button
                          variant="outline"
                          className="h-auto py-3"
                          asChild
                        >
                          <Link href="/account/security/2fa">
                            <div className="text-left">
                              <p className="font-medium text-sm">
                                Xác thực 2 lớp
                              </p>
                              <p className="text-xs text-gray-500">Chưa bật</p>
                            </div>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-gray-500">Đơn hàng</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-gray-500">Đã giao</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <MapPin className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Bell className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">5</p>
                      <p className="text-sm text-gray-500">Thông báo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
