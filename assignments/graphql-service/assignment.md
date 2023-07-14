## Assignment: Graphql

## Source repository
Fork [this repository](https://github.com/nosbog/rsschool-nodejs-task-graphql) to start the task.  

### Tasks:
1. Add logic to the graphql endpoint: ./src/routes/graphql.  
Constraints and logic for gql queries should be done based on restful implementation.  
   1.1. npm run test-queries  
   1.2. npm run test-mutations    
2. Limit the complexity of the graphql queries by their depth with [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) package.  
   Use value "5" for package.  
   2.1. npm run test-rule  
3. Solve `n+1` graphql problem with [dataloader](https://www.npmjs.com/package/dataloader).  
   You can use only one "findMany" call per loader to consider this task completed.  
   3.1. npm run test-loader  
   3.2. npm run test-loader-prime  
   Further optimizations to successfully pass the tests.  
   You can use [graphql-parse-resolve-info](https://github.com/graphile/graphile-engine/tree/master/packages/graphql-parse-resolve-info) package to parse GraphQLResolveInfo.  


### Info:  
It is forbidden to add new npm dependencies.  
You should only modify/add the code inside the folder ./src/routes/graphql.  
You are responsible for using style configs that are in the repository.  
Make sure the important files have not been changed: npm run test-integrity.  
If the test was partially completed, then it is considered not completed.  
If the one test was not completed, then the subsequent ones are considered not completed.  
You are free to use schema-first or stick to the [default code-first](https://github.dev/graphql/graphql-js/blob/ffa18e9de0ae630d7e5f264f72c94d497c70016b/src/__tests__/starWarsSchema.ts).  

Steps to get started:
1. Install dependencies: npm ci
2. Create .env file (based on .env.example): ./.env
3. Create db file: ./prisma/database.db
4. Apply pending migrations: npx prisma migrate deploy
5. Seed db: npx prisma db seed
6. Start server: npm run start

Useful things:
- Database GUI: npx prisma studio
- Tests modify the db, so if it seems to you that the db has become too large,
  you can clear it: npx prisma migrate reset (also triggers seeding)
- Swagger: /docs