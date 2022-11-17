# REST service: Logging & Error Handling and Authentication and Authorization

## Description

# 1) Logging & Error Handling.

Your task is to implement logging functionality to the already existing REST service.

# 2) Authentication and Authorization

Your task is to implement Authentication and Authorization with JWT (Access and Refresh tokens).
- User can **signup** new account with personal login & password  
– User can **login** with personal login & password, server returns response with Access token and Refresh token (Refresh token is in advanced scope).
- **Refresh** token helps to get new pair Access/Refresh tokens (optional)
– User now should use valid Access token to access  resources
– When the Access token is expired, user can't use it anymore
- Refresh token helps to get new pair Access/Refresh tokens (optional)


## Technical requirements

- Only `@nestjs/common` and `@nestjs-core` Nest.js modules can be used for the logger and error handling feature assignment, other Nest.js modules are prohibited
- Use 18 LTS version of Node.js

## Implementation details

# 1) Logging & Error Handling:

1. Implement custom `LoggingService` which will be used for logging and provided via `dependency injection`
2. Incoming requests to service (at least `url`, `query parameters`, `body`) and response with `status code` should be logged by `LoggingService`.
3. Implement custom `Exception Filter` and use it for handling errors during request processing. In case of unexpected error response with HTTP code `500` (Internal Server Error) and standard message should be sent
4. `LoggingService` should log all `errors`
5. Add listener and logging to `uncaughtException` event
6. Add listener and logging to `unhandledRejection` event
7. Writing to `process.stdout` or to a file both can be used for logging
8. There should be multiple logging levels and logging level should be stored in environment variable
9. Log file rotation should be setup with file size (kB) parameter.


# 2) Authentication and Authorization

1. Endpoints
* `Signup` (`auth/signup` route)
    * `POST auth/signup` - send `login` and `password` to create a new `user`
      - Server should answer with `status code` **201** and corresponding message if dto is valid
      - Server should answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
* `Login` (`auth/login` route)
    * `POST auth/login` - send `login` and `password` to get Access token and Refresh token (optionally)
      - Server should answer with `status code` **200** and tokens if dto is valid
      - Server should answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
      - Server should answer with `status code` **403** and corresponding message if authentication failed (no user with such `login`, `password` doesn't match actual one, etc.)
* `Refresh` (`auth/refresh` route)
    * `POST auth/refresh` - send refresh token in body as `{ refreshToken }` to get new pair of Access token and Refresh token
      - Server should answer with `status code` **200** and tokens in body if dto is valid
      - Server should answer with `status code` **401** and corresponding message if dto is invalid (no `refreshToken` in body)
      - Server should answer with `status code` **403** and corresponding message if authentication failed (Refresh token is invalid or expired)


2. Once **POST** `/auth/signup` accepts `password` property, it is replaced with **hash** (for example, you can use [bcrypt package](https://www.npmjs.com/package/bcrypt) or its equivalent like `bcryptjs`) for password encryption, no raw passwords should be in database (NB! Password should remain hashed after any operation with service).

3. **JWT** Access token should contain `userId` and `login` in a **payload** and has expiration time (expiration time of Refresh token should be longer, than Access token).

4. The **JWT** Access token should be added in HTTP `Authorization` header to all requests that requires authentication. Proxy all the requests (except `auth/signup`, `auth/login`, `/doc`, `/`) and check that HTTP `Authorization` header has the correct value of **JWT** Access token.  
HTTP authentication must follow `Bearer` scheme:
  ```
  Authorization: Bearer <jwt_token>
  ```

5. In case of the HTTP `Authorization` header in the request is absent or invalid or doesn’t follow `Bearer` scheme or Access token has expired, further router method execution should be stopped and lead to response with HTTP **401** code and the corresponding error message.

6. Secrets used for signing the tokens should be stored in `.env` file.

### `bcrypt` installation issues:

#### If you see an error that starts with:

```console
gyp ERR! stack Error: "pre" versions of node cannot be installed, use the --nodedir flag instead
```
Please check [compatibility between Node.JS and Bcrypt versions](https://www.npmjs.com/package/bcrypt#version-compatibility).

#### If you face an error like this:

```console
node-pre-gyp ERR! Tried to download(404): https://github.com/kelektiv/node.bcrypt.js/releases/download/v1.0.2/bcrypt_lib-v1.0.2-node-v48-linux-x64.tar.gz
```

Make sure you have the appropriate dependencies installed and configured for your platform. You can find installation instructions for the dependencies for some common platforms in [this page](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions).
