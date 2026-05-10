"use client";

import { ArrowRight, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SESSION_KEY = "hide_top_announcement";

export function TopAnnouncement() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check session storage in the next tick to avoid synchronous setState warning
    const timer = setTimeout(() => {
      const isHidden = sessionStorage.getItem(SESSION_KEY);
      if (!isHidden) {
        setIsVisible(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(SESSION_KEY, "true");
  };

  if (!isVisible) return null;

  return (
    <div className="hidden md:block bg-[#D94E28] text-white py-2.5 px-4 relative overflow-hidden group border-b border-white/10">
      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

      <div className="container mx-auto flex items-center justify-center gap-6 text-center px-8">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-white fill-current" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.15em]">
            Sản phẩm mới:{" "}
            <span className="text-amber-200">Zerus Cold Brew Chanh Vàng</span>{" "}
            đã chính thức ra mắt!
          </span>
        </div>

        <Link
          href="/products"
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-white text-[#D94E28] hover:bg-orange-50 px-4 py-1.5 rounded-full transition-all active:scale-95 shadow-lg shadow-black/5"
        >
          Thử ngay <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer p-1 hover:bg-white/10 rounded-full"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
