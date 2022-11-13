## REST service: Containerization and Database (PostgreSQL) & ORM

## Basic Scope

# 1) Containerization, Docker

- **+20** `Readme.md` has instruction how to run application
- **+30** `user-defined bridge` is created and configured
- **+30**  container auto restart after crash
- **+20** application is restarting upon changes implemented into `src` folder
- **+30** database files and logs to be stored in volumes instead of container

# 2) Database (PostgreSQL) & ORM

- **+20** `Users` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.  
- **+20** `Artists` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- **+20** `Albums` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- **+20** `Tracks` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- **+20** `Favorites` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.


## Advanced Scope

# 1) Containerization, Docker

- **+20** Final size of the Docker image with application is less than 500 MB
- **+10** Implemented npm script for vulnerabilities scanning (free solution)
- **+20** Your built image is pushed to DockerHub

# 2) Database & ORM

- **+30** Migrations are used to create database entities 
- **+10** Variables used for connection to database to be stored in `.env`
- **+10** `typeorm` [decorators](https://typeorm.io/#/relations) or `prisma` relations create relations between entities
- **+30** Local **PostgreSQL** installation is not required for task check, connection is implemented to database stored in `docker` container  (on the basis of the previous task)

## Forfeits

- **-20** In case specific image is not used (it is required to use images like `postgres` and `node`, but not `ubuntu` with installation of `node` or `postgres`)
- **-20** Postgres container is not configured as dependency for application container
- **-10** for each failing test with `npm run test` 
- **-20** `docker-compose.yml` contains hardcoded variables
- **-30% of total task score** Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.
- **-20** Missing PR 
- **-10** PR description is incorrect
- **-20** No separate development branch
- **-10** for each failing test with `npm run test` 
- **-20** Less than 3 commits in the development branch, not taking into account commits, making changes only in `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- **-10 points** for each error either on `npm run lint` on the basis of the **local config** or for compilation errors on the basis of the **local tsconfig** (`errors` not `warnings`).
