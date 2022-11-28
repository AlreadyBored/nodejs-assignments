# Scoring: Websocket remote control

## Basic Scope

- Websocket
    - **+6** Implemented workable websocket server
    - **+10** Websocket server message handler implemented properly
    - **+10** Websocket server message sender implemented properly
- Navigation
    - **+4** Move mouse up implemented properly
    - **+4** Move mouse down implemented properly
    - **+4** Move mouse left implemented properly
    - **+4** Move mouse right implemented properly
    - **+4** Send mouse coordinates implemented properly
- Drawing
    - **+6** Draw circle implemented properly
    - **+6** Draw rectangle implemented properly
    - **+6** Draw square implemented properly
- Screen image
    - **+30** Send screen image implemented properly (optionally)

## Advanced Scope

- **+30** Task implemented on Typescript 
- **+20** All data transfer operations with send/get should be performed using Streams API
- **+20** Codebase is separated (at least 4 modules)

## Forfeits

- **-95% of total task score** any external tools except `ws`, `nutjs.dev`, `cross-env`, `dotenv`, `typescript`, `ts-node`, `ts-node-dev`, `nodemon`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `@types/*` and testing tools (for example, Jest, Mocha, AVA, Jasmine, Cypress, Storybook, Puppeteer)
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-10** Missing PR or its description is incorrect
- **-10** No separate development branch
- **-10** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
