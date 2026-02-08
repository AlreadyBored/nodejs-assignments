# Scoring: Fastify REST API

## Basic Scope

- **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
- **+10** The application code that works with `Users` is organized as a Fastify plugin with proper separation of concerns (route handlers, business logic)
- **+10** The application code that works with `Articles` is organized as a Fastify plugin with proper separation of concerns
- **+10** The application code that works with `Categories` is organized as a Fastify plugin with proper separation of concerns
- **+10** The application code that works with `Comments` is organized as a Fastify plugin with proper separation of concerns
- **+10** For each successfully passed test

## Advanced Scope

- **+15** JSON Schema validation is used for all request bodies and responses (via Fastify `schema` option)
- **+10** Article filtering by `status`, `categoryId`, and `tag` query parameters works correctly
- **+15** OpenAPI documentation is generated via `@fastify/swagger` and accessible at `/doc`
- **+10** Cascading behavior on delete is implemented correctly (User delete → articles nullified + comments removed; Category delete → articles nullified; Article delete → comments removed)

## Hacker Scope

- **+10** Pagination is implemented for list endpoints (query params `page` and `limit`, response includes `total`, `page`, `limit`, `data`)
- **+10** Sorting is implemented for list endpoints (query params `sortBy` and `order`)
- **+10** Additional automated tests are written

## Forfeits

- **-670** Changes in tests
- **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** No separate development branch
- **-20** No Pull Request
- **-10** Pull Request description is incorrect
- **-10** Every lint error after `npm run lint` using local config (errors, not warnings)
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
