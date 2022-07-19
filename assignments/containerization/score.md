## REST service: Containerization, Docker

## Basic Scope

- **+20** `Readme.md` has instruction how to run application
- **+30** `user-defined bridge` is created and configured
- **+30**  container auto restart after crash
- **+20** application is restarting upon changes implemented into `src` folder
- **+30** database files and logs to be stored in volumes instead of container

## Advanced Scope

- **+20** Final size of the Docker image with application is less than 500 MB
- **+10** Implemented npm script for vulnerabilities scanning (free solution)
- **+20** Your built image is pushed to DockerHub

## Forfeits

- **-20** In case specific image is not used (it is required to use images like `postgres` and `node`, but not `ubuntu` with installation of `node` or `postgres`)
- **-20** Postgres container is not configured as dependency for application container
- **-20** `docker-compose.yml` contains hardcoded variables
- **-30% of total task score** Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.(this forfeit applied once if coincides with same forfeit in different assignments in case there are multiple assignments in task)
- **-20** Missing PR 
- **-10** PR description is incorrect
- **-20** No separate development branch
