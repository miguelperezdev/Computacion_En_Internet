# Specs: Sistema de Autenticación y Autorización

> Manifiesto de estado actual. Cada sección indica qué está **hecho**, qué está **parcialmente hecho** y qué está **pendiente**.

---

## Leyenda

| Símbolo | Significado |
|---------|-------------|
| ✅ | Hecho y funcional |
| ⚠️ | Existe pero incompleto o con defectos |
| ❌ | No implementado |

---

## 1. Registro de usuarios

| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Endpoint `GET /auth/signup` (formulario) | ✅ | `AuthController` |
| Endpoint `POST /auth/signup` (procesa registro) | ✅ | `AuthController.signup()` |
| Contraseña encodeada con BCrypt al guardar | ✅ | `UserServiceImpl.save()` |
| Validación de usuario duplicado | ✅ | `UserServiceImpl.save()` lanza `IllegalArgumentException` si el username ya existe |
| Mensaje de error en formulario al registrar usuario duplicado | ✅ | `AuthController` captura la excepción y la muestra en `signup.html` |
| Redirección con mensaje de éxito tras registro | ✅ | `redirect:/auth/login?registered` |

---

## 2. Login de usuarios

| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Endpoint `GET /auth/login` (formulario) | ✅ | `AuthController` |
| Spring Security form login configurado | ✅ | `WebSecurityConfig` |
| Redirección tras login exitoso → `/auth/profile` | ✅ | `defaultSuccessUrl("/auth/profile", true)` |
| `CustomUserDetailService` implementado | ✅ | Carga usuario + roles + permisos desde BD |
| `AppUser` implementa `UserDetails` con roles Y permisos | ✅ | Carga `ROLE_*` y todos los `permission.name` en authorities |
| Logout funcional (`/logout`) | ✅ | Invalida sesión, redirige a `/auth/login?logout` |
| Permisos cargados en `SecurityContext` | ✅ | Fix aplicado en `AppUser.java` — itera `userRoles → rolePermissions → permission.name` |

---

## 3. Usuario administrador en `data.sql`

| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Usuario `admin` con `ROLE_ADMIN` | ✅ | `admin / admin123` |
| Usuario `domic.rincon@gmail.com` con `ROLE_ADMIN` | ✅ | `domic.rincon@gmail.com / admin123` |
| Contraseñas consistentes | ✅ | Todos los usuarios usan `{noop}` — dev only, documentado en el SQL |

---

## 4. Roles

| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Entidad `Role` | ✅ | Tabla `role` |
| Entidad join `UserRole` (clave compuesta `UserRoleId`) | ✅ | Tabla `user_role` |
| `RoleRepository` con `findByName()` | ✅ | Método añadido |
| `UserRepository` con `existsByUsername()` | ✅ | Método añadido para validar duplicados |
| `RoleService` + `RoleServiceImpl` con `@PreAuthorize` | ✅ | Todos los métodos protegidos con `ROLE_ADMIN` |
| Rol `ROLE_ADMIN` en `data.sql` | ✅ | ID 1 |
| Rol `ROLE_STUDENT` en `data.sql` | ✅ | ID 2 |
| Rol `ROLE_PROFESSOR` en `data.sql` | ✅ | ID 3 — agregado |
| `UserRoleService` + `UserRoleServiceImpl` con `@PreAuthorize` | ✅ | Todos los métodos protegidos con `ROLE_ADMIN` |

---

## 5. Permisos

| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Entidad `Permission` | ✅ | Tabla `permission` |
| Entidad join `RolePermission` | ✅ | Tabla `role_permission` |
| `PermissionService` + `PermissionServiceImpl` con `@PreAuthorize` | ✅ | Todos los métodos protegidos con `ROLE_ADMIN` |
| `RolePermissionService` + `RolePermissionServiceImpl` con `@PreAuthorize` | ✅ | Todos los métodos protegidos con `ROLE_ADMIN` |
| 16 permisos CRUD en `data.sql` | ✅ | `CREATE/READ/UPDATE/DELETE` × `Student, Professor, Enrollment, Course` |
| Permisos de `ROLE_ADMIN` en `data.sql` | ✅ | Los 16 permisos |
| Permisos de `ROLE_STUDENT` en `data.sql` | ✅ | 7 permisos (lectura + CRUD Enrollment) |
| Permisos de `ROLE_PROFESSOR` en `data.sql` | ✅ | 7 permisos (lectura + gestión cursos y profesores) |
| Permisos cargados en `SecurityContext` | ✅ | `AppUser` resuelto |

---

## 6. Funcionalidades del administrador

### 6a. Asignación de rol a usuario

| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| `GET /admin/users` — lista usuarios con roles | ✅ | `AdminController` |
| `POST /admin/users/{userId}/assign-role` | ✅ | `AdminController.assignRole()` — verifica duplicado antes de insertar |
| `POST /admin/users/{userId}/remove-role` | ✅ | `AdminController.removeRole()` |
| `@PreAuthorize` en todos los endpoints de admin | ✅ | `@PreAuthorize("hasAuthority('ROLE_ADMIN')")` a nivel de clase en `AdminController` |

### 6b. Asignación de permisos a un rol

| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| `GET /admin/roles` — lista roles con permisos | ✅ | `AdminController` |
| `POST /admin/roles/{roleId}/assign-permission` | ✅ | `AdminController.assignPermission()` |
| `POST /admin/roles/{roleId}/remove-permission` | ✅ | `AdminController.removePermission()` |

---

## 7. `@PreAuthorize` por método de servicio

### StudentServiceImpl

| Método | Estado | Autoridad |
|--------|--------|-----------|
| `save()` | ✅ | `CREATE_STUDENT` |
| `findAll()` | ✅ | `READ_STUDENT` |
| `findById()` | ✅ | `READ_STUDENT` |
| `deleteById()` | ✅ | `DELETE_STUDENT` |
| `findStudentByCode()` | ✅ | `READ_STUDENT` |
| `getStudentsByCourseName()` | ✅ | `READ_STUDENT` |
| `deleteStudentByCode()` | ✅ | `DELETE_STUDENT` |
| `enrollStudentInCourse()` | ✅ | `CREATE_ENROLLMENT` |
| `unenrollStudentFromCourse()` | ✅ | `DELETE_ENROLLMENT` |

### CourseServiceImpl

| Método | Estado | Autoridad |
|--------|--------|-----------|
| `getAllCourses()` | ✅ | `READ_COURSE` |
| `getCoursesByProfessor()` | ✅ | `READ_COURSE` |
| `getCourseById()` | ✅ | `READ_COURSE` |
| `getCoursesByCredits()` | ✅ | `READ_COURSE` |
| `save()` | ✅ | `CREATE_COURSE` |
| `deleteById()` | ✅ | `DELETE_COURSE` |

### ProfessorServiceImpl

| Método | Estado | Autoridad |
|--------|--------|-----------|
| `findAll()` | ✅ | `READ_PROFESSOR` |
| `saveProfessor()` | ✅ | `CREATE_PROFESSOR` |
| `findById()` | ✅ | `READ_PROFESSOR` |
| `deleteById()` | ✅ | `DELETE_PROFESSOR` |

### UserServiceImpl

| Método | Estado | Autoridad |
|--------|--------|-----------|
| `save()` | ✅ | Público (signup libre) — valida duplicado internamente |
| `findAll()` | ✅ | `ROLE_ADMIN` |
| `findById()` | ✅ | `ROLE_ADMIN` |
| `deleteById()` | ✅ | `ROLE_ADMIN` |
| `findByUsername()` | ✅ | Sin protección (uso interno del sistema de seguridad) |

### RoleServiceImpl

| Método | Estado | Autoridad |
|--------|--------|-----------|
| `findAll()` | ✅ | `ROLE_ADMIN` |
| `save()` | ✅ | `ROLE_ADMIN` |
| `findById()` | ✅ | `ROLE_ADMIN` |
| `deleteById()` | ✅ | `ROLE_ADMIN` |

### PermissionServiceImpl

| Método | Estado | Autoridad |
|--------|--------|-----------|
| `findAll()` | ✅ | `ROLE_ADMIN` |
| `save()` | ✅ | `ROLE_ADMIN` |
| `findById()` | ✅ | `ROLE_ADMIN` |
| `deleteById()` | ✅ | `ROLE_ADMIN` |

### UserRoleServiceImpl

| Método | Estado | Autoridad |
|--------|--------|-----------|
| `save()` | ✅ | `ROLE_ADMIN` |
| `deleteById()` | ✅ | `ROLE_ADMIN` |
| `findAll()` | ✅ | `ROLE_ADMIN` |
| `findById()` | ✅ | `ROLE_ADMIN` |

### RolePermissionServiceImpl

| Método | Estado | Autoridad |
|--------|--------|-----------|
| `save()` | ✅ | `ROLE_ADMIN` |
| `deleteById()` | ✅ | `ROLE_ADMIN` |
| `findAll()` | ✅ | `ROLE_ADMIN` |
| `findById()` | ✅ | `ROLE_ADMIN` |

---

## 8. Diseño UI

| Pantalla | Estado | Notas |
|----------|--------|-------|
| Login | ✅ | Tailwind CDN — card centrado, gradiente azul/índigo, alertas contextuales, credenciales de prueba |
| Registro | ✅ | Tailwind CDN — mismo estilo, mensaje de error inline para usuario duplicado |
| Perfil | ✅ | Navbar, avatar, badges diferenciados por roles (azul oscuro) vs permisos (azul claro) |
| Admin / Usuarios | ✅ | Sidebar, tabla con avatar inicial, chips de rol removibles, selector de rol para asignar |
| Admin / Roles y Permisos | ✅ | Card por rol con header degradado, permisos con ícono ✓ removibles, selector para asignar |

---

## 9. Dependencias

| Dependencia | Estado | Notas |
|-------------|--------|-------|
| `thymeleaf-extras-springsecurity6` | ✅ | Agregada al `pom.xml` — habilita `sec:authorize` en templates |

---

## 10. Credenciales de prueba (`data.sql`)

| Usuario | Contraseña | Rol | Permisos |
|---------|-----------|-----|---------|
| `admin` | `admin123` | `ROLE_ADMIN` | Todos (16) |
| `domic.rincon@gmail.com` | `admin123` | `ROLE_ADMIN` | Todos (16) |
| `student1` | `student123` | `ROLE_STUDENT` | 7 (lectura + CRUD Enrollment) |
| `prof1` | `prof123` | `ROLE_PROFESSOR` | 7 (lectura + gestión cursos) |
