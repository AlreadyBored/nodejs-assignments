# REST service: PostgreSQL & ORM and Logging & Error Handling

## Description

Your task is as following:

1) to implement PostgreSQL database as source of data for your application and TypeORM / Prisma to communicate with your database.

2) to implement logging functionality to the already existing REST service.

## Technical requirements

- Only `@nestjs/common` and `@nestjs-core` Nest.js modules can be used for the logger and error handling feature assignment, other Nest.js modules are prohibited
- Use 16 LTS version of Node.js

## Implementation details

# 1) PostgreSQL & ORM:

1. Use **PostgreSQL** database to store **REST** service data (`Users`, `Albums`, `Tracks`, `Artists`, `Favorites`)
2. Use [Typeorm](https://typeorm.io/#/) or [Prisma](https://www.prisma.io/) with Nest.js to store and update data
3. The information on DB connection should be stored in `.env` file
4. **PostgreSQL** database should run inside of the `docker` container

# 2) Logging & Error Handling:

1. Implement custom `LoggingService` which will be used for logging and provided via `dependency injection`
2. Incoming requests to service (at least `url`, `query parameters`, `body`) and response with `status code` should be logged by `LoggingService`.
3. Implement custom `Exception Filter` and use it for handling errors during request processing. In case of unexpected error response with HTTP code `500` (Internal Server Error) and standard message should be sent
4. `LoggingService` should log all `errors`
5. Add listener and logging to `uncaughtException` event
6. Add listener and logging to `unhandledRejection` event
7. Writing to `process.stdout` or to a file both can be used for logging
8. There should be multiple logging levels and logging level should be stored in environment variable
9. Log file rotation should be setup with file size (kB) parameter.
