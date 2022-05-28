# Authentication and JWT

## Description

Your task is to implement Authentication and JWT (Access and Refresh Tokens).
- User can signup new account and login with personal login & password.
– **POST** `/login` method, returns response with Refresh Token (optional) and Access Token pair.
– Access resource successfully with Access Token.
– When the Access Token is expired, user cannot use it anymore.
- Refresh Token helps to get new Access Token (optional)

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Only `bcrypt` or its equivalent like `bcryptjs`, `jsonwebtoken`, `ws`, `robotjs`, `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing are allowed
- Use 16 LTS version of Node.js


## Implementation details

# Authentication and JWT

1. - **POST** `api/users` should accept `password` field and before saving it replace it with **hash** (use [bcrypt package](https://www.npmjs.com/package/bcrypt) or its equivalent like `bcryptjs`).

2. Implement **POST** `api/auth/signup` method which accepts **JSON** with `login` and `password` and returns relevant message.

3. Implement **POST** `api/auth/login` method which accepts **JSON** with `login` and `password` and returns **JWT** Access Token and Refresh Token (if implemented) (use [jsonwebtoken package](https://www.npmjs.com/package/jsonwebtoken)) together with other user's details in response body: 
```
    { 
        userId: <uuid>,
        username: <string>,
        login: <string>,
        accessToken: <jwt_token> ,
        refreshToken: <jwt_token>
     }
```

4.  Implement **POST** `api/auth/refreshtoken` method which accepts **JSON** with Refresh Token and returns response with new Access Token together with Refresh Token (if implemented). This way user may access resource successfully with new Access Token.

4. **JWT** Access Token should contain `userId` and `login` in a **payload** and has expiration time.

5.  **JWT** Refresh Token should contain `login` in a **payload**, and should be saved as new object into database together with and `iat` (issued at) value. On expiration Refresh Token to be destroyed. And once user submits request with expired Refresh Token, but his / her Access Token is still valid, user gets two tokens back with updated Refresh Token.

6. Secrets used for signing the tokens should be stored in `.env` file.

7. For all client requests the **JWT** Access Token should be added in HTTP `Authorization` header to all requests that requires authentication. HTTP authentication must follow `Bearer` scheme, e.g.:
  ```
  Authorization: Bearer <jwt_token>
  ```

6. Proxy all the requests (except `/signup`, `/login`, `/doc`, `/`) and check that HTTP `Authorization` header has the correct value of **JWT** Access Token.

7. In case of the HTTP `Authorization` header in the request is absent or invalid or doesn’t follow `Bearer` scheme or when the Access Token is expired, further router method execution should be stopped and lead to response with HTTP **401** code (Unauthorized error) and the corresponding error message.

8. When both Refresh Token and AccessToken (if implemented) are expired or inexistent, further router method execution should be stopped and lead to response with HTTP **403** code (Forbidden error) and the corresponding error message.
The Refresh Token has different value and expiration time to the Access Token.

9. **Add admin user to DB** on service start with `login = admin` and `password = admin`.

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
