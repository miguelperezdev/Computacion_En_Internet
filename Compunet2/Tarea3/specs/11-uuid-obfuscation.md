# Spec 11: Resource ID Obfuscation (UUID)

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Protect the system against resource enumeration attacks by replacing predictable auto-incremental internal IDs with opaque, non-sequential public identifiers (UUIDs) in all external communications.
- **Users**: API clients, Frontend applications, and External integrations.
- **Requirements**:
    1. A new field `publicId` of type UUID must be added to `Course`, `Enrollment`, `Student`, `Professor`, `User`, `Role`, and `Permission`.
    2. The `publicId` must be automatically generated upon creation of a new entity instance.
    3. The `publicId` must be unique across all records of the same entity type.
    4. All REST API endpoints must use `publicId` in their URLs (Path Variables) and Query Parameters instead of the internal database ID.
    5. All JSON responses (DTOs) must only include the `publicId`, never the internal ID.
    6. System lookups from external requests must be resolved using the `publicId`.
- **Edge cases**:
    - Requesting a resource with an invalid UUID format (should return 400 Bad Request).
    - Requesting a resource with a valid but non-existent UUID (should return 404 Not Found).
    - Database migration: existing records must be populated with a `publicId` before the refactor is fully deployed.
- **Acceptance criteria**:
    - Given a REST request to `/api/v1/courses/{uuid}`, when the UUID exists, then the course details are returned.
    - Given a REST request with an internal integer ID (e.g., `/api/v1/courses/1`), when the system has been updated, then the request should either fail or return 404 (as integer IDs are no longer valid path variables).
    - Given any API response DTO, when I inspect the payload, then no field named `id` containing an integer is present, and a `publicId` field containing a UUID string is present.

### 2. Plan (technical and concrete)

- **Architecture**:
    - **Entity Layer**: Add `@Column(unique = true, nullable = false)` `publicId` to entities. Use a JPA lifecycle hook (`@PrePersist`) or constructor initialization to ensure generation.
    - **Repository Layer**: Add `Optional<T> findByPublicId(UUID publicId)` to all relevant repositories.
    - **Service Layer**: Update logic to use `findByPublicId` when resolving resources from controllers.
    - **DTO Layer**: Replace `Integer id` with `UUID publicId` in all Request and Response DTOs.
    - **Mapper Layer**: Configure MapStruct to map `entity.publicId` to `dto.publicId`.
    - **Controller Layer**: Update `@PathVariable` types from `Integer` to `UUID` and adjust service calls.
- **Data model**:
    - Add `public_id UUID UNIQUE NOT NULL` column to tables: `course`, `student_course` (Enrollment), `student`, `professor`, `app_user`, `role`, `permission`.
- **API contracts**:
    - All endpoints previously using `{id}` (Integer) will now use `{publicId}` (UUID).
    - Example: `GET /api/v1/students/550e8400-e29b-41d4-a716-446655440000`.
- **Testing strategy**:
    - Integration tests for repositories to verify `findByPublicId`.
    - API tests (Postman) updated to use UUID strings.
    - Verification that `data.sql` includes UUIDs for test data.
- **Security constraints**:
    - Input validation: Ensure path variables match UUID format.
- **Dependencies**: `java.util.UUID`, Spring Data JPA, MapStruct.

### 3. Tasks (ordered, self-contained)

*Status: ❌ Not Implemented | ⚠️ Partially Done | ✅ Done*

```
Task 1: Entity & Database Refactor ❌
Depends on: none
What to build: 
- Add publicId field to Course, Enrollment, Student, Professor, User, Role, Permission.
- Implement auto-generation logic (e.g., UUID.randomUUID() in constructor or @PrePersist).
- Update data.sql to include UUIDs for all initial records.
Acceptance criteria:
- Every entity has a non-null, unique publicId after persistence.

Task 2: Repository Updates ❌
Depends on: Task 1
What to build: Add findByPublicId(UUID publicId) and existsByPublicId(UUID publicId) methods to all corresponding repositories.
Acceptance criteria:
- Can retrieve an entity from the database using only its UUID.

Task 3: DTO & Mapper Refactor ❌
Depends on: Task 1
What to build:
- Replace 'id' with 'publicId' in CourseRequest/Response, StudentRequest/Response, etc.
- Update MapStruct mappers (CourseMapper, StudentMapper, ProfessorMapper, EnrollmentMapper).
Acceptance criteria:
- API responses no longer contain internal integer IDs.
- DTOs correctly display the publicId.

Task 4: Service & Controller Refactor ❌
Depends on: Task 2, Task 3
What to build:
- Update Service interfaces and implementations to accept UUID publicId instead of Integer id.
- Update Controllers to use UUID in @PathVariables.
Acceptance criteria:
- Endpoints like GET /api/v1/courses/{publicId} work correctly.
- Integer-based lookups from the web/API layer are removed.

Task 5: Postman Collection Migration ❌
Depends on: Task 4
What to build: Update all Postman collections (Professor API, Student API, etc.) to use UUIDs in URLs and bodies.
Acceptance criteria:
- All Postman tests pass using opaque identifiers.
```

## Assumptions to review

1. **Enrollment Public ID** — Impact: HIGH
   Correct this if: Enrollment (student_course) should not have its own UUID but instead be managed strictly by the combination of Student UUID and Course UUID. [DECISION: We add a dedicated UUID to Enrollment for consistency as requested].
2. **Backward Compatibility** — Impact: MEDIUM
   Correct this if: We need to maintain support for integer IDs for a transition period (not requested, assuming hard cutover).
3. **Internal Relationships** — Impact: LOW
   Correct this if: Internal relationships (foreign keys) should also use UUIDs (currently assuming we keep Integer FKs for database performance and only obfuscate the external layer).
