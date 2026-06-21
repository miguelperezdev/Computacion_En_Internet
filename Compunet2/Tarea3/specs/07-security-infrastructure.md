# Spec 07: Security Infrastructure (Advanced)

### 1. Spec (functional, technology-agnostic)

- **Purpose**: Secure the system's REST API and web interfaces using modern authentication standards.
- **Users**: Developers (API users), Web Users.
- **Requirements**:
    1. The system must support JWT-based authentication for REST API calls.
    2. The system must support session-based authentication for the web UI.
    3. All sensitive data (passwords) must be encrypted.
    4. The system must filter incoming requests to ensure they have valid credentials before reaching protected resources.
- **Edge cases**:
    - Expired JWT tokens.
    - Malformed JWT tokens.
    - Concurrent session management.
- **Acceptance criteria**:
    - Given a valid JWT in the Authorization header, when I call a protected API, then I receive the requested data.
    - Given an invalid or expired JWT, when I call a protected API, then I receive a 401 Unauthorized error.
    - Given a password change request, when the password is saved, then it is stored in its BCrypt-hashed form.

### 2. Plan (technical and concrete)

- **Architecture**: Security filter chain with multiple providers. JWT filter for API paths and Form login for Web paths.
- **Data model**: No specific entities, uses `AppUser` for security context.
- **API contracts**:
    - `POST /api/v1/auth/login`: Authenticates user and returns a JWT.
- **Testing strategy**:
    - Security-focused integration tests using `MockMvc` to verify filter behavior.
- **Security constraints**:
    - JWT secret key stored securely (ideally in environment variables).
    - Token expiration policy implemented.
- **Dependencies**: `io.jsonwebtoken` (jjwt), Spring Security.

### 3. Tasks (ordered, self-contained)

Task 1: Configure JWT Service
Depends on: Spec 01
What to build: `JwtService` for generating and validating tokens.
Acceptance criteria:
- Tokens can be generated for valid users and successfully decoded.

Task 2: Implement JWT Filter
Depends on: Task 1
What to build: `JwtFilter` that intercepts requests to `/api/**` and populates the security context.
Acceptance criteria:
- API requests with valid tokens are authenticated.

Task 3: Unify Security Configuration
Depends on: Spec 01, Task 2
What to build: `WebSecurityConfig` that coordinates both session-based and token-based authentication.
Acceptance criteria:
- Both UI and API are correctly secured according to their respective requirements.

## Assumptions to review

1. **JWT Secret Management** — Impact: HIGH
   Correct this if: The secret is currently hardcoded and needs to move to a secure vault or env file.
2. **Stateless vs Stateful** — Impact: MEDIUM
   Correct this if: The API should remain fully stateless while the UI remains stateful.
