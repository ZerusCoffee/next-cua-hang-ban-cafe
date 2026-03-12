"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  onClearCart: () => void;
}

export const CartSummary = ({ subtotal, onClearCart }: CartSummaryProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Thanh toán</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Tạm tính:</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold">
            <span>Tổng:</span>
            <span className="text-xl text-green-600">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      </div>

      <Link href="/checkout">
        <Button className="w-full bg-green-600 hover:bg-green-700 mb-2">
          Thanh toán
        </Button>
      </Link>

      <Button variant="outline" className="w-full" onClick={onClearCart}>
        Xóa tất cả
      </Button>
    </div>
  );
};