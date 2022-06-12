# Assignment: REST Service

## Description

Let's try to create a Home Library Service! `User` can create, read, update, delete data about `Books`, `Movies`, `Tracks` and `Albums`, add them to `Favourites` in their own Home Library!

NB! You must create new repository from [template](https://github.com/rolling-scopes-school/nodejs-course-template/generate) for this task. Its name must be nodejs2022Q2-service i.e. full link to the repository must be https://github.com/%your-gihub-id%/nodejs2022Q2-service.

**Create an application, the application should operate with the following resources:**

- `User` (with attributes):
  ```javascript
  {  
    id,
    login,
    password,
    version,
    createdAt,
    updatedAt 
  }
  ```

- `CreateUserDto` (with attributes): 
  ```javascript
  {  
    login, 
    password 
  }
  ```
  
- `Track` (with attributes):
  ```javascript
  { 
    id, 
    name, 
    singer, 
    album, 
    duration
  }
  ```

- `Album` (with attributes):
  ```javascript
  { 
    id, 
    name, 
    singer, 
    songs, 
    year
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

1. For `Login`, `Users`, `Albums`, `Tracks`, `Movies` , `Books` and `Favourites` REST endpoints with separate router paths should be created
  * `Users` (`/user` route)
    * `GET /user` - get all users
    * `GET /user/:id` - get single user by id
    * `POST /user` - create user
    * `PUT /user` - update user's info
    * `DELETE /user/:id` - delete user
  
  * `Tracks` (`/track` route)
    * `GET /track` - get all tracks
    * `GET /track/:id` - get single track by id
    * `POST /track` - create new track
    * `PUT /track/:id` - update track info
    * `DELETE /track/:id` - delete track

  * `Albums` (`/album` route)
    * `GET /album` - get all albums
    * `GET /album/:id` - get single album by id
    * `POST /album` - create new album
    * `PUT /album/:id` - update album info
    * `DELETE /album/:id` - delete album
    * `POST /album/:id/track/:trackId` - add track to the album
    * `DELETE /album/:id/track/:trackId` - delete track from the album

  * `Movies` (`/movie` route)
    * `GET /movie` - get all movies
    * `GET /movie/:id` - get single movie by id
    * `POST /movie` - create new movie
    * `PUT /movie/:id` - update movie info
    * `DELETE /movie/:id` - delete movie by id

  * `Books` (`/book` route)
    * `GET /book` - get all books
    * `GET /book/:id` - get single book by id
    * `POST /book` - create new book
    * `PUT /book/:id` - update book info
    * `DELETE /book/:id` - delete book

  * `Favourites`
    * `GET /favs` - get all favourites
    * `POST /favs/track/:id` - add track to the favourites
    * `DELETE /favs/track/:id` - delete track from favourites
    * `POST /favs/movie/:id` - add movie to the favourites
    * `DELETE /favs/movie/:id` - delete movie from favourites
    * `POST /favs/book/:id` - add book to the favourites
    * `DELETE /favs/book/:id` - delete book from favourites

2. For now, these endpoints should operate only with **in-memory** (hardcoded) data, in the next tasks we will use a DB for it. You may organize your modules with the consideration that the data source will be changed soon.

3. An `application/json` format should be used for request and response body.

4. Do not put everything in one file - use a separate file for application creation (bootstrapping), for controllers (routers) and code related to business logic. Also split files to different modules depends on a domain (user-related, board-related, etc...).

5. To run the service `npm start` command should be used.

6. Service should listen on PORT `4000`.

**Hints**

* To generate all entities `id`s use [uuid](https://www.npmjs.com/package/uuid) package or [Node.js analogue](https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html#cryptorandomuuidoptions).
