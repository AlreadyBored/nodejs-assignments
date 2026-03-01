# Assignment: Testing

## Description

Your task is to write unit tests for the Knowledge Hub API using [Vitest](https://vitest.dev/) testing framework.

This is a continuation of the previous assignments. You will work in the same repository created in assignment `03`.

> Note: Integration tests for the Knowledge Hub API are provided by the course and have been running since assignment `03`. Your responsibility is to ensure that your changes never break the existing integration test suite. In this assignment, you focus exclusively on **unit testing** the application.

## Technical requirements

- Use [Vitest](https://vitest.dev/) as the testing framework
- Use `@nestjs/testing` for module instantiation in unit tests
- Use 24.x.x version (24.10.0 or upper) of Node.js

## Implementation details

1. **Services**

   Write unit tests for all service classes. Each service must be tested in isolation — all dependencies (database, external services) must be mocked.

   - **User service**: signup data validation, password hashing, role assignment, user not found, duplicate login
   - **Article service**: article creation validation, status transitions (`draft → published → archived`), invalid transitions, tag management, filtering logic (`status`, `categoryId`, `tag`)
   - **Auth service**: JWT token generation, token verification, refresh token rotation, expired/invalid token handling, RBAC permission checks

2. **Guards**

   Write unit tests for all custom guards:
   - **JWT Auth Guard**: valid token passes, missing/malformed/expired token throws `UnauthorizedException`
   - **Roles Guard**: correct role grants access, insufficient role throws `ForbiddenException`, missing `@Roles()` metadata defaults correctly

3. **Pipes**

   Write unit tests for any custom pipes:
   - **ParseUUID pipe** (or equivalent): valid UUID passes through, invalid string throws `BadRequestException`

4. **Interceptors & Filters**

   - **Response interceptors** (e.g. password stripping from User responses): verify the field is absent in output
   - **Exception filters** (if custom): verify the correct HTTP status and error shape is returned for known exceptions

5. **DTO Validation**

   Test that DTO classes with `class-validator` decorators behave correctly:
   - Required fields missing → validation fails
   - Invalid enum values → validation fails
   - Valid payload → validation passes

   Use `validateOrReject` / `validate` from `class-validator` directly — no HTTP layer needed.

6. **Mocking**

   - Mock the data access layer (Prisma Client or repository layer) in all unit tests to isolate business logic from the database
   - Use Vitest's built-in mocking capabilities (`vi.mock`, `vi.fn`, `vi.spyOn`)
   - Do not perform any real database calls or HTTP requests in unit tests

7. **Edge Cases**

   Cover the following edge cases explicitly:
   - Invalid or malformed UUIDs
   - Missing required fields
   - Duplicate user login/signup
   - Expired or tampered JWT tokens
   - Operations forbidden by role (e.g. viewer trying to create/delete)
   - Accessing or modifying a non-existent resource

8. **NPM Scripts**

   - `npm run test` — runs all tests
   - `npm run test:unit` — runs only unit tests
   - `npm run test:coverage` — runs all tests with coverage report

9. **Coverage Thresholds**

   Configure coverage thresholds in `vitest.config.ts`. Tests must meet:
   - Lines: **≥ 90%**
   - Branches: **≥ 85%**

   `npm run test:coverage` must exit with a non-zero code if thresholds are not met.

10. **Test Configuration**

    - Create a `vitest.config.ts` with proper settings
    - Tests should be placed in `__tests__/` directories or in files with `.test.ts` / `.spec.ts` suffix
    - Unit tests should live separately from any integration tests (e.g. `src/**/*.unit.spec.ts` or `src/__tests__/unit/`)
