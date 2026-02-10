# Assignment: Logging & Error Handling

## Description

Your task is to implement production-ready logging and error handling for the Knowledge Hub API.

This is a continuation of the previous assignments. You will work in the same `nodejs2025Q2-knowledge-hub` repository.

## Technical requirements

- Only Fastify's built-in Pino logger should be used for logging — no additional logging libraries are allowed
- Use 24.x.x version (24.10.0 or upper) of Node.js

## Implementation details

1. **Pino Logger Configuration**

   Configure Fastify's built-in Pino logger with the following settings:
   - Log level should be configurable via the `LOG_LEVEL` environment variable (default: `info`)
   - Supported levels: `trace`, `debug`, `info`, `warn`, `error`, `fatal`
   - In development mode, use `pino-pretty` for human-readable output
   - In production mode, use structured JSON format

2. **Request/Response Logging**

   Log all incoming requests and outgoing responses:
   - Incoming requests: HTTP method, URL, query parameters, request body
   - Outgoing responses: status code, response time
   - **Important**: Sanitize sensitive data in logs — passwords and tokens must never appear in log output. If the request body contains a `password` field, it should be replaced with `"[REDACTED]"` in the log.

3. **Custom Error Handler**

   Implement a custom error handler using Fastify's `setErrorHandler`:
   - Catch all unhandled errors during request processing
   - Log the error with full stack trace at `error` level
   - Return a proper HTTP response with the appropriate status code and a JSON body:
     ```json
     {
       "statusCode": 500,
       "error": "Internal Server Error",
       "message": "An unexpected error occurred"
     }
     ```
   - For known errors, return the correct status code (400, 401, 403, 404, etc.)

4. **Custom Error Classes**

   Create custom error classes that extend the base `Error` class:
   - `NotFoundError` — results in HTTP **404** response
   - `ValidationError` — results in HTTP **400** response
   - `UnauthorizedError` — results in HTTP **401** response
   - `ForbiddenError` — results in HTTP **403** response

   Each custom error class should have:
   - A `statusCode` property
   - A descriptive `message`

   The error handler should check if the thrown error is an instance of a custom error class and use its `statusCode`. Otherwise, default to **500**.

5. **Process Error Handling**

   Add listeners for unhandled errors at the process level:
   - `uncaughtException` — log the error at `fatal` level and perform graceful shutdown (close the server, close database connections, then exit with code 1)
   - `unhandledRejection` — log the error at `error` level and perform graceful shutdown

6. **Log File Rotation**

   - Write logs to a file in addition to (or instead of) stdout
   - Implement log file rotation based on file size
   - The maximum file size should be configurable via the `LOG_MAX_FILE_SIZE` environment variable (in kilobytes, default: `1024` = 1MB)
   - When the log file exceeds the maximum size, it should be renamed with a timestamp suffix (e.g., `app.log` → `app-2025-06-15T10-30-00.log`) and a new `app.log` should be created
   - Use `pino.destination` or `pino.transport` with a file target

7. **Environment Variables**

   Add the following to `.env.example`:
   ```
   LOG_LEVEL=info
   LOG_MAX_FILE_SIZE=1024
   ```
