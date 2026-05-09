"use client";

import { ChangePasswordDialog } from "@/components/dialog/change-password-dialog";
import { UpdateProfileForm } from "@/components/form/update-profile-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useUser } from "@/services/user";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Gift,
  HelpCircle,
  Lock,
  Mail,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AccountPage() {
  const { user } = useUser();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Check if it's a Google user by looking at the avatar URL (common practice)
  const isGoogleUser = user?.avatar?.includes("googleusercontent.com");

  return (
    <div className="space-y-8 pt-4 animate-in fade-in duration-500">
      {/* Welcome & Stats Row */}
      <Card className="border-0 shadow-lg shadow-orange-100 overflow-hidden bg-linear-to-br from-[#D94E28] to-[#FF8C66] text-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">
                Xin chào, {user?.name || "bạn"}! 👋
              </h2>
              <p className="text-white/80 text-sm font-bold uppercase tracking-widest">
                Hôm nay là{" "}
                {format(new Date(), "EEEE, dd/MM/yyyy", { locale: vi })}
              </p>
              <div className="flex gap-10 mt-8">
                <div className="text-center group cursor-default">
                  <p className="text-[10px] text-white/60 uppercase font-black tracking-[0.2em] mb-2 group-hover:text-white transition-colors">
                    Đơn hàng
                  </p>
                  <p className="text-3xl font-black tracking-tighter">12</p>
                </div>
                <div className="text-center group cursor-default">
                  <p className="text-[10px] text-white/60 uppercase font-black tracking-[0.2em] mb-2 group-hover:text-white transition-colors">
                    Voucher
                  </p>
                  <p className="text-3xl font-black tracking-tighter text-amber-200">
                    5
                  </p>
                </div>
                <div className="text-center group cursor-default">
                  <p className="text-[10px] text-white/60 uppercase font-black tracking-[0.2em] mb-2 group-hover:text-white transition-colors">
                    Tích điểm
                  </p>
                  <p className="text-3xl font-black tracking-tighter text-emerald-300">
                    850
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 hidden lg:block">
              <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">
                Trạng thái tài khoản
              </p>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                <span className="font-bold text-sm">BẢO MẬT TỐT</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Focused Profile Form */}
        <div className="xl:col-span-7">
          <Card className="border shadow-sm overflow-hidden rounded-3xl">
            <CardHeader className="pb-4 bg-gray-50/50 border-b border-gray-100">
              <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                <div className="p-2 bg-[#D94E28] rounded-xl shadow-lg shadow-orange-100">
                  <User className="h-5 w-5 text-white" />
                </div>
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between group hover:bg-white hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                      Email đăng ký
                    </p>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-300 group-hover:text-[#D94E28] transition-colors" />
                      <span className="font-bold text-sm text-gray-700">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    {user?.email_verified_at ? (
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[9px] font-black px-2 py-0.5"
                      >
                        ĐÃ XÁC THỰC
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-100 text-[9px] font-black px-2 py-0.5"
                      >
                        CHƯA XÁC THỰC
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between group hover:bg-white hover:border-orange-200 hover:shadow-xl hover:shadow-orange-50 transition-all duration-300">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                      Mật khẩu
                    </p>
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4 text-stone-300" />
                      <span className="font-black text-gray-400 tracking-[0.3em]">
                        ••••••••
                      </span>
                    </div>
                  </div>
                  {isGoogleUser ? (
                    <div className="mt-4 flex items-center gap-2">
                      <Image
                        src="/assets/svg/google-icon.svg"
                        width={12}
                        height={12}
                        alt="Google"
                      />
                      <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest">
                        Google Account
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsChangePasswordOpen(true)}
                      className="mt-4 text-[10px] font-black text-[#D94E28] uppercase tracking-widest hover:underline w-fit cursor-pointer"
                    >
                      Đổi mật khẩu
                    </button>
                  )}
                </div>
              </div>

              <div className="relative py-4">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <Separator className="w-full opacity-50" />
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-white pr-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                    Cập nhật hồ sơ
                  </span>
                </div>
              </div>

              {/* Limit field width so it doesn't look stretched */}
              <div className="max-w-xl">
                <UpdateProfileForm />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Perks & Help (Fills the empty space) */}
        <div className="xl:col-span-5 space-y-6">
          <Card className="border shadow-sm rounded-3xl overflow-hidden border-orange-50">
            <CardHeader className="pb-3 bg-orange-50/30">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-gray-900">
                Đặc quyền của bạn
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                {
                  icon: Zap,
                  label: "Tích điểm đổi quà",
                  desc: "Mỗi 10k nhận 1 điểm",
                  color: "text-amber-500",
                  bg: "bg-amber-50",
                },
                {
                  icon: Gift,
                  label: "Ưu đãi sinh nhật",
                  desc: "Giảm 20% trong tháng sinh nhật",
                  color: "text-rose-500",
                  bg: "bg-rose-50",
                },
                {
                  icon: HelpCircle,
                  label: "Hỗ trợ ưu tiên",
                  desc: "Được hỗ trợ nhanh hơn 50%",
                  color: "text-blue-500",
                  bg: "bg-blue-50",
                },
              ].map((perk, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-default border border-transparent hover:border-gray-100"
                >
                  <div className={cn("p-2.5 rounded-xl shrink-0", perk.bg)}>
                    <perk.icon className={cn("h-5 w-5", perk.color)} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-tight">
                      {perk.label}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border shadow-lg shadow-orange-100 rounded-3xl p-6 bg-linear-to-br from-[#D94E28] to-[#BF4423] text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-lg font-black italic uppercase tracking-tighter mb-2 group-hover:scale-105 transition-transform duration-300">
                Cần giúp đỡ?
              </h3>
              <p className="text-xs text-white/90 font-medium mb-6 leading-relaxed">
                Đội ngũ chăm sóc khách hàng của Zerus luôn sẵn sàng hỗ trợ bạn
                24/7 cho mọi vấn đề.
              </p>
              <Link
                href="/help"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#D94E28] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-50 transition-all shadow-xl shadow-orange-900/40 active:scale-95"
              >
                Trung tâm trợ giúp
              </Link>
            </div>
            <HelpCircle className="absolute -bottom-10 -right-10 h-40 w-40 text-white/10 -rotate-12 group-hover:rotate-0 transition-all duration-700" />
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/account/address"
              className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-orange-100 transition-all text-center group"
            >
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-[#D94E28]">
                Sổ địa chỉ
              </p>
              <p className="text-sm font-black tracking-tight italic">
                QUẢN LÝ
              </p>
            </Link>
            <Link
              href="/account/orders"
              className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-orange-100 transition-all text-center group"
            >
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-[#D94E28]">
                Đơn hàng
              </p>
              <p className="text-sm font-black tracking-tight italic">
                THEO DÕI
              </p>
            </Link>
          </div>
        </div>
      </div>
      <ChangePasswordDialog
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />
    </div>
  );
}
