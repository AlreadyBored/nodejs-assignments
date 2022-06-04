# Scoring: Authentication & Authorization

## NB! For the succesfull tests results user with login = **admin**, and password = **admin** should be saved into DB. 

## Basic Scope

- **+10** Route `/auth/signup` has been implemented with `login` and `password` requirement, logic connected to it is divided between controller and coresponding service.
- **+20** Users' passwords are to be saved into data base as hash, created by `bcrypt` (or similar package, for example `bcryptjs`).
- **+10** Route `/auth/login` has been amended from `/login`, logic connected to it is divided between controller and coresponding service. In case of `auth/login` POST method when user is absent in DB, server replies with  **403** (`Forbidden`) HTTP status.
- **+20** Access Token is implemented,`JWT` consists of `userId` and `login`, secret key is saved in `.env`.
- **+20** Authentication is required for the access to all routes except 
`/auth/signup`, `/auth/login`, `/doc` and `/`.
- **+10** Separate module is implemented **within application scope** in order to check all routes except `/auth/refresh` for the presence of a valid Access Token that's been appended to a request  otherwise  **401** (`Unauthorized`) HTTP status to be received.

## Advanced Scope

- **+20** Refresh Token is implemented,`JWT` consists of  `login`, secret key is saved in `.env`.
- **+10** In case Refresh Token is expired but Access Token is still valid server replies with both tokens -  
          valid Access Token and new Refresh Token.
- **+20** In case Access Token is expired, server replies with a valid Refresh Token in the message body 
          to `/auth/refreshtoken`, with new Access Token and same Refresh Token pair.

## Forfeits

- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not taking into account commits, making changes only in `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)