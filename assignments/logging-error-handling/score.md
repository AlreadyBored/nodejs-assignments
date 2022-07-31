# REST service: Logging & Error Handling

## Basic Scope

- **+20** Custom `LoggingService` is implemented and used for logging
- **+20** Custom `Exception Filter` is implemented and used for handling exceptions during request processing
- **+20** Logging for request (of at least `url`, `query parameters`, `body`) and response with `status code` is implemented.
- **+20** Error handling is implemented including sending response with an appropriate `http status code` and errors logging.
- **+10** Error handling  and logging is implemented for `uncaughtException` event.
- **+10** Error handling  and logging is implemented for `unhandledRejection` event.

## Advanced Scope

- **+20** Logs are written to a file.
- **+10** Logs files are rotated with size.
- **+10** Add environment variable to specify max file size.
- **+10** Error logs are written to a separate file (either only to a separate file or in addition to logging into a common file).
- **+20** Add environment variable to specify logging level and corresponding functionality.
Logs with configured level to be registered as well as other higher priority levels. For example if you set level 2, all messages with levels 0, 1 and 2 should be logged. You should use Nest.js logging levels.

## Forfeits

- **-10** for each failing test with `npm run test:auth` (this forfeit applied once if coincides with same forfeit in different assignments in case there are multiple assignments in task)
- **-30% of max task score** Commits after deadline, except commits that affect only Readme.md, .gitignore, etc.(this forfeit applied once if coincides with same forfeit in different assignments in case there are multiple assignments in task)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- **-10 points** for each lint error either on `npm run lint` on the basis of the **local config** or for compilation errors on the basis of the **local tsconfig** (`errors` not `warnings`).
