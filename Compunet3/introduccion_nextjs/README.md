# Computación en Internet — Proyecto Next.js

Frontend de ejemplo construido con **Next.js 16 (App Router)**. Muestra una tabla de
estudiantes obtenida desde un backend con **axios**, componentes reutilizables y un
paginador que trabaja con `skip` / `limit`.

## Stack

- **Next.js** `16.4.3`
- **React** `19.3.0`
- **TypeScript** `^5`
- **Tailwind CSS** `^4` + `@tailwindcss/turbopack`
- **axios** para consumir la API
- **lucide-react** para iconos

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
API_URL=http://localhost:3000/api
```

La variable `API_URL` solo se usa en el servidor (no tiene prefijo `NEXT_PUBLIC`),
así que no se expone al navegador.

> **Importante:** si tu backend está en `http://localhost:3000`, el frontend de
> Next.js no puede usar también el puerto `3000`. Ejecuta el frontend en otro puerto:
>
> ```bash
> npm run dev -- -p 3001
> ```

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
  error.tsx               # Error boundary de la API
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
    StudentsTableAsync.tsx     # Server Component que consulta la API
    StudentTableSkeleton.tsx   # Fallback de carga
    StudentTableContainer.tsx  # Estado de paginación + tabla + paginador
    StudentTable.tsx           # Tabla presentacional
    StudentRow.tsx             # Una fila de la tabla
    StudentBadge.tsx           # Badge Active/Inactive
    StudentSubjects.tsx        # Materias favoritas
    StudentGrades.tsx          # Notas por materia
  ui/
    Pagination.tsx             # Paginador (skip / limit, páginas)

services/
  student.service.ts      # Clase StudentService con axios

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
  students.mock.ts        # Datos de ejemplo (ya no se usan en las páginas)
```

## Consumo de la API

`services/student.service.ts` crea una instancia de axios con `API_URL` y expone:

```ts
const students = await studentService.getStudents();
```

`StudentsTableAsync` es un Server Component que espera la petición con
`connection()` y luego llama al servicio. Así Next no intenta consultar el backend
durante el build; la tabla se renderiza en cada request.

Las páginas envuelven ese componente en `<Suspense>` para mostrar el skeleton
mientras llega la respuesta:

```tsx
<Suspense fallback={<StudentTableSkeleton />}>
  <StudentsTableAsync />
</Suspense>
```

Si el backend no responde, `app/error.tsx` muestra el error y un botón para
reintentar.

### Cargar datos de prueba

Si la tabla muestra **“No hay estudiantes para mostrar”**, significa que axios
funcionó pero el backend devolvió `[]`. Puedes cargar los datos iniciales con:

```bash
curl http://localhost:9000/api/seed
```

> **Ojo:** el seed elimina los estudiantes actuales y vuelve a insertar los datos
> iniciales. Úsalo solo en desarrollo.

Para verificar manualmente la respuesta del backend:

```bash
curl http://localhost:9000/api/student
```

## Paginación

`StudentTableContainer` es un Client Component que usa `usePagination` y
`paginate`. El paginador permite:

- Cambiar de página (primera, anterior, siguiente, última).
- Elegir `limit` (filas por página): `2`, `3`, `5` o `10`.
- Ver el `skip` y `limit` actuales junto con el rango mostrado.

La API devuelve todos los estudiantes y la paginación se hace en el cliente.
Si tu backend soporta paginación por `skip` / `limit`, la lógica de
`lib/pagination.ts` y `usePagination` ya está preparada para enviar esos valores.

## Rutas

- `/` — Página principal con navbar, tabla paginada y sección about.
- `/students` — Sección de estudiantes con su propio layout.
- `/about` — Información del proyecto.
