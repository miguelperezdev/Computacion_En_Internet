import { Section } from "@/components/Section";
import { StudentTableContainer } from "@/components/students/StudentTableContainer";
import { students } from "@/data/students.mock";

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
          Demo de una tabla de estudiantes con componentes reutilizables,
          paginación y soporte para <code>skip</code> / <code>limit</code>.
        </p>
      </header>

      <Section
        id="students"
        title="Students"
        description="Cambia de página o ajusta el límite de filas para modificar el comportamiento de la tabla."
      >
        <StudentTableContainer students={students} />
      </Section>

      <Section id="about" title="About this project">
        <p className="max-w-2xl text-zinc-400">
          Aplicación construida con Next.js, React, TypeScript y Tailwind CSS.
          Los datos vienen de un mock local y la tabla se pagina del lado del
          cliente usando <code>skip</code> y <code>limit</code>.
        </p>
      </Section>
    </main>
  );
}
