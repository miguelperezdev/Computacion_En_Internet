# Migración a publicId (UUID) en entidades expuestas

### Por:
- Miguel Perez Ojeda - A00407054

## contexto

los endpoints actuales exponen el id interno (autoincremental) de las entidades en las URLs y respuestas. esto permite que cualquiera pueda iterar /courses/1, /courses/2, etc. y descubrir recursos del sistema sin autorización (enumeración de recursos).

## qué se hizo

se agregó un campo `publicId` de tipo UUID a las siguientes entidades:

- Course
- Enrollment
- Student
- Professor
- User
- Role
- Permission

## cambios por capa

**entidad:** se agrega el campo `publicId` anotado con `@Column(unique = true, nullable = false)`. se genera automáticamente con `UUID.randomUUID()` antes de persistir (`@PrePersist`).

**repositorio:** se agrega un método `findByPublicId(UUID publicId)` para buscar por el identificador público. el `id` interno solo se usa dentro de esta capa.

**mapper:** los DTOs de respuesta ahora exponen el `publicId` en vez del `id`. el `id` interno nunca sale del repositorio.

**controller:** los path variables (`/courses/{id}`) ahora reciben un UUID y delegan al servicio usando `publicId`. el id interno no se toca desde el controller.

## ejemplo

antes: GET /courses/3

después: GET /courses/a3f1c2d4-87eb-4a1e-bf2c-123456789abc