# Assignment: Containerization & Docker (Foundation)

## Description

Your task is to prepare the Knowledge Hub API runtime environment using Docker.

This assignment is a continuation of the Nest.js Knowledge Hub API assignment (Week 3). You will work in the same repository created in assignment `03`.

The main goal of this step is to configure containerized infrastructure early: application container + PostgreSQL container. In the next assignment (`04b`), you will connect Prisma to this database and move from in-memory storage to SQL.

## Prerequisites

1. Install [Docker](https://docs.docker.com/engine/install/)
2. Create a [Docker Hub](https://hub.docker.com/) account

## Technical requirements

- Task should be implemented in TypeScript
- Use 24.x.x version (24.10.0 or upper) of Node.js

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
     - **Stage 1 (build)**: install all dependencies and compile TypeScript
     - **Stage 2 (production)**: copy compiled output and install production dependencies only (`npm ci --omit=dev`)
   - Use a minimal base image (`node:24-alpine`) for the final stage
   - Set `NODE_ENV=production`
   - Expose application port
   - Use a non-root user
   - `CMD` should start the application

3. **`docker-compose.yml`**

   Create a `docker-compose.yml` file with the following services:

   - **`app`** (Knowledge Hub API):
     - built from the application `Dockerfile`
     - depends on `db`
     - maps application port (e.g. `4000:4000`)
     - uses environment variables from `.env`
     - has a health check (e.g. `curl -f http://localhost:4000/ || exit 1`)
     - restart policy: `on-failure`

   - **`db`** (PostgreSQL):
     - uses `postgres:16-alpine`
     - uses env vars: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
     - exposes port `5432`
     - persists data in a named volume
     - has a health check (`pg_isready`)
     - restart policy: `unless-stopped`

   - **`adminer`** (optional, for local debugging):
     - uses the official [adminer](https://hub.docker.com/_/adminer/) image
     - available only for development (recommended via Compose profile, for example `debug`)
     - connected to the same network as `db`
     - maps UI port (for example `8080:8080`)

   - define a custom bridge network for communication between services
   - define a named volume for PostgreSQL persistence

4. **Environment setup**

   - Add database-related variables to `.env.example`:
     - `POSTGRES_USER`
     - `POSTGRES_PASSWORD`
     - `POSTGRES_DB`
     - `POSTGRES_HOST` (`db`)
     - `POSTGRES_PORT` (`5432`)
   - `.env` should not be committed

5. **Application startup**

   The project should start via:
   ```bash
   docker-compose up --build
   ```

   After startup:
   - `app` container is healthy and responds
   - `db` container is healthy
   - application and database are connected through the custom network

6. **Security scanning**

   Scan the application image for vulnerabilities using one of:
   - `docker scout cves <image>`
   - [Trivy](https://github.com/aquasecurity/trivy): `trivy image <image>`

   Document results (or absence of critical vulnerabilities) in PR description.

7. **Docker Hub**

   - Push the application image to your personal Docker Hub repository
   - Add Docker Hub image link to `Readme.md`

## Hints

- Use `depends_on` with `condition: service_healthy` to improve startup order
- You will reuse the same PostgreSQL container setup in assignment `04b`
- Check image size with: `docker images <image-name>`
