"use client";

import { useEffect, useRef } from "react";
import ProductGrid from "./product-grid";
import LoadingSpinner from "./loading-spinner";
import { useInfiniteProducts } from "@/hooks/use-product";
import { ApiResponse } from "@/types/common/response.type";
import { Paginated } from "@/types/common/pagination.type";
import { ProductCardType, ProductQueryParams } from "@/types/product.type";


export default function InfiniteProductList({
    params,
    initialData
}: {
    params: ProductQueryParams,
    initialData?: ApiResponse<Paginated<ProductCardType>>
}) {
    const ref = useRef<HTMLDivElement | null>(null);

    const { products, hasMore, isLoadingMore, loadMore } =
        useInfiniteProducts(
            params
            , initialData);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !isLoadingMore) {
                    loadMore();
                }
            },
            { rootMargin: "300px" }
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => observer.disconnect();
    }, [loadMore, hasMore, isLoadingMore]);

    return (
        <div className="space-y-6">
            <ProductGrid products={products} />

            {hasMore && (
                <div ref={ref} className="py-8">
                    {isLoadingMore && <LoadingSpinner />}
                </div>
            )}
        </div>
    );
}