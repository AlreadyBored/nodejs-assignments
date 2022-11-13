# REST service: Logging & Error Handling and Authentication and Authorization

## Basic Scope

# 1) Logging & Error Handling:

- **+20** Custom `LoggingService` is implemented and used for logging
- **+20** Custom `Exception Filter` is implemented and used for handling exceptions during request processing
- **+20** Logging for request (of at least `url`, `query parameters`, `body`) and response with `status code` is implemented.
- **+20** Error handling is implemented including sending response with an appropriate `http status code` and errors logging.
- **+10** Error handling  and logging is implemented for `uncaughtException` event.
- **+10** Error handling  and logging is implemented for `unhandledRejection` event.


# 2) Authentication and Authorization:

- **+30** Route `/auth/signup` implemented correctly, related logic is divided between controller and corresponding service
- **+30** Route `/auth/login` has been implemented, related logic is divided between controller and corresponding service
- **+10** `User` `password` saved into database as hash
- **+20** Access Token is implemented,`JWT` payload contains `userId` and `login`, secret key is saved in `.env`.
- **+40** Authentication is required for the access to all routes except `/auth/signup`, `/auth/login`, `/doc` and `/`.
- **+10** Separate module is implemented **within application scope** to check that all requests to all routes except mentioned above contain required JWT token

## Advanced Scope

# 1) Logging & Error Handling:

- **+20** Logs are written to a file.
- **+10** Logs files are rotated with size.
- **+10** Add environment variable to specify max file size.
- **+10** Error logs are written to a separate file (either only to a separate file or in addition to logging into a common file).
- **+20** Add environment variable to specify logging level and corresponding functionality.
Logs with configured level to be registered as well as other higher priority levels. For example if you set level 2, all messages with levels 0, 1 and 2 should be logged. You should use Nest.js logging levels.


# 2) Authentication and Authorization:
- **+30** Route `/auth/refresh` implemented correctly, related logic is divided between controller and corresponding service


## Forfeits

- **-10** for each failing test 
(for authentication and authorization  module tests to be run with `npm run test:auth` )
- **-30% of max task score** Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.
- **-10 points** for each error either on `npm run lint` on the basis of the **local config** or for compilation errors on the basis of the **local tsconfig** (`errors` not `warnings`).
- **-20** No separate development branch
- **-20** No Pull Request
- **-10** Pull Request description is incorrect
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)


