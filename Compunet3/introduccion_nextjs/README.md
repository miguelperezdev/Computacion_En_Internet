# Computación en Internet — Proyecto Next.js

Frontend de ejemplo construido con **Next.js 15+ (App Router)**. Muestra una tabla de
estudiantes con datos fabricate en `data/students.mock.ts` y componentes reutilizables
(`StudentTable`, `StudentRow`, `StudentBadge`, `Navbar`).

## Stack

- **Next.js** `16.4.3`
- **React** `19.3.0`
- **TypeScript** `^5`
- **Tailwind CSS** `^4` + `@tailwindcss/turbopack`
- **shadcn/ui** y `class-variance-authority` (disponibles en `package.json`)

## Ejecutar

```bash
npm install      # si no estás dentro del entorno del proyecto
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run build    # compilación de producción
npm start        # servidor de producción (tras `build`)
npm run lint     # ESLint
```

> Nota: este entorno no incluye Node.js. Para correr el proyecto se necesita instalar
> Node (y luego `npm install` antes de `npm run dev`).

## Estructura

```
app/
  layout.tsx          # Layout raíz (fuente de metadatos y fuentes)
  page.tsx            # Página principal: navbar + tabla de estudiantes
  students/
    layout.tsx        # Layout de la sección /students
    page.tsx          # Ruta /students (usa StudentLayout + StudentTable)
components/
  students/
    StudentTable.tsx  # Tabla general (cabecera + filas)
    StudentRow.tsx    # Una fila de la tabla
    StudentBadge.tsx  # Badge Active/Inactive
    StudentRow.tsx    # (se mantiene)
  Navbar.tsx          # Barra de navegación
  Brand.tsx           # Logotipo de la app
data/
  students.mock.ts    # Datos de ejemplo (arreglo `students`)
interfaces/
  student.interface.ts # Tipos Student, Gender, Grade
  nav-links.interface.ts # Tipo NavLinks
```

## Rutas

- `/` — Página principal con navbar y la tabla de estudiantes.
- `/students` — Sección de estudiantes con su propio layout.

## Notas de construcción

- Todos los componentes exportan valores estables (no funciones dentro del retorno)
  para que el árbol de Vercel/Next no dé warning de "instable".
- El notebook usa tipos estrictos de TypeScript (`strict: true`), por lo que los
  imports de `@/` apuntan a `tsconfig.json` (`"paths": { "@/*": ["./*"] }`).
- Los datos de `students.mock.ts` incluyen `id`, `name`, `age`, `email`, `gender`,
  `favoriteSubjects`, `grades`, `isActive` y `nickname`; el `StudentTable` los
  muestra todos en una sola fila por estudiante.
