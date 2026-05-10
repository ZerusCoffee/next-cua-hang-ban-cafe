"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MessageSquare,
  Package,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Mock data
const REVIEWS = [
  {
    id: 1,
    productName: "Cà Phê Arabica Cầu Đất",
    productImage:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    comment:
      "Cà phê rất thơm, vị đắng thanh, đúng chuẩn Arabica. Đóng gói rất cẩn thận và giao hàng nhanh.",
    date: "15/03/2026",
    status: "approved",
  },
  {
    id: 2,
    productName: "Dụng Cụ Pha Cà Phê V60",
    productImage:
      "https://images.unsplash.com/photo-1544787210-28272ca58219?q=80&w=2070&auto=format&fit=crop",
    rating: 4,
    comment:
      "Sản phẩm tốt, phễu sứ dày dặn. Tuy nhiên hộp hơi bị móp một chút khi vận chuyển.",
    date: "02/02/2026",
    status: "approved",
  },
];

const PENDING_REVIEWS = [
  {
    id: 101,
    productName: "Máy Pha Cà Phê Espresso Simonelli",
    productImage:
      "https://images.unsplash.com/photo-1517668808822-9eaa02f2a9e0?q=80&w=2052&auto=format&fit=crop",
    orderDate: "05/05/2026",
    orderNumber: "ORD-2026-8892",
  },
];

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("reviewed");

  return (
    <div className="space-y-6 pt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đánh giá của bạn</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý và xem lại các đánh giá sản phẩm đã mua
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="reviewed"
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-md bg-stone-100 p-1 rounded-xl">
          <TabsTrigger
            value="reviewed"
            className="rounded-lg font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#D94E28] data-[state=active]:shadow-sm"
          >
            Đã đánh giá ({REVIEWS.length})
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="rounded-lg font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-[#D94E28] data-[state=active]:shadow-sm"
          >
            Chưa đánh giá ({PENDING_REVIEWS.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reviewed" className="space-y-4 outline-none">
          {REVIEWS.length > 0 ? (
            REVIEWS.map((review) => (
              <Card
                key={review.id}
                className="border shadow-sm overflow-hidden hover:border-[#D94E28]/30 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 bg-stone-50 border-r border-stone-100 p-4 flex flex-col items-center justify-center text-center">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md mb-3">
                        <Image
                          src={review.productImage}
                          alt={review.productName}
                          fill
                          sizes="(max-width: 768px) 100vw, 96px"
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-xs font-black text-gray-900 line-clamp-2 mb-2 uppercase tracking-tight">
                        {review.productName}
                      </h4>
                      <Link
                        href="#"
                        className="text-[10px] font-bold text-[#D94E28] hover:underline flex items-center gap-1"
                      >
                        Xem sản phẩm <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4 fill-current",
                                i < review.rating
                                  ? "text-amber-400"
                                  : "text-stone-200",
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                          <Clock className="h-3 w-3" /> {review.date}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed italic mb-4">
                        &quot;{review.comment}&quot;
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[9px] font-black px-2 py-0.5"
                        >
                          ĐÃ DUYỆT
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs font-bold text-stone-400 hover:text-[#D94E28]"
                        >
                          Sửa đánh giá
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
              <MessageSquare className="h-12 w-12 text-stone-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Chưa có đánh giá nào
              </h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Chia sẻ trải nghiệm của bạn về sản phẩm để giúp những người mua
                khác nhé!
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 outline-none">
          {PENDING_REVIEWS.length > 0 ? (
            PENDING_REVIEWS.map((pending) => (
              <Card
                key={pending.id}
                className="border shadow-sm overflow-hidden border-orange-100 bg-orange-50/10"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg shrink-0">
                      <Image
                        src={pending.productImage}
                        alt={pending.productName}
                        fill
                        sizes="(max-width: 768px) 96px, 96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">
                          {pending.productName}
                        </h3>
                        <Badge
                          variant="outline"
                          className="w-fit mx-auto md:mx-0 bg-white border-orange-200 text-[#D94E28] text-[10px] font-bold"
                        >
                          ĐƠN HÀNG {pending.orderNumber}
                        </Badge>
                      </div>
                      <p className="text-xs text-stone-500 mb-4 font-medium">
                        Bạn đã nhận hàng vào ngày {pending.orderDate}. Hãy đánh
                        giá ngay để nhận được{" "}
                        <span className="text-[#D94E28] font-bold">
                          10 điểm tích lũy
                        </span>
                        !
                      </p>
                      <Button className="bg-[#D94E28] hover:bg-[#BF4423] text-white font-black uppercase tracking-widest text-[10px] h-10 px-8 rounded-xl shadow-lg shadow-orange-200 group">
                        Đánh giá ngay
                        <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
              <Package className="h-12 w-12 text-stone-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Tất cả sản phẩm đã được đánh giá
              </h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Cảm ơn bạn đã đóng góp ý kiến cho cộng đồng yêu cà phê của
                Zerus!
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
