'use client'
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useState } from 'react';
import { ProductCardType } from '@/types/product.type';

export default function ProductCard({ product }: { product: ProductCardType }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/product/${product.id}`} className="no-underline hover:no-underline block h-full">
      <div
        className="relative bg-white rounded-xl sm:rounded-2xl transition-all duration-300 group cursor-pointer overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hình ảnh sản phẩm */}
        <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden bg-linear-to-tr from-amber-50 to-emerald-50">
          <Image
            src={`/assets/images/mask-img.png`}
            alt={product.name}
            width={250}
            height={250}
            className={`w-full h-full object-contain p-2 sm:p-3 md:p-4 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />

        </div>

        {/* Thông tin sản phẩm */}
        <div className="p-2 sm:p-3 md:p-4 flex-1 flex flex-col">
          {/* Đánh giá và đã bán */}
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < Math.floor(4)
                      ? 'text-amber-600 fill-amber-600'
                      : 'text-amber-200'
                      }`}
                  />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs text-amber-700/70 ml-1">({product.viewCount})</span>
            </div>
          </div>

          {/* Tên sản phẩm */}
          <h3 className="text-sm sm:text-base font-semibold text-amber-900 line-clamp-2 mb-1 group-hover:text-amber-700 transition-colors min-h-10 sm:min-h-12]">
            {product.name}
          </h3>

          {/* Mô tả ngắn */}
          <p className="hidden sm:block text-xs sm:text-sm text-amber-700/60 line-clamp-2 mb-2 sm:mb-3">
            {product.shortDescription}
          </p>

          {/* Giá và nút thêm vào giỏ */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-base sm:text-lg font-bold text-amber-800">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Nút thêm vào giỏ */}
            <Button
              className={`rounded-full p-1.5 sm:p-2 h-8 w-8 sm:h-10 sm:w-10 transition-all duration-300 cursor-pointer ${isHovered
                ? 'bg-amber-700 text-white scale-110 hover:bg-amber-700 hover:text-white'
                : 'bg-amber-100 text-amber-800 hover:bg-amber-200 hover:text-amber-900'
                }`}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}