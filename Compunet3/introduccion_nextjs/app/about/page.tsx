import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          About this project
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Proyecto de ejemplo para la materia Computación en Internet. Muestra
          una tabla de estudiantes con paginación, componentes reutilizables y
          un tema oscuro.
        </p>
      </header>

      <Link
        href="/students"
        className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
      >
        Ver estudiantes
      </Link>
    </main>
  );
}
