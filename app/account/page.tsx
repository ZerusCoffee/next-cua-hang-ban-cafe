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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAddress } from "@/services/address";
import { updateAvatar, useUser } from "@/services/user";
import { getAvatarUrl } from "@/utils/avatar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import {
  Bell,
  Camera,
  CheckCircle,
  Clock,
  CreditCard,
  Home,
  Mail,
  MapPin,
  Package,
  Phone,
  Plus,
  Shield,
  Ticket,
  User,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function AccountPage() {
  const { user, mutate } = useUser();
  const { addresses } = useAddress();
  const [isUploading, setIsUploading] = useState(false);

  // Tải và xử lý hình ảnh đại diện
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("avatar", file);

      try {
        setIsUploading(true);
        await updateAvatar(formData);
        toast.success("Cập nhật ảnh đại diện thành công!");
        mutate();
      } catch {
        toast.error("Upload thất bại");
      } finally {
        setIsUploading(false);
      }
    },
    [mutate],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isUploading,
  });
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-linear-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div
                {...getRootProps()}
                className="relative group cursor-pointer"
              >
                <input {...getInputProps()} />
                <Avatar className="h-20 w-20 border-4 border-white/30 group-hover:border-blue-400 transition-all duration-200">
                  {isUploading ? (
                    <div className="flex items-center justify-center h-full w-full bg-black/50 rounded-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                    </div>
                  ) : (
                    <AvatarImage src={getAvatarUrl(user?.avatar)} />
                  )}
                </Avatar>

                {/* Overlay khi hover */}
                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="h-6 w-6 text-white" />
                </div>

                {isDragActive && (
                  <div className="absolute inset-0 bg-blue-500/70 rounded-full flex items-center justify-center">
                    <p className="text-white text-sm font-medium">
                      Thả ảnh vào đây
                    </p>
                  </div>
                )}
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
                      className=" bg-amber-600 text-white border-0"
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
                    href="/account/coupons"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  >
                    <Ticket className="h-5 w-5" />
                    Mã giảm giá của tôi
                    <Badge className="ml-auto bg-orange-500">5</Badge>
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
                {/* Address Card - Updated with Table */}
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
                            Quản lý địa chỉ nhận hàng
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">
                          {addresses?.length || 0} địa chỉ
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {addresses && addresses.length > 0 ? (
                      <div className="rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead className="w-45">Người nhận</TableHead>
                              <TableHead className="w-30">Điện thoại</TableHead>
                              <TableHead>Địa chỉ</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {addresses.map((address) => (
                              <TableRow
                                key={address.id}
                                className={
                                  address.is_default ? "bg-blue-50/50" : ""
                                }
                              >
                                <TableCell>
                                  <div className="font-medium">
                                    {address.full_name}
                                  </div>
                                  {address.is_default && (
                                    <Badge
                                      variant="secondary"
                                      className="mt-1 bg-green-100 text-green-800 text-xs"
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Mặc định
                                    </Badge>
                                  )}
                                </TableCell>

                                <TableCell>
                                  <div className="flex items-center">
                                    <Phone className="h-3 w-3 mr-2 text-gray-400" />
                                    {address.phone}
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <div className="space-y-1">
                                    <div className="flex items-start">
                                      <Home className="h-3 w-3 mr-2 text-gray-400 mt-0.5" />
                                      <span className="text-sm">
                                        {address.details}
                                      </span>
                                    </div>
                                    <div className="text-gray-600 text-xs ml-5">
                                      {address.ward}, {address.province}
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center">
                        <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 mb-4">
                          Bạn chưa thêm địa chỉ giao hàng nào
                        </p>
                        <Button className="w-full" asChild>
                          <Link href="/account/address/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm địa chỉ mới
                          </Link>
                        </Button>
                      </div>
                    )}

                    {addresses &&
                      addresses.length > 0 &&
                      addresses.length < 3 && (
                        <div className="mt-4 text-center">
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/account/address">
                              <MapPin className="h-4 w-4 mr-2" />
                              Xem tất cả địa chỉ ({addresses.length})
                            </Link>
                          </Button>
                        </div>
                      )}
                  </CardContent>
                </Card>

                <Card className="border shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Ticket className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <CardTitle>Mã giảm giá</CardTitle>
                          <CardDescription>
                            Quản lý mã giảm giá của bạn
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-orange-50 text-orange-700"
                      >
                        3 mã sắp hết hạn
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-linear-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">
                              -20%
                            </Badge>
                            <span className="font-mono font-bold text-lg">
                              WELCOME2024
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Còn 5 ngày
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Giảm 20% cho đơn hàng đầu tiên, áp dụng tối đa 100k
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>HSD: 31/12/2024</span>
                          <span>Đã sử dụng: 0/1</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          className="h-auto py-3"
                          asChild
                        >
                          <Link href="/account/coupons">
                            <div className="text-left">
                              <p className="font-medium text-sm">
                                Xem tất cả mã
                              </p>
                              <p className="text-xs text-gray-500">
                                5 mã đang có
                              </p>
                            </div>
                          </Link>
                        </Button>

                        <Button
                          variant="outline"
                          className="h-auto py-3"
                          asChild
                        >
                          <Link href="/coupons">
                            <div className="text-left">
                              <p className="font-medium text-sm">
                                Nhận thêm mã
                              </p>
                              <p className="text-xs text-gray-500">
                                Khuyến mãi mới
                              </p>
                            </div>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Stats - Cập nhật số địa chỉ */}
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
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <MapPin className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {addresses?.length || 0}
                      </p>
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Ticket className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">5</p>
                      <p className="text-sm text-gray-500">Mã giảm giá</p>
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
