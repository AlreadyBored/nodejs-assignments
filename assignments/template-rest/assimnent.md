# Assignment: REST Service

## Description

Let's try to create a Home Library Service!

NB! You must create new repository from [template](https://github.com/rolling-scopes-school/nodejs-course-template/generate) for this task. Its name must be nodejs2022Q2-service i.e. full link to the repository must be https://github.com/%your-gihub-id%/nodejs2022Q2-service.

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
- `Movie` (with attributes):
  ```javascript
  {
    id,
    name,
    genre,
    duration,
    year
  }
  ```

  - `Book` (with attributes):
  ```javascript
  {
    id,
    name,
    author,
    genre,
    year
  }
  ```

- `Favourites` (with attributes):
  ```javascript
  {
    movies,
    tracks,
    books
  }
  ```


**Details:**

1. For `Login`, `Users`, `Albums`, `Tracks`, `Movies` , `Books` and `Favorites` REST endpoints with separate router paths should be created
    * `Login` (`/login` route)
      * `POST /login` - logins a user and returns a JWT-token

    * `Users` (`/users` route)
      * `GET /users` - get all users
      * `GET /users/:id` - get user by id
      * `POST /users` - create user
      * `PUT /users` - update user's password
      * `DELETE /users/:id` - delete user
    
    * `Tracks` (`/tracks` route)
      * `GET /tracks` - get all tracks
      * `POST /tracks` - create new track
      * `GET /tracks/:id` - get track by id
      * `PUT /tracks/:id` - update track info
      * `DELETE /tracks/:id` - delete track

    * `Albums` (`/albums` route)
      * `GET /albums` - get album list
      * `POST /albums` - create new movie
      * `GET /albums/:id` - get album by id
      * `PUT /albums/:id` - update movie info
      * `DELETE /albums/:id` - delete album
      * `POST /albums/:id/track/:trackId` - add track to the album
      * `DELETE /albums/:id/track/:trackId` - delete track from the album

    * `Movie` (`/movie` route)
      * `GET /movie` - get movie list
      * `POST /movie` - create new movie
      * `GET /movie/:id` - get movie by id
      * `PUT /movie/:id` - update movie info
      * `DELETE /movie/:id` - delete movie by id

    * `Book` (`/book` route)
      * `GET /book` - get book list
      * `POST /book` - create new book
      * `GET /book/:id` - get book by id
      * `PUT /book/:id` - update book info
      * `DELETE /book/:id` - delete book

    * `Favorites`
      * `GET /favs` - get all favorities
      * `POST /tracks/:id/favs` - add track to the favourites
      * `DELETE /tracks/:id/favs` - delete track from favourites
      * `POST /movie/:id/favs` - add movie to the favourites
      * `DELETE /movie/:id/favs` - delete movie from favourites
      * `POST /book/:id/favs` - add book to the favourites
      * `DELETE /book/:id/favs` - delete book from favourites

2. For now, these endpoints should operate only with **in-memory** (hardcoded) data, in the next tasks we will use a DB for it. You may organize your modules with the consideration that the data source will be changed soon.

3. An `application/json` format should be used for request and response body.

4. Do not put everything in one file - use a separate file for application creation (bootstrapping), for controllers (routers) and code related to business logic. Also split files to different modules depends on a domain (user-related, board-related, etc...).

5. To run the service `npm start` command should be used.

6. Service should listen on PORT `4000`.


**Hints**

* To generate all entities `id`s use [uuid](https://www.npmjs.com/package/uuid) package or [Node.js analogue](https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html#cryptorandomuuidoptions).
