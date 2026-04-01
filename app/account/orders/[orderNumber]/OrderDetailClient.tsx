"use client";

import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { CancelOrderDialog } from "@/components/dialog/cancel-order-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cancelOrder } from "@/services/order";
import { ItemDetail, OrderDetail } from "@/types/order.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const statusConfig = {
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
    label: "Chờ xác nhận",
  },
  confirmed: {
    color: "bg-blue-100 text-blue-800",
    icon: CheckCircle,
    label: "Đã xác nhận",
  },
  delivered: {
    color: "bg-green-100 text-green-800",
    icon: Truck,
    label: "Đã giao hàng",
  },
  cancelled: {
    color: "bg-red-100 text-red-800",
    icon: XCircle,
    label: "Đã hủy",
  },
};

const paymentStatusConfig = {
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
    label: "Chờ thanh toán",
  },
  paid: {
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
    label: "Đã thanh toán",
  },
  failed: {
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
    label: "Thất bại",
  },
  refunded: {
    color: "bg-purple-100 text-purple-800",
    icon: RefreshCw,
    label: "Đã hoàn tiền",
  },
};

const paymentMethodMap = {
  cod: "Thanh toán khi nhận hàng",
  momo: "Ví MoMo",
  vnpay: "VNPAY",
  paypal: "PayPal",
};

interface OrderDetailClientProps {
  order: OrderDetail;
}

export default function OrderDetailClient({ order }: OrderDetailClientProps) {
  const StatusIcon = statusConfig[order.status]?.icon || Clock;
  const PaymentStatusIcon =
    paymentStatusConfig[order.payment_status]?.icon || Clock;

  const router = useRouter();

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelOrder = async () => {
    setIsCancelling(true);
    try {
      const response = await cancelOrder(order.order_number);

      if (response?.status === "success") {
        toast.success("Hủy đơn hàng thành công");
        router.refresh();
      } else {
        toast.error("Hủy đơn hàng thất bại");
      }
    } catch (error) {
      toast.error("Hủy đơn hàng thất bại " + error);
    } finally {
      setIsCancelling(false);
      setIsCancelDialogOpen(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Chi tiết đơn hàng</h1>
          <p className="text-gray-600 mt-1">
            Mã đơn hàng: #{order.order_number}
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Trạng thái đơn hàng
                  </p>
                  <Badge
                    className={`${statusConfig[order.status]?.color || "bg-gray-100 text-gray-800"} border-0`}
                  >
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusConfig[order.status]?.label || order.status}
                  </Badge>
                </div>
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Trạng thái thanh toán
                  </p>
                  <Badge
                    className={`${paymentStatusConfig[order.payment_status]?.color || "bg-gray-100 text-gray-800"} border-0`}
                  >
                    <PaymentStatusIcon className="w-3 h-3 mr-1" />
                    {paymentStatusConfig[order.payment_status]?.label ||
                      order.payment_status}
                  </Badge>
                </div>
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sản phẩm đã đặt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {order.items.map((item: ItemDetail) => (
                  <div key={item.id}>
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                        {item.product_image ? (
                          <Image
                            src={item.product_image}
                            alt={item.product_name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{item.product_name}</h3>
                          <span className="font-semibold text-primary">
                            {formatCurrency(item.subtotal)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          SKU: {item.product_sku}
                        </p>

                        {item.options && item.options.length > 0 && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                              {item.options.map((option) => (
                                <Badge
                                  key={option.option_id}
                                  variant="outline"
                                  className="bg-gray-50"
                                >
                                  {option.group_name}: {option.option_value}
                                  {parseFloat(option.additional_price) > 0 && (
                                    <span className="ml-1 text-primary">
                                      (+
                                      {formatCurrency(option.additional_price)})
                                    </span>
                                  )}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-gray-600">
                            Số lượng: {item.quantity}
                          </span>
                          <span className="text-sm text-gray-600">
                            Đơn giá: {formatCurrency(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-6" />
                  </div>
                ))}

                {/* Order Summary */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Notes */}
            {order.customer_notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">
                    Ghi chú của khách hàng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{order.customer_notes}</p>
                </CardContent>
              </Card>
            )}

            {order.admin_notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-400">
                    Lí do hủy đơn :
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{order.admin_notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Customer & Payment Info */}
          <div className="space-y-6">
            {/* Shipping Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin giao hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-500 shrink-0" />
                  <div>
                    <p className="font-medium">{order.shipping_full_name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-500 shrink-0" />
                  <p>{order.shipping_phone}</p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-1" />
                  <p className="text-gray-700">
                    {order.shipping_address_details}, {order.shipping_ward},{" "}
                    {order.shipping_province}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thanh toán</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức:</span>
                  <span className="font-medium">
                    {paymentMethodMap[
                      order.payment_method as keyof typeof paymentMethodMap
                    ] || order.payment_method}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trạng thái:</span>
                  <Badge
                    className={`${paymentStatusConfig[order.payment_status]?.color || "bg-gray-100 text-gray-800"} border-0`}
                  >
                    <PaymentStatusIcon className="w-3 h-3 mr-1" />
                    {paymentStatusConfig[order.payment_status]?.label ||
                      order.payment_status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thời gian</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-600">Đặt hàng:</p>
                    <p className="font-medium">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-600">Cập nhật:</p>
                    <p className="font-medium">
                      {formatDate(order.updated_at)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {order.status === "pending" &&
                order.payment_status === "pending" && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setIsCancelDialogOpen(true)}
                    disabled={isCancelling}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {isCancelling ? "Đang hủy..." : "Hủy đơn hàng"}
                  </Button>
                )}
              <Button asChild className="w-full">
                <Link href="/products">Tiếp tục mua sắm</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/account/orders">Xem tất cả đơn hàng</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CancelOrderDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        orderNumber={order.order_number}
        paymentStatus={order.payment_status}
        onConfirm={handleCancelOrder}
        isCancelling={isCancelling}
      />
    </div>
  );
}
