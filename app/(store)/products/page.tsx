import { categoryService } from "@/services/category-service";
import { productService } from "@/services/product-service";

import { baseUrl, productLimit } from "@/constants/const";
import { ProductQueryParams } from "@/types/product.type";
import { Category } from "@/types/category.type";
import { SearchParamsProps } from "@/types/common/search.type";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { NoneSearchProducts } from "./_components/none-search-products";
import { SearchProducts } from "./_components/search-products";

/* ================= SEO ================= */

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

  const filters: ProductQueryParams = {
    name: searchName,
    min_price: minPrice ? parseFloat(minPrice) : undefined,
    max_price: maxPrice ? parseFloat(maxPrice) : undefined,
    category_id: categoryId ? parseInt(categoryId) : undefined,
    sort_by: sortBy,
    page: 1,
    limit: productLimit
  };


  // Có search theo tên || category :  
  if (hasFilter && (searchName || categoryId)) {
    const result = await productService.getProducts(filters, true);

    let title = "Kết quả tìm kiếm";
    let category = null;

    if (categoryId) {
      const { data: categoryData } = await categoryService.getCategoryById(categoryId, true);
      category = categoryData;
      title = searchName
        ? `Kết quả tìm kiếm "${searchName}" trong ${category?.name}`
        : `Sản phẩm ${category?.name}`;
    } else if (searchName) {
      title = `Kết quả tìm kiếm "${searchName}"`;
    }

    return (
      <SearchProducts
        title={title}
        category={category}
        result={result}
        filters={filters}
      />
    );
  }





  // Không có search theo tên && category
  const res = await categoryService.getAllCategory(true);
  const categories: Category[] = res.data || [];

  const productResults = await Promise.all(
    categories.map((category) =>
      productService.getProducts({
        ...filters,
        category_id: category.id
      }, true)
    )
  );

  return (
    <NoneSearchProducts
      categories={categories}
      productResults={productResults}
      filters={filters}
    />
  );
}