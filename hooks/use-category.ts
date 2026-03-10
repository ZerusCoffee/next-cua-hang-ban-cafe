import { categoryService } from "@/services/category-service";
import useSWR from "swr";

export function useGetCategory() {
    const { data, error, isLoading, mutate } = useSWR(
        'category-all',
        () => categoryService.getAllCategory()
    );

    return {
        data,
        isLoading,
        isError: error,
        mutate,
    };
}