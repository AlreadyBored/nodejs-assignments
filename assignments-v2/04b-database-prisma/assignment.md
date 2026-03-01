# Assignment: Database & Prisma ORM

## Description

Your task is to replace the in-memory data storage in the Knowledge Hub API with a real **PostgreSQL** database, using **Prisma** as the ORM.

This assignment is a continuation of `04a` (Containerization & Docker Foundation). You will work in the same `nodejs2025Q2-knowledge-hub` repository and reuse the PostgreSQL container configured in `04a`.

## Technical requirements

- Task should be implemented in TypeScript
- Use 24.x.x version (24.10.0 or upper) of Node.js
- PostgreSQL should run in Docker (reuse setup from `04a`)

## Implementation details

1. **Prisma Schema**

   Create `prisma/schema.prisma` with the following models:

   - `User` — id, login, password, role (enum: ADMIN, EDITOR, VIEWER), createdAt, updatedAt
   - `Article` — id, title, content, status (enum: DRAFT, PUBLISHED, ARCHIVED), createdAt, updatedAt
   - `Category` — id, name, description
   - `Comment` — id, content, createdAt
   - `Tag` — id, name (unique)

2. **Relations**

   - `User` has many `Articles` (one-to-many via `authorId`)
   - `User` has many `Comments` (one-to-many via `authorId`)
   - `Category` has many `Articles` (one-to-many via `categoryId`)
   - `Article` has many `Comments` (one-to-many via `articleId`)
   - `Article` has many `Tags` (many-to-many relation through implicit or explicit join table)

3. **Cascading behavior**

   Configure Prisma `onDelete` rules:
   - Deleting `User`: `Article.authorId` -> `null` (`SetNull`), related comments -> delete (`Cascade`)
   - Deleting `Category`: `Article.categoryId` -> `null` (`SetNull`)
   - Deleting `Article`: related comments -> delete (`Cascade`), tag relations removed

4. **Migrations**

   - Use `npx prisma migrate dev` to create and apply migrations
   - Commit migration files

5. **Seed Script**

   Implement `prisma/seed.ts` with initial data:
   - at least 2 users (admin + editor)
   - at least 3 categories
   - at least 5 tags
   - at least 5 articles with different statuses/categories/tags
   - at least 3 comments

   Seed should run via `npx prisma db seed`.

6. **Database Connection**

   - Store connection string in `.env` as `DATABASE_URL`
   - Use container hostname from Docker Compose (`db`) when running inside containers
   - Example:
     - local app + docker db: `postgresql://user:password@localhost:5432/knowledge_hub?schema=public`
     - docker app + docker db: `postgresql://user:password@db:5432/knowledge_hub?schema=public`
   - `.env` must not be committed, `.env.example` must be present

7. **Reuse Docker setup from `04a`**

   - Use existing `docker-compose.yml` with PostgreSQL service from assignment `04a`
   - Ensure Prisma can connect to this DB and migrations run successfully

8. **Replace In-Memory Storage**

   - Replace in-memory operations with Prisma Client queries
   - `tags` in articles must work through `Tag` many-to-many model (`connectOrCreate` for create/update)
   - Article filtering (`GET /article?status=...&categoryId=...&tag=...`) should use Prisma `where` clauses

9. **Behavior compatibility**

   All existing endpoints and behavior should remain the same (routes, status codes, response format).

## Hints

- Run `npx prisma generate` after schema changes
- Use `npx prisma studio` for DB inspection
- Use `npx prisma migrate reset` to reset DB and re-run seed
- Use `include`/`select` to avoid over-fetching
- Use `prisma.$transaction` for multi-step write operations

