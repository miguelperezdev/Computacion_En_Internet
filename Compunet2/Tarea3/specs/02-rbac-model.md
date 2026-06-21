# Spec 02: RBAC & Permission Model

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Define a granular access control system using Roles and Permissions to secure system resources.
- **Users**: System Administrator (to manage mapping), All users (governed by the model).
- **Requirements**:
    1. The system must support multiple Roles (e.g., ADMIN, STUDENT, PROFESSOR).
    2. Roles must be composed of specific Permissions (e.g., READ_STUDENT, CREATE_COURSE).
    3. Users can be assigned one or more Roles.
    4. Permissions must be automatically granted to a user based on their assigned roles.
    5. Access to system features (Service methods/Endpoints) must be restricted based on the user's roles or specific permissions.
- **Edge cases**:
    - A user with no roles should have no access to protected resources.
    - Removing a permission from a role should immediately affect all users with that role.
    - Deleting a role should handle dependencies (e.g., removing assignments from users).
- **Acceptance criteria**:
    - Given a user with ROLE_STUDENT, when they try to access an ADMIN-only page, then access is denied (403).
    - Given a role with the permission READ_STUDENT, when a user is assigned that role, then they can successfully fetch student lists.
    - Given a user with multiple roles, when they access a resource, then they possess the union of all permissions from those roles.

### 2. Plan (technical and concrete)

- **Architecture**: Many-to-Many relationships with join tables and composite keys for explicit control.
- **Data model**:
    - `Role`: `id`, `name`.
    - `Permission`: `id`, `name`.
    - `UserRole`: Join entity with `UserRoleId` (userId, roleId).
    - `RolePermission`: Join entity with `RolePermissionId` (roleId, permissionId).
- **API contracts**: Internal service-level enforcement via `@PreAuthorize`.
- **Testing strategy**:
    - Integration tests for `AppUser` to verify authority loading.
    - Service-level integration tests to verify `@PreAuthorize` constraints.
- **Security constraints**:
    - Authority names follow `ROLE_` prefix for roles and plain names for permissions.
    - Authorization context populated by `CustomUserDetailService`.
- **Dependencies**: Spring Security, Spring Data JPA.

### 3. Tasks (ordered, self-contained)

Task 1: Implement RBAC Entities
Depends on: Spec 01 (User entity)
What to build: `Role`, `Permission`, `UserRole`, `RolePermission` entities and their corresponding repositories.
Acceptance criteria:
- Entities are correctly mapped to database tables.
- Composite keys (`UserRoleId`, `RolePermissionId`) work as expected.

Task 2: Implement Authority Loading Logic
Depends on: Task 1
What to build: Update `AppUser` and `CustomUserDetailService` to traverse the User -> Role -> Permission graph and populate `GrantedAuthority` list.
Acceptance criteria:
- `AppUser` contains both `ROLE_*` and permission names in its authorities.

Task 3: Apply Method-Level Security
Depends on: Task 2
What to build: Annotate service methods (e.g., `StudentService`, `CourseService`) with `@PreAuthorize` using `hasAuthority()` or `hasRole()`.
Acceptance criteria:
- Unauthorized calls to service methods throw `AccessDeniedException`.

## Assumptions to review

1. **Role/Permission Granularity** — Impact: HIGH
   Correct this if: The system needs dynamic permissions not tied to roles, or if roles should be hierarchical.
2. **Performance of Graph Traversal** — Impact: MEDIUM
   Correct this if: The number of roles/permissions per user grows large, requiring caching or optimized queries.
