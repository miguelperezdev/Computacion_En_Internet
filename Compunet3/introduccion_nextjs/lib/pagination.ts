import type {
  PaginationMeta,
  PaginationParams,
} from "@/interfaces/pagination.interface";

export const DEFAULT_LIMIT = 2;

export const PAGE_SIZE_OPTIONS = [2, 3, 5, 10] as const;

const toSafeInteger = (value: number, fallback: number) =>
  Number.isFinite(value) ? Math.floor(value) : fallback;

export const getSkip = (page: number, limit: number) =>
  Math.max(0, page - 1) * Math.max(1, limit);

export const paginate = <T,>(
  items: T[],
  { skip, limit }: PaginationParams,
): T[] => {
  const safeSkip = Math.max(0, toSafeInteger(skip, 0));
  const safeLimit = Math.max(1, toSafeInteger(limit, DEFAULT_LIMIT));

  return items.slice(safeSkip, safeSkip + safeLimit);
};

export const getPaginationMeta = (
  total: number,
  { skip, limit }: PaginationParams,
): PaginationMeta => {
  const safeTotal = Math.max(0, toSafeInteger(total, 0));
  const safeLimit = Math.max(1, toSafeInteger(limit, DEFAULT_LIMIT));
  const pageCount = Math.max(1, Math.ceil(safeTotal / safeLimit));
  const safeSkip = Math.min(
    Math.max(0, toSafeInteger(skip, 0)),
    (pageCount - 1) * safeLimit,
  );
  const page = Math.floor(safeSkip / safeLimit) + 1;
  const from = safeTotal === 0 ? 0 : safeSkip + 1;
  const to = Math.min(safeSkip + safeLimit, safeTotal);

  return {
    skip: safeSkip,
    limit: safeLimit,
    total: safeTotal,
    page,
    pageCount,
    from,
    to,
    hasPreviousPage: page > 1,
    hasNextPage: page < pageCount,
  };
};
