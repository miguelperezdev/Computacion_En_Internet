"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const message =
    error instanceof globalThis.Error ? error.message : String(error);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-16">
      <div className="w-full rounded-xl border border-red-500/30 bg-red-500/10 p-6">
        <h1 className="text-2xl font-semibold text-red-300">
          No se pudieron cargar los estudiantes
        </h1>
        <p className="mt-2 text-sm text-red-200/80">
          Revisa que el backend esté corriendo y que <code>API_URL</code> esté
          configurada correctamente en tu archivo <code>.env</code>.
        </p>
        <p className="mt-3 rounded-lg bg-black/30 p-3 font-mono text-xs text-red-200">
          {message}
        </p>
        <button
          type="button"
          onClick={retry}
          className="mt-5 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}
