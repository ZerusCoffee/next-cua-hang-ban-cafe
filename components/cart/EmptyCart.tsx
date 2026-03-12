"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export const EmptyCart = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Giỏ hàng trống</h2>
        <p className="text-gray-600 mb-6">Chưa có sản phẩm nào</p>
        <Link href="/products">
          <Button className="bg-green-600 hover:bg-green-700">
            Mua sắm ngay
          </Button>
        </Link>
      </div>
    </div>
  );
};
