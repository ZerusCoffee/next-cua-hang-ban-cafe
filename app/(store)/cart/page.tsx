"use client";

import { CartItemComponent } from "@/components/cart/CartItemComponent";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { clearCart, removeItemFromCart } from "@/services/cart";
import { useCoupon } from "@/services/coupon";
import {
  ArrowLeft,
  Copy,
  Loader2,
  ShoppingBag,
  Ticket,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, isLoading, mutate } = useCart();
  const { coupons } = useCoupon();
  const [isClearCartDialogOpen, setIsClearCartDialogOpen] = useState(false);

  const handleRemoveItem = async (itemKey: string) => {
    try {
      await removeItemFromCart(itemKey);
      mutate();
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (error) {
      toast.error("Không thể xóa sản phẩm: " + error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      mutate();
      toast.success("Giỏ hàng đã được làm trống");
      setIsClearCartDialogOpen(false);
    } catch (error) {
      toast.error("Lỗi khi xóa giỏ hàng: " + error);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Đã sao chép mã: " + code);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#D94E28]" />
          <p className="text-sm font-bold text-stone-400 uppercase tracking-widest">
            Đang tải giỏ hàng...
          </p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-stone-50/50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-stone-100 py-10 mb-8">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[#D94E28] mb-2">
                <ShoppingBag className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Giỏ hàng của bạn
                </span>
              </div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900">
                Kiểm tra đơn hàng
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-stone-400 hover:text-stone-600 font-bold uppercase tracking-widest text-[10px]"
                asChild
              >
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Tiếp tục mua sắm
                </Link>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsClearCartDialogOpen(true)}
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold uppercase tracking-widest text-[10px]"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Xóa tất cả
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Cart Items List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden">
              <div className="p-6 border-b border-stone-50 bg-stone-50/30">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-stone-400">
                  <span className="md:ml-38">Sản phẩm</span>
                  <div className="hidden md:flex items-center gap-16 lg:gap-24 pr-16 lg:pr-20">
                    <span>Số lượng</span>
                    <span>Tổng cộng</span>
                  </div>
                </div>
              </div>{" "}
              <div className="divide-y divide-stone-50">
                {cart.items.map((item) => (
                  <CartItemComponent
                    key={item.item_key}
                    item={item}
                    onUpdate={mutate}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>

            {/* Vouchers Section */}
            {coupons && coupons.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#D94E28] rounded-xl text-white shadow-lg shadow-orange-100">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight italic text-gray-900">
                      Mã giảm giá khả dụng
                    </h3>
                    <p className="text-xs text-stone-400 font-medium">
                      Sử dụng mã để nhận ưu đãi tốt nhất cho đơn hàng này
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coupons.slice(0, 4).map((coupon) => (
                    <div
                      key={coupon.code}
                      className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex items-center justify-between group hover:border-[#D94E28]/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                          <Ticket className="h-5 w-5 text-[#D94E28]" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-[#D94E28] uppercase tracking-widest mb-0.5">
                            {coupon.code}
                          </p>
                          <p className="text-xs font-bold text-gray-900 line-clamp-1">
                            {coupon.name}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(coupon.code)}
                        className="p-2 text-stone-300 hover:text-[#D94E28] transition-colors"
                        title="Sao chép mã"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {coupons.length > 4 && (
                  <Link
                    href="/account/coupons"
                    className="inline-block text-[10px] font-black text-[#D94E28] uppercase tracking-[0.2em] hover:underline"
                  >
                    Xem tất cả ưu đãi (+{coupons.length - 4})
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Cart Summary Sidebar */}
          <div className="lg:col-span-4">
            <CartSummary
              subtotal={cart.subtotal || 0}
              totalItems={cart.total_quantity || 0}
              onClearCart={() => setIsClearCartDialogOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Dialog */}
      <AlertDialog
        open={isClearCartDialogOpen}
        onOpenChange={setIsClearCartDialogOpen}
      >
        <AlertDialogContent className="rounded-[2rem] border-0 shadow-2xl p-8">
          <AlertDialogHeader>
            <div className="p-4 bg-rose-50 rounded-2xl w-fit mx-auto mb-4">
              <Trash2 className="h-8 w-8 text-rose-500" />
            </div>
            <AlertDialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-center">
              Xóa toàn bộ giỏ hàng?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center font-medium text-stone-500 mt-2">
              Tất cả sản phẩm trong giỏ hàng sẽ bị xóa. Bạn không thể hoàn tác
              thao tác này.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 sm:justify-center gap-3">
            <AlertDialogCancel className="rounded-xl font-bold uppercase tracking-widest text-[10px] px-8 h-12 border-2">
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearCart}
              className="bg-rose-500 hover:bg-rose-600 rounded-xl font-bold uppercase tracking-widest text-[10px] px-8 h-12 shadow-lg shadow-rose-200 border-0"
            >
              Đồng ý xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
