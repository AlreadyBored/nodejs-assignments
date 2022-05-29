# Logging & Error Handling

## Basic Scope

- **+20** Logging ( of at least `url`, `query parameters`, `body`) and response with `status code`.
- **+20** Centralized error handling is implemented including sending response with an appropriate http status code and errors logging.
- **+10** Error handling  and logging is implemented for `uncaughtException` event.
- **+10** Error handling  and logging is implemented for `unhandledRejection` event.
- **+20** Logging process is handled by a single module (e.g. code handling the logging is located in one module and such module can be **used** inside the other modules).


## Advanced Scope

- **+20** Logs to be written into a file.
- **+10** Error logs to be written into a separate file (either only to a separate file or in addition to logging into a common file).
- **+20** Add environment variable to specify logging level and corresponding functionality.
Logs with configured level to be registered as well as other higher priority levels. For example if you set level 2, all messages with levels 0, 1 and 2 should be logged.
**Example** of logging levels: 

* `0`: `error` (error)
* `1`: `warn` (warning)
* `2`: `info` (information)
* `3`: `debug` (debug message)
* `4`: `all` (all messages

## Forfeits

- **-95% of total task score** for any external tools except logger library and  Nodejs framework,  `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- **-100 points** for changes in tests or workflow.
- **-10 points** for each failed test.
- **-10 points** for each lint error either on `npm run lint` on the basis of the **local config** or for compilation errors on the basis of the **local tsconfig** (`errors` not `warnings`).
- **-20** for every explicty set type `any`.
