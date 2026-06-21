# Spec 06: Professor Management

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Manage professor profiles and their academic details.
- **Users**: System Administrator.
- **Requirements**:
    1. The system must store professor names and their associated courses.
    2. Administrators must be able to create, update, and delete professor profiles.
- **Edge cases**:
    - Deleting a professor who is currently teaching a course.
- **Acceptance criteria**:
    - Given valid professor details, when I save the professor, then they are available in the system.
    - Given a professor ID, when I delete the professor, then they are removed from the database (pending dependency checks).

### 2. Plan (technical and concrete)

- **Architecture**: Standard CRUD pattern.
- **Data model**: `Professor` entity with `id` and `name`.
- **API contracts**: Service-level CRUD methods.
- **Testing strategy**: Integration tests for `ProfessorService`.
- **Security constraints**:
    - `@PreAuthorize("hasAuthority('CREATE_PROFESSOR')")` for saving.
    - `@PreAuthorize("hasAuthority('READ_PROFESSOR')")` for retrieval.
- **Dependencies**: Spring Data JPA.

### 3. Tasks (ordered, self-contained)

Task 1: Professor Entity and Repository
Depends on: none
What to build: `Professor` entity and `ProfessorRepository`.
Acceptance criteria:
- Professor table is correctly mapped.

Task 2: Professor Service Implementation
Depends on: Task 1
What to build: `ProfessorServiceImpl` with basic CRUD methods.
Acceptance criteria:
- Service methods pass integration tests for data persistence.

## Assumptions to review

1. **Professor Metadata** — Impact: LOW
   Correct this if: More details like Department or Email are required for professors.
