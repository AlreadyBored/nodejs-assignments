# Scoring: Authentication & Authorization

## Basic Scope

- **+20** Route `POST /auth/signup` implemented correctly (creates user, validates input, returns 201/400)
- **+20** Route `POST /auth/login` implemented correctly (validates credentials, returns tokens, returns 200/400/403)
- **+10** User `password` is saved into the database as a hash (bcrypt)
- **+20** Access Token is implemented, JWT payload contains `userId`, `login`, and `role`, secret key is saved in `.env`
- **+30** Authentication is required for access to all routes except `/auth/signup`, `/auth/login`, `/auth/refresh`, `/doc`, and `/`. Implemented via Fastify `onRequest` hook or `preHandler`.

## Advanced Scope

- **+25** Route `POST /auth/refresh` implemented correctly (validates refresh token, returns new token pair, returns 200/401/403)
- **+15** Correct handling of expired/invalid tokens (returns 401 with descriptive message)
- **+10** RBAC is implemented (viewer: read-only, editor: own content, admin: full access). Returns 403 for unauthorized operations.

## Hacker Scope

- **+10** Rate limiting for auth endpoints (`/auth/signup`, `/auth/login`) — limits requests per IP per time window
- **+10** Logout endpoint (`POST /auth/logout`) that invalidates the refresh token (e.g., via a blacklist or by deleting from DB)

## Forfeits

- **-10** for each failing test with `npm run test:auth` (this forfeit applied once if coincides with same forfeit in different assignments)
- **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
