"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from "@/lib/gsap";
import { useCoupon } from "@/services/coupon";
import { useUser } from "@/services/user";
import { Coupon } from "@/types/coupon.type";
import { getAvatarUrl } from "@/utils/avatar";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Clock,
  Copy,
  CreditCard,
  MapPin,
  Package,
  Shield,
  Ticket,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function CouponsPage() {
  const { user } = useUser();
  const { coupons, isLoading } = useCoupon();
  const listRef = useRef<HTMLDivElement>(null);
  const BRAND_COLOR = "#D94E28";

  useEffect(() => {
    if (!isLoading && coupons) {
      gsap.fromTo(
        ".coupon-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      );
    }
  }, [isLoading, coupons]);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Đã sao chép mã: " + code, {
      icon: <Ticket className="w-4 h-4 text-[#D94E28]" />,
      style: { borderRadius: "1rem" },
    });
  };

  // Phân tích type_label để lấy giá trị hiển thị
  const parseDiscount = (typeLabel: string) => {
    if (typeLabel.includes("%")) {
      const percent = parseInt(typeLabel.match(/\d+(\.\d+)?/)?.[0] || "0");
      return { display: `${percent}%`, isPercentage: true, isFreeShip: false };
    }
    if (typeLabel.includes("đ") || typeLabel.includes("VNĐ")) {
      const amount = parseInt(typeLabel.replace(/[^\d]/g, ""), 10);
      return {
        display: `${amount.toLocaleString()}đ`,
        isPercentage: false,
        isFreeShip: false,
      };
    }
    if (
      typeLabel.toLowerCase().includes("freeship") ||
      typeLabel.toLowerCase().includes("miễn phí vận chuyển")
    ) {
      return { display: "🚚 Free ship", isPercentage: false, isFreeShip: true };
    }
    return { display: typeLabel, isPercentage: false, isFreeShip: false };
  };

  const renderCouponCard = (coupon: Coupon) => {
    const { display, isPercentage, isFreeShip } = parseDiscount(
      coupon.type_label,
    );

    return (
      <div
        key={coupon.code}
        className="coupon-card group relative flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#D94E28]/5 hover:border-[#D94E28]/20 transition-all duration-500"
      >
        {/* Left Section: Price Stub */}
        <div className="md:w-36 flex flex-col items-center justify-center p-6 text-white shrink-0 relative bg-linear-to-br from-[#D94E28] to-[#FF8C66]">
          <div className="text-3xl font-black mb-1 drop-shadow-sm">
            {display}
          </div>
          <div className="text-[9px] font-black uppercase tracking-widest opacity-90 text-center leading-none">
            {isFreeShip
              ? "FREE SHIP"
              : isPercentage
                ? "GIẢM GIÁ"
                : "GIẢM TRỰC TIẾP"}
          </div>

          {/* Half circles cut-out effect */}
          <div className="absolute -right-3 top-0 bottom-0 w-6 flex-col justify-around py-2 z-10 hidden md:flex">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-white -mr-1.5 shadow-inner"
              />
            ))}
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="flex-1 p-6 flex flex-col justify-between relative bg-white">
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge className="bg-[#D94E28]/10 text-[#D94E28] hover:bg-[#D94E28]/20 border-0 text-[10px] font-bold px-2">
                  {coupon.code}
                </Badge>
                <span className="flex items-center gap-1 text-[10px] text-orange-500 font-bold">
                  <Clock className="w-3 h-3" />
                  Còn hạn
                </span>
              </div>
              <h4 className="font-extrabold text-stone-900 text-lg mb-1 group-hover:text-[#D94E28] transition-colors">
                {coupon.name}
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-medium mb-3">
                {coupon.description}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-stone-50 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                Điều kiện:
              </p>
              <p className="text-[11px] text-stone-700 font-bold">
                Đơn từ {Number(coupon.minimum_order_amount).toLocaleString()}đ
                {coupon.maximum_discount_amount &&
                  ` • Giảm tối đa ${Number(coupon.maximum_discount_amount).toLocaleString()}đ`}
              </p>
              {coupon.expires_at && (
                <p className="text-[10px] text-stone-400">
                  HSD: {coupon.expires_at}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(coupon.code)}
                className="flex items-center gap-2 px-4 py-2 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200 text-stone-600 transition-all active:scale-95"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Sao chép
                </span>
              </button>
              <Button
                size="sm"
                style={{ backgroundColor: BRAND_COLOR }}
                className="rounded-xl px-5 h-9 text-xs font-bold shadow-lg shadow-[#D94E28]/20 text-white border-0"
                asChild
              >
                <Link href="/products">Dùng ngay</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const totalCoupons = coupons?.length || 0;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20">
      {/* Premium Header */}
      <div
        style={{ backgroundColor: BRAND_COLOR }}
        className="pt-12 pb-24 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="p-4 bg-white/10 rounded-[2rem] backdrop-blur-xl border border-white/20 shadow-2xl">
              <Ticket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">
                Ví Voucher
              </h1>
              <p className="text-white/70 text-sm font-medium">
                Bạn đang có{" "}
                <span className="text-white font-bold">
                  {totalCoupons} ưu đãi
                </span>{" "}
                sẵn sàng sử dụng.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-2xl shadow-stone-200/50 overflow-hidden rounded-[2rem]">
              <CardContent className="p-0">
                <div className="p-8 bg-linear-to-b from-stone-50 to-white border-b border-stone-100 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
                      <AvatarImage src={getAvatarUrl(user?.avatar)} />
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
                  </div>
                  <h3 className="font-black text-stone-900 truncate w-full px-2">
                    {user?.name || "Người dùng"}
                  </h3>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">
                    Hạng thành viên Bạc
                  </p>
                </div>
                <nav className="p-4 space-y-1">
                  {[
                    {
                      href: "/account",
                      icon: User,
                      label: "Thông tin cá nhân",
                    },
                    {
                      href: "/account/orders",
                      icon: Package,
                      label: "Đơn hàng",
                    },
                    {
                      href: "/account/address",
                      icon: MapPin,
                      label: "Sổ địa chỉ",
                    },
                    {
                      href: "/account/coupons",
                      icon: Ticket,
                      label: "Ví Voucher",
                      active: true,
                    },
                    {
                      href: "/account/payment",
                      icon: CreditCard,
                      label: "Thanh toán",
                    },
                    {
                      href: "/account/notifications",
                      icon: Bell,
                      label: "Thông báo",
                      badge: 5,
                    },
                    {
                      href: "/account/security",
                      icon: Shield,
                      label: "Bảo mật",
                    },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={
                        item.active ? { backgroundColor: BRAND_COLOR } : {}
                      }
                      className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-bold transition-all ${
                        item.active
                          ? "text-white shadow-lg shadow-[#D94E28]/20 scale-[1.02]"
                          : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${item.active ? "text-white" : "text-stone-400"}`}
                      />
                      {item.label}
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - No Tabs, just the list */}
          <div className="lg:col-span-3">
            {/* Helper banner */}
            <div className="flex items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-2xl border border-orange-100">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <span className="text-[11px] text-orange-700 font-bold uppercase tracking-tight">
                  Cần hỗ trợ về mã? Gọi 1800 6969
                </span>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-40 bg-stone-100 rounded-[2rem] animate-pulse"
                  ></div>
                ))}
              </div>
            ) : totalCoupons > 0 ? (
              <div ref={listRef} className="grid grid-cols-1 gap-6">
                {coupons!.map((coupon) => renderCouponCard(coupon))}
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-stone-100 flex flex-col items-center">
                <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-8">
                  <Ticket className="w-12 h-12 text-stone-200" />
                </div>
                <h3 className="text-2xl font-black text-stone-900 mb-3">
                  Chưa có mã giảm giá nào
                </h3>
                <p className="text-stone-400 text-sm max-w-sm font-medium mb-10 leading-relaxed">
                  Đừng lo, Zerus luôn có ưu đãi mới mỗi ngày. Khám phá ngay để
                  không bỏ lỡ!
                </p>
                <Button
                  variant="outline"
                  className="rounded-2xl h-12 px-10 border-2 font-black uppercase tracking-widest hover:bg-[#D94E28] hover:text-white hover:border-[#D94E28] transition-all group"
                  asChild
                >
                  <Link href="/coupons">
                    Săn ưu đãi ngay
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
