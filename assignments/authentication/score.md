# Scoring: Authentication & Authorization

## Basic Scope

- **+30** Route `/auth/signup` implemented correctly, related logic is divided between controller and corresponding service
- **+30** Route `/auth/login` has been implemented, related logic is divided between controller and corresponding service
- **+10** `User` `password` saved into database as hash
- **+20** Access Token is implemented,`JWT` payload contains `userId` and `login`, secret key is saved in `.env`.
- **+40** Authentication is required for the access to all routes except `/auth/signup`, `/auth/login`, `/doc` and `/`.
- **+10** Separate module is implemented **within application scope** to check that all requests to all routes except mentioned above contain required JWT token

## Advanced Scope

- **+30** Route `/auth/refresh` implemented correctly, related logic is divided between controller and corresponding service

## Forfeits

- **-10** for each failing test with `npm run test:auth` (this forfeit applied once if coincides with same forfeit in different assignments in case there are multiple assignments in task)
- **-30% of max task score** Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.(this forfeit applied once if coincides with same forfeit in different assignments in case there are multiple assignments in task)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not taking into account commits, making changes only in `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)