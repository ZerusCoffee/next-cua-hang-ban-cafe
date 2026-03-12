import { categoryService } from "@/services/category-service";
import { productService } from "@/services/product-service";

import { productLimit } from "@/app/constants/const";
import CategorySection from "./components/category-section";
import InfiniteProductList from "./components/infinite-product-list";
import LazyCategoryProducts from "./components/lazy-category-product";
import ProductPageHeader from "./components/product-page-header";
import FilterBar from "./components/filter-bar";

import { Paginated } from "@/types/common/pagination.type";
import { ProductCardType, ProductQueryParams } from "@/types/product.type";
import { Category } from "@/types/category.type";
import { ApiResponse } from "@/types/common/response.type";

type SearchParamsProps = {
  searchParams: Promise<{
    searchName?: string;
    minPrice?: string;
    maxPrice?: string;
    categoryId?: string;
    sortBy?: string;
  }>;
};

export default async function Page({ searchParams }: SearchParamsProps) {

  const params = await searchParams;

  const {
    searchName,
    minPrice,
    maxPrice,
    categoryId,
    sortBy
  } = params;

  const hasFilter = Object.values(params).some(Boolean);

  /* ================= SEARCH MODE ================= */

  if (hasFilter) {
    const filters = {
      name: searchName,
      min_price: minPrice ? parseFloat(minPrice) : undefined,
      max_price: maxPrice ? parseFloat(maxPrice) : undefined,
      category_id: categoryId ? parseInt(categoryId) : undefined,
      sort_by: sortBy,
      page: 1,
      limit: productLimit
    }

    const result = await productService.getProducts(filters);

    return (
      <div className="min-h-screen bg-[#faf7f2]">

        <ProductPageHeader />

        <FilterBar />

        <div className="flex items-center justify-center p-3 mt-8 gap-2 text-gray-600">
          <span className="text-3xl font-bold"> Kết quả tìm thấy</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-16 mt-8">

          <InfiniteProductList
            initialData={result}
            params={filters}
          />

        </div>

      </div>
    );
  }




  /* ================= CATEGORY MODE ================= */

  const res = await categoryService.getAllCategory();
  const categories: Category[] = res.data || [];

  const ssrCategories = categories.slice(0, 3);
  const lazyCategories = categories.slice(3);
  const filter: ProductQueryParams = {}

  const productResults: ApiResponse<Paginated<ProductCardType>>[] =
    await Promise.all(
      ssrCategories.map((category) =>
        productService.getProducts({
          category_id: category.id,
          page: 1,
          limit: productLimit,
        })
      )
    );

  return (
    <div className="min-h-screen bg-[#faf7f2]">

      <ProductPageHeader />

      <FilterBar />

      <div className="max-w-7xl mx-auto px-2 pb-16 mt-8">

        <div className="space-y-16">

          {ssrCategories.map((category, index) => {

            const data = productResults[index];

            return (
              <CategorySection key={category.id} category={category}>

                <InfiniteProductList
                  params={{ ...filter, category_id: category.id }}
                  initialData={data}
                />

              </CategorySection>
            );
          })}

          {lazyCategories.map((category) => (
            <CategorySection key={category.id} category={category}>

              <LazyCategoryProducts
                params={{ ...filter, category_id: category.id }}
              />

            </CategorySection>
          ))}

        </div>

      </div>

    </div>
  );
}