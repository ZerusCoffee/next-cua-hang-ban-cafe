"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetCategory } from "@/hooks/use-category";
import { useGetMaxPrice } from "@/hooks/use-product";
import { cn, roundToNearest5k } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

import CategoryButton from "./filter/category-button";
import CategorySelects from "./filter/category-select";
import PriceSlider from "./filter/price-slider";
import SearchInput from "./filter/search-input";
import SorSelect from "./filter/sort-select";

const ANNOUNCEMENT_KEY = "hide_top_announcement";

export default function FilterBar() {
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("categoryId") ?? "all";
  const sortByParam = searchParams.get("sortBy") ?? "default";
  const searchTermParam = searchParams.get("searchName") ?? "";
  const minPriceParam = Number(searchParams.get("minPrice") ?? 0);
  const maxPriceParam = Number(searchParams.get("maxPrice") ?? 100000);

  const router = useRouter();

  const { data: categoryData } = useGetCategory();
  const categories = categoryData?.data || [];

  const { data: maxPriceData } = useGetMaxPrice();

  const maxPrice = maxPriceData?.data
    ? roundToNearest5k(maxPriceData.data)
    : 100000;

  const [searchTerm, setSearchTerm] = useState(searchTermParam);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceParam,
    maxPriceParam,
  ]);

  const [category, setCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState(sortByParam);

  const [showFilters, setShowFilters] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(false);

  useEffect(() => {
    const checkAnnouncement = () => {
      if (typeof window !== "undefined") {
        const isHidden = sessionStorage.getItem(ANNOUNCEMENT_KEY);

        const shouldBeVisible = !isHidden;

        setIsAnnouncementVisible((prev) => {
          if (prev === shouldBeVisible) return prev;
          return shouldBeVisible;
        });
      }
    };

    checkAnnouncement();

    const interval = setInterval(checkAnnouncement, 500);

    return () => clearInterval(interval);
  }, []);

  // Sync local state with URL params
  const prevSearchTermParam = useRef(searchTermParam);
  const prevCategoryParam = useRef(categoryParam);

  useEffect(() => {
    if (prevSearchTermParam.current !== searchTermParam) {
      prevSearchTermParam.current = searchTermParam;

      startTransition(() => {
        setSearchTerm(searchTermParam);
      });
    }

    if (prevCategoryParam.current !== categoryParam) {
      prevCategoryParam.current = categoryParam;

      startTransition(() => {
        setCategory(categoryParam);
      });
    }
  }, [searchTermParam, categoryParam]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("searchName", searchTerm);
    }

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString());
    }

    if (priceRange[1] < maxPrice) {
      params.set("maxPrice", priceRange[1].toString());
    }

    if (category !== "all") {
      params.set("categoryId", category);
    }

    if (sortBy !== "default") {
      params.set("sortBy", sortBy);
    }

    router.push(`?${params.toString()}`);

    setShowFilters(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    setPriceRange([0, maxPrice]);
    setCategory("all");
    setSortBy("default");
  };

  const findByCategory = (categoryId: string) => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("searchName", searchTerm);
    }

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString());
    }

    if (priceRange[1] < maxPrice) {
      params.set("maxPrice", priceRange[1].toString());
    }

    if (categoryId !== "all") {
      params.set("categoryId", categoryId);
    }

    if (sortBy !== "default") {
      params.set("sortBy", sortBy);
    }

    const hash = categoryId !== "all" ? `#category-${categoryId}` : "";

    router.push(`?${params.toString()}${hash}`);

    setCategory(categoryId);
  };

  // Sticky offset
  const getStickyTop = () => {
    if (isAnnouncementVisible) {
      return "top-[56px] md:top-[104px]";
    }

    return "top-[56px] md:top-[64px]";
  };

  return (
    <>
      {/* FILTER PANEL */}
      <div className="bg-white border-b border-stone-100 px-4 py-4 relative z-10">
        <div className="container mx-auto flex flex-col items-center gap-4">
          {/* Toggle Button */}
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              className="h-11 px-5 rounded-xl border border-stone-200 hover:border-amber-300 transition-all font-semibold text-gray-600"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>
                {showFilters ? "Ẩn" : "Hiện"} bộ lọc tìm kiếm
              </span>

              <SlidersHorizontal className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Filters */}
          <div
            className={cn(
              "w-full max-w-6xl transition-all duration-300 overflow-hidden",
              showFilters ? "max-h-125 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-center gap-5 space-x-12 pt-3">
              {/* Search */}
              <div>
                <SearchInput
                  searchValue={searchTerm}
                  onSearchChange={setSearchTerm}
                />
              </div>

              {/* Category */}
              <CategorySelects
                categories={categories}
                category={category}
                setCategory={setCategory}
              />

              {/* Sort */}
              <SorSelect sortBy={sortBy} setSortBy={setSortBy} />

              {/* Price */}
              <div className="w-80">

                <PriceSlider
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  maxPrice={maxPrice}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 mb-2 flex justify-center gap-2">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="font-semibold text-stone-400"
              >
                Đặt lại
              </Button>

              <Button
                onClick={handleApplyFilters}
                className="bg-stone-900 text-white font-semibold px-7 rounded-xl hover:bg-black"
              >
                Lọc kết quả
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORY SCROLL */}
      <div
        className={cn(
          "bg-white/95 backdrop-blur-md border-b border-stone-100 sticky z-30 transition-all duration-300",
          getStickyTop(),
        )}
      >
        <div className="relative group/scroll">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-white to-transparent z-10 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity md:hidden" />

          <ScrollArea className="w-full">
            <div className="flex items-center justify-start md:justify-center gap-2 px-4 py-3">
              <CategoryButton
                label="Tất cả"
                handleClick={() => findByCategory("all")}
                isSelect={category === "all"}
              />

              {categories.map((cat) => (
                <CategoryButton
                  key={cat.id}
                  label={cat.name}
                  handleClick={() => findByCategory(`${cat.id}`)}
                  isSelect={category === cat.id.toString()}
                />
              ))}
            </div>

            <ScrollBar
              orientation="horizontal"
              className="h-1 bg-stone-100"
            />
          </ScrollArea>

          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-white to-transparent z-10 pointer-events-none opacity-0 group-hover/scroll:opacity-100 transition-opacity md:hidden" />
        </div>
      </div>
    </>
  );
}