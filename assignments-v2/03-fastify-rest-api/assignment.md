# Assignment: Fastify REST API

## Description

Your task is to create a REST API for a **Knowledge Hub** platform using the Fastify framework. The Knowledge Hub allows users to create, edit, and organize articles by categories and tags.

NB! You must create a new repository from the starter template for this task. Its name must be `nodejs2025Q2-knowledge-hub`, i.e. full link to the repository must be `https://github.com/%your-github-id%/nodejs2025Q2-knowledge-hub`.

**Create an application that operates with the following resources:**

- `User` (with attributes):
  ```typescript
  interface User {
    id: string; // uuid v4
    login: string;
    password: string;
    role: 'admin' | 'editor' | 'viewer';
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }
  ```

- `Article` (with attributes):
  ```typescript
  interface Article {
    id: string; // uuid v4
    title: string;
    content: string;
    status: 'draft' | 'published' | 'archived';
    authorId: string | null; // refers to User
    categoryId: string | null; // refers to Category
    tags: string[]; // array of tag names
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }
  ```

- `Category` (with attributes):
  ```typescript
  interface Category {
    id: string; // uuid v4
    name: string;
    description: string;
  }
  ```

- `Comment` (with attributes):
  ```typescript
  interface Comment {
    id: string; // uuid v4
    content: string;
    articleId: string; // refers to Article
    authorId: string | null; // refers to User
    createdAt: number; // timestamp of creation
  }
  ```

**Details:**

1. For `Users`, `Articles`, `Categories`, and `Comments`, REST endpoints with separate router paths should be created:

  * `Users` (`/user` route)
    * `GET /user` — get all users
      - Server should answer with `status code` **200** and all user records
    * `GET /user/:id` — get single user by id
      - Server should answer with `status code` **200** and the record with `id === userId` if it exists
      - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    * `POST /user` — create user
      `CreateUserDto`:
      ```typescript
      interface CreateUserDto {
        login: string;
        password: string;
        role?: 'admin' | 'editor' | 'viewer'; // defaults to 'viewer'
      }
      ```
      - Server should answer with `status code` **201** and newly created record if request is valid
      - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    * `PUT /user/:id` — update user's password
      `UpdatePasswordDto`:
      ```typescript
      interface UpdatePasswordDto {
        oldPassword: string;
        newPassword: string;
      }
      ```
      - Server should answer with `status code` **200** and updated record if request is valid
      - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
      - Server should answer with `status code` **403** and corresponding message if `oldPassword` is wrong
    * `DELETE /user/:id` — delete user
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

  * `Articles` (`/article` route)
    * `GET /article` — get all articles
      - Server should answer with `status code` **200** and all article records
      - Supports optional query parameters for filtering: `status`, `categoryId`, `tag` (e.g. `GET /article?status=published&tag=nodejs`)
    * `GET /article/:id` — get single article by id
      - Server should answer with `status code` **200** and the record with `id === articleId` if it exists
      - Server should answer with `status code` **400** and corresponding message if `articleId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === articleId` doesn't exist
    * `POST /article` — create new article
      - Server should answer with `status code` **201** and newly created record if request is valid
      - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields (`title`, `content`)
    * `PUT /article/:id` — update article info
      - Server should answer with `status code` **200** and updated record if request is valid
      - Server should answer with `status code` **400** and corresponding message if `articleId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === articleId` doesn't exist
    * `DELETE /article/:id` — delete article
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `articleId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === articleId` doesn't exist

  * `Categories` (`/category` route)
    * `GET /category` — get all categories
      - Server should answer with `status code` **200** and all category records
    * `GET /category/:id` — get single category by id
      - Server should answer with `status code` **200** and the record with `id === categoryId` if it exists
      - Server should answer with `status code` **400** and corresponding message if `categoryId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === categoryId` doesn't exist
    * `POST /category` — create new category
      - Server should answer with `status code` **201** and newly created record if request is valid
      - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields (`name`, `description`)
    * `PUT /category/:id` — update category info
      - Server should answer with `status code` **200** and updated record if request is valid
      - Server should answer with `status code` **400** and corresponding message if `categoryId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === categoryId` doesn't exist
    * `DELETE /category/:id` — delete category
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `categoryId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === categoryId` doesn't exist

  * `Comments` (`/comment` route)
    * `GET /comment?articleId={articleId}` — get all comments for an article
      - Server should answer with `status code` **200** and all comment records for the given article
      - `articleId` query parameter is **required**
    * `POST /comment` — create new comment
      - Body must contain `content` and `articleId` (both **required**)
      - Server should answer with `status code` **201** and newly created record if request is valid
      - Server should answer with `status code` **400** if required fields are missing
      - Server should answer with `status code` **422** if the referenced `articleId` doesn't exist
    * `DELETE /comment/:id` — delete comment
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `commentId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === commentId` doesn't exist

2. For now, these endpoints should operate only with **in-memory** (hardcoded) data. In the next tasks we will use a database for it. You should organize your modules with the consideration that the data source will be changed soon.

3. An `application/json` format should be used for request and response body.

4. Do not put everything in one file — use Fastify plugins to organize code by domain (user plugin, article plugin, category plugin, comment plugin). Each plugin should be registered with a proper prefix.

5. `User`'s password should be excluded from server response.

6. When you delete a `User`, their `authorId` in corresponding `Articles` should become `null`, and their `Comments` should be deleted. When you delete a `Category`, the `categoryId` in corresponding `Articles` should become `null`. When you delete an `Article`, its `Comments` should be deleted.

7. All request bodies should be validated using **Fastify JSON Schema validation** (the `schema` property on route options).

8. Use **Fastify hooks** (`onRequest`, `preHandler`, etc.) for cross-cutting concerns such as request logging.

9. Integrate `@fastify/swagger` and `@fastify/swagger-ui` to provide OpenAPI documentation accessible at `/doc`.

10. To run the service, `npm start` command should be used.

11. Service should listen on PORT `4000` by default, PORT value is stored in `.env` file.

12. Incoming requests should be validated.

**Hints:**

* To generate all entities `id`s use [Node.js randomUUID](https://nodejs.org/dist/latest-v24.x/docs/api/crypto.html#cryptorandomuuidoptions).
* Use [Fastify plugins](https://fastify.dev/docs/latest/Reference/Plugins/) to modularize your application.
* Use [Fastify schema validation](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/) for request/response validation.
