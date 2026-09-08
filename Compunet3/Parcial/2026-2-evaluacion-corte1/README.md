# Evaluación Corte 1 — Computación en Internet 3

API REST de estudiantes construida con **Express 5**, **TypeScript** y **MongoDB (Mongoose 9)**, con arquitectura en capas (rutas → controladores → servicios → modelos).

El CRUD base (`GET /students`, `POST /students/create`, `GET /students/:email`, `PUT /students/update/:email`) **ya está implementado y funcionando** — úsalo como referencia del estilo de código que se espera en tu solución. Tu trabajo es completar los 3 retos marcados con `// TODO` en el código.

## Tiempo estimado

2 horas.

## Requisitos previos

- Node.js 18+
- MongoDB accesible (local o Docker)

## Instalación y ejecución

```bash
npm install
npm run dev
```

Levanta un MongoDB con Docker si no tienes uno corriendo:

```bash
docker run -d --name mongo-icesi \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo
```

La conexión está configurada en [src/lib/connectDb.ts](src/lib/connectDb.ts) (`mongodb://root:password@localhost:27017`, base de datos `Icesi`). El servidor escucha en el puerto **8081**.

Importa la colección de Postman en [postman/2026-2-evaluacion-corte1.postman_collection.json](postman/2026-2-evaluacion-corte1.postman_collection.json) — ya trae una petición de ejemplo para cada reto.

## Dónde trabajar

Busca los comentarios `// TODO` en estos 4 archivos:

- [src/models/student.model.ts](src/models/student.model.ts) — ya tiene los tipos `BulkCreateResult` y `StudentSearchQuery` que debes usar.
- [src/services/student.service.ts](src/services/student.service.ts)
- [src/controllers/student.controller.ts](src/controllers/student.controller.ts)
- [src/routes/student.route.ts](src/routes/student.route.ts)

**No modifiques** el CRUD existente (`getAll`, `create`, `getByEmail`, `updateStudent` ni sus rutas/servicios) — solo agrega código nuevo para los retos.

---

## Reto 1 — Crear estudiantes en lote

`POST /students/bulk`

Recibe un **arreglo** de estudiantes en el body y crea todos los que sean válidos, sin que un estudiante inválido o duplicado tumbe el resto del lote.

**Body de ejemplo:**

```json
[
  { "name": "Carlos Ruiz", "age": 20, "email": "carlos.ruiz@icesi.edu.co", "isActive": true, "nickname": "Carlitos" },
  { "name": "Laura Diaz", "age": 23, "email": "laura.diaz@icesi.edu.co", "isActive": false, "nickname": "Lau" }
]
```

**Respuesta esperada `200 OK`:**

```json
{
  "created": [ /* estudiantes creados, tal como los devuelve Mongoose */ ],
  "skipped": [
    { "email": "carlos.ruiz@icesi.edu.co", "reason": "El estudiante con este email ya existe" }
  ]
}
```

**Criterios de aceptación:**

- [ ] Si el body no es un arreglo, responde `400` con un mensaje claro.
- [ ] Un estudiante con email ya existente en la base de datos se reporta en `skipped`, no se crea de nuevo.
- [ ] Dos estudiantes del mismo arreglo con el mismo email: solo se crea el primero, el segundo va a `skipped`.
- [ ] Un estudiante con datos inválidos (ej. falta un campo requerido) va a `skipped` con un `reason` descriptivo, y **no** interrumpe la creación de los demás.
- [ ] Los estudiantes válidos y no duplicados quedan en `created`.

## Reto 2 — Búsqueda con filtros

`GET /students/search`

Todos los filtros son opcionales y **combinables** (AND entre ellos). Si no se envía ningún filtro, se comporta igual que `GET /students`.

| Query param | Tipo esperado | Comportamiento |
|---|---|---|
| `isActive` | `"true"` \| `"false"` | Filtra por el campo `isActive` |
| `minAge` | número (string) | Edad mínima (inclusiva) |
| `maxAge` | número (string) | Edad máxima (inclusiva) |
| `name` | string | Coincidencia parcial, sin distinguir mayúsculas/minúsculas |

**Ejemplo:** `GET /students/search?isActive=true&minAge=20&maxAge=25&name=a`

**Criterios de aceptación:**

- [ ] La ruta `/search` está registrada **antes** que `/:email` (si no, Express intentará interpretar `search` como un email).
- [ ] Cada filtro presente se aplica; los ausentes no restringen la búsqueda.
- [ ] `minAge`/`maxAge` filtran correctamente por rango de edad.
- [ ] `name` hace coincidencia parcial e insensible a mayúsculas.
- [ ] Sin query params, devuelve todos los estudiantes.

## Reto 3 — Eliminar estudiante

`DELETE /students/delete/:email`

**Criterios de aceptación:**

- [ ] Si el estudiante existe, se elimina de la base de datos y se responde `200 OK` con el documento eliminado.
- [ ] Si no existe, responde `400` con `{ "message": "User {email} not found" }` (mismo estilo que `updateStudent`).
- [ ] Si `email` no es un string válido, responde `400` con un mensaje claro (mismo estilo que los demás endpoints).

---

## Entrega

Haz commit y push a tu repositorio de GitHub Classroom antes de que termine el tiempo de la evaluación. Se revisará el último commit dentro del horario asignado.

## Cuestionario

Además de este ejercicio de código, responde el cuestionario de selección múltiple en [QUIZ.md](QUIZ.md).
