"use client";

import { gsap } from "@/lib/gsap";
import { promotionCategories } from "@/types/promotion.type";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const PromotionsLayout = ({
  children,
  activeSlug,
}: {
  children: React.ReactNode;
  activeSlug: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance for title
      gsap.from(".title-letter", {
        y: 100,
        rotateX: -90,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "back.out(1.7)",
      });

      // Infinite Marquee
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "none",
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="bg-[#FAF9F6] min-h-screen pb-40 overflow-hidden"
      ref={containerRef}
    >
      {/* Dynamic Header */}
      <div className="relative bg-[#1a1a1a] pt-32 pb-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D94E28] skew-x-[-20deg] translate-x-32 opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col gap-12">
            <div>
              <div className="overflow-hidden mb-4">
                <span className="block text-[#D94E28] font-black uppercase tracking-[0.3em] text-[12px]">
                  Special Rewards
                </span>
              </div>
              <h1 className="flex flex-wrap text-[12vw] leading-[0.8] font-black text-white tracking-tighter uppercase">
                {"DEALS".split("").map((l, i) => (
                  <span key={i} className="title-letter inline-block">
                    {l}
                  </span>
                ))}
                <span className="title-letter inline-block text-[#D94E28] ml-4">
                  &
                </span>
                <br />
                {"OFFERS".split("").map((l, i) => (
                  <span key={i} className="title-letter inline-block">
                    {l}
                  </span>
                ))}
              </h1>
            </div>

            {/* Navigation Pills */}
            <div className="flex flex-wrap gap-4">
              {promotionCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={
                    cat.slug === "" ? "/promotions" : `/promotions/${cat.slug}`
                  }
                  className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                    activeSlug === cat.slug
                      ? "bg-[#D94E28] text-white shadow-[0_10px_20px_rgba(217,78,40,0.3)] scale-110"
                      : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling Ticker */}
        <div className="absolute bottom-0 left-0 w-full bg-[#D94E28] py-3 overflow-hidden whitespace-nowrap border-y border-white/10">
          <div ref={marqueeRef} className="inline-block">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="text-white text-[10px] font-black uppercase tracking-[0.5em] mx-10"
              >
                • LIMITED TIME OFFERS • GRAB YOUR COFFEE • EXCLUSIVE REWARDS •
                REDEEM NOW •
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-24">{children}</div>
    </div>
  );
};

export default PromotionsLayout;
