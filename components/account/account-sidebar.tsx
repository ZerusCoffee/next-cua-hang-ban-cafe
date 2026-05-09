"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAddress } from "@/services/address";
import { useCoupon } from "@/services/coupon";
import {
  Bell,
  Loader2,
  MapPin,
  Package,
  Shield,
  Star,
  Ticket,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AccountSidebar() {
  const pathname = usePathname();
  const { addresses, isLoading: isLoadingAddress } = useAddress();
  const { coupons, isLoading: isLoadingCoupons } = useCoupon();

  const NAV_ITEMS = [
    {
      href: "/account",
      label: "Thông tin cá nhân",
      icon: User,
    },
    {
      href: "/account/orders",
      label: "Đơn hàng của tôi",
      icon: Package,
    },
    {
      href: "/account/address",
      label: "Sổ địa chỉ",
      icon: MapPin,
      count: addresses?.length,
      isLoading: isLoadingAddress,
    },
    {
      href: "/account/coupons",
      label: "Mã giảm giá",
      icon: Ticket,
      count: coupons?.length,
      isLoading: isLoadingCoupons,
    },
    {
      href: "/account/reviews",
      label: "Đánh giá của bạn",
      icon: Star,
    },
    {
      href: "/account/notifications",
      label: "Thông báo",
      icon: Bell,
      badge: "5",
    },
    {
      href: "/account/security",
      label: "Bảo mật",
      icon: Shield,
    },
  ];

  return (
    <div className="hidden md:block lg:col-span-1">
      <Card className="sticky top-24 border shadow-sm overflow-hidden">
        <CardContent className="p-4">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 font-bold group",
                    isActive
                      ? "bg-[#D94E28] text-white shadow-lg shadow-orange-100 scale-[1.02]"
                      : "text-gray-600 hover:bg-orange-50 hover:text-[#D94E28]",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4.5 w-4.5",
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-[#D94E28]",
                    )}
                  />
                  <span className="text-[13px] uppercase tracking-tight">
                    {item.label}
                  </span>

                  {item.isLoading ? (
                    <Loader2 className="ml-auto h-3 w-3 animate-spin text-gray-400" />
                  ) : item.count !== undefined ? (
                    <Badge
                      className={cn(
                        "ml-auto text-[10px] h-4.5 px-1.5 border-0 font-black",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-orange-100 text-[#D94E28]",
                      )}
                    >
                      {item.count}
                    </Badge>
                  ) : item.badge ? (
                    <Badge
                      className={cn(
                        "ml-auto text-[10px] h-4.5 px-1.5 border-0 font-black",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-red-500 text-white",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <Separator className="my-6 opacity-50" />

          <div className="space-y-4">
            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
              <p className="text-[10px] font-black text-[#D94E28]/60 uppercase tracking-widest mb-3">
                Cấp độ tài khoản
              </p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#D94E28]">
                  Hạng Bạc
                </span>
                <span className="text-[10px] font-bold text-gray-400">
                  850/1000 pts
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-linear-to-r from-[#D94E28] to-[#FF8C66] h-1.5 rounded-full w-[85%] shadow-sm"></div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-[11px] font-black uppercase tracking-widest h-10 hover:bg-[#D94E28] hover:text-white transition-all"
              asChild
            >
              <Link href="/help">Trung tâm trợ giúp</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
