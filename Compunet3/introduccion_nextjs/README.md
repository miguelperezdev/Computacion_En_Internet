# Computación en Internet — Proyecto Next.js

Frontend de ejemplo construido con **Next.js 16 (App Router)**. Muestra una tabla de
estudiantes con datos de ejemplo en `data/students.mock.ts`, componentes reutilizables
y un paginador que trabaja con `skip` / `limit`.

## Stack

- **Next.js** `16.4.3`
- **React** `19.3.0`
- **TypeScript** `^5`
- **Tailwind CSS** `^4` + `@tailwindcss/turbopack`
- **lucide-react** para iconos

## Ejecutar

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run build    # compilación de producción
npm start        # servidor de producción (tras `build`)
npm run lint     # ESLint
```

## Estructura

```
app/
  layout.tsx              # Layout raíz: tema oscuro, navbar y footer
  page.tsx                # Página principal: tabla paginada + about
  about/page.tsx          # Ruta /about
  students/
    layout.tsx            # Layout de la sección /students
    page.tsx              # Ruta /students

components/
  Brand.tsx               # Logotipo de la app
  Footer.tsx              # Pie de página
  Navbar.tsx              # Barra de navegación
  Section.tsx             # Sección reutilizable con título/descripción
  students/
    StudentTableContainer.tsx  # Estado de paginación + tabla + paginador
    StudentTable.tsx           # Tabla presentacional
    StudentRow.tsx             # Una fila de la tabla
    StudentBadge.tsx           # Badge Active/Inactive
    StudentSubjects.tsx        # Materias favoritas
    StudentGrades.tsx          # Notas por materia
  ui/
    Pagination.tsx             # Paginador (skip / limit, páginas)

hooks/
  usePagination.ts        # Hook con skip, limit, página actual y navegación

lib/
  pagination.ts           # Helpers paginate() y getPaginationMeta()
  utils.ts                # cn() para combinar clases

interfaces/
  student.interface.ts    # Tipos Student, Gender, Grade
  pagination.interface.ts # Tipos PaginationParams y PaginationMeta
  nav-links.interface.ts  # Tipo NavLink

data/
  students.mock.ts        # Datos de ejemplo
```

## Paginación

`StudentTableContainer` es un Client Component que usa `usePagination` y
`paginate`. El paginador permite:

- Cambiar de página (primera, anterior, siguiente, última).
- Elegir `limit` (filas por página): `2`, `3`, `5` o `10`.
- Ver el `skip` y `limit` actuales junto con el rango mostrado.

La lógica de paginación está separada en `lib/pagination.ts` para poder reutilizarla
con una API real más adelante.

## Rutas

- `/` — Página principal con navbar, tabla paginada y sección about.
- `/students` — Sección de estudiantes con su propio layout.
- `/about` — Información del proyecto.
