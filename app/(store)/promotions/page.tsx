"use client";

import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";
import { PROMOTIONS } from "@/types/promotion.type";
import { ArrowRight, Copy, ExternalLink, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import PromotionsLayout from "./_components/promotions-layout";

export default function PromotionsPage() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 60, opacity: 0, scale: 0.9, rotate: 1 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".promo-vouchers",
            start: "top bottom-=50",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const copyCode = (e: React.MouseEvent, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    toast.success("Mã ưu đãi đã được sao chép!", {
      description: `Sử dụng mã ${code} khi thanh toán để nhận ưu đãi.`,
      icon: <Ticket className="w-4 h-4 text-[#D94E28]" />,
    });
  };

  return (
    <PromotionsLayout activeSlug="">
      <div className="promo-vouchers grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
        {PROMOTIONS.map((promo, index) => (
          <div
            key={promo.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="group relative flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(217,78,40,0.12)] transition-all duration-700 ease-out"
          >
            {/* Left Section: Visual Stub */}
            <div className="md:w-[40%] relative h-72 md:h-auto overflow-hidden">
              <Image
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <Badge className="bg-[#D94E28] text-white border-0 self-start px-4 py-1.5 rounded-full mb-3 text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {promo.category}
                </Badge>
              </div>
            </div>

            {/* Premium Perforation Line */}
            <div className="hidden md:flex flex-col justify-between py-6 relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] -mt-11 -ml-5 border border-stone-100 shadow-inner"></div>
              <div className="flex-1 border-r-2 border-dashed border-stone-100 mx-auto my-4 opacity-50"></div>
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] -mb-11 -ml-5 border border-stone-100 shadow-inner"></div>
            </div>

            {/* Right Section: Details */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-between relative bg-white">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#D94E28] animate-pulse"></div>
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">
                    Hạn dùng: {promo.endDate}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-stone-900 leading-[1.1] mb-5 group-hover:text-[#D94E28] transition-colors tracking-tighter">
                  {promo.title}
                </h3>

                <p className="text-stone-500 text-sm leading-relaxed mb-10 font-medium italic opacity-80">
                  &quot;{promo.desc}&quot;
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-stone-50 pt-8 mt-auto">
                {promo.discountCode ? (
                  <button
                    onClick={(e) => copyCode(e, promo.discountCode!)}
                    className="flex-1 bg-stone-900 text-white px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#D94E28] transition-all duration-300 shadow-xl shadow-stone-900/10 hover:shadow-[#D94E28]/20 flex items-center justify-center gap-3 active:scale-95"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy: {promo.discountCode}</span>
                  </button>
                ) : (
                  <Link
                    href={`/promotions/${promo.categorySlug}/${promo.slug}`}
                    className="flex-1 border-2 border-stone-900 text-stone-900 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <span>Nhận ưu đãi</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}

                <Link
                  href={`/promotions/${promo.categorySlug}/${promo.slug}`}
                  className="w-14 h-14 rounded-2xl border border-stone-100 flex items-center justify-center group/btn hover:border-[#D94E28] hover:bg-orange-50 transition-all duration-300"
                >
                  <ArrowRight className="w-6 h-6 text-stone-300 group-hover/btn:text-[#D94E28] group-hover/btn:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-32 p-16 bg-stone-900 rounded-[3rem] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10 tracking-tighter">
          Bạn là thành viên của Zerus?
        </h2>
        <p className="text-white/60 mb-10 max-w-lg mx-auto relative z-10 font-medium leading-relaxed">
          Đăng nhập để xem các ưu đãi dành riêng cho hạng thành viên của bạn và
          tích điểm ngay hôm nay.
        </p>
        <Button
          className="bg-[#D94E28] hover:bg-[#BF4423] text-white px-12 h-16 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-2xl shadow-[#D94E28]/20 relative z-10"
          asChild
        >
          <Link href="/login">Đăng nhập ngay</Link>
        </Button>
      </div>
    </PromotionsLayout>
  );
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold ${className}`}
    >
      {children}
    </div>
  );
}
