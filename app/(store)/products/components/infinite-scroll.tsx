"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { productService } from "@/services/product-service";
import { ProductCardType } from "@/types/product.type";
import ProductGrid from "./product-grid";
import LoadingSpinner from "./loading-spinner";
import TriggerBar from "./trigger-bar";
import EmptyCategory from "./empty-category";
import { productLimit } from "@/app/constants/const";

export default function InfiniteProductList({
    categoryId,
    initialProducts,
    initialHasMore,
}: {
    categoryId: number;
    initialProducts: ProductCardType[];
    initialHasMore: boolean;
}) {
    const [products, setProducts] = useState(initialProducts);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loading, setLoading] = useState(false);

    const ref = useRef<HTMLDivElement | null>(null);

    const loadMore = useCallback(async () => {
        if (!hasMore || loading) return;

        setLoading(true);

        const res = await productService.getProducts({
            category_id: categoryId,
            page,
            limit: productLimit,
        });

        const newProducts = res.data?.items || [];
        const pagination = res.data?.pagination;

        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(pagination?.hasMore ?? false);
        setPage((prev) => prev + 1);

        setLoading(false);
    }, [page, hasMore, loading, categoryId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) loadMore();
            },
            { rootMargin: "300px", }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div className="space-y-6">
            {/* Product grid */}
            <ProductGrid products={products} />

            {/* Loading indicator for infinite scroll */}
            {hasMore && (
                <div ref={ref} className="w-full py-8">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <TriggerBar />
                    )}
                </div>
            )}


            {/* Empty state (if no products) */}
            {!hasMore && products.length === 0 && (
                <EmptyCategory />
            )}
        </div>
    );
}