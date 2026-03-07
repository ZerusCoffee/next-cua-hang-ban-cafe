import { ApiResponse } from "@/types/common/response.type";
import { ProductCardType } from "@/types/product.type";
import { fetcher } from "@/utils/fetcher";

export const productService = {
    getFeatured: (): Promise<ApiResponse<ProductCardType[]>> => {
        return fetcher("/product/featured");
    },

    getNewest: (): Promise<ApiResponse<ProductCardType[]>> => {
        return fetcher("/product/newest");
    }

}