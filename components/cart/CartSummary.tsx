"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { ChevronRight, CreditCard, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  totalItems: number;
  onClearCart: () => void;
}

export const CartSummary = ({ subtotal, totalItems }: CartSummaryProps) => {
  return (
    <div className="space-y-6 sticky top-24">
      <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-2xl shadow-stone-200/50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>

        <h2 className="text-xl font-black italic uppercase tracking-tighter text-gray-900 mb-6 flex items-center gap-2 relative z-10">
          <CreditCard className="h-5 w-5 text-[#D94E28]" /> Tạm tính
        </h2>

        <div className="space-y-4 relative z-10">
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-stone-400 uppercase tracking-widest text-[10px]">
              Tổng sản phẩm
            </span>
            <span className="font-black text-gray-900 tabular-nums">
              {totalItems}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-stone-400 uppercase tracking-widest text-[10px]">
              Vận chuyển
            </span>
            <span className="font-black text-emerald-500 uppercase text-[10px]">
              Miễn phí
            </span>
          </div>

          <div className="pt-4 border-t border-stone-50">
            <div className="flex justify-between items-end">
              <span className="font-black text-gray-900 uppercase text-xs tracking-tight">
                Thanh toán
              </span>
              <div className="text-right">
                <p className="text-3xl font-black text-[#D94E28] tracking-tighter italic tabular-nums">
                  {formatPrice(subtotal)}
                </p>
                <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mt-1">
                  Đã bao gồm VAT
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3 relative z-10">
          <Button
            size="lg"
            className="w-full bg-[#D94E28] hover:bg-[#BF4423] text-white font-black uppercase tracking-[0.15em] text-xs h-14 rounded-2xl shadow-xl shadow-orange-900/20 group transition-all active:scale-95"
            asChild
          >
            <Link href="/checkout">
              Thanh toán ngay
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <p className="text-[10px] text-center text-stone-400 font-medium leading-relaxed">
            Nhấn &quot;Thanh toán&quot; để tiếp tục chọn địa chỉ và phương thức
            thanh toán.
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 gap-4 px-2">
        <div className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-stone-100">
          <div className="p-2 bg-emerald-50 rounded-xl">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
              Thanh toán an toàn
            </h4>
            <p className="text-[9px] text-stone-400 font-medium">
              Bảo mật thông tin 100%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl border border-stone-100">
          <div className="p-2 bg-blue-50 rounded-xl">
            <Truck className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
              Giao hàng nhanh
            </h4>
            <p className="text-[9px] text-stone-400 font-medium">
              Nhận hàng trong 30-60 phút
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
