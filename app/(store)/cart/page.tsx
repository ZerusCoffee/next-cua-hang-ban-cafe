"use client";

import { CartItemComponent } from "@/components/cart/CartItemComponent";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { useCart } from "@/hooks/use-cart";
import { clearCart, removeItemFromCart } from "@/services/cart";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, isLoading, mutate } = useCart();

  const handleRemoveItem = async (itemKey: string) => {
    try {
      await removeItemFromCart(itemKey);
      mutate();
      toast.success("Đã xóa sản phẩm");
    } catch (error) {
      toast.error("Xóa thất bại" + error);
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Bạn có chắc muốn xóa tất cả sản phẩm?")) return;

    try {
      await clearCart();
      mutate();
      toast.success("Đã xóa giỏ hàng");
    } catch (error) {
      toast.error("Xóa thất bại" + error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">Đang tải...</div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 min-h-screen py-8">
      <h1 className="text-2xl font-bold mb-8">
        Giỏ hàng ({cart.total_quantity || 0})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItemComponent
              key={item.item_key}
              item={item}
              onUpdate={mutate}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <CartSummary
            subtotal={cart.subtotal || 0}
            onClearCart={handleClearCart}
          />
        </div>
      </div>
    </div>
  );
}
