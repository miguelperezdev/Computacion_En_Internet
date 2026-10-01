# Computación en Internet 3 — NestJS + PostgreSQL

Proyecto base para las prácticas del curso **Computación en Internet 3**. Es una API REST construida con [NestJS](https://nestjs.com/) que se conecta a una base de datos **PostgreSQL** usando **TypeORM**.

Este repositorio sirve como punto de partida: trae la configuración inicial (conexión a la base de datos, validaciones globales, prefijo de rutas `/api`) y tres módulos ya funcionales: `student` (CRUD completo con entidades `Student` y `Grades` relacionadas 1:N, DTOs de creación, actualización y paginación), `user` (registro e inicio de sesión con contraseñas hasheadas en bcrypt) y `seed` (carga de datos de prueba con un solo request).

## Stack y dependencias

### Dependencias de producción

| Paquete | Versión | Para qué sirve |
|---|---|---|
| `@nestjs/common` | ^12.0.1 | Decoradores y utilidades base de Nest (`@Module`, `@Controller`, `@Injectable`, pipes, etc.) |
| `@nestjs/core` | ^12.0.1 | Núcleo del framework: arranque de la aplicación, inyección de dependencias |
| `@nestjs/platform-express` | ^12.0.1 | Adaptador HTTP: hace que Nest corra sobre Express por debajo |
| `@nestjs/config` | ^12.0.0 | Carga variables de entorno desde `.env` (`ConfigModule`) |
| `@nestjs/typeorm` | ^12.0.1 | Integra TypeORM como ORM dentro de Nest (`TypeOrmModule`) |
| `typeorm` | ^1.1.1 | ORM: mapea clases TypeScript (entidades) a tablas de la base de datos |
| `pg` | ^8.23.0 | Driver de PostgreSQL que usa TypeORM para conectarse |
| `class-validator` | ^0.15.1 | Valida los DTOs (`@IsString()`, `@IsInt()`, etc.) |
| `class-transformer` | ^0.5.1 | Transforma objetos planos (JSON de las peticiones) en instancias de clases (DTOs) |
| `@nestjs/mapped-types` | * | Utilidades para derivar DTOs (`PartialType`, `PickType`) sin repetir código, típico en `update-*.dto.ts` |
| `@nestjs/passport`, `passport`, `passport-jwt`, `@nestjs/jwt` | ^12.0.0 / ^0.7.0 / ^4.0.1 / ^12.0.2 | Autenticación: `PassportModule` y `JwtModule` quedan configurados en `UserModule` (estrategia JWT lista para usar cuando lleguen los guards) |
| `bcrypt` | ^6.0.0 | Hash de contraseñas: `user.service` guarda los passwords hasheados y los compara con `compareSync` |
| `reflect-metadata` | ^0.2.2 | Requerido por los decoradores de TypeScript (metadata en tiempo de ejecución) |
| `rxjs` | ^7.8.1 | Programación reactiva; Nest la usa internamente (interceptores, streams) |

> `@types/bcrypt` y `@types/passport-jwt` están declarados como dependencias de producción (en `devDependencies` sería lo habitual), pero solo aportan tipos en tiempo de compilación.

### Dependencias de desarrollo

| Paquete | Para qué sirve |
|---|---|
| `@nestjs/cli`, `@nestjs/schematics` | CLI de Nest: `build`, `start` y generadores (`nest g module/controller/service`) |
| `@nestjs/testing` | Utilidades para escribir tests de Nest |
| `vitest`, `@vitest/coverage-v8`, `vite-tsconfig-paths` | Framework de pruebas (usa el `tsconfig` del proyecto; `test:cov` genera reportes de cobertura) |
| `supertest`, `@types/supertest` | Pruebas de integración/e2e sobre HTTP |
| `oxlint` | Linting rápido del código (`npm run lint`); sustituye a ESLint en este plantilla |
| `prettier` | Formateo automático del código (`npm run format`) |
| `typescript` | Compilación de TypeScript a JavaScript |
| `source-map-support` | Mapea errores en tiempo de ejecución de vuelta al código TypeScript original |
| `@nestjs/mau` | CLI de [Mau](https://mau.nestjs.com): despliegue de la app a la nube con `npm run deploy` |
| `@types/express`, `@types/node` | Tipos de TypeScript para Express y Node |

## Estructura del proyecto

```
src/
├── main.ts                     # Punto de entrada: arranca la app, prefijo global /api, validaciones
├── app.module.ts               # Módulo raíz: config, conexión a la BD, módulos de features
├── student/
│   ├── student.module.ts       # Módulo de la feature "student" (registra Student y Grades con TypeOrmModule.forFeature)
│   ├── student.controller.ts   # Rutas HTTP de "student": crear, listar, buscar, actualizar, eliminar
│   ├── student.service.ts      # Lógica de negocio de "student" (CRUD, transacciones, manejo de errores)
│   ├── dto/
│   │   ├── create-student.dto.ts  # Reglas de validación para crear un student (incluye sus grades)
│   │   ├── update-student.dto.ts  # DTO de actualización: PartialType(CreateStudent), todos los campos opcionales
│   │   └── pagination.dto.ts      # Query params `limit`/`skip` para paginar el listado
│   └── entities/
│       ├── student.entity.ts      # Entidad TypeORM: tabla "student"
│       └── grades.entity.ts       # Entidad TypeORM: tabla "grades" (relación N:1 con student)
├── user/
│   ├── user.module.ts          # Módulo de la feature "user" (PassportModule + JwtModule configurados)
│   ├── user.controller.ts      # POST /api/user/signup y POST /api/user/auth
│   ├── user.service.ts         # Registro con bcrypt y verificación de credenciales
│   ├── dto/
│   │   ├── register.dto.ts     # Validación del registro: email, password (8-16), fullName
│   │   └── login.dto.ts        # Validación del login: solo email y password
│   └── entities/user.entity.ts # Entidad TypeORM: tabla "user" (email único, roles, @BeforeInsert)
└── seed/
    ├── seed.module.ts          # Módulo de la feature "seed"
    ├── seed.controller.ts      # GET /api/seed
    ├── seed.service.ts         # Borra y recarga los estudiantes de prueba
    └── data/seed-student.data.ts # Datos iniciales del seed
test/
└── app.e2e-spec.ts             # Pruebas end-to-end (vitest + supertest), 6 casos
```

Cada nueva funcionalidad del curso debería seguir este mismo patrón: una carpeta por *feature*, con su `module`, `controller`, `service` y, cuando aplique, `dto/` y `entities/`.

## Requisitos previos

- **Node.js** 20 o superior (la dependencia `@nestjs/core` lo exige)
- **npm**
- **PostgreSQL** corriendo localmente (o accesible por red), con una base de datos ya creada. Si tienen Docker, `docker-compose.yml` levanta un PostgreSQL 14 en el puerto 5432 usando las variables del `.env`:

  ```bash
  docker compose up -d
  ```

## Puesta en marcha

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear un archivo `.env` en la raíz del proyecto con las credenciales de tu base de datos (hay una plantilla lista en [`.env.example`](.env.example)):

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=compunet3
   DB_USERNAME=postgres
   DB_PASSWORD=tu_password

   # Puerto HTTP de la aplicación (por defecto 9000 en el código)
   PORT=9000

   # Secreto para firmar los JWT (se usa cuando activen los guards en user)
   JWT_SECRET=un_secreto_para_desarrollo
   ```

   > El `.env` está en `.gitignore`: cada quien usa el suyo y **no se sube al repositorio**.

3. Levantar la aplicación en modo desarrollo (con recarga automática):

   ```bash
   npm run start:dev
   ```

4. La API queda disponible en `http://localhost:9000/api/student` (ver [Puntos clave](#puntos-clave) sobre el prefijo global y [Endpoints disponibles](#endpoints-disponibles)).

## Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run start` | Levanta la app una vez (sin watch) |
| `npm run start:dev` | Levanta la app en modo watch (recarga en cada cambio) |
| `npm run start:debug` | Igual que `start:dev`, con el debugger de Node habilitado |
| `npm run start:prod` | Ejecuta el build ya compilado (`dist/main.js`) |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm run lint` | Analiza el código con [oxlint](https://oxlint.rs/) |
| `npm run format` | Formatea el código con Prettier |
| `npm run test` | Corre las pruebas con Vitest (hoy solo la suite e2e) |
| `npm run test:watch` | Pruebas en modo watch (re-ejecuta al guardar) |
| `npm run test:cov` | Pruebas con reporte de cobertura (V8) |
| `npm run test:e2e` | Corre solo las pruebas end-to-end (`vitest.config.e2e.ts`) |
| `npm run deploy` | Despliega la app con el CLI de Mau |

## Comandos del CLI de Nest

El [Nest CLI](https://docs.nestjs.com/cli/overview) (`nest`, instalado como dependencia de desarrollo) sirve para generar código y gestionar el proyecto sin escribir todo el boilerplate a mano. Se ejecuta con `npx nest <comando>` (o directamente `nest <comando>` si lo tienen instalado global con `npm i -g @nestjs/cli`).

| Comando | Alias | Qué hace |
|---|---|---|
| `nest new <nombre>` | `nest n` | Crea un proyecto Nest nuevo desde cero |
| `nest generate module <nombre>` | `nest g mo` | Genera un módulo (`*.module.ts`) y lo registra en el módulo padre |
| `nest generate controller <nombre>` | `nest g co` | Genera un controlador (`*.controller.ts`) con su spec de test |
| `nest generate service <nombre>` | `nest g s` | Genera un servicio (`*.service.ts`) con su spec de test |
| `nest generate resource <nombre>` | `nest g res` | Genera un CRUD completo: módulo, controlador, servicio, DTOs y entidad (pregunta el transport layer, ej. REST API) |
| `nest generate class <nombre>` | `nest g cl` | Genera una clase simple (útil para DTOs o entidades) |
| `nest generate interface <nombre>` | `nest g interface` | Genera una interfaz de TypeScript |
| `nest generate pipe <nombre>` | `nest g pi` | Genera un pipe (para validación/transformación de datos) |
| `nest generate guard <nombre>` | `nest g gu` | Genera un guard (para autenticación/autorización de rutas) |
| `nest generate interceptor <nombre>` | `nest g in` | Genera un interceptor |
| `nest generate filter <nombre>` | `nest g f` | Genera un filtro de excepciones |
| `nest build` | | Compila el proyecto a `dist/` (equivalente a `npm run build`) |
| `nest start` | | Levanta la aplicación (equivalente a `npm run start`) |
| `nest start --watch` | | Levanta la aplicación en modo watch (equivalente a `npm run start:dev`) |
| `nest info` | `nest i` | Muestra las versiones de Node, npm y de los paquetes `@nestjs/*` instalados |

> Tip: se puede indicar la carpeta destino del recurso generado, por ejemplo `nest g mo course` crea `src/course/course.module.ts`. Así es como se generó la estructura de `src/student/`.

## Endpoints disponibles

Con el prefijo global `api` (definido en `main.ts`) y el prefijo `student` del controlador, las rutas quedan bajo `/api/student`.

| Método | Ruta | Descripción | Body / Query params |
|---|---|---|---|
| `POST` | `/api/student` | Crea un estudiante (opcionalmente con sus notas) | `{ name, age, email, isActive, gender, favoriteSubjects?, grades? }` |
| `GET` | `/api/student` | Lista estudiantes, paginado | Query: `limit?` (cantidad), `skip?` (offset) |
| `GET` | `/api/student/:term` | Busca un estudiante por `id` (UUID), `name`, `nickname` o `email` | — |
| `PATCH` | `/api/student/:id` | Actualiza un estudiante por `id`, `name`, `nickname` o `email`. Si se envía `grades`, **reemplaza** todas sus notas | Cualquier subconjunto de los campos de creación |
| `DELETE` | `/api/student/:id` | Elimina un estudiante (y sus notas, por el `onDelete: "CASCADE"`). Acepta los mismos `:term` que la búsqueda | — |

Endpoints de usuarios:

| Método | Ruta | Descripción | Body |
|---|---|---|---|
| `POST` | `/api/user/signup` | Registra un usuario; la contraseña se guarda hasheada con bcrypt y la respuesta nunca la incluye | `{ email, password (8-16), fullName }` |
| `POST` | `/api/user/auth` | Inicia sesión: valida las credenciales y devuelve el usuario sin contraseña. Email inexistente → 404; contraseña incorrecta → 401 | `{ email, password }` |

Endpoint de datos de prueba:

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/seed` | **Borra todos los estudiantes** y carga los de prueba (40 estudiantes con 81 notas). Devuelve `{ "message": "SEED EXECUTED" }` |

Ejemplos de request:

```bash
# Crear un estudiante con sus notas
curl -X POST http://localhost:9000/api/student \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ana Pérez",
    "age": 21,
    "email": "ana@example.com",
    "isActive": true,
    "gender": "Female",
    "favoriteSubjects": ["Math", "History"],
    "grades": [
      { "subject": "Math", "grade": 90 },
      { "subject": "History", "grade": 85 }
    ]
  }'

# Listar (paginado)
curl "http://localhost:9000/api/student?limit=10&skip=0"

# Buscar por id, por nombre, nickname o email
curl http://localhost:9000/api/student/<uuid>
curl http://localhost:9000/api/student/ana_perez21
curl http://localhost:9000/api/student/ana@example.com

# Actualizar (solo los campos enviados; si va "grades", reemplaza la lista completa)
curl -X PATCH http://localhost:9000/api/student/<uuid> \
  -H "Content-Type: application/json" \
  -d '{
    "age": 22,
    "grades": [
      { "subject": "Math", "grade": 95 },
      { "subject": "History", "grade": 85 },
      { "subject": "Physics", "grade": 80 }
    ]
  }'

# Eliminar
curl -X DELETE http://localhost:9000/api/student/<uuid>

# Registro e inicio de sesión
curl -X POST http://localhost:9000/api/user/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "ana@example.com", "password": "secreto123", "fullName": "Ana Pérez"}'

curl -X POST http://localhost:9000/api/user/auth \
  -H "Content-Type: application/json" \
  -d '{"email": "ana@example.com", "password": "secreto123"}'

# Cargar los datos de prueba (borra todos los estudiantes)
curl http://localhost:9000/api/seed
```

También hay una **colección de Postman lista para importar** en [`postman/compunet3-nestjs-postgres.postman_collection.json`](postman/compunet3-nestjs-postgres.postman_collection.json) con todos los endpoints de la API (ver [Colección de Postman](#colección-de-postman)).

## Colección de Postman

En [`postman/compunet3-nestjs-postgres.postman_collection.json`](postman/compunet3-nestjs-postgres.postman_collection.json) está la colección con **las 8 peticiones de la API**, organizadas en tres carpetas:

- **Student**: crear, listar (paginado), buscar, actualizar (`PATCH`) y eliminar (`DELETE`).
- **User**: registrarse (`signup`) e iniciar sesión (`auth`).
- **Seed**: cargar los datos de prueba.

Para usarla:

1. Abrir Postman → **File → Import** → seleccionar el archivo.
2. La colección trae la variable `baseUrl` ya configurada en `http://localhost:9000/api` (ajustarla si cambian el puerto en `main.ts`).
3. Para "Buscar estudiante", "Actualizar" y "Eliminar", completar la variable de colección `studentTerm` (o editar el valor directamente en la pestaña **Params** del request) con el `id`, `name`, `nickname` o `email` de un estudiante que ya hayan creado.
4. Con la app corriendo (`npm run start:dev`) y la base de datos disponible, ejecutar las peticiones en orden: primero crear (o cargar el seed), después listar/buscar/actualizar/eliminar.

## Puntos clave

Estos son los conceptos importantes que se están usando en este proyecto y que van a reutilizar durante el curso:

- **Módulos (`@Module`)**: Nest organiza la app en módulos. `AppModule` es el módulo raíz y va importando los módulos de cada feature (como `StudentModule`). Cada feature nueva del curso debe crear su propio módulo y registrarse en `imports` de `AppModule`.

- **Inyección de dependencias**: las clases marcadas con `@Injectable()` (como `StudentService`) se inyectan por constructor donde se necesiten (por ejemplo, en `StudentController`). Nest se encarga de crear e inyectar esas instancias, no hay que hacerlo a mano.

- **Conexión a PostgreSQL con TypeORM** (`src/app.module.ts`): `TypeOrmModule.forRoot()` configura la conexión leyendo las variables de entorno cargadas por `ConfigModule`. `autoLoadEntities: true` hace que TypeORM detecte automáticamente las entidades registradas en cada módulo, sin tener que listarlas todas a mano.

- **`synchronize: true`**: hace que TypeORM cree/actualice las tablas automáticamente a partir de las entidades, sin necesidad de escribir migraciones. Es muy cómodo para aprender y prototipar, **pero nunca debe usarse en producción** (puede borrar o alterar datos reales). El propio código lo marca con un comentario recordándolo.

- **`ValidationPipe` global** (`src/main.ts`): valida automáticamente el `body` de las peticiones contra los DTOs usando `class-validator`.
  - `whitelist: true`: elimina del `body` cualquier propiedad que no esté declarada en el DTO.
  - `forbidNonWhitelisted: true`: si llega una propiedad no declarada, la petición falla con un error 400 en lugar de ignorarla silenciosamente.

- **Prefijo global de rutas** (`app.setGlobalPrefix('api')` en `main.ts`): todas las rutas de la aplicación quedan bajo `/api`. Cada controlador agrega su propio prefijo encima (`@Controller('student')`), por eso la ruta final es `/api/student`. Al agregar nuevos módulos (por ejemplo `course`, `enrollment`) solo hace falta definir el `@Controller('course')` correspondiente; el `/api` ya queda cubierto por el prefijo global.

- **DTOs + `class-validator`/`class-transformer`**: los DTOs (`create-*.dto.ts`, `update-*.dto.ts`) son las clases que definen la forma y las reglas de validación de los datos que entran por la API. `CreateStudent` (`src/student/dto/create-student.dto.ts`) valida `name`, `age`, `email`, `isActive`, `gender` (`@IsIn(['Male', 'Female', 'Other'])`) y, de forma opcional, `favoriteSubjects` y `grades`. `@nestjs/mapped-types` (`PartialType`) permite crear el DTO de actualización reutilizando el de creación, sin duplicar campos: `UpdateStudentDto` (`src/student/dto/update-student.dto.ts`) es `PartialType(CreateStudent)`, así que tiene las mismas reglas de validación pero todos los campos son opcionales.

- **Entidades TypeORM** (`src/student/entities/student.entity.ts`): la clase `Student`, decorada con `@Entity()`, define la tabla `student` en la base de datos. Cada `@Column()` es una columna (`name`, `age`, `email` con `unique: true`, `isActive`, `gender`, `favoriteSubjects` como `text` con `array: true`, `nickname`). `@PrimaryGeneratedColumn("uuid")` hace que el `id` se genere automáticamente como UUID.

- **Hooks de ciclo de vida (`@BeforeInsert` / `@BeforeUpdate`)**: en `Student`, antes de guardar o actualizar un registro, TypeORM ejecuta `checkNicknameInsert()` / `checkNicknameUpdate()`, que arman el `nickname` a partir del `name` y el `age` si no vino informado. Es un buen ejemplo de lógica que vive en la entidad en lugar del servicio.

- **Relación 1:N entre `Student` y `Grades`** (`src/student/entities/grades.entity.ts`): cada estudiante puede tener muchas notas (`subject` + `grade`). Se modela con `@OneToMany(() => Grades, grade => grade.student, { cascade: true, eager: true })` en `Student` y `@ManyToOne(() => Student, student => student.grades, { onDelete: "CASCADE" })` en `Grades`. `cascade: true` permite guardar las `grades` al mismo tiempo que el `student` (sin insertarlas aparte); `eager: true` hace que siempre se traigan las notas al consultar un estudiante, sin pedirlo explícitamente; `onDelete: "CASCADE"` borra las notas de un estudiante si el estudiante se elimina.

- **Repositorios con `TypeOrmModule.forFeature()` e `@InjectRepository()`**: `StudentModule` registra ambas entidades con `TypeOrmModule.forFeature([Student, Grades])`, lo que habilita inyectar sus repositorios en el servicio (`@InjectRepository(Student)`, `@InjectRepository(Grades)`). El repositorio (`.create()`, `.save()`, `.find()`, `.findOneBy()`, `createQueryBuilder()`, etc.) es la forma estándar de leer/escribir en la base de datos con TypeORM dentro de Nest.

- **Endpoint de creación** (`StudentController.create` → `StudentService.createStudent`): recibe el `body` ya validado como `CreateStudent`, separa las `grades` del resto de los datos, crea cada nota con `gradesRepository.create(...)` y arma el `student` con esas notas anidadas antes de guardar (`studentRepository.save(student)` persiste ambas entidades gracias al `cascade: true`).

- **Paginación con `PaginationDto`** (`GET /api/student`): `limit` y `skip` llegan como *query params*, es decir, como strings. `@Type(() => Number)` (de `class-transformer`) los convierte a número antes de validarlos con `@IsInt()` + `@Min(1)` (limit) y `@Min(0)` (skip, para que `page=1` pueda empezar en 0). El servicio los pasa directo a las opciones `take`/`skip` de `studentRepository.find()`.

- **Búsqueda flexible en `findOne`** (`GET /api/student/:term`): si el `term` es un UUID (`isUUID()` de `class-validator`) se busca por `id` con `findOne`; si no, se arma un `createQueryBuilder()` que compara `UPPER(name)`, `nickname` o `email` contra el término, y hace `leftJoinAndSelect("student.grades", ...)` para traer también sus notas. El mismo `term` funciona en `PATCH` y `DELETE`, porque ambos llaman a `findOne` antes de actuar.

- **Actualización con `merge` + transacción** (`PATCH /api/student/:id` → `StudentService.updateStudent`): primero `findOne(term)` trae el estudiante (con sus notas), luego `studentRepository.merge(student, studentDetails)` mezcla encima solo los campos que llegaron en el `body` **sin guardar todavía**; si no existe, `findOne` ya lanzó el `NotFoundException`.

- **Transacciones con `QueryRunner`** (`StudentService.updateStudent`): como actualizar un estudiante con notas implica varias operaciones (borrar las notas viejas y guardar el estudiante con las nuevas), se hacen dentro de una transacción: `dataSource.createQueryRunner()` → `connect()` → `startTransaction()`, las operaciones con `queryRunner.manager`, y al final `commitTransaction()`. Si algo falla, `rollbackTransaction()` deshace todo, para no dejar un estudiante sin notas a medias. En ambos casos se llama a `release()` para devolver la conexión al pool.

- **Las `grades` se reemplazan, no se agregan**: si el `body` del `PATCH` trae `grades`, el servicio borra **todas** las notas actuales del estudiante (`queryRunner.manager.delete(Grades, { student: { id } })`) y guarda solo las que vienen en la petición. Para agregar una materia nueva hay que enviar la lista completa (las anteriores más la nueva). Si el `body` no trae `grades`, las notas no se tocan.

- **Eliminación** (`DELETE /api/student/:id` → `StudentService.removeStudent`): busca el estudiante con `findOne` y lo borra con `studentRepository.remove(student)`. Sus notas se eliminan en la base de datos gracias al `onDelete: "CASCADE"` de la relación.

- **Contraseñas con bcrypt** (`src/user/user.service.ts`): al registrar, `encryptPassword` guarda `bcrypt.hashSync(password, 10)` (un hash con salt, nunca el texto plano); al iniciar sesión, `bcrypt.compareSync(password, user.password)` compara. El servicio devuelve siempre un `SafeUser` (`Omit<User, 'password' | 'checkEmailBeforeChanges'>`), así que la contraseña jamás sale de la API. El `@BeforeInsert`/`@BeforeUpdate` de `User` normaliza el email a minúsculas antes de guardarlo.

- **`JwtModule` + `PassportModule` preparados** (`src/user/user.module.ts`): el módulo registra la estrategia `jwt` con el secreto de `JWT_SECRET` y expira en 1 h, pero **todavía no hay guards**: ningún endpoint está protegido. Activar la protección de rutas es el paso siguiente natural (crear el strategy/guard y aplicarlo a `@UseGuards`).

- **Seed con datos de prueba** (`GET /api/seed` → `SeedService.runSeed`): llama a `deleteAllStudents()` (borrado por ids, porque TypeORM rechaza `delete({})` sin criterio) y luego reinserta los estudiantes de `seed-student.data.ts` con el mismo `createStudent` del CRUD. Devuelve JSON (`{ message: 'SEED EXECUTED' }`) como el resto de la API.

## ⚠️ Cosas a revisar (para practicar debugging)

Estos son comportamientos que quedan **a propósito** en el código: identificarlos y proponer una mejora es un buen ejercicio de debugging. (Otros bugs que había aquí —el puerto `+!process.env.DB_PORT`, `handleException` tragándose el 404, el `replace(" ", "_")` de un solo espacio, el parámetro `email` que en realidad era el `id`— ya fueron corregidos: pueden buscarlos en el historial de commits para ver el antes/después.)

- En `src/user/user.service.ts`, `login` responde **404** (`NotFoundException: user ... not found`) cuando el email no existe. Un atacante puede usar esa diferencia para descubrir qué emails están registrados. ¿Qué status code uniforme (¿401?) conviene responder tanto para "no existe" como para "contraseña incorrecta"?

- En `src/seed/seed.controller.ts`, el endpoint **borra todos los estudiantes** pero se invoca con `GET`, un método que por convención debe ser seguro e idempotente (un simple `curl` o el pre-fetch de un navegador podría dispararlo). ¿Por qué debería ser `POST` en su lugar?

- En `src/student/student.service.ts`, `handleException` convierte cualquier error inesperado en un `InternalServerErrorException` **pasándole `error.message`**: los mensajes internos de TypeORM/Postgres (tablas, columnas, a veces hasta fragments de SQL) se filtran al cliente. ¿Qué mensaje genérico debería devolver en producción, dejando el detalle solo en el `logger`?

- En `src/main.ts` no se llama a `app.enableCors()`: la API funciona con Postman o `curl`, pero un frontend en otro origen (otro puerto en desarrollo, otro dominio) recibiría errores de CORS al intentar usarla. ¿Cómo se habilita y qué riesgos implica abrirlo con `origin: true`?

- `PATCH` con `grades` reemplaza todas las notas (ver [Puntos clave](#puntos-clave)). ¿Cómo cambiarían `updateStudent` para que una materia nueva se **agregue** y una que ya existe solo actualice su nota? Pista: si solo quitan el `delete`, TypeORM deja las notas que no están en el arreglo sin estudiante (`studentId` en `NULL`), así que hay que combinar las notas actuales con las nuevas.

- Ninguna ruta está protegida: `JwtModule` está configurado en `UserModule` pero no hay strategy ni guard. ¿Qué endpoint protegerían primero y cómo se vería el `@UseGuards(AuthGuard('jwt'))` en el controlador?

## Pruebas

El proyecto usa [Vitest](https://vitest.dev/) (no Jest). Hay 6 pruebas end-to-end que levantan la app real contra la base de datos:

```bash
# toda la suite (unitarias + e2e)
npm test

# solo las pruebas end-to-end (requieren PostgreSQL y un .env válido)
npm run test:e2e

# cobertura (reporte V8)
npm run test:cov
```

`vitest.config.e2e.ts` incluye solo los `*.e2e-spec.ts`; la app se construye una única vez en el `beforeAll` (`Test.createTestingModule` + `app.init()`) y las 6 pruebas comparten la misma instancia, replicando en el test la configuración de `main.ts` (prefijo global y `ValidationPipe`). Las pruebas son: seed, paginación, búsqueda por `id`/`name`/`nickname`, 404 al no encontrar, rechazo de datos inválidos con 400 y el ciclo completo `POST` → `PATCH` → `DELETE`. Mientras no haya pruebas unitarias, `vitest.config.ts` define `passWithNoTests: true` para que `npm test` no falle.

## Recursos del framework

- [Documentación de NestJS](https://docs.nestjs.com)
- [Documentación de TypeORM](https://typeorm.io)
- [class-validator](https://github.com/typestack/class-validator)
