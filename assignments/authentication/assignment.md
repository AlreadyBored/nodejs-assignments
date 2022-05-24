# Authentication and JWT

## Description

Your task is to implement Authentication and JWT (Access and Refresh Tokens).
- User can signup new account and login with personal login & password.
– Send /signin request, return response with Refresh Token.
– Access resource successfully with Access Token.
– When the Access Token is expired, user cannot use it anymore.

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Only `bcrypt` or its equivalent like `bcryptjs`, `jsonwebtoken`, `ws`, `robotjs`, `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing are allowed
- Use 16 LTS version of Node.js


## Implementation details

# Authentication and JWT

1. - **POST** `api/person` should accept `password` field and before saving it replace it with **hash** (use [bcrypt package](https://www.npmjs.com/package/bcrypt) or its equivalent like `bcryptjs`).

2. Implement **POST** `api/auth/signup` method which accepts **JSON** with `login` and `password` and returns **JWT** token in response body: `{ token: <jwt_token> }` (use [jsonwebtoken package](https://www.npmjs.com/package/jsonwebtoken)).

3. Implement **POST** `api/auth/signin` method which accepts **JSON** with `login` and `password` and returns **JWT** access token  (use [jsonwebtoken package](https://www.npmjs.com/package/jsonwebtoken)) together with Refresh Token and other person details in response body: 
```
    { 
        personId: <uuid>,
        name: <string>,
        login: <string>,
        accessToken: <jwt_token> ,
        refreshToken: <uuid>
     }
```

4.  Implement **POST** `api/auth/refreshtoken` method which accepts **JSON** with refreshToken in request and returns response with new accessToken together with refreshToken. This way user may access resource successfully with new accessToken.

4. **JWT** accessToken should contain `personId` and `login` in a **payload**.

5.  To create refreshToken use uuid library for creating a random token and add time validation, save new object into database. On expiration refreshToken to be destroyed.

6. Secret that used for signing of the tokens should be stored in `.env` file.

7. For all client requests the **JWT** accessToken should be added in HTTP `Authorization` header to all requests that requires authentication. HTTP authentication must follow `Bearer` scheme, e.g.:
  ```
  Authorization: Bearer <jwt_token>
  ```

6. Proxy all the requests (except `/login`) and check that HTTP `Authorization` header has the correct value of **JWT** accessToken.

7. In case of the HTTP `Authorization` header in the request is absent or invalid or doesn’t follow `Bearer` scheme or when the accessToken is expired, further router method execution should be stopped and lead to response with HTTP **401** code (Unauthorized error) and the corresponding error message.

8. When the refreshToken is expired or inexistent, further router method execution should be stopped and lead to response with HTTP **403** code (Forbidden error) and the corresponding error message.
The Refresh Token has different value and expiration time to the Access Token.
Regularly we configure the expiration time of Refresh Token longer than Access Token’s.

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
