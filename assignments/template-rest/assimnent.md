# Assignment: REST Service

## Description

Let's try to create a Home Library Service!

NB! You must create new repository from template for this task. Its name must be nodejs2022Q1-service i.e. full link to the repository must be https://github.com/%your-gihub-id%/nodejs2022Q1-service.

**Create an application, the application should operate with the following resources:**

- `User` (with attributes):
  ```javascript
  {  id, login, password, version, createdAt, updtedAt }
  ```
- `CreateUserDto` (with attriutes): 
  ```javascript
  {  login, password }
  ```
- `UpdatePasswordDto` (with attriutes): 
  ```javascript
  {  id, oldPassword, password }
  ```
- `CredentialsDto` (with attriutes): 
  ```javascript
  {  username, password }
  ```
- `AuthTokenResponse` (with attriutes): 
  ```javascript
  {  token }
  ```
- `Track` (with attriutes):
  ```javascript
  { id, 
    name, 
    singer, 
    albums, 
    duration, 
    version, 
    createdAt, 
    updtedAt 
  }
  ```

**Details:**

1. For `Users` and `Track` REST endpoints with separate router paths should be created
    * `Users` (`/users` route)
      * `GET /users` - get all users
      * `POST /users` - create user
      * `PUT /users` - update user's password
      * `DELETE /users/:id` - delete user
    * `Login` (`/login` route)
      * `POST /login` - logins a user and returns a JWT-token
    * `Track` (`/tracks` route)
      * `GET /tracks` - get all tracks
      * `POST /tracks` - create new track
      * `PUT /tracks/:id` - update track info
      * `DELETE /tracks/:id` - delete track

2. For now, these endpoints should operate only with **in-memory** (hardcoded) data, in the next tasks we will use a DB for it. You may organize your modules with the consideration that the data source will be changed soon.

3. An `application/json` format should be used for request and response body.

4. Do not put everything in one file - use a separate file for application creation (bootstrapping), for controllers (routers) and code related to business logic. Also split files to different modules depends on a domain (user-related, board-related, etc...).

5. To run the service `npm start` command should be used.

6. Service should listen on PORT `4000`.

7. You can try to refactor template using framework that differs from Express.js and Nest.js

**Hints**

* To generate all entities `id`s use [uuid](https://www.npmjs.com/package/uuid) package or [Node.js analogue](https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html#cryptorandomuuidoptions).
