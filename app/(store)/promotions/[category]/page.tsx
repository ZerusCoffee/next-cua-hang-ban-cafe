"use client";

import { gsap } from "@/lib/gsap";
import { PROMOTIONS } from "@/types/promotion.type";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import PromotionsLayout from "../_components/promotions-layout";

export default function PromotionCategoryPage() {
  const { category } = useParams();
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const filteredPromos = PROMOTIONS.filter(
    (promo) => promo.categorySlug === category,
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 80, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".promo-category-grid", start: "top bottom-=100" },
        },
      );
    });
    return () => ctx.revert();
  }, [category]);

  return (
    <PromotionsLayout activeSlug={category as string}>
      <div className="promo-category-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredPromos.length > 0 ? (
          filteredPromos.map((promo, index) => (
            <Link
              key={promo.id}
              href={`/promotions/${promo.categorySlug}/${promo.slug}`}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] shadow-xl shadow-stone-200 bg-white border border-stone-100">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#D94E28] px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm">
                  {promo.category}
                </div>
              </div>
              <div className="mt-6 px-2">
                <div className="text-[10px] font-bold text-[#D94E28] uppercase tracking-[0.15em] mb-2 opacity-70">
                  {promo.startDate} - {promo.endDate}
                </div>
                <h2 className="text-xl font-extrabold text-stone-900 group-hover:text-[#D94E28] transition-colors leading-snug">
                  {promo.title}
                </h2>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-32 text-center border-2 border-dashed border-stone-200 rounded-[3rem] bg-white/50">
            <p className="text-stone-400 font-serif italic text-xl">
              Hiện tại chưa có chương trình ưu đãi nào cho mục này.
            </p>
            <Link
              href="/promotions"
              className="mt-6 inline-block text-[11px] font-black uppercase tracking-widest text-[#D94E28] hover:underline"
            >
              Xem tất cả ưu đãi
            </Link>
          </div>
        )}
      </div>
    </PromotionsLayout>
  );
}
