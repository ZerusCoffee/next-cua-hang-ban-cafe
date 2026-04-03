// components/filter-bar.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import SearchInput from './filter/search-input';
import CategorySelects from './filter/category-select';
import SorSelect from './filter/sort-select';
import { useGetCategory } from '@/hooks/use-category';
import { useGetMaxPrice } from '@/hooks/use-product';
import PriceSlider from './filter/price-slider';
import { roundToNearest5k } from '@/lib/utils';
import FilterFooter from './filter/filter-footer';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import CategoryButton from './filter/category-button';

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
    const maxPrice = maxPriceData?.data ? roundToNearest5k(maxPriceData?.data) : 100000;

    const [searchTerm, setSearchTerm] = useState(searchTermParam);

    const [priceRange, setPriceRange] = useState<[number, number]>([
        minPriceParam,
        maxPriceParam
    ]);

    const [category, setCategory] = useState(categoryParam);

    const [sortBy, setSortBy] = useState(sortByParam);

    // 2 state riêng biệt
    const [showCategories, setShowCategories] = useState(true); // State cho phần category
    const [showFilters, setShowFilters] = useState(false);     // State cho phần filter options

    // Cập nhật priceRange khi có maxPrice từ API
    useEffect(() => {
        setSearchTerm(searchTermParam);
        if (maxPriceData?.data) {
            setPriceRange([0, maxPrice]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxPriceData?.data, searchTermParam]);

    const handleApplyFilters = () => {
        const filters = {
            searchName: searchTerm,
            minPrice: priceRange[0] > 0 && priceRange[0],
            maxPrice: priceRange[1] < maxPrice && priceRange[1],
            categoryId: category !== 'all' && category,
            sortBy: sortBy !== 'default' && sortBy
        }

        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                {
                    params.set(key, value.toString())
                }
            }
        })
        router.push(`?${params.toString()}`);
        setShowFilters(!showFilters)
    }


    const handleReset = () => {
        setSearchTerm('');
        setPriceRange([0, maxPrice]);
        setCategory('all');
        setSortBy('default');
    };


    const findByCategory = (categoryId: string) => {
        const params = new URLSearchParams();

        if (searchTerm) params.set('searchName', searchTerm);
        if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
        if (priceRange[1] < maxPrice) params.set('maxPrice', priceRange[1].toString());
        if (categoryId !== 'all') params.set('categoryId', categoryId);
        if (sortBy !== 'default') params.set('sortBy', sortBy);

        router.push(`?${params.toString()}`);
        setShowFilters(false);

        setCategory(categoryId);
    };

    return (
        <>
            <div className="bg-white border-y shadow-sm sticky top-12 md:top-20 z-40">

                {/* Phần Category Buttons - Có thể đóng/mở độc lập */}
                <div className='px-4 py-4 border-b-2 border-amber-300'>
                    {/* Nút toggle cho category */}
                    <div
                        className="flex items-center justify-center cursor-pointer hover:bg-gray-50 px-2 py-1 space-x-2"
                        onClick={() => setShowCategories(!showCategories)}
                    >
                        <span className="font-medium text-md">Danh mục sản phẩm</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${showCategories ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* Category buttons với animation */}
                    <div className={`
                        transition-all duration-300 overflow-hidden
                        ${showCategories ? 'max-h-115 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                        {
                            categories.length > 0 && (
                                <ScrollArea type='always' className="w-full py-2">
                                    <div className="flex justify-center items-center gap-3 py-2">
                                        <CategoryButton
                                            label='Tất cả'
                                            handleClick={() => findByCategory(`all`)}
                                            isSelect={category === 'all'}
                                        />
                                        {categories.map((cat, index) => (
                                            <CategoryButton
                                                label={cat.name}
                                                key={index + cat.id}
                                                handleClick={() => findByCategory(`${cat.id}`)}
                                                isSelect={category === cat.id.toString()}
                                            />
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" className="opacity-100" />
                                </ScrollArea>
                            )
                        }
                    </div>
                </div>

                {/* Phần Filter Options */}
                <div className="max-w-7xl mx-auto px-4 py-3">
                    {/* Nút toggle cho filter options */}
                    <div className="flex items-center justify-center gap-2 ">
                        <Button
                            variant="outline"
                            className="p-4 cursor-pointer"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <span className=''>{showFilters ? 'Ẩn' : 'Hiện'} bộ lọc tìm kiếm</span>
                            <Filter className="h-16 w-16" />
                        </Button>
                    </div>

                    {/* Filter options với animation */}
                    <div className={`
                        transition-all duration-300 overflow-hidden
                        ${showFilters ? 'md:max-h-70 sm:max-h-120 opacity-100 mt-4' : 'max-h-0 opacity-0'}
                    `}>
                        <div className="flex items-center gap-2 my-6 mx-1">
                            <SearchInput
                                searchValue={searchTerm}
                                onSearchChange={setSearchTerm}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <CategorySelects
                                categories={categories}
                                category={category}
                                setCategory={setCategory}
                            />
                            <SorSelect
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                            />
                            <PriceSlider
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                maxPrice={maxPrice}
                            />
                        </div>
                        {/* Action Buttons */}
                        <FilterFooter
                            handleReset={handleReset}
                            handleApplyFilters={handleApplyFilters}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}