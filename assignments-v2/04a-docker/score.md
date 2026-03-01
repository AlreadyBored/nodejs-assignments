# Scoring: Containerization & Docker (Foundation)

## Basic Scope

- **+10** `.dockerignore` file is created with appropriate entries
- **+20** `Dockerfile` for the application is created and builds successfully
- **+20** `docker-compose.yml` is created with `app` and `db` services
- **+10** Application and database communicate over a custom Docker network
- **+10** PostgreSQL data is persisted via a named volume
- **+10** Application fully works when started via `docker-compose up --build` (API responds)
- **+10** Database container is healthy and accessible from the application
- **+10** Database-related variables are provided via `.env` / `.env.example`

## Advanced Scope

- **+15** Multi-stage build is used in the Dockerfile (separate build and production stages)
- **+10** Health checks are configured for both `app` and `db` services
- **+5** Final application image runs as non-root user
- **+5** Restart policies are configured correctly (`app`: `on-failure`, `db`: `unless-stopped`)

## Hacker Scope

- **+10** Security scan is performed and results are documented (no critical vulnerabilities or they are addressed)
- **+5** Final application image size is under 200MB
- **+5** Application image is pushed to Docker Hub and the link is in `Readme.md`

## Forfeits

- **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
