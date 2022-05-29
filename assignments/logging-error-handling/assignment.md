# Logging & Error Handling

## Description

Your task is to implement logging functionality to already existing REST service.

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Only `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing are allowed
- Use 16 LTS version of Node.js

## Implementation details


1. Add a logger which will log incoming requests to service (at least `url`, `query parameters`, `body`) and response with `status code`.
2. Add logger which will log all unhandled `errors` and return a standard message with HTTP code `500` (Internal Server Error).
3. Add listener and logging to `uncaughtException`.
4. Add listener and logging to `unhandledRejection`.
5. Writing to `process.stdout` or to a file both can be used for logging. Any third-party logging library can also be used for this purpose.
6. Create multiple logging levels and store logging level in environment variable.
