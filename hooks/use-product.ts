"use client";

import useSWR from "swr";
import { productService } from "@/services/product-service";
import { ProductCardType, ProductQueryParams } from "@/types/product.type";
import useSWRInfinite from "swr/infinite";
import { productLimit } from "@/app/constants/const";
import { Paginated } from "@/types/common/pagination.type";
import { ApiResponse } from "@/types/common/response.type";


export function useGetProducts(params?: ProductQueryParams) {
    const { data, error, isLoading, mutate } = useSWR(
        params ? ["products", params] : null,
        () => productService.getProducts(params!)
    );

    return {
        data,
        isLoading,
        isError: error,
        mutate,
    };
}

type Key = readonly [string, ProductQueryParams];

export function useInfiniteProducts(
    params: ProductQueryParams,
    initialData?: ApiResponse<Paginated<ProductCardType>>
    ) {
    const getKey = (
        pageIndex: number,
        prev: ApiResponse<Paginated<ProductCardType>> | null
    ): Key | null => {
        if (prev && !prev.data?.pagination?.hasMore) return null;

        return [
        "products",
        {
            ...params,
            page: pageIndex + 1,
            limit: productLimit,
        },
        ];
    };

    const { data, setSize, isValidating } = useSWRInfinite(
        getKey,
        ([, query]: Key) => productService.getProducts(query),
        {
        fallbackData: initialData ? [initialData] : undefined,
        revalidateFirstPage: false,
        }
    );

    const products =
        data?.flatMap((pageData) => pageData.data?.items ?? [] ) ?? [];

    const hasMore =
        data?.[data.length - 1]?.data?.pagination?.hasMore ?? false;

    const loadMore = () => setSize((s) => s + 1);

    return {
        products,
        hasMore,
        isLoadingMore: isValidating,
        loadMore,
    };
}

export function useGetMaxPrice() {
    const { data, error, isLoading, mutate } = useSWR(
        'max-price',
        () => productService.getMaxPrice()
    );

    return {
        data,
        isLoading,
        isError: error,
        mutate,
    };
}
