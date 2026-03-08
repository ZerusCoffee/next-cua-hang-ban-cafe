"use client";

import { useEffect, useRef, useState } from "react";
import { productService } from "@/services/product-service";
import LoadingSpinner from "./loading-spinner";
import { productLimit } from "@/app/constants/const";
import { ProductCardType } from "@/types/product.type";
import InfiniteProductList from "./infinite-scroll";

export default function LazyCategoryProducts({
    categoryId,
}: {
    categoryId: number;
}) {
    const ref = useRef<HTMLDivElement | null>(null);

    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState<ProductCardType[]>([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (!entry.isIntersecting || loaded) return;
                // alert("giờ fetch nè hihi")
                const res = await productService.getProducts({
                    category_id: categoryId,
                    page: 1,
                    limit: productLimit,
                });

                const items = res.data?.items || [];
                const pagination = res.data?.pagination;

                setProducts(items);
                setHasMore(pagination?.hasMore ?? false);
                setLoaded(true);
            },
            { rootMargin: "600px" }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [categoryId, loaded]);

    if (!loaded) {
        return (
            <div ref={ref} className="py-12">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <InfiniteProductList
            categoryId={categoryId}
            initialProducts={products}
            initialHasMore={hasMore}
        />
    );
}