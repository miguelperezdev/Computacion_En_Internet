import type { ReactNode } from "react";

export default function StudentsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Students
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Listado paginado de estudiantes. Usa el paginador para cambiar de
          página o ajustar cuántas filas se muestran.
        </p>
      </header>

      {children}
    </main>
  );
}
