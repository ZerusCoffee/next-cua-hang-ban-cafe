"use client";

import { useCart } from "@/services/cart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface CartButtonProps {
  className?: string;
  onClick?: () => void;
}

export function CartButton({ className = "", onClick }: CartButtonProps) {
  const { cart } = useCart();
  const itemCount = cart?.count || 0;

  return (
    <Link href="/cart" onClick={onClick} className="relative inline-block">
      <div
        className={`p-2 rounded-lg hover:bg-amber-700 cursor-pointer transition-colors ${className}`}
      >
        <ShoppingCartIcon className="h-5 w-5" />

        {/* Badge đỏ hiển thị số lượng ở góc trên bên phải */}
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1 border-2 border-white shadow-lg">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </div>
    </Link>
  );
}
