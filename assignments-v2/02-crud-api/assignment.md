# Assignment: CRUD API

## Description

Your task is to implement a simple CRUD API for a **Product Catalog** using an in-memory database underneath. You must use **only the built-in Node.js `http` module** — no frameworks are allowed.

## Technical requirements

- Task can be implemented in JavaScript or TypeScript
- Only `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `tsx`, linter and its plugins, bundler and its plugins and loaders, formatter and its plugins, `uuid`, `@types/*` as well as libraries used for testing are allowed
- Use 24.x.x version (24.10.0 or upper) of Node.js
- Prefer asynchronous API whenever possible

## Implementation details

1. Implemented endpoint `api/products`:
    - **GET** `api/products` is used to get all products
        - Server should answer with `status code` **200** and all product records
    - **GET** `api/products/{productId}`
        - Server should answer with `status code` **200** and the record with `id === productId` if it exists
        - Server should answer with `status code` **400** and corresponding message if `productId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === productId` doesn't exist
    - **POST** `api/products` is used to create a record about a new product and store it in the database
        - Server should answer with `status code` **201** and newly created record
        - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields or if `price` is not a positive number
    - **PUT** `api/products/{productId}` is used to update an existing product
        - Server should answer with `status code` **200** and the updated record
        - Server should answer with `status code` **400** and corresponding message if `productId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === productId` doesn't exist
    - **DELETE** `api/products/{productId}` is used to delete an existing product from the database
        - Server should answer with `status code` **204** if the record is found and deleted
        - Server should answer with `status code` **400** and corresponding message if `productId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === productId` doesn't exist

2. Products are stored as `objects` that have the following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on the server side
    - `name` — product name (`string`, **required**)
    - `description` — product description (`string`, **required**)
    - `price` — product price (`number`, **required**, must be > 0)
    - `category` — product category (`string`, **required**, e.g. `"electronics"`, `"books"`, `"clothing"`)
    - `inStock` — whether the product is in stock (`boolean`, **required**)

3. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) should be handled (server should answer with `status code` **404** and corresponding human-friendly message)

4. Errors on the server side that occur during the processing of a request should be handled and processed correctly (server should answer with `status code` **500** and corresponding human-friendly message)

5. Value of `port` on which the application is running should be stored in `.env` file

- **Important:** The `.env` file itself should not be committed to the repository as it is considered a security bad practice. Please consider adding the `.env` file to `.gitignore`.

    - Instead, create and commit an `.env.example` file that contains a list of required environment variables with reasonable default values
    - Example of `.env.example` contents:

      ```
      PORT=4000
      ```

6. There should be 2 modes of running the application (**development** and **production**):
    - The application is run in development mode using `nodemon` or `ts-node-dev` (there is an `npm` script `start:dev`)
    - The application is run in production mode (there is an `npm` script `start:prod` that starts the build process and then runs the bundled file)

7. There could be some tests for the API (not less than **3** scenarios). Example of a test scenario:
    1. Get all records with a `GET` `api/products` request (an empty array is expected)
    2. A new object is created by a `POST` `api/products` request (a response containing the newly created record is expected)
    3. With a `GET` `api/products/{productId}` request, we try to get the created record by its `id` (the created record is expected)
    4. We try to update the created record with a `PUT` `api/products/{productId}` request (a response is expected containing an updated object with the same `id`)
    5. With a `DELETE` `api/products/{productId}` request, we delete the created object by `id` (confirmation of successful deletion is expected)
    6. With a `GET` `api/products/{productId}` request, we are trying to get the deleted object by `id` (expected answer is that there is no such object)

8. There could be implemented horizontal scaling for the application. There should be an `npm` script `start:multi` that starts multiple instances of your application using the Node.js `Cluster` API (equal to the number of available parallelism - 1 on the host machine, each listening on port PORT + n) with a **load balancer** that distributes requests across them (using Round-robin algorithm). For example: available parallelism is 4, `PORT` is 4000. On run `npm run start:multi` it works the following way:

- On `localhost:4000/api` the load balancer is listening for requests
- On `localhost:4001/api`, `localhost:4002/api`, `localhost:4003/api` workers are listening for requests from the load balancer
- When user sends a request to `localhost:4000/api`, the load balancer sends this request to `localhost:4001/api`, the next user request is sent to `localhost:4002/api` and so on
- After sending a request to `localhost:4003/api`, the load balancer starts from the first worker again (sends request to `localhost:4001/api`)
- State of the db should be consistent between different workers, for example:
    1. First `POST` request addressed to `localhost:4001/api` creates a product
    2. Second `GET` request addressed to `localhost:4002/api` should return the created product
    3. Third `DELETE` request addressed to `localhost:4003/api` deletes the created product
    4. Fourth `GET` request addressed to `localhost:4001/api` should return **404** status code for the created product

## Hints

- To generate all entities `id`s use [Node.js randomUUID](https://nodejs.org/dist/latest-v24.x/docs/api/crypto.html#cryptorandomuuidoptions)
