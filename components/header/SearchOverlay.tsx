"use client";

import { useProductSuggestions } from "@/hooks/useProductSuggestions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "./IconSearch";

interface SearchOverlayProps {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const { suggestions, loading } = useProductSuggestions(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?searchName=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSelectProduct = (slug: string) => {
    router.push(`/products/${slug}`);
    onClose();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-12 bg-white/95 backdrop-blur-sm z-50">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm, bài viết..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-3 rounded-xl border bg-white border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg p-3 text-sm text-gray-400 z-50">
            Đang tìm kiếm...
          </div>
        )}

        {/* Gợi ý sản phẩm */}
        {suggestions.length > 0 && !loading && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-xl z-50 max-h-80 overflow-auto">
            {suggestions.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSelectProduct(product.slug)}
                className="flex items-center gap-3 p-3 hover:bg-amber-50 cursor-pointer transition-colors"
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {product.name}
                  </p>
                  <p className="text-xs text-amber-600">
                    {Number(product.price).toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}
