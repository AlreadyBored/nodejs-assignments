# Assignment: Testing

## Description

Your task is to write unit and integration tests for the Knowledge Hub API using [Vitest](https://vitest.dev/) testing framework.

This is a continuation of the Authentication & Authorization assignment (Week 5). You will work in the same `nodejs2025Q2-knowledge-hub` repository.

## Technical requirements

- Use [Vitest](https://vitest.dev/) as the testing framework
- Use Fastify's built-in [`inject()`](https://fastify.dev/docs/latest/Guides/Testing/) method (powered by `light-my-request`) for integration tests
- Use 24.x.x version (24.10.0 or upper) of Node.js

## Implementation details

1. **Unit Tests**

   Write unit tests for the service/business logic layer:
   - User service: validation of signup data, password hashing verification, role assignment
   - Article service: validation of article creation data, status transitions (e.g. draft → published → archived), tag management logic
   - Auth logic: JWT token generation, token verification, RBAC permission checks

2. **Integration Tests**

   Write integration tests for API endpoints using Fastify's `inject()` method. Implement **at least 3** complete test scenarios:

   **Scenario 1: Full Article lifecycle**
   1. Signup a new user via `POST /auth/signup`
   2. Login via `POST /auth/login` to get an access token
   3. Create a category via `POST /category`
   4. Create an article with tags via `POST /article` (expect **201** with the created record)
   5. Get the created article via `GET /article/:id` (expect the created record)
   6. Update the article via `PUT /article/:id` (expect the updated record with same `id`)
   7. Delete the article via `DELETE /article/:id` (expect **204**)
   8. Try to get the deleted article via `GET /article/:id` (expect **404**)

   **Scenario 2: Authentication & Authorization flow**
   1. Try to access `GET /article` without a token (expect **401**)
   2. Signup a new user via `POST /auth/signup`
   3. Login via `POST /auth/login` to get tokens
   4. Access `GET /article` with a valid token (expect **200**)
   5. Refresh tokens via `POST /auth/refresh` (expect new token pair)
   6. Access `GET /article` with the new access token (expect **200**)
   7. Try to access `GET /article` with the old (now invalid) refresh token for refresh (expect **403**)

   **Scenario 3: Cascading operations & filtering**
   1. Login as admin
   2. Create a category via `POST /category`
   3. Create multiple articles with different statuses and tags
   4. Filter articles by status via `GET /article?status=published` (expect only published articles)
   5. Filter articles by tag via `GET /article?tag=nodejs` (expect only articles with that tag)
   6. Delete the category via `DELETE /category/:id` (expect **204**)
   7. Get the articles that were in that category (expect `categoryId` to be `null`)

3. **Mocking**

   - For unit tests, mock database calls (Prisma Client) to isolate business logic
   - Use Vitest's built-in mocking capabilities (`vi.mock`, `vi.fn`, `vi.spyOn`)

4. **NPM Scripts**

   - `npm run test` — runs all tests
   - `npm run test:coverage` — runs all tests with coverage report
   - Target coverage: **> 60%** for lines and branches

5. **Test Configuration**

   - Create a `vitest.config.ts` (or configure in `vite.config.ts`) with proper settings
   - Tests should be placed in `__tests__/` directories or in files with `.test.ts` / `.spec.ts` suffix
