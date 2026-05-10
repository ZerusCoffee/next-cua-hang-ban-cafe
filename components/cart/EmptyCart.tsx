"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export const EmptyCart = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="relative mb-8 inline-block">
            <div className="p-8 bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200 border border-stone-100">
              <ShoppingBag className="h-16 w-16 text-stone-200" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#D94E28] text-white p-2 rounded-full shadow-lg border-4 border-stone-50">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </div>

          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 mb-3">
            Giỏ hàng trống
          </h2>
          <p className="text-stone-400 font-medium mb-10 leading-relaxed">
            Có vẻ như bạn chưa chọn được món đồ uống yêu thích nào. Hãy khám phá
            thực đơn của Zerus nhé!
          </p>

          <Button
            size="lg"
            className="w-full bg-[#D94E28] hover:bg-[#BF4423] text-white font-black uppercase tracking-widest text-xs h-14 rounded-2xl shadow-xl shadow-orange-900/20 group transition-all active:scale-95"
            asChild
          >
            <Link href="/products">
              Khám phá ngay
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
