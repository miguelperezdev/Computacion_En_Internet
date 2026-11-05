const SKELETON_ROWS = Array.from({ length: 5 }, (_, index) => index);

export const StudentTableSkeleton = () => {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="h-10 border-b border-white/10 bg-white/[0.04]" />

        {SKELETON_ROWS.map((row) => (
          <div
            key={row}
            className="flex items-center gap-4 border-b border-white/5 p-3 last:border-0"
          >
            <div className="h-4 w-8 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-10 animate-pulse rounded bg-white/10" />
            <div className="h-4 flex-1 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>

      <p className="text-sm text-zinc-500">Cargando estudiantes...</p>
    </div>
  );
};
