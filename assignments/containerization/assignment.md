## REST service: Containerization, Docker 

## Description

Your task is to build and run multi-container application using Docker.
## Prerequisites

1. Install [Docker](https://docs.docker.com/engine/install/)
2. Create `Docker Hub` account [Docker Hub](https://hub.docker.com/)

## Implementation details

1. Create `.dockerignore` file and list all files that should be ignored by `Docker`.
2. Create `Dockerfile` that will be used for building image of `PostgreSQL` database.
3. Create `Dockerfile` that will be used for building image of your application.
4. Create `docker-compose.yml` file that will be used for running multi-container application (your application and `PostgreSQL` database). Specify custom network that will be used for communication between application and database containers.
6. Build images and scan it for security vulnerabilities.
7. Push built images to your personal repositories on `Docker Hub`.
