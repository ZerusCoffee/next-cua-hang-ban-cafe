"use client";

import { useProductSuggestions } from "@/hooks/useProductSuggestions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "./IconSearch";

export default function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { suggestions, loading } = useProductSuggestions(query);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?searchName=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleSelectProduct = (slug: string) => {
    router.push(`/products/${slug}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-sm ml-4" ref={containerRef}>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400 group-focus-within:text-amber-600 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Tìm sản phẩm..."
          className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 placeholder:text-gray-500 text-gray-900 shadow-xs"
        />
      </form>

      {/* Gợi ý sản phẩm */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-60 overflow-hidden">
          {loading ? (
            <div className="p-4 text-center text-xs text-gray-400 font-medium">
              <div className="animate-pulse flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                <div className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto custom-scrollbar">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="flex items-center gap-3 p-3 hover:bg-amber-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className="relative h-10 w-10 shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <SearchIcon className="h-4 w-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-[10px] font-black text-[#D94E28] uppercase">
                      {Number(product.price).toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
              Không tìm thấy sản phẩm
            </div>
          )}
        </div>
      )}
    </div>
  );
}
