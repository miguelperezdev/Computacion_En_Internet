"use client";

import { useMemo, useState } from "react";
import type { PaginationMeta } from "@/interfaces/pagination.interface";
import {
  DEFAULT_LIMIT,
  getPaginationMeta,
  getSkip,
} from "@/lib/pagination";

interface UsePaginationOptions {
  total: number;
  initialSkip?: number;
  initialLimit?: number;
}

interface UsePaginationResult {
  skip: number;
  limit: number;
  meta: PaginationMeta;
  setSkip: (skip: number) => void;
  setLimit: (limit: number) => void;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  reset: () => void;
}

export const usePagination = ({
  total,
  initialSkip = 0,
  initialLimit = DEFAULT_LIMIT,
}: UsePaginationOptions): UsePaginationResult => {
  const [skip, setSkipState] = useState(Math.max(0, initialSkip));
  const [limit, setLimitState] = useState(Math.max(1, initialLimit));

  const meta = useMemo(
    () => getPaginationMeta(total, { skip, limit }),
    [total, skip, limit],
  );

  const setSkip = (nextSkip: number) => {
    const lastSkip = (meta.pageCount - 1) * meta.limit;
    setSkipState(Math.min(Math.max(0, nextSkip), lastSkip));
  };

  const setLimit = (nextLimit: number) => {
    setLimitState(Math.max(1, nextLimit));
    setSkipState(0);
  };

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), meta.pageCount);
    setSkipState(getSkip(nextPage, meta.limit));
  };

  return {
    skip: meta.skip,
    limit: meta.limit,
    meta,
    setSkip,
    setLimit,
    goToPage,
    nextPage: () => goToPage(meta.page + 1),
    previousPage: () => goToPage(meta.page - 1),
    firstPage: () => goToPage(1),
    lastPage: () => goToPage(meta.pageCount),
    reset: () => setSkipState(0),
  };
};
