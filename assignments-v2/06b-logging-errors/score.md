# Scoring: Logging & Error Handling

## Basic Scope

- **+10** Fastify Pino logger is configured with configurable log level via `LOG_LEVEL` env variable
- **+10** Incoming requests are logged (method, URL, query parameters, body)
- **+10** Outgoing responses are logged (status code, response time)
- **+10** Custom error handler is implemented via `setErrorHandler` — catches errors, logs them, returns proper HTTP responses
- **+10** Custom error classes are implemented (`NotFoundError`, `ValidationError`, `UnauthorizedError`, `ForbiddenError`) with `statusCode` property
- **+10** Custom error classes are used in route handlers instead of manually setting status codes

## Advanced Scope

- **+10** Log file rotation is implemented with configurable max file size via `LOG_MAX_FILE_SIZE` env variable
- **+10** Sensitive data (passwords, tokens) is sanitized in logs — replaced with `"[REDACTED]"`
- **+10** `uncaughtException` listener is added with fatal-level logging and graceful shutdown
- **+10** `unhandledRejection` listener is added with error-level logging and graceful shutdown (server close, DB disconnect, process exit)

## Forfeits

- **-30% of max task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
