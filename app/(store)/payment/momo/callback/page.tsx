"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import {
  CheckCircle,
  FileText,
  Home,
  RefreshCw,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface MomoCallbackParams {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: string;
  orderInfo: string;
  orderType: string;
  transId: string;
  resultCode: string;
  message: string;
  payType: string;
  responseTime: string;
  extraData: string;
  signature: string;
}

export default function MomoCallbackPage() {
  const searchParams = useSearchParams();

  // Lấy params trực tiếp không cần useEffect
  const params: Partial<MomoCallbackParams> = {};
  searchParams.forEach((value, key) => {
    params[key as keyof MomoCallbackParams] = value;
  });

  const isSuccess = params?.resultCode === "0";
  const orderId = params?.orderId || "";
  const amount = params?.amount || "0";
  const transId = params?.transId || "";
  const message = params?.message || "";
  const resultCode = params?.resultCode || "";

  // Các mã lỗi MoMo thường gặp
  const getErrorMessage = (code: string) => {
    switch (code) {
      case "1006":
        return "Giao dịch bị từ chối bởi người dùng";
      case "1001":
        return "Giao dịch thất bại";
      case "1002":
        return "Giao dịch bị từ chối";
      case "1003":
        return "Giao dịch hết hạn";
      default:
        return message || "Giao dịch thất bại";
    }
  };

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Không tìm thấy thông tin giao dịch</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="overflow-hidden">
            {/* Status Header */}
            <div
              className={`p-8 text-center ${
                isSuccess ? "bg-green-50" : "bg-red-50"
              }`}
            >
              {isSuccess ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <h1
                className={`text-xl font-bold mb-2 ${
                  isSuccess ? "text-green-700" : "text-red-700"
                }`}
              >
                {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
              </h1>
              <p className={isSuccess ? "text-green-600" : "text-red-600"}>
                {isSuccess
                  ? "Cảm ơn bạn đã mua hàng"
                  : getErrorMessage(resultCode)}
              </p>
            </div>

            {/* Payment Details */}
            <CardContent className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Mã đơn hàng:</span>
                  <span className="font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Số tiền:</span>
                  <span className="font-semibold text-primary">
                    {formatPrice(Number(amount))}
                  </span>
                </div>
                {isSuccess && transId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mã GD MoMo:</span>
                    <span className="font-medium">{transId}</span>
                  </div>
                )}
                {!isSuccess && resultCode && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mã lỗi:</span>
                    <span className="font-medium text-red-600">
                      {resultCode}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-2">
                {isSuccess ? (
                  <>
                    <Button asChild className="w-full">
                      <Link href={`/account/orders/${orderId}`}>
                        <FileText className="h-4 w-4 mr-2" />
                        Xem chi tiết đơn hàng
                      </Link>
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild variant="outline">
                        <Link href="/">
                          <Home className="h-4 w-4 mr-2" />
                          Trang chủ
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/products">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Mua tiếp
                        </Link>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button asChild className="w-full">
                      <Link href={`/checkout?orderId=${orderId}`}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Thanh toán lại
                      </Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/account/orders/${orderId}`}>
                        <FileText className="h-4 w-4 mr-2" />
                        Xem đơn hàng
                      </Link>
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild variant="outline">
                        <Link href="/">
                          <Home className="h-4 w-4 mr-2" />
                          Trang chủ
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/products">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Mua tiếp
                        </Link>
                      </Button>
                    </div>

                    <p className="text-xs text-center text-gray-500 mt-4">
                      Nếu số tiền đã bị trừ nhưng đơn hàng chưa được cập nhật,
                      vui lòng liên hệ hotline 1900 1234 để được hỗ trợ.
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
