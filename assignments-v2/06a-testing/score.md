# Scoring: Testing

## Basic Scope

- **+10** Unit tests for user service are implemented (signup validation, role assignment)
- **+10** Unit tests for article service are implemented (creation validation, status transitions)
- **+10** Integration test Scenario 1 (Full Article lifecycle) is implemented and passes
- **+10** Integration test Scenario 2 (Authentication & Authorization flow) is implemented and passes
- **+10** Integration test Scenario 3 (Cascading operations & filtering) is implemented and passes
- **+10** NPM scripts `npm run test` and `npm run test:coverage` are configured and work

## Advanced Scope

- **+15** Test coverage is above 60% (lines and branches)
- **+15** Prisma Client is properly mocked in unit tests (database calls are isolated)
- **+10** Edge cases are tested (invalid UUIDs, missing required fields, duplicate logins, expired tokens, unauthorized role operations)

## Forfeits

- **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
