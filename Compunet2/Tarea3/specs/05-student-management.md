# Spec 05: Student & Enrollment Management

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Manage student records and track their enrollment in academic courses.
- **Users**: Admin/Staff (Student management), Students (Self-enrollment).
- **Requirements**:
    1. The system must store student information (name, code).
    2. Students must be able to enroll in available courses.
    3. Students must be able to withdraw (unenroll) from courses.
    4. The system must maintain a history of enrollments.
- **Edge cases**:
    - Enrolling in the same course twice.
    - Withdrawing from a course the student isn't enrolled in.
    - Enrollment when the course has reached its capacity (not yet implemented, but a future requirement).
- **Acceptance criteria**:
    - Given a student and a course, when the enrollment is processed, then a new record in the enrollment table is created.
    - Given an active enrollment, when the unenrollment is requested, then the record is removed or marked as inactive.
    - Given a student code, when I search for the student, then all their personal details and active enrollments are returned.

### 2. Plan (technical and concrete)

- **Architecture**: Domain-driven design for Student and Enrollment. Enrollment acts as a join entity between Student and Course.
- **Data model**:
    - `Student`: `id`, `name`, `code`.
    - `Enrollment`: `id`, `Student`, `Course`, `semester`.
- **API contracts**:
    - MVC endpoints in `StudentController`.
    - Service methods in `StudentService` and `EnrollmentService`.
- **Testing strategy**:
    - Integration tests for `EnrollmentService` to verify the student-course relationship.
- **Security constraints**:
    - `@PreAuthorize("hasAuthority('CREATE_ENROLLMENT')")` for enrolling.
    - `@PreAuthorize("hasAuthority('READ_STUDENT')")` for viewing student lists.
- **Dependencies**: Spring Data JPA.

### 3. Tasks (ordered, self-contained)

Task 1: Student and Enrollment Entities
Depends on: Spec 04 (Course entity)
What to build: `Student` and `Enrollment` entities with relationships.
Acceptance criteria:
- Database schema supports many-to-many relationship between Student and Course via Enrollment.

Task 2: Student Management Services
Depends on: Task 1
What to build: `StudentServiceImpl` with methods for saving, finding, and deleting students.
Acceptance criteria:
- CRUD operations for students work as expected.

Task 3: Implement Enrollment Logic
Depends on: Task 1, Task 2
What to build: `enrollStudentInCourse` and `unenrollStudentFromCourse` logic in `StudentService`.
Acceptance criteria:
- Students can be successfully added to and removed from courses.

## Assumptions to review

1. **Semester Tracking** — Impact: LOW
   Correct this if: Enrollment does not need to track semesters or if more metadata is required (e.g., grades).
2. **Student Code Uniqueness** — Impact: MEDIUM
   Correct this if: Student codes are not globally unique.
