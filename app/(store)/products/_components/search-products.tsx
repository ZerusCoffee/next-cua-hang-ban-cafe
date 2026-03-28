// app/products/_components/search-mode.tsx
import { ProductQueryParams } from "@/types/product.type";
import { Category } from "@/types/category.type";
import { ApiResponse } from "@/types/common/response.type";
import { Paginated } from "@/types/common/pagination.type";
import { ProductCardType } from "@/types/product.type";
import ProductPageHeader from "./product-page-header";
import FilterBar from "./filter-bar";
import CategorySection from "./category-section";
import InfiniteProductList from "./infinite-product-list";

interface SearchProductsProps {
    title: string;
    category?: Category | null | undefined;
    result: ApiResponse<Paginated<ProductCardType>>;
    filters: ProductQueryParams;
}

export function SearchProducts({ title, category, result, filters }: SearchProductsProps) {
    return (
        <div className="min-h-screen bg-[#faf7f2]">
            <ProductPageHeader />
            <FilterBar />

            <div className="flex items-center justify-center p-3 mt-8 gap-2 text-gray-600">
                <span className="text-3xl font-bold">{title}</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-16 mt-8">
                {category ? (
                    <CategorySection category={category}>
                        <InfiniteProductList
                            initialData={result}
                            params={filters}
                        />
                    </CategorySection>
                ) : (
                    <InfiniteProductList
                        initialData={result}
                        params={filters}
                    />
                )}
            </div>
        </div>
    );
}