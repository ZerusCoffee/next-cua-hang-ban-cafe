import { Paginated } from "@/types/common/pagination.type";
import { ApiResponse } from "@/types/common/response.type";
import { ProductCardType, ProductQueryParams } from "@/types/product.type";
import { fetcher } from "@/utils/fetcher";

export const productService = {
    getFeatured: async (): Promise<ApiResponse<ProductCardType[]>> => {
        return fetcher("/product/featured");
    },

    getNewest: async (): Promise<ApiResponse<ProductCardType[]>> => {
        return fetcher("/product/newest");
    },

    getProducts: async (params?: ProductQueryParams) : Promise<ApiResponse<Paginated<ProductCardType>>> => {
        const query = new URLSearchParams(
            Object.entries(params ?? {}).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = String(value)
            }
            return acc
            }, {} as Record<string, string>)
        )

        return fetcher(`/product?${query.toString()}`)
    },

    getMaxPrice: async () : Promise<ApiResponse<number>> => {
        return fetcher("/product/max-price");
    }

}