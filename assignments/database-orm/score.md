# Scoring: PostgreSQL & ORM

## Basic Scope

- **+15** `users` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interact with the database to manipulate data.  
- **+15** `tracks` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interact with the database to manipulate data.
- **+15** `albums` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interact with the database to manipulate data.
- **+15** `movies` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interact with the database to manipulate data.
- **+15** `books` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interact with the database to manipulate data.
- **+15** `favourites` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interact with the database to manipulate data.


## Advanced Scope
- **+30** Migrations are used to create database entities 
- **+10** Variables used for connection to database to be stored in `.env`
- **+10** `typeorm` [decorators](https://typeorm.io/#/relations) create relations between entities
- **+30** Local **PostgreSQL** installation is not required for task check, connection is implemented to database stored in `docker` container  (on the basis of the previous task)

## Forfeits
- **-150** Changes in tests or workflow
- **-100** Full link to repsitory differs from https://github.com/%your-gihub-id%/nodejs2021Q4-service
- **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** No separate development branch
- **-20** No Pull Request
- **-10** Pull Request description is incorrect
- **-5** Every lint error after npm run lint using local config (errors, not warnings) 
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- **-20** for **every** compiler error
- **-20** for every test failure on `npm run test`
