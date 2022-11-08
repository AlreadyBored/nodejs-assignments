## REST service: Containerization, Docker and Authentication & Authorization

## Basic Scope

# 1) Containerization, Docker

- **+20** `Readme.md` has instruction how to run application
- **+30** `user-defined bridge` is created and configured
- **+30**  container auto restart after crash
- **+20** application is restarting upon changes implemented into `src` folder
- **+30** database files and logs to be stored in volumes instead of container

# 2) Authentication & Authorization

- **+30** Route `/auth/signup` implemented correctly, related logic is divided between controller and corresponding service
- **+30** Route `/auth/login` has been implemented, related logic is divided between controller and corresponding service
- **+10** `User` `password` saved into database as hash
- **+20** Access Token is implemented,`JWT` payload contains `userId` and `login`, secret key is saved in `.env`.
- **+40** Authentication is required for the access to all routes except `/auth/signup`, `/auth/login`, `/doc` and `/`.
- **+10** Separate module is implemented **within application scope** to check that all requests to all routes except mentioned above contain required JWT token


## Advanced Scope

# 1) Containerization, Docker

- **+20** Final size of the Docker image with application is less than 500 MB
- **+10** Implemented npm script for vulnerabilities scanning (free solution)
- **+20** Your built image is pushed to DockerHub

# 2) Authentication & Authorization

- **+30** Route `/auth/refresh` implemented correctly, related logic is divided between controller and corresponding service

## Forfeits

- **-20** In case specific image is not used (it is required to use images like `postgres` and `node`, but not `ubuntu` with installation of `node` or `postgres`)
- **-20** Postgres container is not configured as dependency for application container
- **-20** `docker-compose.yml` contains hardcoded variables
- **-30% of total task score** Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.(this forfeit applied once if coincides with same forfeit in different assignments in case there are multiple assignments in task)
- **-20** Missing PR 
- **-10** PR description is incorrect
- **-20** No separate development branch
- **-10** for each failing test with `npm run test:auth` (this forfeit applied once if coincides with same forfeit in different assignments in case there are multiple assignments in task)
- **-20** Less than 3 commits in the development branch, not taking into account commits, making changes only in `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
