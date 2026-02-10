# Scoring: Database & Prisma ORM

## Basic Scope

- **+10** Prisma schema is defined with all required models (`User`, `Article`, `Category`, `Comment`, `Tag`)
- **+10** All relations are correctly defined (one-to-many for User→Article, User→Comment, Category→Article, Article→Comment)
- **+10** Many-to-many relation between `Article` and `Tag` is implemented
- **+10** Prisma migrations are created and committed to the repository
- **+10** PostgreSQL runs inside a Docker container via `docker-compose.yml`
- **+10** `DATABASE_URL` is stored in `.env` (`.env.example` is committed)
- **+10** `GET /user` works with real database
- **+10** `GET /article` works with real database (including filtering by status, categoryId, tag)
- **+5** `GET /category` works with real database
- **+5** `GET /comment` works with real database

## Advanced Scope

- **+10** Seed script is implemented and runnable via `npx prisma db seed`
- **+10** Cascading delete/nullify rules are correctly configured via Prisma `onDelete`
- **+10** Prisma transactions are used for complex operations (e.g., deleting a user and updating their articles)
- **+10** Article tags use `connectOrCreate` pattern when creating/updating articles

## Hacker Scope

- **+10** Indexes are added for frequently queried fields (`Article.status`, `Article.categoryId`, `Tag.name`)
- **+5** Connection pooling is configured
- **+5** N+1 problem is avoided by using Prisma `include` appropriately

## Forfeits

- **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- **-5** The `.env` file is present in the repository (should be `.env.example` instead)
