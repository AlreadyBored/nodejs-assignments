# Assignment: Websocket battleship server

## Description

Your task is to implement battleship game backend using websocket.

Player interface for your battleship backend is [here](https://github.com/rolling-scopes-school/websockets-ui). You should clone or copy this repository and write the code there.

The backend should be able to do the following:
- Start websocket server
- Handle websocket connection
- Handle player requests
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

## The backend should have 3 types of response:
1. personal response
    - reg - player registration/login
2. response for the game room
    - create_game - game id and enemy id
    - start_game - informationa about game and player's ships positions    
    - turn - who is shooting now
    - attack - coordinates of shot and status
    - finish - id of the winner
3. response for all
    - update_room - list of rooms and players in rooms
    - update_winners - send score table to players

## Game description
1. We should have inmemory DB with player data (login and password) storage
2. Player can create game room or connect to the game room after login
3. Player room data (players, game board, ships positions) storages in the server
3. Game starts after 2 players are connected to the room and sent ships positions to the server
4. Server sends move order
5. Players should shoot in their's turn
6. Server send back shot result
7. If player hits or kills the ship, player should make one more shoot
8. Player wins if he have killed all enemies ships

## List of websocket commands (requests/responses) and their syntax (<- - cmd from frontend, -> - answer):
###  - data value should be a **json string**
###  - id should be always 0
- Player
    - Login or create player\
        ```<-```
        ```ts
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
        ```->```
        ```ts
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
    - Update winners (for all after every winners table update)\
        ```->```
        ```ts
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
    - Create new room (create game room and add yourself there)\
        ```<-```
        ```ts
        {
            type: "create_room",
            data: "",
            id: 0,
        }
        ```
    - Add user to room (add youself to somebodys room, then remove room from rooms list)\
        ```<-```
        ```ts
        {
            type: "add_user_to_room",
            data:
                {
                    indexRoom: <number>,
                },
            id: 0,
        }
        ```
        ```->```
        ```ts
        {
            type: "create_game", //send for both players in the room
            data:
                {
                    idGame: <number>,  
                    idPlayer: <number>, \* player id in the game *\
                },
            id: 0,
        }
        ```
    - Update room state (send rooms list, where only one player inside)\
        ```->```
        ```ts
        {
            type: "update_room",
            data:
                [
                    {
                        roomId: <number>,
                        roomUsers:
                            [
                                {
                                    name: <string>,
                                    index: <number>,
                                }
                            ],
                    },
                ],
            id: 0,
        }
        ```
- Ships
    - Add ships to the game board\
        ```<-```
        ```ts
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
                    indexPlayer: <number>, /* id of the player in the current game */
                },
            id: 0,
        }
        ```        
    - Start game (only after server receives both player's ships positions)\        
        ```->```
        ```ts
        {
            type: "start_game",
            data:
                {
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
                    currentPlayerIndex: <number>, /* id of the player in the current game who have sent his ships */
                },
            id: 0,
        }
        ```  
- Game
    - Attack\
        ```<-```
        ```ts
        {
            type: "attack",
            data:
                {
                    gameId: <number>,
                    x: <number>,
                    y: <number>,
                    indexPlayer: <number>, /* id of the player in the current game */
                },
            id: 0,
        }
        ```
    - Attack feedback (should be sent after every shot, miss and after kill sent miss for all cells around ship too)\    
        ```->```
        ```ts
        {
            type: "attack";,
            data:
                {
                    position:
                    {
                        x: <number>,
                        y: <number>,
                    },
                    currentPlayer: <number>, /* id of the player in the current game */
                    status: "miss"|"killed"|"shot",
                },
            id: 0,
        }
        ```
    - Random attack\
        ```<-```
        ```ts
        {
            type: "randomAttack",
            data:
                {
                    gameId: <number>,
                    indexPlayer: <number>, /* id of the player in the current game */
                },
            id: 0,
        }
        ```
    - Info about player's turn (send after game start and every attack, miss or kill result)\
        ```->```
        ```ts
        {
            type: "turn",
            data:
                {
                    currentPlayer: <number>,
                },
            id: 0,
        }
        ```
    - Finish game\
        ```->```
        ```ts
        {
            type: "finish",
            data:
                {
                    winPlayer: <number>,
                },
            id: 0,
        }
        ```

## Websocket commands sequence
```
  Player1               Server                  Player2             
    reg         -->                    
                <--        reg     
                <--    update_room    
                <--   update_winners  
 create_room    -->
                <--    update_room    
                                      <--         reg
                           reg        -->
                <--    update_room    -->
                <--   update_winners  -->                       
                                      <--    add_user_to_room
                <--    update_room    -->
                <--    create_game    -->
   add_ships    -->
                                      <--       add_ships
                <--     start_game    -->  
                <--        turn       -->  
 attack (miss)  -->
                <--       attack      -->  
                <--        turn       -->
                                      <--     randomAttack (shoot)
                <--       attack      -->  
                <--        turn       -->
                                      <--     randomAttack (kill) - send state for all cells around killed ship
                <--       attack      -->  
                <--        turn       -->
                <--       attack      -->  
                <--        turn       -->                
                <--       attack      -->  
                <--        turn       -->
                <--       attack      -->  
                <--        turn       -->
                           ...          
                                      <--     randomAttack (miss)
                <--       attack      -->  
                <--        turn       -->    
 attack (miss)  -->
                <--       attack      -->  
                <--        turn       -->
                           ...                            
                <--      finish       -->
                <--   update_winners  -->
```