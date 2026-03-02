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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  Clock,
  Download,
  Eye,
  Filter,
  Package,
  Search,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    items: 3,
    total: 1250000,
    status: "delivered",
    statusText: "Đã giao hàng",
    tracking: "TP123456789VN",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    items: 1,
    total: 450000,
    status: "processing",
    statusText: "Đang xử lý",
    tracking: "TP123456788VN",
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05",
    items: 5,
    total: 2850000,
    status: "shipped",
    statusText: "Đang vận chuyển",
    tracking: "TP123456787VN",
  },
  {
    id: "ORD-2023-012",
    date: "2023-12-20",
    items: 2,
    total: 890000,
    status: "delivered",
    statusText: "Đã giao hàng",
    tracking: "TP123456786VN",
  },
  {
    id: "ORD-2023-011",
    date: "2023-12-15",
    items: 1,
    total: 320000,
    status: "cancelled",
    statusText: "Đã hủy",
    tracking: null,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "processing":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "shipped":
      return <Truck className="h-4 w-4 text-orange-500" />;
    case "cancelled":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Package className="h-4 w-4 text-gray-500" />;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Đơn hàng của tôi
              </h1>
              <p className="text-gray-600 mt-2">
                Theo dõi và quản lý tất cả đơn hàng của bạn
              </p>
            </div>
            <Button asChild>
              <Link href="/products">
                <Package className="h-4 w-4 mr-2" />
                Tiếp tục mua sắm
              </Link>
            </Button>
          </div>
          <Separator />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Bộ lọc</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Trạng thái đơn hàng</h3>
                  <div className="space-y-2">
                    {[
                      "Tất cả",
                      "Đang xử lý",
                      "Đang vận chuyển",
                      "Đã giao",
                      "Đã hủy",
                    ].map((status) => (
                      <label
                        key={status}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded text-primary"
                        />
                        <span className="text-sm">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Khoảng thời gian</h3>
                  <div className="space-y-2">
                    {[
                      "30 ngày qua",
                      "3 tháng qua",
                      "6 tháng qua",
                      "1 năm qua",
                    ].map((period) => (
                      <button
                        key={period}
                        className="block w-full text-left text-sm p-2 rounded hover:bg-gray-100"
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Áp dụng bộ lọc
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo mã đơn hàng, sản phẩm..."
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Sắp xếp
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Mới nhất</DropdownMenuItem>
                  <DropdownMenuItem>Cũ nhất</DropdownMenuItem>
                  <DropdownMenuItem>Giá cao nhất</DropdownMenuItem>
                  <DropdownMenuItem>Giá thấp nhất</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử đơn hàng</CardTitle>
                <CardDescription>
                  Tổng cộng {orders.length} đơn hàng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã đơn hàng</TableHead>
                        <TableHead>Ngày đặt</TableHead>
                        <TableHead>Số lượng</TableHead>
                        <TableHead>Tổng tiền</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <Link
                              href={`/account/orders/${order.id}`}
                              className="hover:text-primary hover:underline"
                            >
                              {order.id}
                            </Link>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.items} sản phẩm</TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(order.total)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`flex items-center gap-1 w-fit ${
                                order.status === "delivered"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : order.status === "processing"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : order.status === "shipped"
                                      ? "bg-orange-50 text-orange-700 border-orange-200"
                                      : "bg-red-50 text-red-700 border-red-200"
                              }`}
                            >
                              {getStatusIcon(order.status)}
                              {order.statusText}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/account/orders/${order.id}`}>
                                  <Eye className="h-3 w-3 mr-1" />
                                  Chi tiết
                                </Link>
                              </Button>
                              {order.tracking && (
                                <Button size="sm" variant="outline">
                                  <Truck className="h-3 w-3 mr-1" />
                                  Theo dõi
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Empty State */}
                {orders.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Chưa có đơn hàng nào
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Bạn chưa đặt mua sản phẩm nào. Hãy bắt đầu mua sắm ngay!
                    </p>
                    <Button asChild>
                      <Link href="/products">Mua sắm ngay</Link>
                    </Button>
                  </div>
                )}

                {/* Pagination */}
                {orders.length > 0 && (
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-gray-500">
                      Hiển thị 1-{orders.length} của {orders.length} đơn hàng
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Trước
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-primary text-white"
                      >
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        Sau
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Download className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Tải hóa đơn</h3>
                      <p className="text-sm text-gray-500">Tải hóa đơn VAT</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Truck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Theo dõi đơn hàng</h3>
                      <p className="text-sm text-gray-500">Nhập mã vận đơn</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Package className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Trả hàng/Đổi hàng</h3>
                      <p className="text-sm text-gray-500">
                        Yêu cầu trong 30 ngày
                      </p>
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
