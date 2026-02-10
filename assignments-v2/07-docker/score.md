# Scoring: Containerization & Docker

## Basic Scope

- **+10** `.dockerignore` file is created with appropriate entries
- **+20** `Dockerfile` for the application is created and builds successfully
- **+20** `docker-compose.yml` is created with `app` and `db` services
- **+10** Application and database communicate over a custom Docker network
- **+20** Application fully works when started via `docker-compose up --build` (API responds, database operations work)

## Advanced Scope

- **+15** Multi-stage build is used in the Dockerfile (separate build and production stages)
- **+10** Health checks are configured for both `app` and `db` services
- **+10** Named volume is used for PostgreSQL data persistence
- **+10** Custom bridge network is defined for inter-service communication
- **+5** Environment variables are properly configured via `.env` file

## Hacker Scope

- **+10** Security scan is performed and results are documented (no critical vulnerabilities or they are addressed)
- **+5** Final application image size is under 200MB
- **+5** Application image is pushed to Docker Hub and the link is in `Readme.md`

## Forfeits

- **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
