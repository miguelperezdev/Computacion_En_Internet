# Spec 03: Administrative User Management

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Allow system administrators to manage user roles and role permissions through a web interface.
- **Users**: System Administrator (`ROLE_ADMIN`).
- **Requirements**:
    1. Administrators must be able to view a list of all users and their currently assigned roles.
    2. Administrators must be able to assign new roles to a user.
    3. Administrators must be able to remove existing roles from a user.
    4. Administrators must be able to view a list of roles and their associated permissions.
    5. Administrators must be able to add or remove permissions from a specific role.
- **Edge cases**:
    - Trying to assign a role that the user already has should be prevented or handled gracefully.
    - Removing the last admin role from the system (if applicable) should be warned against.
    - Unauthorized users trying to access these management pages should be blocked.
- **Acceptance criteria**:
    - Given I am an admin, when I visit `/admin/users`, then I see a table with all users.
    - Given a user without a role, when I select a role and click "Assign", then the user is granted that role.
    - Given a user with a role, when I click the "Remove" icon on their role chip, then the role is revoked.
    - Given I am a non-admin, when I try to access `/admin/users`, then I receive a 403 Forbidden error.

### 2. Plan (technical and concrete)

- **Architecture**: MVC controllers with administrative scope. Service layer handles the business logic for assignments.
- **Data model**: Operates on `UserRole` and `RolePermission` entities.
- **API contracts**:
    - `GET /admin/users`: List users and roles.
    - `POST /admin/users/{userId}/assign-role`: Create `UserRole` entry.
    - `POST /admin/users/{userId}/remove-role`: Delete `UserRole` entry.
    - `GET /admin/roles`: List roles and permissions.
    - `POST /admin/roles/{roleId}/assign-permission`: Create `RolePermission` entry.
    - `POST /admin/roles/{roleId}/remove-permission`: Delete `RolePermission` entry.
- **Testing strategy**: 
    - Integration tests for `AdminController`.
    - Verification of `@PreAuthorize("hasAuthority('ROLE_ADMIN')")` enforcement.
- **Security constraints**:
    - Class-level `@PreAuthorize("hasAuthority('ROLE_ADMIN')")` on `AdminController`.
    - Input validation for `userId`, `roleId`, and `permissionId`.
- **Dependencies**: Thymeleaf, Spring Security.

### 3. Tasks (ordered, self-contained)

Task 1: Develop User Management UI
Depends on: Spec 01, Spec 02
What to build: `AdminController.users()` endpoint and `admin/users.html` template using Tailwind CSS.
Acceptance criteria:
- User table displays correctly with current roles as chips.

Task 2: Implement Role Assignment/Removal
Depends on: Task 1
What to build: `assignRole` and `removeRole` methods in `AdminController` and `UserRoleService`.
Acceptance criteria:
- Roles can be added/removed from users via the UI, and changes persist in the DB.

Task 3: Develop Role-Permission Management UI
Depends on: Spec 02
What to build: `AdminController.roles()` endpoint and `admin/roles.html` template.
Acceptance criteria:
- Page displays roles and their permissions, with functionality to add/remove permissions.

## Assumptions to review

1. **Admin Exclusive Access** — Impact: MEDIUM
   Correct this if: Some role management tasks should be delegated to sub-admins or moderators.
2. **UI Implementation** — Impact: LOW
   Correct this if: A separate frontend framework (like React) is preferred over Thymeleaf for management dashboards.
