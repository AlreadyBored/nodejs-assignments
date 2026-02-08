# Assignment: Authentication & Authorization

## Description

Your task is to implement Authentication and Authorization with JWT (Access and Refresh tokens) for the Knowledge Hub API.

This is a continuation of the Database & Prisma assignment (Week 4). You will work in the same `nodejs2025Q2-knowledge-hub` repository.

## Technical requirements

- Task should be implemented in TypeScript
- Use 24.x.x version (24.10.0 or upper) of Node.js

## Implementation details

1. **Endpoints**

- `Signup` (`/auth/signup` route)
  - `POST /auth/signup` — send `login` and `password` to create a new `user`
    - Server should answer with `status code` **201** and corresponding message if dto is valid
    - Server should answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not `strings`, or `login` is already taken)

- `Login` (`/auth/login` route)
  - `POST /auth/login` — send `login` and `password` to get Access token and Refresh token
    - Server should answer with `status code` **200** and tokens in the response body: `{ accessToken: string, refreshToken: string }`
    - Server should answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not `strings`)
    - Server should answer with `status code` **403** and corresponding message if authentication failed (no user with such `login`, `password` doesn't match actual one, etc.)

- `Refresh` (`/auth/refresh` route)
  - `POST /auth/refresh` — send refresh token in body as `{ refreshToken }` to get a new pair of Access token and Refresh token
    - Server should answer with `status code` **200** and new tokens in body if dto is valid
    - Server should answer with `status code` **401** and corresponding message if dto is invalid (no `refreshToken` in body)
    - Server should answer with `status code` **403** and corresponding message if authentication failed (Refresh token is invalid or expired)

2. Once `POST /auth/signup` accepts `password` property, it is replaced with a **hash** (using [bcrypt](https://www.npmjs.com/package/bcrypt) or [bcryptjs](https://www.npmjs.com/package/bcryptjs) package) for password encryption. No raw passwords should be stored in the database.

   NB! Password should remain hashed after any operation with the service.

3. **JWT Access token** should contain `userId`, `login`, and `role` in its **payload** and has a short expiration time (e.g. 15 minutes). **JWT Refresh token** should have a longer expiration time (e.g. 7 days).

4. The **JWT Access token** should be added in the HTTP `Authorization` header to all requests that require authentication. Proxy all the requests (except `/auth/signup`, `/auth/login`, `/auth/refresh`, `/doc`, `/`) and check that the HTTP `Authorization` header has the correct value of the JWT Access token.

   HTTP authentication must follow the `Bearer` scheme:
   ```
   Authorization: Bearer <jwt_token>
   ```

5. In case the HTTP `Authorization` header in the request is absent or invalid or doesn't follow the `Bearer` scheme or the Access token has expired, further route handler execution should be stopped and lead to a response with HTTP **401** code and corresponding error message.

6. **Role-Based Access Control (RBAC)**:

   - `viewer` — can only perform `GET` requests (read-only access to all resources)
   - `editor` — can perform `GET` requests and can `POST` (create) / `PUT` (update) their own articles and comments. Cannot delete other users' content or manage categories.
   - `admin` — full access to all operations on all resources

   If a user attempts an operation they are not authorized for, server should respond with `status code` **403** and a corresponding message.

7. Secrets used for signing the tokens should be stored in `.env` file:
   ```
   JWT_SECRET=your_access_token_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   JWT_ACCESS_TTL=15m
   JWT_REFRESH_TTL=7d
   ```

8. New users created via `/auth/signup` should have the `viewer` role by default. Only admins can change user roles.

### `bcrypt` installation issues:

#### If you see an error that starts with:

```console
gyp ERR! stack Error: "pre" versions of node cannot be installed, use the --nodedir flag instead
```

Please check [compatibility between Node.JS and Bcrypt versions](https://www.npmjs.com/package/bcrypt#version-compatibility). Alternatively, use `bcryptjs` which is a pure JavaScript implementation and doesn't require native compilation.
