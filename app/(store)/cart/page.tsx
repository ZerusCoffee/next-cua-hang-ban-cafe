"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  clearCart,
  removeItemFromCart,
  updateItemQuantity,
  useCart,
} from "@/services/cart";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, isLoading, mutate } = useCart();

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;

    try {
      await updateItemQuantity(productId, quantity);
      mutate();
    } catch (error) {
      toast.error("Cập nhật thất bại" + error);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    try {
      await removeItemFromCart(productId);
      mutate();
      toast.success("Đã xóa sản phẩm");
    } catch (error) {
      toast.error("Xóa thất bại" + error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
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
  }

  return (
    <div className="container mx-auto px-4 min-h-screen py-8">
      <h1 className="text-2xl font-bold mb-8">Giỏ hàng ({cart.count || 0})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.product_id}
              className="flex gap-4 bg-white p-4 rounded-lg border"
            >
              <div className="w-24 h-24 relative shrink-0">
                <Image
                  src="/assets/images/logo.jpg"
                  alt={item.product_name}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{item.product_name}</h3>
                <p className="text-sm text-gray-500">SKU: {item.product_sku}</p>

                {item.options && item.options.length > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    {item.options.map((opt, idx) => (
                      <div key={idx}>
                        {opt.group_name}: {opt.option_value}
                        {opt.additional_price > 0 &&
                          ` (+${formatPrice(opt.additional_price)})`}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-3">
                  <span className="font-semibold text-green-600">
                    {formatPrice(item.unit_price)}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleUpdateQuantity(item.product_id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="w-12 text-center">{item.quantity}</span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleUpdateQuantity(item.product_id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveItem(item.product_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Thanh toán</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="font-medium">
                  {formatPrice(cart.subtotal || 0)}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Tổng:</span>
                  <span className="text-xl text-green-600">
                    {formatPrice(cart.subtotal || 0)}
                  </span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 mb-2">
              Thanh toán
            </Button>

            <Button variant="outline" className="w-full" onClick={clearCart}>
              Xóa tất cả
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
