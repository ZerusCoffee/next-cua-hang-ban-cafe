"use client";

import { usePayPalCheckout } from "@/hooks/usePaypalCheckout";
import type { PayPalCaptureDetails } from "@/types/paypal.type";
import type { CheckoutRequest } from "@/validation/checkout.schema";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

interface PayPalPaymentButtonsProps {
  onSuccess?: (details: PayPalCaptureDetails) => void;
  onError?: (error: unknown) => void;
}

export function PayPalPaymentButtons({
  onSuccess,
  onError,
}: PayPalPaymentButtonsProps) {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();
  const { getValues } = useFormContext();

  const checkoutData = getValues() as CheckoutRequest;

  const { createOrder, onApprove } = usePayPalCheckout(checkoutData, onSuccess);

  if (isPending) {
    return <div className="animate-pulse bg-gray-200 h-10 rounded-md" />;
  }

  if (isRejected) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
        Không thể tải cổng thanh toán PayPal. Vui lòng kiểm tra cấu hình hoặc
        thử lại sau.
      </div>
    );
  }

  if (!isResolved) {
    return null;
  }

  return (
    <div className="mt-3 space-y-4">
      <PayPalButtons
        style={{ layout: "vertical", shape: "rect", label: "paypal" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onCancel={() => {
          toast.info("Giao dịch đã bị hủy.");
        }}
        onError={(err) => {
          console.error("PayPal buttons error:", err);
          toast.error("Có lỗi xảy ra trong quá trình thanh toán PayPal.");
          onError?.(err);
        }}
      />
    </div>
  );
}
