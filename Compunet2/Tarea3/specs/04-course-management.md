# Spec 04: Course Management System

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Manage the academic course catalog, allowing for creation, retrieval, and assignment of courses to professors.
- **Users**: Admin/Professors (Creation/Management), All users (Reading).
- **Requirements**:
    1. The system must maintain a list of courses with their names and credit values.
    2. Courses must be associated with a Professor.
    3. Users must be able to view all available courses.
    4. Users must be able to filter or find courses by specific criteria (e.g., ID, credits).
    5. The system must provide both a web-based UI and a REST API for course operations.
- **Edge cases**:
    - Creating a course without a professor assigned.
    - Retrieving a non-existent course via API.
    - Unauthorized creation of courses via REST API.
- **Acceptance criteria**:
    - Given I am authorized, when I submit a course creation request, then a new course is saved with the associated professor.
    - Given a list of courses exists, when I access `/api/v1/courses`, then I receive a JSON array of courses.
    - Given I am not authorized, when I try to POST a new course to `/api/v1/courses`, then I receive a 403 Forbidden error.

### 2. Plan (technical and concrete)

- **Architecture**: Dual interface (MVC for web, REST for programmatic access). Service layer abstraction.
- **Data model**: `Course` entity with `id`, `name`, `credits`, and a `@ManyToOne` relationship to `Professor`.
- **API contracts**:
    - `GET /api/v1/courses`: Returns list of `CourseResponse` DTOs.
    - `POST /api/v1/courses`: Accepts `CourseRequest` DTO and creates a course.
    - `GET /course/list`: MVC view for courses.
- **Testing strategy**:
    - Unit tests for `CourseService`.
    - Integration tests for `CourseRestController`.
- **Security constraints**:
    - `@PreAuthorize("hasAuthority('READ_COURSE')")` for retrieval.
    - `@PreAuthorize("hasAuthority('CREATE_COURSE')")` for saving.
- **Dependencies**: Jackson (for JSON), Spring Web.

### 3. Tasks (ordered, self-contained)

Task 1: Course Domain Implementation
Depends on: none
What to build: `Course` entity, `CourseRepository`, and basic `CourseService`.
Acceptance criteria:
- Database table is generated and CRUD operations work in repository tests.

Task 2: Develop Course MVC UI
Depends on: Task 1
What to build: `CourseController` and `course/courselist.html` template.
Acceptance criteria:
- Course list page renders correctly for authenticated users.

Task 3: Implement Course REST API v1
Depends on: Task 1
What to build: `CourseRestController`, `CourseRequest`, and `CourseResponse` DTOs.
Acceptance criteria:
- `GET /api/v1/courses` returns 200 OK with JSON data.
- `POST /api/v1/courses` creates a course and returns 201 Created.

## Assumptions to review

1. **DTO Usage** — Impact: MEDIUM
   Correct this if: The API should expose the entities directly (not recommended) or if a mapping library like MapStruct is required.
2. **REST API Versioning** — Impact: LOW
   Correct this if: The `/api/v1/` prefix is not suitable for the project's long-term API strategy.
