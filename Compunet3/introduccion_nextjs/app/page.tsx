import { Suspense } from "react";
import { Section } from "@/components/Section";
import { StudentTableSkeleton } from "@/components/students/StudentTableSkeleton";
import { StudentsTableAsync } from "@/components/students/StudentsTableAsync";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-12 px-6 py-10">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Proyecto frontend
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Computación en Internet
        </h1>
        <p className="max-w-2xl text-zinc-400">
          Demo de una tabla de estudiantes consumida desde el backend con axios,
          componentes reutilizables y paginación con <code>skip</code> /{" "}
          <code>limit</code>.
        </p>
      </header>

      <Section
        id="students"
        title="Students"
        description="Cambia de página o ajusta el límite de filas para modificar el comportamiento de la tabla."
      >
        <Suspense fallback={<StudentTableSkeleton />}>
          <StudentsTableAsync />
        </Suspense>
      </Section>

      <Section id="about" title="About this project">
        <p className="max-w-2xl text-zinc-400">
          Aplicación construida con Next.js, React, TypeScript y Tailwind CSS.
          Los estudiantes se obtienen de <code>API_URL/student</code> usando un
          servicio con axios y la tabla se pagina en el cliente con{" "}
          <code>skip</code> y <code>limit</code>.
        </p>
      </Section>
    </main>
  );
}
