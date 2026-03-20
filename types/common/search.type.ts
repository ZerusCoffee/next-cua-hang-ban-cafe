export type SearchParamsProps = {
  searchParams: Promise<{
    searchName?: string;
    minPrice?: string;
    maxPrice?: string;
    categoryId?: string;
    sortBy?: string;
  }>;
};