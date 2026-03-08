export type Paginated<T> = {
  items: T[]
  pagination: {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
    hasMore: boolean
  }
}