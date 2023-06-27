# Scoring: CRUD API

## Basic Scope

- **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
- **+10** **GET** `api/users` implemented properly
- **+10** **GET** `api/users/{userId}` implemented properly
- **+10** **POST** `api/users` implemented properly
- **+10** **PUT** `api/users/{userId}` implemented properly
- **+10** **DELETE** `api/users/{userId}` implemented properly
- **+6** Users are stored in the form described in the technical requirements
- **+6** Value of `port` on which application is running is stored in `.env` file

## Advanced Scope
- **+30** Task implemented on Typescript 
- **+10** Processing of requests to non-existing endpoints implemented properly
- **+10** Errors on the server side that occur during the processing of a request should be handled and processed properly
- **+10** Development mode: `npm` script `start:dev` implemented properly
- **+10** Production mode: `npm` script `start:prod` implemented properly

## Hacker Scope
- **+30** There are tests for API (not less than **3** scenarios)
- **+50** There is horizontal scaling for application with a **load balancer**

## Forfeits

- **-95% of total task score** any external tools except `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `eslint` and its plugins, `webpack` and its plugins, `prettier` and it's plugins, `uuid`, `@types/*` as well as libraries used for testing
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
