import { categoryService } from "@/services/category-service";
import { productService } from "@/services/product-service";

import { productLimit } from "@/app/constants/const";
import CategorySection from "./components/category-section";
import InfiniteProductList from "./components/infinite-scroll";
import LazyCategoryProducts from "./components/lazy-category-product";


export default async function Page() {
  const res = await categoryService.getAllCategory();
  const categories = res.data || [];
  const ssrCategories = categories.slice(0, 3);
  const lazyCategories = categories.slice(3);

  // fetch products parallel
  const productResults = await Promise.all(
    categories.map((category) =>
      productService.getProducts({
        category_id: category.id,
        page: 1,
        limit: productLimit,
      })
    )
  );


  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/50 to-white">
      {/* Header section */}
      <div className="relative overflow-hidden bg-linear-to-r from-amber-900 to-amber-700 text-white py-12 mb-8">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">
            Thực đơn <span className="text-amber-200">Zerus</span>
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl">
            Khám phá các loại đồ uống và snack thơm ngon, được chế biến từ những nguyên liệu tươi ngon nhất
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-6">

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-300 rounded-full" />
              <span className="text-amber-200">Giao hàng tận nơi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="space-y-16">
          {ssrCategories.map((category, index) => {
            const products = productResults[index].data?.items || [];
            const pagination = productResults[index].data?.pagination;

            return (
              <CategorySection key={category.id} category={category}>
                <InfiniteProductList
                  categoryId={category.id}
                  initialProducts={products}
                  initialHasMore={pagination?.hasMore ?? false}
                />
              </CategorySection>
            );
          })}

          {lazyCategories.map((category) => (
            <CategorySection key={category.id} category={category}>
              <LazyCategoryProducts categoryId={category.id} />
            </CategorySection>
          ))}
        </div>
      </div>
    </div>
  );
}