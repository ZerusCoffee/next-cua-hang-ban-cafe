import { Category } from "@/types/category.type";
import { ApiResponse } from "@/types/common/response.type";
import { fetcher } from "@/utils/fetcher";

export const categoryService = {
    getAllCategory: async(isCache ?: boolean) : Promise<ApiResponse<Category[]>> => {
        return fetcher("/category", isCache)
    }
}