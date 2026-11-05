export interface PaginationParams {
  skip: number;
  limit: number;
}

export interface PaginationMeta extends PaginationParams {
  total: number;
  page: number;
  pageCount: number;
  from: number;
  to: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
