# Spec 01: User Authentication & Session Management

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Provide a secure way for users to register an account, authenticate themselves, and manage their session.
- **Users**: Anonymous users (registration/login) and Authenticated users (logout/profile).
- **Requirements**:
    1. Users must be able to create a new account by providing a username and password.
    2. Users must be able to log in with their credentials to access protected areas.
    3. Authenticated users must be able to view their profile information, including assigned roles and permissions.
    4. Users must be able to securely terminate their session.
    5. The system must prevent duplicate usernames.
- **Edge cases**:
    - Registration with an already existing username should be denied with a clear error message.
    - Login with incorrect credentials should fail gracefully.
    - Accessing the profile without being logged in should redirect to the login page.
    - Logging out should invalidate the session immediately.
- **Acceptance criteria**:
    - Given a unique username and password, when I submit the signup form, then a new account is created.
    - Given an existing username, when I try to sign up, then I receive a "User already exists" error.
    - Given valid credentials, when I submit the login form, then I am redirected to my profile page.
    - Given invalid credentials, when I submit the login form, then I am returned to the login page with an error.
    - Given an active session, when I click logout, then I am redirected to the login page and can no longer access the profile.

### 2. Plan (technical and concrete)

- **Architecture**: MVC pattern using Spring Boot and Thymeleaf. Authentication handled by Spring Security.
- **Data model**: `User` entity with `username` (unique) and `password` (hashed).
- **API contracts**:
    - `GET /auth/signup`: Renders the registration form.
    - `POST /auth/signup`: Processes the registration request.
    - `GET /auth/login`: Renders the login form.
    - `POST /login`: Handled by Spring Security (default).
    - `GET /auth/profile`: Renders the user's profile with roles/permissions.
    - `POST /logout`: Invalidates session.
- **Testing strategy**: 
    - Unit tests for `UserService` registration logic.
    - Integration tests for `AuthController` and security flow.
- **Security constraints**:
    - Passwords must be encoded using BCrypt.
    - CSRF protection enabled on forms.
    - Public access allowed only for `/auth/signup`, `/auth/login`, and static resources.
- **Dependencies**: Spring Security, Spring Data JPA, Thymeleaf, BCrypt.

### 3. Tasks (ordered, self-contained)

Task 1: Implement User Registration
Depends on: none
What to build: `User` entity, `UserRepository`, `UserService.save()` with BCrypt, and `AuthController.signup()` methods.
Acceptance criteria:
- User is saved in the database with an encoded password.
- Duplicate username registration returns an error to the UI.

Task 2: Configure Spring Security Authentication
Depends on: Task 1
What to build: `WebSecurityConfig` with form login and `CustomUserDetailService`.
Acceptance criteria:
- Login redirects to `/auth/profile` on success.
- Invalid login shows error message on `/auth/login`.

Task 3: Build Profile and Logout
Depends on: Task 2
What to build: `AuthController.profile()` endpoint and Thymeleaf template displaying user info and roles.
Acceptance criteria:
- Profile page displays the correct username and a list of roles.
- Logout button successfully terminates the session.

## Assumptions to review

1. **Standard Form Login** — Impact: LOW
   Correct this if: The system requires a different authentication mechanism (e.g., OAuth2) from the start.
2. **Password Encoding** — Impact: MEDIUM
   Correct this if: BCrypt is not sufficient for the project's security standards.
