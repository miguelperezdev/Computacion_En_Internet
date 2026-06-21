# Spec 09: Student REST API CRUD

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Provide a RESTful interface for managing student records (Create, Read, Update, Delete).
- **Users**: Administrators, API Integrators, and Frontend applications.
- **Requirements**:
    1. Create a new student record with name, code, and program.
    2. Retrieve all student records.
    3. Retrieve a specific student record by its unique identifier (ID).
    4. Update an existing student record's details.
    5. Delete a student record by its unique identifier (ID).
    6. Ensure that operations are restricted based on security permissions.
- **Edge cases**:
    - Requesting a student that does not exist (404 Not Found).
    - Submitting invalid or missing required fields (400 Bad Request).
    - Unauthorized access to modification endpoints (403 Forbidden).
    - Duplicate student code (if uniqueness is enforced).
- **Acceptance criteria**:
    - Given valid student data, when I send a POST request to `/api/v1/students`, then a 201 Created status is returned with the new student details.
    - Given an existing student ID, when I send a GET request to `/api/v1/students/{id}`, then a 200 OK status is returned with the student details.
    - Given a non-existent student ID, when I send a GET request to `/api/v1/students/{id}`, then a 404 Not Found status is returned.
    - Given an existing student ID and new data, when I send a PUT request to `/api/v1/students/{id}`, then the record is updated and a 200 OK status is returned.
    - Given an existing student ID, when I send a DELETE request to `/api/v1/students/{id}`, then the record is removed and a 204 No Content status is returned.

### 2. Plan (technical and concrete)

- **Architecture**: A new `RestController` in the `api.v1` package, following the existing project structure and delegating logic to `StudentService`.
- **Data model**:
    - Reuse `Student` entity.
    - Create `StudentRequest` DTO for input validation.
    - Create `StudentResponse` DTO for standardized output.
- **API contracts**:
    - `GET /api/v1/students`: Returns a list of all students.
    - `GET /api/v1/students/{id}`: Returns a single student by ID.
    - `POST /api/v1/students`: Creates a new student.
    - `PUT /api/v1/students/{id}`: Updates an existing student.
    - `DELETE /api/v1/students/{id}`: Deletes a student.
- **Testing strategy**:
    - Create a Postman collection `Student_API.postman_collection.json` in the project root.
    - The collection must include an authentication request to obtain a JWT token.
    - All CRUD requests must use the Bearer token for authorization.
- **Security constraints**:
    - `@PreAuthorize("hasAuthority('READ_STUDENT')")` for GET requests.
    - `@PreAuthorize("hasAuthority('CREATE_STUDENT')")` for POST requests.
    - `@PreAuthorize("hasAuthority('DELETE_STUDENT')")` for DELETE requests.
    - Update/PUT will require appropriate permissions (assumed `CREATE_STUDENT` or a new `UPDATE_STUDENT` if exists).
- **Dependencies**: Spring Boot Starter Web, Spring Security, MapStruct (for DTO mapping).

### 3. Tasks (ordered, self-contained)

Task 1: Create Student DTOs and Mapper
Depends on: none
What to build: `StudentRequest`, `StudentResponse` DTOs and `StudentMapper` interface.
Acceptance criteria:
- DTOs correctly represent the Student entity fields.
- Mapper correctly converts between Entity and DTOs.

Task 2: Implement StudentRestController
Depends on: Task 1
What to build: `StudentRestController` with GET, POST, PUT, and DELETE endpoints.
Acceptance criteria:
- All CRUD endpoints are implemented and call the corresponding `StudentService` methods.
- Appropriate HTTP status codes are returned for success and failure cases.

Task 3: Create Postman Collection
Depends on: Task 2
What to build: `Student_API.postman_collection.json` in the project root with requests for Login, List, Get by ID, Create, Update, and Delete.
Acceptance criteria:
- The collection can be imported into Postman and runs successfully (given a running server).
- Authentication flow is correctly handled via collection variables.

## Assumptions to review

1. **DTO Pattern Consistency** — Impact: MEDIUM
   Correct this if: The project starts moving away from DTOs or prefers exposing entities directly in some contexts.
2. **Update Permission** — Impact: LOW
   Correct this if: There is a specific `UPDATE_STUDENT` permission that should be used instead of `CREATE_STUDENT`.
3. **Student Code Uniqueness** — Impact: MEDIUM
   Correct this if: The API should specifically handle and return 409 Conflict for duplicate codes.
