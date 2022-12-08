# Assignment: Websocket Remote Control

## Description

Your task is to implement remote control backend using `nutjs.dev` library and websocket.

User interface for your remote control backend is [here](https://github.com/rolling-scopes-school/remote-control)

The backend should be able to do the following:

- Start websocket server
- Handle websocket connection
- Move mouse (Up, Down, Left, Right)
- Draw circle, rectangle and square  
- Send current mouse coordinates
- Send desktop capture (optionally)

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Use 18 LTS version of Node.js
- Only [ws](https://www.npmjs.com/package/ws), [nutjs.dev](https://www.npmjs.com/package/@nut-tree/nut-js), `cross-env`, `typescript`, `ts-node`, `ts-node-dev`, `nodemon`, `dotenv`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `@types/*` and testing tools (for example, Jest, Mocha, AVA, Jasmine, Cypress, Storybook, Puppeteer) are allowed
- The program is started by npm script `start` in following way:
```bash
npm run start 
```
- After starting the program displays websocket parameters
- After program work finished the program should end websocket work correctly  
- After each received command program should display the command and result

List of websocket commands and their syntax (<- - cmd from frontend, -> - answer):
- Navigation over the x and y axis
    - Move mouse up
    ```bash
    <- mouse_up {y px}
    ```
    - Move mouse down
    ```bash
    <- mouse_down {y px}
    ```
    - Move mouse left
    ```bash
    <- mouse_left {x px}
    ```
    - Move mouse right
    ```bash
    <- mouse_right {x px}
    ```
    - Send mouse coordinates
    ```bash
    <- mouse_position
    -> mouse_position {x px},{y px}
    ```
- Drawing
    - Draw circle with pushed left button: 
    ```bash
    <- draw_circle {px}
    ```
    - Draw rectangle with pushed left button: 
    ```bash
    <- draw_rectangle {px} {px}
    ```
    - Draw square with pushed left button: 
    ```bash
    <- draw_square {px}
    ```
- Print screen
    - Make print screen command and send image (a base64 buffer of the 200 px square around the mouse position):
    ```bash
    <- prnt_scrn
    -> prnt_scrn {base64 string (png buf)}
    ```
    
