import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getOrderDetail } from "@/services/order";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import OrderDetailClient from "./OrderDetailClient";

interface PageProps {
  params: Promise<{
    orderNumber: string;
  }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { orderNumber } = await params;
  console.log("params: " + orderNumber);
  const response = await getOrderDetail(orderNumber);
  console.log("res: " + JSON.stringify(response));

  if (!response?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Không tìm thấy đơn hàng</h1>
          <p className="text-gray-600 mb-6">
            Mã đơn hàng {orderNumber} không tồn tại
          </p>
          <Button asChild>
            <Link href="/">Về trang chủ</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return <OrderDetailClient order={response.data} />;
}
