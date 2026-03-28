// app/products/_components/category-mode.tsx
import { ProductQueryParams } from "@/types/product.type";
import { Category } from "@/types/category.type";
import { ApiResponse } from "@/types/common/response.type";
import { Paginated } from "@/types/common/pagination.type";
import { ProductCardType } from "@/types/product.type";
import ProductPageHeader from "./product-page-header";
import FilterBar from "./filter-bar";
import CategorySection from "./category-section";
import InfiniteProductList from "./infinite-product-list";

interface NoneSearchProductsProps {
    categories: Category[];
    productResults: ApiResponse<Paginated<ProductCardType>>[];
    filters: ProductQueryParams;
}

export function NoneSearchProducts({ categories, productResults, filters }: NoneSearchProductsProps) {
    return (
        <div className="min-h-screen bg-linear-to-b to-amber-50 from-white">
            <ProductPageHeader />
            <FilterBar />

            <div className="max-w-7xl mx-auto px-2 pb-16 mt-8">
                <div className="space-y-16">
                    {categories.map((category, index) => {
                        const data = productResults[index];

                        return (
                            <CategorySection key={category.id} category={category}>
                                <InfiniteProductList
                                    params={{ ...filters, category_id: category.id }}
                                    initialData={data}
                                />
                            </CategorySection>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}