## Assignment: Graphql

## Source repository
Fork [this repository](https://github.com/nosbog/rsschool-nodejs-task-graphql) to start the task.  

### Tasks:  

1. Add logic to the graphql endpoint: ./src/routes/graphql.  
   Constraints and logic for gql queries should be done based on restful implementation.  
   As a result, you should get a gql schema like [this](https://github.com/nosbog/rsschool-nodejs-task-graphql/blob/main/schema.graphql).  
   1.1. npm run test-queries  
   1.2. npm run test-mutations  
2. Limit the complexity of the graphql queries by their depth with [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) package.  
   Use value "5" for the package.  
   2.1. npm run test-rule  
3. Solve `n+1` graphql problem with [dataloader](https://www.npmjs.com/package/dataloader).  
   You can use only one "findMany" call per loader to consider this task completed.  
   3.1. npm run test-loader  
   3.2. npm run test-loader-prime  
   When you query all users, you don't have to use the database again when you want to find subs.  
   Pre-place users in the appropriate dataloader cache.  
   To determine if a user is a sub you need to do the appropriate join ([include](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#include)).  
   But only do a join when you need it. You can use [graphql-parse-resolve-info](https://github.com/graphile/graphile-engine/tree/master/packages/graphql-parse-resolve-info) package to parse GraphQLResolveInfo to determine if subs are expected in the response.  

### Info:  

It is forbidden to add new npm dependencies.  
You should only modify/add the code inside the folder ./src/routes/graphql.  
You should use [code-first](https://github.dev/graphql/graphql-js/blob/ffa18e9de0ae630d7e5f264f72c94d497c70016b/src/__tests__/starWarsSchema.ts) approach to create a gql server.  
Do not create files with the name "index.ts". This name is reserved for fastify plugins.  
You are responsible for using style configs that are in the repository.  
Make sure the important files have not been changed: npm run test-integrity.  
If the test was partially completed, then it is considered not completed.  
If the one test was not completed, then the subsequent ones are considered not completed.  

Steps to get started:  

1. Install dependencies: npm ci  
2. Create .env file (based on .env.example): ./.env  
3. Create db file: ./prisma/database.db  
4. Apply pending migrations: npx prisma migrate deploy  
5. Seed db: npx prisma db seed  
6. Start server: npm run start  

Useful things:  

- Database GUI: npx prisma studio  
- Reset database: npx prisma migrate reset (this command triggers db seeding)  
- To test an existing rest api (swagger): [::1]:8000/docs  
- For ease of test of graphql you can use [api platform](https://learning.postman.com/docs/sending-requests/graphql/graphql-overview/) that can fetch [introspection](https://graphql.org/learn/introspection/)  
