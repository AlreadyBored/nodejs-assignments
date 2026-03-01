# Scoring: Testing

## Basic Scope

- **+10** Unit tests for User service are implemented (signup validation, password hashing, role assignment, user not found, duplicate login)
- **+10** Unit tests for Article service are implemented (creation validation, status transitions, invalid transitions, tag management, filtering logic)
- **+10** Unit tests for Auth service are implemented (token generation, token verification, refresh rotation, RBAC checks)
- **+10** Unit tests for Guards are implemented (JWT Auth Guard and Roles Guard)
- **+5** Unit tests for Pipes are implemented (UUID validation or equivalent)
- **+5** DTO validation is tested directly via `class-validator` (required fields, invalid enums, valid payload)
- **+10** Vitest config is present with correct settings; `npm run test`, `npm run test:unit`, and `npm run test:coverage` scripts are configured and work

## Advanced Scope

- **+20** Coverage thresholds are met: lines ≥ 90%, branches ≥ 85% (`npm run test:coverage` exits with 0)
- **+10** Prisma Client (or repository layer) is properly mocked in all unit tests — no real database calls are made
- **+10** Edge cases are explicitly covered (invalid UUIDs, missing required fields, duplicate login, expired/tampered tokens, forbidden role operations, non-existent resource access)
- **+10** Interceptors and/or exception filters are covered (password stripping, error shape/status)

## Forfeits

- **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
