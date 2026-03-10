"use client";
import { formatPrice } from "@/lib/utils";
import { addItemToCart, useCart } from "@/services/cart";
import { ProductCardType } from "@/types/product.type";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function ProductCard({ product }: { product: ProductCardType }) {
  const [isHovered, setIsHovered] = useState(false);

  const { mutate } = useCart();

  const handleAddtoCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await addItemToCart({
        product_id: product.id,
        quantity: 1,
      });
      await mutate();
      toast.success("Đã thêm vào giỏ hàng");
    } catch (error) {
      toast.error("Thêm thất bại" + error);
    }
  };
  return (
    <Link
      href={`/product/${product.slug}`}
      className="no-underline hover:no-underline block h-full"
    >
      <div
        className="relative bg-white rounded-xl border border-green-200 hover:border-green-300 transition-all duration-200 group cursor-pointer overflow-hidden h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hình ảnh sản phẩm */}
        <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden bg-green-50">
          <Image
            src={`/assets/images/mask-img.png`}
            alt={product.name}
            width={250}
            height={250}
            className={`w-full h-full object-contain p-2 sm:p-3 md:p-4 transition-all duration-200 ${isHovered ? "scale-105" : "scale-100"}`}
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
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                      i < Math.floor(4)
                        ? "text-green-600 fill-green-600"
                        : "text-green-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs text-green-600 ml-1">
                ({product.viewCount})
              </span>
            </div>
          </div>

          {/* Tên sản phẩm */}
          <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 mb-1 min-h-10 sm:min-h-12">
            {product.name}
          </h3>

          {/* Mô tả ngắn */}
          <p className="hidden sm:block text-xs text-green-700/70 line-clamp-2 mb-2 sm:mb-3">
            {product.shortDescription}
          </p>

          {/* Giá và nút thêm vào giỏ */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-base sm:text-lg font-semibold text-green-800">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Nút thêm vào giỏ */}
            <Button
              className={`rounded-full p-1.5 sm:p-2 h-8 w-8 sm:h-9 sm:w-9 transition-all duration-200 ${
                isHovered
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
              onClick={handleAddtoCart}
            >
              <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
