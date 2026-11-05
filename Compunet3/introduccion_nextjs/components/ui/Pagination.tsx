"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { PaginationMeta } from "@/interfaces/pagination.interface";
import { PAGE_SIZE_OPTIONS } from "@/lib/pagination";
import { cn } from "@/lib/utils";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  limitOptions?: readonly number[];
  className?: string;
}

const navButtonClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40";

export const Pagination = ({
  meta,
  onPageChange,
  onLimitChange,
  limitOptions = PAGE_SIZE_OPTIONS,
  className,
}: PaginationProps) => {
  const pages = Array.from({ length: meta.pageCount }, (_, index) => index + 1);
  const sizes = Array.from(new Set([...limitOptions, meta.limit])).sort(
    (a, b) => a - b,
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <span>
          Mostrando{" "}
          <strong className="font-semibold text-zinc-100">
            {meta.from}-{meta.to}
          </strong>{" "}
          de <strong className="font-semibold text-zinc-100">{meta.total}</strong>
        </span>
        <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px]">
          skip: {meta.skip}
        </span>
        <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px]">
          limit: {meta.limit}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-xs text-zinc-400">
          Filas por página
          <select
            value={meta.limit}
            onChange={(event) => onLimitChange(Number(event.target.value))}
            className="h-8 rounded-lg border border-white/10 bg-zinc-950 px-2 text-xs text-zinc-100 outline-none focus:border-white/30"
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <nav
          aria-label="Paginación de estudiantes"
          className="flex items-center gap-1"
        >
          <button
            type="button"
            className={navButtonClass}
            onClick={() => onPageChange(1)}
            disabled={!meta.hasPreviousPage}
            aria-label="Primera página"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={navButtonClass}
            onClick={() => onPageChange(meta.page - 1)}
            disabled={!meta.hasPreviousPage}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === meta.page ? "page" : undefined}
              aria-label={`Página ${page}`}
              className={cn(
                navButtonClass,
                "w-auto min-w-8 px-2 text-xs font-medium",
                page === meta.page &&
                  "border-white/20 bg-white text-zinc-950 hover:bg-white hover:text-zinc-950",
              )}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className={navButtonClass}
            onClick={() => onPageChange(meta.page + 1)}
            disabled={!meta.hasNextPage}
            aria-label="Página siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={navButtonClass}
            onClick={() => onPageChange(meta.pageCount)}
            disabled={!meta.hasNextPage}
            aria-label="Última página"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </div>
  );
};
