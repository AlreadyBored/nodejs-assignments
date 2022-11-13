# REST service: Logging & Error Handling

## Description

Your task is to implement logging functionality to the already existing REST service.

## Technical requirements

- Only `@nestjs/common` and `@nestjs-core` Nest.js modules can be used for the logger and error handling feature assignment, other Nest.js modules are prohibited
- Use 18 LTS version of Node.js

## Implementation details

1. Implement custom `LoggingService` which will be used for logging and provided via `dependency injection`
2. Incoming requests to service (at least `url`, `query parameters`, `body`) and response with `status code` should be logged by `LoggingService`.
3. Implement custom `Exception Filter` and use it for handling errors during request processing. In case of unexpected error response with HTTP code `500` (Internal Server Error) and standard message should be sent
4. `LoggingService` should log all `errors`
5. Add listener and logging to `uncaughtException` event
6. Add listener and logging to `unhandledRejection` event
7. Writing to `process.stdout` or to a file both can be used for logging
8. There should be multiple logging levels and logging level should be stored in environment variable
9. Log file rotation should be setup with file size (kB) parameter.
