# Assignment: Websocket battleship server

## Description

Your task is to implement battleship game backend websocket.

User interface for your remote control backend is [here](https://github.com/rolling-scopes-school/battleship). You should clone or copy this repository and write the code there.

The backend should be able to do the following:

- Start websocket server
- Handle websocket connection
- Handle user requests
- Handle room requests  
- Handle ships requests
- Handle game requests
- Create single play bot (optional)

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Use 18 LTS version of Node.js
- Only [ws](https://www.npmjs.com/package/ws), `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `nodemon`, `dotenv`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `@types/*` and testing tools (for example, Jest, Mocha, AVA, Jasmine, Cypress, Storybook, Puppeteer) are allowed
- The program is started by npm script `start` in following way:
- All requests and responses must be sent as JSON string
```bash
npm run start 
```
- After starting the program displays websocket parameters
- After program work finished the program should end websocket work correctly  
- After each received command program should display the command and result

List of websocket commands (requests/responses) and their syntax (<- - cmd from frontend, -> - answer):
- User
    - Login or create user
    <-
    ```json
    {
	    type: "reg",
	    data: 
		    { 
			    name: <string>,
			    password: <string>,
		    },
        id: 0,
    }
    ```
    ->
    ```json
    {
	    type: "reg",
	    data: 
		    {
			    name: <string>, 
                index: <number>,
			    error: <bool>,
                errorText: <string>,
		    },
	    id: 0,
    }
    ```
    - Update winners
    ->
    ```json
    {
	    type: "update_winners",
	    data: 
		    [
                {
                    name: <string>, 
                    wins: <number>,
                }
            ],
	    id: 0,
    }
    ```    
- Room
    - Create new room
    <-
    ```json
    {
        type: "create_room",
        data: "",
        id: 0,
    }
    ```
    - Add user to room
    <-
    ```json
    {
        type: "add_user_to_room",
        data: 
            {
                indexRoom: <number>,
            },
        id: 0,
    }
    ```  
    ->
    ```json
    {
        type: "create_game",
        data:
            {
                idGame: <number>,
                idPlayer: <number>,
            },
        id: 0,
    }
    ```
    - Update room state
    ->
    ```json
    {
        type: "update_room",
        data:
            {
                [
                    {
                        roomId: <number>,
                        roomUsers: 
                            {
                                name: <string>,
                                index: <number>,
                            },
                    },
                ]
            },
        id: 0,
    }
    ```
    - Change user's turn
    ->
    ```json
    {
        type: "turn",
        data:
            {
                currentPlayer: <number>,
            },
        id: 0,
    }
    ```
    - Finish game
    ->
    ```json
    {
        type: "finish",
        data:
            {
                winPlayer: <number>,
            },
        id: 0,
    }
     ```  
- Ships
    - Add ships to the game board
    <-
    ```json
    {
        type: "add_ships",
        data: 
            {
                gameId: <number>, 
                ships: 
                    [
                        {
                            position: {
                                x: <number>,
                                y: <number>,
                            },
                            direction: <boolean>,
                            length: <number>,
                            type: "small"|"medium"|"large"|"huge",
                        }
                    ], 
                indexPlayer: <number>,
            },
        id: 0,
    }
    ```
- Game
    - Attack    
    <-
    ```json
    {
        type: "attack",
        data: 
            { 
                gameID: <number>, 
                x: <number>, 
                y: <number>, 
                indexPlayer: <number>,
            },
         id: 0,
    }
    ```
    ->
    ```json
    {
        type: "attack";,
        data: 
            {
                position: 
                {
                    x: <number>,
                    y: <number>,
                },
                currentPlayer: <number>,
                status: "miss"|"killed"|"shot",
            },
        id: 0,
    }
    ```
    - Random attack    
    <-
    ```json
    {
        type: "randomAttack",
        data: 
            { 
                gameID: <number>, 
                indexPlayer: <number>,
            },
        id: 0,
    }
    ```