# REST service: PostgreSQL & ORM 

## Basic Scope

- **+20** `Users` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.  
- **+20** `Artists` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- **+20** `Albums` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- **+20** `Tracks` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.
- **+20** `Favorites` data is stored in **PostgreSQL** database and `typeorm` / `prisma`  interacts with the database to manipulate data.

## Advanced Scope

- **+30** Migrations are used to create database entities 
- **+10** Variables used for connection to database to be stored in `.env`
- **+10** `typeorm` [decorators](https://typeorm.io/#/relations) or `prisma` relations create relations between entities
- **+30** Local **PostgreSQL** installation is not required for task check, connection is implemented to database stored in `docker` container  (on the basis of the previous task)


## Forfeits
- **-10** for each failing test with `npm run test` (this forfeit applied once if coincides with same forfeit in different assignments in case there are multiple assignments in task)
- **-30% of max task score** Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.(this forfeit applied once if coincides with same forfeit in different assignments in case there are multiple assignments in task)
- **-20** No separate development branch
- **-20** No Pull Request
- **-10** Pull Request description is incorrect
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- **-10 points** for each lint error either on `npm run lint` on the basis of the **local config** or for compilation errors on the basis of the **local tsconfig** (`errors` not `warnings`).
