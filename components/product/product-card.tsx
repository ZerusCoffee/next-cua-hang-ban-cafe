"use client";
import { formatPrice } from "@/lib/utils";
import { ProductCardType } from "@/types/product.type";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function ProductCard({ product }: { product: ProductCardType }) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldPrefetch, setShouldPrefetch] = useState(false);

  if (!product) return;

  const outOfStock = product.inStock === false;

  return (
    <Link
      href={`/products/${product.slug}`}
      prefetch={shouldPrefetch}
      className="no-underline hover:no-underline block h-full"
      onMouseEnter={() => {
        if (!shouldPrefetch) setShouldPrefetch(true);
      }}
    >
      <div
        className="relative bg-white rounded-xl border border-amber-300 hover:border-amber-500 transition-all duration-200 group cursor-pointer overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hình ảnh sản phẩm */}
        <div className="relative h-40 md:h-65 overflow-hidden bg-amber-100">
          <Image
            src={product.primaryImage ?? `/assets/images/mask-img.png`}
            alt={product.name}
            width={350}
            height={350}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            } ${outOfStock ? "opacity-50 grayscale" : ""}`}
            unoptimized
          />

          {/* Badge hết hàng */}
          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-gray-800/70 text-white text-xs font-bold px-3 py-1 rounded-full">
                Hết hàng
              </span>
            </div>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col bg-linear-to-b from-white to-amber-50/30">
          {/* Đánh giá và đã bán */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                      i < Math.floor(4)
                        ? "text-amber-500 fill-amber-500"
                        : "text-amber-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-amber-700 ml-1">
                ({product.viewCount})
              </span>
            </div>
          </div>

          {/* Tên sản phẩm */}
          <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1 mb-0.5">
            {product.name}
          </h3>

          {/* Mô tả ngắn */}
          <p className="text-xs text-amber-800/80 line-clamp-1 mb-2 font-medium">
            {product.shortDescription}
          </p>

          {/* Giá và nút */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-amber-200">
            <span className="text-sm md:text-base font-extrabold text-amber-900">
              {formatPrice(product.price)}
            </span>
            <Button
              disabled={outOfStock}
              className={`px-1 md:px-4 md:py-1.5 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                outOfStock
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : isHovered
                    ? "bg-amber-600 text-white hover:bg-amber-700 shadow-lg"
                    : "bg-amber-500 text-white hover:bg-amber-600 shadow-md"
              }`}
            >
              {outOfStock ? "Hết hàng" : "Xem ngay"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
