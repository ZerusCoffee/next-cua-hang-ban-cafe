"use client";

import { Badge } from "@/components/ui/badge";
import { gsap } from "@/lib/gsap";
import { ArrowRight, Ticket, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DISMISS_KEY = "floating_offer_dismissed";

export function FloatingOffer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissedNow, setIsDismissedNow] = useState(false);

  useEffect(() => {
    // Show after 1.5 seconds if not already dismissed
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const dismissed = localStorage.getItem(DISMISS_KEY);
        if (dismissed !== "true") {
          setIsVisible(true);
        }
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && !isDismissedNow) {
      gsap.fromTo(
        ".floating-offer",
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      );
    }
  }, [isVisible, isDismissedNow]);

  const handleDismiss = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    gsap.to(".floating-offer", {
      y: 50,
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      onComplete: () => {
        setIsDismissedNow(true);
        localStorage.setItem(DISMISS_KEY, "true");
      },
    });
  };

  if (!isVisible || isDismissedNow) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 floating-offer group">
      <div className="relative">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-gray-600 rounded-full p-1.5 shadow-md border border-gray-100 z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Content Card */}
        <Link
          href="/account/coupons"
          className="block"
          onClick={() => {
            // Dismiss permanently when clicked
            localStorage.setItem(DISMISS_KEY, "true");
            setIsDismissedNow(true);
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 p-4 w-72 md:w-80 overflow-hidden group/card hover:border-[#D94E28]/30 transition-all duration-300">
            {/* Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-100/50 rounded-full blur-2xl group-hover/card:bg-orange-200/50 transition-colors"></div>

            <div className="flex gap-4 relative z-10">
              <div className="h-12 w-12 bg-[#D94E28] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-200 animate-bounce">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-[#D94E28] uppercase tracking-widest">
                    Ưu đãi mới
                  </span>
                  <Badge className="bg-red-500 text-[9px] h-4 px-1.5 font-bold border-0 text-white">
                    HOT
                  </Badge>
                </div>
                <h4 className="text-sm font-bold text-gray-900 leading-tight mb-1 line-clamp-1">
                  Bạn có 3 mã giảm giá sắp hết hạn!
                </h4>
                <p className="text-xs text-gray-500 line-clamp-1">
                  Sử dụng ngay để nhận ưu đãi lên đến 50k
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center text-[10px] font-bold text-[#D94E28]"
                  >
                    %
                  </div>
                ))}
              </div>
              <div className="flex items-center text-xs font-bold text-[#D94E28] group-hover/card:translate-x-1 transition-transform">
                Kiểm tra ngay <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
