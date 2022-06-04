# Scoring: Containerization, Docker

## Basic Scope

- **+20** `Readme.md` has instruction how to run application
- **+30** `user-defined bridge` is created and configured
- **+30**  container auto restart after crash
- **+30** database files and logs to be stored in volumes 
          instead of container

## Advanced Scope

- **+20** Final size of the Docker image with application is less than 300 MB

## Forfeits

- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR 
- **-10** PR description is incorrect
- **-20** No separate development branch
- **-20** `default bridge network` has been used
- **-20** `docker-compose.yml` and `Dockerfile` set strict 
          application configure
- **-20** Application is not restarting upon changes 
          implemented into `src` folder
- **-20**  In case specific image is not used (it is required 
          to use images like `postgres` and `node`, but not `ubuntu` with installation of `node` or `postgres`)
- **-20** `Postgress image` is not configured as dependancy 
          for `node image`
