# Scoring: Authentication & JWT

## NB! For the succesfull tests results user with login - **admin**, and password - **admin** should be saved into DB. 

## Basic Scope

1. **+20** Users' passwords are to be saved into data base as hash, created by `bcrypt` (or similar package, for example `bcryptjs`).
2. **+20** Routes `/auth/signin` and `/auth/signup` has been implemented, logic connected to them is divided between controller and coresponding service. In case of `auth/signin` method when user is absent in DB, server replies with  **403** (`Forbidden`) HTTP status.
3. **+20** `JWT` consists of `userId` and `login`, secret key is saved in `.env`.
4. **+20** Authentication is required for the access to all routes except 
`/auth/signup`, `/auth/signin`, `/doc` and `/`.
5. **+20** Tokens existence check is implemented by a separate module in request **within application scope**. In case both tokens are invalid or do not exist user get **401** (`Unauthorized`) HTTP status.
6. **+10** In case refreshToken is expired but accessToken is still valid server replies with both tokens - valid accessToken and new refreshToken.
7. **+10** In case accessToken is expired, serrver relies to the message sent with valid refreshToken in the body to `/auth/refreshtoken`, with new accessToken and same refreshToken pair.

## Forfeits

- **-95% of total task score** any external tools except `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less then 3 commits in the development branch, not taking into account commits, making changes only in `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)