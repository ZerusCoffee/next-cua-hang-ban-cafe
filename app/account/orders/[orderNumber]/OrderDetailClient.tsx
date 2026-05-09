"use client";

import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  Clock,
  CreditCard,
  HelpCircle,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { CancelOrderDialog } from "@/components/dialog/cancel-order-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn, formatCurrency, formatDate, hasImage } from "@/lib/utils";
import { cancelOrder } from "@/services/order";
import { ItemDetail, OrderDetail } from "@/types/order.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const paymentStatusConfig = {
  pending: {
    color: "bg-amber-100 text-amber-700",
    icon: Clock,
    label: "Chờ thanh toán",
  },
  paid: {
    color: "bg-emerald-100 text-emerald-700",
    icon: CheckCircle,
    label: "Đã thanh toán",
  },
  failed: {
    color: "bg-rose-100 text-rose-700",
    icon: AlertCircle,
    label: "Thất bại",
  },
  refunded: {
    color: "bg-purple-100 text-purple-700",
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
  const PaymentStatusIcon =
    paymentStatusConfig[
      order.payment_status as keyof typeof paymentStatusConfig
    ]?.icon || Clock;

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
    <div className="space-y-8 pt-4 animate-in fade-in duration-500">
      {/* Header with Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-10 w-10 p-0 rounded-full hover:bg-stone-100"
          >
            <Link href="/account/orders">
              <ChevronLeft className="h-6 w-6 text-stone-600" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Chi tiết đơn hàng
              </h1>
              <Badge
                variant="outline"
                className="font-mono text-xs text-stone-400 border-stone-200"
              >
                #{order.order_number}
              </Badge>
            </div>
            <p className="text-sm text-stone-500 mt-1">
              Ngày đặt: {formatDate(order.created_at)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {order.status === "pending" && (
            <Button
              variant="ghost"
              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold uppercase tracking-wider text-[10px]"
              onClick={() => setIsCancelDialogOpen(true)}
              disabled={isCancelling}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Hủy đơn hàng
            </Button>
          )}
          <Button
            size="sm"
            className="bg-[#D94E28] hover:bg-[#BF4423] font-bold uppercase tracking-wider text-[10px] h-10 px-6 rounded-xl shadow-lg shadow-orange-100"
            asChild
          >
            <Link href="/products">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items and Notes */}
        <div className="xl:col-span-8 space-y-8">
          <Card className="border shadow-lg shadow-stone-100 overflow-hidden rounded-2xl">
            <CardHeader className="p-6 bg-stone-50/50 border-b border-stone-100">
              <CardTitle className="text-lg font-bold flex items-center gap-3">
                <div className="p-2 bg-[#D94E28] rounded-lg text-white">
                  <Package className="h-5 w-5" />
                </div>
                Sản phẩm đã đặt
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-stone-50/30 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    <tr>
                      <th className="px-6 py-4 text-left">Sản phẩm</th>
                      <th className="px-4 py-4 text-center">Số lượng</th>
                      <th className="px-4 py-4 text-right">Đơn giá</th>
                      <th className="px-6 py-4 text-right">Tổng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {order.items.map((item: ItemDetail) => (
                      <tr
                        key={item.id}
                        className="group hover:bg-stone-50/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white rounded-xl border border-stone-100 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                              {hasImage(item.product_image) ? (
                                <Image
                                  src={item.product_image}
                                  alt={item.product_name}
                                  width={56}
                                  height={56}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                  unoptimized
                                />
                              ) : (
                                <Package className="w-6 h-6 text-stone-200" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                                {item.product_name}
                              </h4>
                              <p className="text-[10px] text-stone-400 font-medium mt-0.5">
                                SKU: {item.product_sku}
                              </p>
                              {item.options && item.options.length > 0 && (
                                <div className="mt-1.5 flex flex-wrap gap-1">
                                  {item.options.map((opt) => (
                                    <Badge
                                      key={opt.option_id}
                                      variant="secondary"
                                      className="bg-white border border-stone-100 text-[9px] h-4.5 px-1.5 font-medium text-stone-500"
                                    >
                                      {opt.group_name}: {opt.option_value}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-sm font-bold text-gray-900">
                            x{item.quantity}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-sm font-medium text-stone-600">
                            {formatCurrency(item.price)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-bold text-[#D94E28]">
                            {formatCurrency(item.subtotal)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-8 bg-stone-50/10 border-t border-stone-100">
                <div className="max-w-xs ml-auto space-y-3">
                  <div className="flex justify-between items-center text-sm text-stone-500">
                    <span>Tạm tính</span>
                    <span className="font-medium text-stone-700">
                      {formatCurrency(order.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-emerald-600">
                    <span>Vận chuyển</span>
                    <span className="font-medium uppercase text-xs">
                      Miễn phí
                    </span>
                  </div>
                  <Separator className="bg-stone-200" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-base font-bold text-gray-900">
                      Tổng cộng
                    </span>
                    <span className="text-2xl font-bold text-[#D94E28]">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          {(order.customer_notes || order.admin_notes) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {order.customer_notes && (
                <Card className="border-none bg-blue-50/50 rounded-2xl p-6">
                  <h4 className="text-[11px] font-bold text-blue-500 uppercase tracking-wider mb-2">
                    Ghi chú của bạn
                  </h4>
                  <p className="text-sm text-blue-700 leading-relaxed italic">
                    &quot;{order.customer_notes}&quot;
                  </p>
                </Card>
              )}
              {order.admin_notes && (
                <Card className="border-none bg-rose-50/50 rounded-2xl p-6">
                  <h4 className="text-[11px] font-bold text-rose-500 uppercase tracking-wider mb-2">
                    Lý do hủy đơn
                  </h4>
                  <p className="text-sm text-rose-700 leading-relaxed italic">
                    &quot;{order.admin_notes}&quot;
                  </p>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Information Cards */}
        <div className="xl:col-span-4 space-y-6">
          {/* Shipping Info Card */}
          <Card className="border shadow-lg shadow-stone-100 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 bg-stone-50/50 border-b border-stone-100">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D94E28]" /> Giao hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <User className="h-4 w-4 text-stone-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase mb-0.5">
                    Người nhận
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {order.shipping_full_name}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <Phone className="h-4 w-4 text-stone-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase mb-0.5">
                    Điện thoại
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {order.shipping_phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <MapPin className="h-4 w-4 text-stone-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase mb-0.5">
                    Địa chỉ
                  </p>
                  <p className="text-xs font-medium text-stone-600 leading-relaxed">
                    {order.shipping_address_details}, {order.shipping_ward},{" "}
                    {order.shipping_province}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info Card */}
          <Card className="border shadow-lg shadow-stone-100 rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 bg-stone-50/50 border-b border-stone-100">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#D94E28]" /> Thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-stone-100 rounded-lg">
                    <CreditCard className="h-4 w-4 text-stone-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase mb-0.5">
                      Phương thức
                    </p>
                    <p className="text-xs font-bold text-gray-700 uppercase">
                      {paymentMethodMap[
                        order.payment_method as keyof typeof paymentMethodMap
                      ] || order.payment_method}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">
                    Trạng thái
                  </p>
                  <p
                    className={cn(
                      "text-[11px] font-bold uppercase",
                      order.payment_status === "paid"
                        ? "text-emerald-600"
                        : "text-amber-500",
                    )}
                  >
                    {paymentStatusConfig[
                      order.payment_status as keyof typeof paymentStatusConfig
                    ]?.label || order.payment_status}
                  </p>
                </div>
                <div
                  className={cn(
                    "p-2 rounded-full",
                    order.payment_status === "paid"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-amber-100 text-amber-500",
                  )}
                >
                  <PaymentStatusIcon className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="border-none bg-stone-900 text-white rounded-2xl p-6 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-2">Cần hỗ trợ?</h4>
              <p className="text-xs text-white/50 font-medium mb-6">
                Nếu bạn cần hỗ trợ về đơn hàng này, hãy liên hệ với chúng tôi
                ngay.
              </p>
              <Button
                variant="outline"
                className="w-full bg-transparent border-white/20 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-[10px] h-10 rounded-xl"
                asChild
              >
                <Link href="/help">Trung tâm trợ giúp</Link>
              </Button>
            </div>
            <HelpCircle className="absolute -bottom-6 -right-6 h-32 w-32 text-white/5 -rotate-12 group-hover:rotate-0 transition-all duration-700" />
          </Card>
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
