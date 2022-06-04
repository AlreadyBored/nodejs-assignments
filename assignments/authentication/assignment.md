# Authentication and Authorization

## Description

Your task is to implement Authentication and Authorization with JWT (Access and Refresh Tokens).
- User can signup new account and login with personal login & password.
– **POST** `/login` method, returns response with Access Token and Refresh Token (optional).
– Access resource successfully with Access Token.
– When the Access Token is expired, user cannot use it anymore.
- Refresh Token helps to get new Access Token (optional).

## Technical requirements

- Task can be implemented in Javascript or Typescript
- Only `bcrypt` or its equivalent like `bcryptjs`, `jsonwebtoken`, `ws`, `robotjs`, `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing are allowed
- Use 16 LTS version of Node.js


## Implementation details

# REST service: Authentication & Authorization

1. Implement **POST** `api/auth/signup` method (instead of **POST** `api/users`) that accepts **JSON** `username`, `password` and server responses with HTTP **200** code and relevant message on success.

2. Once **POST** `api/auth/signup` accepts `password` property, it is replaced with **hash** (use [bcrypt package](https://www.npmjs.com/package/bcrypt) or its equivalent like `bcryptjs`) prior to be saved in data base.

3. Implement **POST** `api/auth/login` method which accepts **JSON** with `username` and `password` and returns **JWT** Access Token and Refresh Token (if implemented) (use [jsonwebtoken package](https://www.npmjs.com/package/jsonwebtoken)) together with other user's details in response body: 
```
    { 
        userId: <uuid>,
        username: <string>,       
        accessToken: <jwt_token> ,
        refreshToken: <jwt_token>
     }
```

4. **JWT** Access Token should contain `userId` and `username` in a **payload** and has expiration time.

5. The **JWT** Access Token should be added in HTTP `Authorization` header to all requests that requires authentication. HTTP authentication must follow `Bearer` scheme, e.g.:
  ```
  Authorization: Bearer <jwt_token>
  ```

6. Proxy all the requests (except `/signup`, `/login`, `/doc`, `/`) and check that HTTP `Authorization` header has the correct value of **JWT** Access Token.

7. In case of the HTTP `Authorization` header in the request is absent or invalid or doesn’t follow `Bearer` scheme or Access Token has expired, further router method execution should be stopped and lead to response with HTTP **401** code (Unauthorized error) and the corresponding error message.


8.  Implement **POST** `api/auth/refreshtoken` method which accepts **JSON** with Refresh Token and returns response with new Access Token together with Refresh Token (if implemented). This way user may access resource successfully with new Access Token. 

9.  **JWT** Refresh Token should contain `username` in a **payload**, and should be saved as new object into database together with an `iat` (issued at) value. The Refresh Token has different value and expiration time to the Access Token. On expiration Refresh Token to be destroyed from database.

10. Secrets used for signing the tokens should be stored in `.env` file.

8. When Refresh Token (if implemented) is expired or inexistent, **POST** `/refreshtoken` method responses with HTTP **403** code (Forbidden error) and the corresponding error message. User needs then to make a new signin request.


9. **Add admin user to DB** on service start with `username = admin` and `password = admin`.

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
