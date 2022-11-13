## REST service: Containerization, Docker and Database & ORM


## Prerequisites

1. Install [Docker](https://docs.docker.com/engine/install/)
2. Create `Docker Hub` account [Docker Hub](https://hub.docker.com/)

## Technical requirements
- Use 18 LTS version of Node.js

## Description

# 1) Containerization, Docker

Your task is to build and run multi-container application using Docker.

# 2) Database & ORM

Your task is to implement PostgreSQL database as source of data for your application and TypeORM / Prisma to communicate with your database.


## Implementation details

# 1) Containerization, Docker

1. Create `.dockerignore` file and list all files that should be ignored by `Docker`.
2. Create `Dockerfile` that will be used for building image of `PostgreSQL` database.
3. Create `Dockerfile` that will be used for building image of your application.
4. Create `docker-compose.yml` file that will be used for running multi-container application (your application and `PostgreSQL` database). Specify custom network that will be used for communication between application and database containers.
6. Build images and scan it for security vulnerabilities.
7. Push built images to your private repository on `Docker Hub`.

# 2) Database (PostgreSQL) & ORM

1. Use **PostgreSQL** database to store **REST** service data (`Users`, `Albums`, `Tracks`, `Artists`, `Favorites`)
2. Use [TypeORM](https://typeorm.io/#/) or [Prisma](https://www.prisma.io/) with Nest.js to store and update data
3. The information on DB connection should be stored in `.env` file
4. **PostgreSQL** database should run inside of the `docker` container
