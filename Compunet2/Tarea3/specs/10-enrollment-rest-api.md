# Spec 10: Enrollment REST API CRUD

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Provide a RESTful interface for managing student enrollments in courses, allowing for creation, retrieval, and cancellation of academic registrations.
- **Users**: Academic Administrators, Students (via self-service portals).
- **Requirements**:
    1. Create an enrollment record by linking a Student ID and a Course ID.
    2. Retrieve all active enrollments.
    3. Retrieve a specific enrollment using the combined Student/Course identifier.
    4. Remove (cancel) an enrollment record.
    5. The system must prevent duplicate enrollments for the same student in the same course.
- **Edge cases**:
    - Enrolling a student in a non-existent course (404 Not Found).
    - Enrolling a non-existent student in a course (404 Not Found).
    - Submitting malformed IDs (400 Bad Request).
    - Unauthorized access to enrollment records (403 Forbidden).
- **Acceptance criteria**:
    - Given a valid Student ID and Course ID, when I send a POST request to `/api/v1/enrollments`, then a 201 Created status is returned and the enrollment is saved.
    - Given an existing enrollment, when I send a GET request to `/api/v1/enrollments/{studentId}/{courseId}`, then the enrollment details are returned.
    - Given an existing enrollment, when I send a DELETE request to `/api/v1/enrollments/{studentId}/{courseId}`, then the record is removed and a 204 No Content status is returned.
    - Given a student already enrolled in a course, when I send a POST request for the same pair, then a 409 Conflict (or 400) is returned.

### 2. Plan (technical and concrete)

- **Architecture**: REST Controller in the `api.v1` package, delegating to `EnrollmentService`. Uses DTOs for data transfer.
- **Data model**:
    - `Enrollment` entity with `StudentCourseId` (composite key).
    - `EnrollmentRequest` DTO (studentId, courseId).
    - `EnrollmentResponse` DTO (studentId, studentName, courseId, courseName).
- **API contracts**:
    - `GET /api/v1/enrollments`: List all enrollments.
    - `GET /api/v1/enrollments/{studentId}/{courseId}`: Get single enrollment.
    - `POST /api/v1/enrollments`: Create enrollment.
    - `DELETE /api/v1/enrollments/{studentId}/{courseId}`: Delete enrollment.
- **Testing strategy**:
    - Create `Enrollment_API.postman_collection.json` in the root directory.
    - Include authentication flow and CRUD tests with status code assertions.
- **Security constraints**:
    - `@PreAuthorize("hasAuthority('CREATE_ENROLLMENT')")` for POST and DELETE.
    - `@PreAuthorize("hasAuthority('READ_ENROLLMENT')")` for GET. [ASSUMPTION: READ_ENROLLMENT exists or will be added to the RBAC model].
- **Dependencies**: Spring Data JPA, Spring Security, MapStruct.

### 3. Tasks (ordered, self-contained)

*Status: ❌ Not Implemented | ⚠️ Partially Done | ✅ Done*

```
Task 1: Create Enrollment DTOs and Mapper ❌
Depends on: none
What to build: EnrollmentRequest, EnrollmentResponse, and EnrollmentMapper.
Acceptance criteria:
- DTOs correctly map fields from Student and Course entities.
- Mapper correctly handles the composite key conversion.

Task 2: Implement EnrollmentRestController ❌
Depends on: Task 1
What to build: RestController with endpoints for CRUD.
Acceptance criteria:
- POST /api/v1/enrollments returns 201 on success.
- DELETE returns 204.
- Security authorities correctly enforced.

Task 3: Create Postman Collection ❌
Depends on: Task 2
What to build: Enrollment_API.postman_collection.json in root.
Acceptance criteria:
- All CRUD operations tested and passing.
- Authorization header handled via variables.
```

## Assumptions to review

1. **Composite Key URI Pattern** — Impact: MEDIUM
   Correct this if: The preferred URI pattern for composite keys is different (e.g., using query params or a single encoded string).
2. **Permission Names** — Impact: LOW
   Correct this if: The specific authorities for enrollments are named differently in the database (e.g., MANAGE_ENROLLMENT).
3. **Enrollment Deletion** — Impact: MEDIUM
   Correct this if: Enrollments should be "soft deleted" (marked as inactive) instead of removed from the DB.
