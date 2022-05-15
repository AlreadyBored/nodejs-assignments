# Scoring: Websocket remote control

## Basic Scope

- Websocket
    - **+10** Implemented workable websocket server
    - **+10** Websocket server message handler implemented properly
    - **+10** Websocket server message sender implemented properly
- Navigation
    - **+6** Move mouse up implemented properly
    - **+6** Move mouse down implemented properly
    - **+6** Move mouse left implemented properly
    - **+6** Move mouse right implemented properly
    - **+6** Send mouse coordinates implemented properly
- Drawing
    - **+10** Draw circle implemented properly
    - **+10** Draw rectangle implemented properly
    - **+10** Draw square implemented properly
- Screen image
    - **+10** Send screen image implemented properly

## Advanced Scope

- **+30** Task implemented on Typescript 
- **+30** All data transfer operations with send/get should be performed using Streams API
- **+20** Codebase is separated (at least 4 modules)

## Forfeits

- **-95% of total task score** any external tools except `ws`, `robotjs`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `@types/*`
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)