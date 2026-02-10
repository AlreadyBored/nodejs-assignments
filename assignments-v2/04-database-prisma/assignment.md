# Assignment: Database & Prisma ORM

## Description

Your task is to replace the in-memory data storage in the Knowledge Hub API with a real **PostgreSQL** database, using **Prisma** as the ORM to communicate with it.

This is a continuation of the Fastify REST API assignment (Week 3). You will work in the same `nodejs2025Q2-knowledge-hub` repository.

## Technical requirements

- Task should be implemented in TypeScript
- Use 24.x.x version (24.10.0 or upper) of Node.js
- PostgreSQL database should run inside a Docker container

## Implementation details

1. **Prisma Schema**

   Create a Prisma schema (`prisma/schema.prisma`) that defines the following models:

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
   - `Article` has many `Tags` (many-to-many relation through an implicit or explicit join table)

3. **Cascading behavior**

   Configure Prisma `onDelete` rules:
   - When a `User` is deleted: their `Articles` should have `authorId` set to `null` (`SetNull`), their `Comments` should be deleted (`Cascade`)
   - When a `Category` is deleted: its `Articles` should have `categoryId` set to `null` (`SetNull`)
   - When an `Article` is deleted: its `Comments` should be deleted (`Cascade`), its tag relations should be removed

4. **Migrations**

   - Use `npx prisma migrate dev` to create and apply migrations
   - Migration files should be committed to the repository

5. **Seed Script**

   - Implement a seed script (`prisma/seed.ts`) that populates the database with initial data:
     - At least 2 users (one admin, one editor)
     - At least 3 categories
     - At least 5 tags
     - At least 5 articles with different statuses, categories, and tags
     - At least 3 comments
   - Seed script should be runnable via `npx prisma db seed`

6. **Database Connection**

   - Connection string should be stored in `.env` file as `DATABASE_URL`
   - Example: `DATABASE_URL="postgresql://user:password@localhost:5432/knowledge_hub?schema=public"`
   - The `.env` file should not be committed (add to `.gitignore`), but `.env.example` should be present

7. **Docker for PostgreSQL**

   - Provide a `docker-compose.yml` (or a section in existing one) to run PostgreSQL:
     ```yaml
     services:
       db:
         image: postgres:16-alpine
         environment:
           POSTGRES_USER: user
           POSTGRES_PASSWORD: password
           POSTGRES_DB: knowledge_hub
         ports:
           - "5432:5432"
         volumes:
           - pgdata:/var/lib/postgresql/data
     volumes:
       pgdata:
     ```

8. **Replace In-Memory Storage**

   - All in-memory operations from the previous assignment should be replaced with Prisma Client queries
   - The `tags` field on articles should now work through the many-to-many `Tag` model: when creating/updating an article, tags should be connected or created (connectOrCreate pattern)
   - Article filtering (`GET /article?status=...&categoryId=...&tag=...`) should use Prisma `where` clauses

9. All existing endpoints and their behavior should remain the same (same routes, same status codes, same response formats)

## Hints

- Use `npx prisma generate` after schema changes to regenerate the Prisma Client
- Use `npx prisma studio` for a database GUI
- Use `npx prisma migrate reset` to reset the database (this triggers seeding)
- Consider using Prisma's `include` and `select` to optimize queries and avoid returning unnecessary data
- Use Prisma transactions (`prisma.$transaction`) for operations that modify multiple entities
