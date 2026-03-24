"use client";

import { useOrderStatus } from "@/hooks/use-order-status";
import { toast } from "sonner";

export function OrderStatusProvider() {
  useOrderStatus((data) => {
    toast.success(`Đơn hàng #${data.order_number} đã được xác nhận!`);
  });

  return null;
}
