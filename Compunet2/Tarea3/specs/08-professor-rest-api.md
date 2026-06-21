# Spec 08: Professor REST API CRUD

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Provide a standardized RESTful interface for programmatic management of Professor records.
- **Users**: Integration systems, Frontend applications, and Administrators.
- **Requirements**:
    1. The system must expose endpoints to Create, Read (all and single), Update, and Delete professors.
    2. Data must be exchanged in JSON format.
    3. Creation and Update must require a professor's name.
    4. Deletion must remove the professor record from the database.
- **Edge cases**:
    - Requesting a professor with an ID that does not exist (should return 404).
    - Submitting invalid or empty data for a professor (should return 400).
    - Unauthorized users attempting to modify professor data (should return 403).
- **Acceptance criteria**:
    - Given valid professor data, when I send a POST request to `/api/v1/professors`, then a 201 Created status is returned and the professor is saved.
    - Given an existing professor ID, when I send a GET request to `/api/v1/professors/{id}`, then the professor's details are returned in the response body.
    - Given an existing professor ID, when I send a DELETE request to `/api/v1/professors/{id}`, then the record is deleted and a 204 No Content status is returned.
    - Given a non-existent ID, when I send a GET request to `/api/v1/professors/{id}`, then a 404 Not Found status is returned.

### 2. Plan (technical and concrete)

- **Architecture**: A new `RestController` following the established patterns in the `api.v1` package.
- **Data model**: 
    - Reuse the `Professor` entity.
    - Create `ProfessorRequest` (for input) and `ProfessorResponse` (for output) DTOs. [ASSUMPTION: We should not expose the JPA entity directly in the API].
- **API contracts**:
    - `GET /api/v1/professors`: Returns a list of `ProfessorResponse`.
    - `GET /api/v1/professors/{id}`: Returns a single `ProfessorResponse`.
    - `POST /api/v1/professors`: Accepts `ProfessorRequest`, returns 201 Created.
    - `PUT /api/v1/professors/{id}`: Accepts `ProfessorRequest`, returns 200 OK.
    - `DELETE /api/v1/professors/{id}`: Returns 204 No Content.
- **Testing strategy**: 
    - Create a Postman collection named `Professor_API.postman_collection.json` in the project root.
    - Include tests for each status code (200, 201, 204, 404).
- **Security constraints**:
    - Enforcement via `@PreAuthorize` at the service layer is already in place.
    - Controller methods will inherit these protections.
- **Dependencies**: Spring Web, Spring Security, existing `ProfessorService`.

### 3. Tasks (ordered, self-contained)

Task 1: Create Professor DTOs
Depends on: none
What to build: `ProfessorRequest.java` and `ProfessorResponse.java` in the `dto` package.
Acceptance criteria:
- DTOs correctly represent the professor data (id, name).

Task 2: Implement ProfessorRestController
Depends on: Task 1
What to build: `ProfessorRestController.java` in `api.v1` package with GET, POST, PUT, DELETE mappings.
Acceptance criteria:
- All endpoints are reachable and interact correctly with `ProfessorService`.
- Returns correct HTTP status codes.

Task 3: Create Postman Collection
Depends on: Task 2
What to build: A JSON file `Professor_API.postman_collection.json` in the root directory.
Acceptance criteria:
- Collection contains requests for all CRUD operations.
- Each request includes a test script checking for the expected status code.

## Assumptions to review

1. **DTO Usage** — Impact: MEDIUM
   Correct this if: The project explicitly allows exposing entities directly in the REST layer (currently discouraged by standard practices).
2. **Update Logic** — Impact: LOW
   Correct this if: The `ProfessorService` needs a specific `update` method (currently it might rely on `saveProfessor`).
3. **ID Type** — Impact: LOW
   Correct this if: The `Professor` ID should be handled as `UUID` instead of `Integer` (matching the entity's current `Integer` ID).

## Assumptions summary

1. [DTO Usage] — Impact: MEDIUM
   Correct this if: The architecture changes to favor entity exposure for simplicity.

2. [Update Logic] — Impact: LOW
   Correct this if: Explicit update validation is required at the service level.

3. [ID Type] — Impact: LOW
   Correct this if: We decide to move to UUIDs for all primary keys in the API layer.
