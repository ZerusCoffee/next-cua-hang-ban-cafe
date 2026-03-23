import { categoryService } from "@/services/category-service";
import { productService } from "@/services/product-service";

import { baseUrl, productLimit } from "@/constants/const";
import CategorySection from "./_components/category-section";
import InfiniteProductList from "./_components/infinite-product-list";
import LazyCategoryProducts from "./_components/lazy-category-product";
import ProductPageHeader from "./_components/product-page-header";
import FilterBar from "./_components/filter-bar";

import { Paginated } from "@/types/common/pagination.type";
import { ProductCardType, ProductQueryParams } from "@/types/product.type";
import { Category } from "@/types/category.type";
import { ApiResponse } from "@/types/common/response.type";
import { SearchParamsProps } from "@/types/common/search.type";
import { notFound } from "next/navigation";
import { Metadata } from "next";


export async function generateMetadata({ searchParams }: SearchParamsProps): Promise<Metadata> {
  const params = await searchParams;
  const hasFilter = Object.values(params).some(value => value !== undefined && value !== "");

  if (hasFilter) {
    const {
      searchName,
      minPrice,
      maxPrice,
      categoryId,
      sortBy
    } = params;

    // Metadata của trang search
    const filters = {
      name: searchName,
      min_price: minPrice ? parseFloat(minPrice) : undefined,
      max_price: maxPrice ? parseFloat(maxPrice) : undefined,
      category_id: categoryId ? parseInt(categoryId) : undefined,
      sort_by: sortBy,
      page: 1,
      limit: productLimit
    }

    const result = await productService.getProducts(filters, true);
    const product = result.data;
    if (!product) return notFound();

    let title = "Kết quả tìm kiếm";
    let description = "Khám phá danh sách đồ uống thơm ngon tại Zerus Cafe.";
    const categoryName = product.items?.[0]?.category?.name;

    // Tối ưu Title & Description theo từng loại Filter
    if (searchName) {
      title = `Tìm thấy món "${searchName}" ngon giá rẻ`;
      description = `Thưởng thức ngay ${searchName} đậm vị, giao nhanh 24/7. Đặt hàng ngay tại Tiệm Cà Phê Zerus!`;
    } else if (categoryId) {
      title = `Thực đơn ${categoryName}`;
      description = `Khám phá các loại ${categoryName} được tạo ra từ tâm huyết, nguyên liệu tươi sạch tại Zerus.`;
    } else {
      title = `Tìm thấy món các món ngon giá rẻ`;
      description = `Thưởng thức ngay các loại cà phê đậm vị, giao nhanh 24/7. Đặt hàng ngay tại Tiệm Cà Phê Zerus!`;
    }

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== "")
    );
    const queryString = new URLSearchParams(filteredParams).toString();

    return {
      title,
      description: description.slice(0, 160),
      alternates: {
        canonical: `${baseUrl}/products`,
      },
      openGraph: {
        title,
        description,
        url: `${baseUrl}/products?${queryString}`,
        siteName: "Tiệm Cà Phê Zerus",
        images: [
          {
            url: "/og_img.jpg",
            width: 1200,
            height: 630,
            alt: "Thực đơn Zerus Cafe",
          },
        ],
        type: "website",
      },
      robots: {
        index: false,
        follow: true,
      }
    };
  }


  // Metadata cua trang product chính
  else {
    // Fetch Category
    const res = await categoryService.getAllCategory(true);
    const categories = res.data || [];
    const ssrCategories = categories.slice(0, 3);

    // Fetch 4 Products each ssrCategory
    const productResults = await Promise.all(
      ssrCategories.map((cat) =>
        productService.getProducts({ category_id: cat.id, limit: productLimit }, true)
      )
    );

    // Group products & categories for description
    const featuredProductNames = productResults
      .flatMap(res => res.data?.items || [])
      .slice(0, 8)
      .map(p => p.name)
      .join(", ");

    const title = "Thực đơn Zerus Giao Nhanh 24/7";

    const description = `Thưởng thức ngay ${featuredProductNames} và nhiều món uống hấp dẫn khác. Menu đa dạng: ${categories.slice(0, 5).map(c => c.name).join(", ")}. Giao hỏa tốc 15p tại Zerus!`;

    return {
      title,
      description: description.slice(0, 160),
      keywords: [featuredProductNames, "cà phê 24h", "trà sữa ngon"],
      openGraph: {
        title,
        description,
        url: `${baseUrl}/products`,
        siteName: "Tiệm Cà Phê Zerus",
        images: [
          {
            url: "/og_img.jpg",
            width: 1200,
            height: 630,
            alt: "Thực đơn đa dạng tại Tiệm Cafe Zerus",
          },
        ],
        type: "website",
      },
    };
  }
}


export default async function Page({ searchParams }: SearchParamsProps) {

  const params = await searchParams;

  const {
    searchName,
    minPrice,
    maxPrice,
    categoryId,
    sortBy
  } = params;

  const hasFilter = Object.values(params).some(value =>
    value !== undefined && value !== null && value !== ""
  );

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

    const result = await productService.getProducts(filters, true);

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

  const res = await categoryService.getAllCategory(true);
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
        }, true)
      )
    );

  return (
    <div className="min-h-screen bg-linear-to-b to-amber-50 from-white">

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