# Scoring: Websocket battleship server

## Basic Scope

- Websocket
    - **+6** Implemented workable websocket server
    - **+6** Handle websocket clients connection/disconnection properly
    - **+10** Websocket server message handler implemented properly
    - **+10** Websocket server message sender implemented properly
- User
    - **+5** Create user with password in temprorary database
    - **+5** User validation
- Room
    - **+6** Create game room
    - **+6** Add user to game room
    - **+6** Start game
    - **+6** Finish game
    - **+8** Update room's game state
    - **+4** Update player's turn   
    - **+8** Update players winner table
- Ships
    - **+10** Locate ship to the game board
- Game
    - **+8** Attack
    - **+4** Random attack

## Advanced Scope
- **+30** Task implemented on Typescript 
- **+20** Codebase is separated (at least 4 modules)
- **+30** Make bot for single play (optionally) 

## Forfeits

- **-95% of total task score** any external tools except `ws`, `cross-env`, `dotenv`, `tsx`, `typescript`, `ts-node`, `ts-node-dev`, `nodemon`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `@types/*` and testing tools (for example, Jest, Mocha, AVA, Jasmine, Cypress, Storybook, Puppeteer)
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-10** Missing PR or its description is incorrect
- **-10** No separate development branch
- **-10** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
