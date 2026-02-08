# Assignment: Containerization & Docker

## Description

Your task is to build and run the Knowledge Hub API as a multi-container application using Docker.

This is a continuation of the previous assignments. You will work in the same `nodejs2025Q2-knowledge-hub` repository.

## Prerequisites

1. Install [Docker](https://docs.docker.com/engine/install/)
2. Create a [Docker Hub](https://hub.docker.com/) account

## Implementation details

1. **`.dockerignore`**

   Create a `.dockerignore` file and list all files/folders that should be ignored by Docker:
   - `node_modules`
   - `.git`
   - `logs/`
   - `*.log`
   - `.env`
   - `dist/`
   - `.vscode/`
   - `.idea/`

2. **Application Dockerfile**

   Create a `Dockerfile` for building the application image:

   - Use a **multi-stage build**:
     - **Stage 1 (build)**: Install all dependencies, compile TypeScript, generate Prisma Client
     - **Stage 2 (production)**: Copy only the compiled output and production dependencies, use a minimal base image (`node:24-alpine`)
   - Install only production dependencies in the final stage (`npm ci --omit=dev`)
   - Set the `NODE_ENV=production` environment variable
   - Expose the application port
   - Use a non-root user for running the application
   - The `CMD` should start the application

3. **`docker-compose.yml`**

   Create a `docker-compose.yml` file that defines the following services:

   - **`app`** (Knowledge Hub API):
     - Built from the application `Dockerfile`
     - Depends on the `db` service
     - Maps the application port (e.g. `4000:4000`)
     - Uses environment variables from `.env` file
     - Has a health check (e.g. `curl -f http://localhost:4000/ || exit 1`)
     - Restart policy: `on-failure`

   - **`db`** (PostgreSQL):
     - Uses the official `postgres:16-alpine` image
     - Environment variables: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
     - Persists data using a named volume
     - Has a health check (`pg_isready`)
     - Restart policy: `unless-stopped`

   - **Network**: Define a custom bridge network (e.g. `knowledge-hub-network`) for communication between services

   - **Volumes**: Define a named volume for PostgreSQL data persistence

4. **Application Startup**

   The application should fully work when started with:
   ```bash
   docker-compose up --build
   ```

   This includes:
   - Building the application image
   - Starting the PostgreSQL database
   - Running Prisma migrations (`npx prisma migrate deploy`)
   - Starting the Fastify server

   Consider using a startup script or Docker Compose `entrypoint` to ensure the database is ready before running migrations and starting the app.

5. **Security Scanning**

   Scan the built application image for vulnerabilities using one of:
   - `docker scout cves <image>` (Docker Scout)
   - [Trivy](https://github.com/aquasecurity/trivy) (`trivy image <image>`)

   Document the results (or absence of critical vulnerabilities) in the PR description.

6. **Docker Hub**

   - Push the built application image to your personal Docker Hub repository
   - Add the Docker Hub image link to the `Readme.md`

## Hints

- Use `depends_on` with `condition: service_healthy` to ensure proper startup order
- For running Prisma migrations before app start, you can use an entrypoint script:
  ```bash
  #!/bin/sh
  npx prisma migrate deploy
  node dist/main.js
  ```
- To check image size: `docker images <image-name>`
- To scan with Docker Scout: `docker scout cves <image-name>`
