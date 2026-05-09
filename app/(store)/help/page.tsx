"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  CreditCard,
  ExternalLink,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  RotateCcw,
  Search,
  Star,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";

const FAQ_CATEGORIES = [
  {
    icon: Truck,
    title: "Giao hàng & Vận chuyển",
    description: "Theo dõi đơn hàng, phí vận chuyển và thời gian giao hàng.",
    links: [
      "Làm thế nào để theo dõi đơn hàng?",
      "Phí vận chuyển là bao nhiêu?",
      "Thời gian giao hàng dự kiến",
    ],
  },
  {
    icon: RotateCcw,
    title: "Đổi trả & Hoàn tiền",
    description:
      "Quy trình đổi trả sản phẩm và chính sách hoàn tiền của Zerus.",
    links: [
      "Chính sách đổi trả trong 7 ngày",
      "Làm sao để yêu cầu hoàn tiền?",
      "Sản phẩm bị lỗi khi nhận hàng",
    ],
  },
  {
    icon: CreditCard,
    title: "Thanh toán",
    description: "Các phương thức thanh toán được hỗ trợ và bảo mật.",
    links: [
      "Các phương thức thanh toán khả dụng",
      "Thanh toán qua ví điện tử MoMo/VNPAY",
      "Lỗi khi thanh toán đơn hàng",
    ],
  },
  {
    icon: User,
    title: "Tài khoản & Bảo mật",
    description: "Quản lý thông tin cá nhân, mật khẩu và điểm tích lũy.",
    links: [
      "Quên mật khẩu?",
      "Cách tích điểm và đổi quà",
      "Xác thực tài khoản",
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-stone-50/50 pb-20">
      {/* Hero Search Section */}
      <div className="bg-[#D94E28] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm mb-6 px-4 py-1 font-black uppercase tracking-widest text-[10px]">
            Trung tâm trợ giúp Zerus
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">
            Chúng tôi có thể giúp gì cho bạn?
          </h1>
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 group-focus-within:text-[#D94E28] transition-colors" />
            <Input
              placeholder="Tìm kiếm câu hỏi, hướng dẫn..."
              className="w-full h-16 pl-14 pr-6 rounded-2xl border-0 shadow-2xl text-gray-900 text-lg font-medium focus-visible:ring-4 focus-visible:ring-orange-200"
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="text-xs font-bold text-white/60 uppercase tracking-widest">
              Phổ biến:
            </span>
            {["Giao hàng", "Đổi trả", "Voucher", "Tích điểm"].map((tag) => (
              <button
                key={tag}
                className="text-xs font-bold hover:text-amber-200 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-xl rounded-3xl hover:translate-y-1 transition-all group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-blue-50 rounded-2xl mb-4 group-hover:bg-[#D94E28] transition-colors duration-500">
                <MessageCircle className="h-8 w-8 text-blue-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight mb-2">
                Chat trực tuyến
              </h3>
              <p className="text-xs text-stone-400 font-medium mb-4 leading-relaxed">
                Nhân viên hỗ trợ sẽ phản hồi trong 5 phút
              </p>
              <Button
                size="sm"
                className="w-full bg-stone-900 hover:bg-black text-white font-bold rounded-xl text-[10px] uppercase tracking-widest"
              >
                Bắt đầu chat
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl rounded-3xl hover:translate-y-1 transition-all group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-green-50 rounded-2xl mb-4 group-hover:bg-[#D94E28] transition-colors duration-500">
                <Phone className="h-8 w-8 text-green-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight mb-2">
                Hotline 24/7
              </h3>
              <p className="text-xs text-stone-400 font-medium mb-4 leading-relaxed">
                Gọi miễn phí cước cho mọi thuê bao
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-2 border-stone-100 font-bold rounded-xl text-[10px] uppercase tracking-widest"
              >
                1800 6969
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl rounded-3xl hover:translate-y-1 transition-all group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-orange-50 rounded-2xl mb-4 group-hover:bg-[#D94E28] transition-colors duration-500">
                <Mail className="h-8 w-8 text-[#D94E28] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight mb-2">
                Gửi Email
              </h3>
              <p className="text-xs text-stone-400 font-medium mb-4 leading-relaxed">
                Phản hồi chính thức trong 24h làm việc
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-2 border-stone-100 font-bold rounded-xl text-[10px] uppercase tracking-widest"
              >
                Gửi yêu cầu
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl rounded-3xl hover:translate-y-1 transition-all group">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="p-4 bg-purple-50 rounded-2xl mb-4 group-hover:bg-[#D94E28] transition-colors duration-500">
                <FileText className="h-8 w-8 text-purple-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-black text-gray-900 uppercase tracking-tight mb-2">
                Chính sách
              </h3>
              <p className="text-xs text-stone-400 font-medium mb-4 leading-relaxed">
                Các điều khoản và quy định mua sắm
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-2 border-stone-100 font-bold rounded-xl text-[10px] uppercase tracking-widest"
              >
                Xem chi tiết
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-black uppercase tracking-tight italic mb-10 flex items-center gap-4">
            <span className="h-1 w-12 bg-[#D94E28] rounded-full"></span>
            Chủ đề phổ biến
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FAQ_CATEGORIES.map((cat, i) => (
              <Card
                key={i}
                className="border border-stone-100 shadow-sm rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className="bg-stone-50/50 p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-white rounded-2xl shadow-sm">
                      <cat.icon className="h-8 w-8 text-[#D94E28]" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-black uppercase tracking-tight italic mb-2">
                        {cat.title}
                      </CardTitle>
                      <CardDescription className="font-medium text-stone-500">
                        {cat.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-1">
                    {cat.links.map((link, j) => (
                      <Link
                        key={j}
                        href="#"
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-orange-50 group/link transition-colors"
                      >
                        <span className="text-sm font-bold text-gray-700 group-hover/link:text-[#D94E28] transition-colors">
                          {link}
                        </span>
                        <ChevronRight className="h-4 w-4 text-stone-300 group-hover/link:text-[#D94E28] transition-all group-hover/link:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="mt-20 bg-stone-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-[#D94E28]/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-4">
                Tham gia cộng đồng yêu cà phê Zerus
              </h2>
              <p className="text-white/60 font-medium mb-8 leading-relaxed">
                Cùng chia sẻ kinh nghiệm, nhận ưu đãi độc quyền và tham gia các
                buổi Workshop về cà phê hoàn toàn miễn phí.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button className="bg-[#D94E28] hover:bg-[#BF4423] text-white font-black uppercase tracking-widest px-8 h-12 rounded-xl shadow-2xl shadow-orange-900/40 transition-all active:scale-95">
                  Tham gia Facebook Group
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white/20 hover:bg-white/10 text-white font-black uppercase tracking-widest px-8 h-12 rounded-xl transition-all"
                >
                  Kênh Telegram
                </Button>
              </div>
            </div>
            <div className="w-full md:w-64 h-64 bg-white/5 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm">
              <Star className="h-12 w-12 text-amber-300 mb-4 animate-pulse" />
              <h4 className="font-black uppercase tracking-widest text-xs mb-2">
                Đánh giá App
              </h4>
              <p className="text-[10px] text-white/40 mb-6 uppercase font-bold tracking-widest">
                Hơn 50,000+ đánh giá 5 sao
              </p>
              <Link
                href="#"
                className="text-[#D94E28] font-black uppercase tracking-widest text-[10px] hover:underline flex items-center gap-2"
              >
                Tải ngay App <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
