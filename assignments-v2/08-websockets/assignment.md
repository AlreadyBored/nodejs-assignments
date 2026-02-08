# Assignment: WebSocket — Live Quiz Game

## Description

Your task is to implement a backend for a real-time **Live Quiz Game** using WebSocket. A host creates a quiz with questions, players join the game and answer questions in real time.

## Technical requirements

- Task can be implemented in JavaScript or TypeScript
- Use 24.x.x version (24.10.0 or upper) of Node.js
- Only [ws](https://www.npmjs.com/package/ws), `cross-env`, `typescript`, `tsx`, `ts-node`, `ts-node-dev`, `nodemon`, `dotenv`, linter and formatter and their plugins, bundler and its plugins, `@types/*` and testing tools are allowed
- The program is started by npm script `start`:
  ```bash
  npm run start
  ```
- After starting, the program displays the WebSocket server address and port
- All requests and responses must be sent as JSON strings

## Game Flow

1. Players and hosts **register** or **login** with a name and password
2. A host **creates a game** by submitting a list of questions (each with 4 answer options, a correct answer index, and a time limit)
3. The server generates a **6-character room code** for the game
4. Players **join the game** using the room code
5. The host **starts the game** — the first question is broadcast to all players
6. Players **submit answers** within the time limit
7. When the timer expires (or all players have answered), the server broadcasts the **correct answer** and **updated scores**
8. The **next question** is sent, and the process repeats
9. After the last question, the server broadcasts the **final scoreboard** with ranks

## Scoring Rules

- Correct answer: `basePoints * (timeRemaining / timeLimit)` — faster answers earn more points (maximum 1000 points per question)
- Wrong answer or no answer: 0 points
- `basePoints` = 1000

## Data Structures (in-memory)

```typescript
interface Player {
  name: string;
  index: number | string; // unique player id
  score: number;
}

interface Question {
  text: string;
  options: string[];       // exactly 4 options
  correctIndex: number;    // index of the correct option (0-3)
  timeLimitSec: number;    // time limit for the question in seconds
}

interface Game {
  id: string;
  code: string;            // 6-character alphanumeric code
  hostId: number | string;
  questions: Question[];
  players: Player[];
  currentQuestion: number; // index of current question (-1 before start)
  status: 'waiting' | 'in_progress' | 'finished';
}
```

## WebSocket Commands

### Note: `data` value should be a **JSON string**, `id` should always be `0`

### Player Commands

- **Register / Login**

  `<-` (from client)
  ```json
  {
    "type": "reg",
    "data": {
      "name": "<string>",
      "password": "<string>"
    },
    "id": 0
  }
  ```
  `->` (from server, personal response)
  ```json
  {
    "type": "reg",
    "data": {
      "name": "<string>",
      "index": "<number | string>",
      "error": false,
      "errorText": ""
    },
    "id": 0
  }
  ```

### Game Management Commands

- **Create Game** (host sends questions)

  `<-`
  ```json
  {
    "type": "create_game",
    "data": {
      "questions": [
        {
          "text": "<string>",
          "options": ["<string>", "<string>", "<string>", "<string>"],
          "correctIndex": "<number>",
          "timeLimitSec": "<number>"
        }
      ]
    },
    "id": 0
  }
  ```
  `->` (personal response to host)
  ```json
  {
    "type": "game_created",
    "data": {
      "gameId": "<string>",
      "code": "<string>"
    },
    "id": 0
  }
  ```

- **Join Game** (player joins by code)

  `<-`
  ```json
  {
    "type": "join_game",
    "data": {
      "code": "<string>"
    },
    "id": 0
  }
  ```
  `->` (personal response to joining player)
  ```json
  {
    "type": "game_joined",
    "data": {
      "gameId": "<string>"
    },
    "id": 0
  }
  ```
  `->` (broadcast to all players in the game)
  ```json
  {
    "type": "player_joined",
    "data": {
      "playerName": "<string>",
      "playerCount": "<number>"
    },
    "id": 0
  }
  ```

- **Update Players** (broadcast when player list changes)

  `->` (broadcast to all in game)
  ```json
  {
    "type": "update_players",
    "data": [
      {
        "name": "<string>",
        "index": "<number | string>",
        "score": "<number>"
      }
    ],
    "id": 0
  }
  ```

### Game Play Commands

- **Start Game** (host only)

  `<-`
  ```json
  {
    "type": "start_game",
    "data": {
      "gameId": "<string>"
    },
    "id": 0
  }
  ```
  `->` (broadcast — first question, options only, no correct answer)
  ```json
  {
    "type": "question",
    "data": {
      "questionNumber": "<number>",
      "totalQuestions": "<number>",
      "text": "<string>",
      "options": ["<string>", "<string>", "<string>", "<string>"],
      "timeLimitSec": "<number>"
    },
    "id": 0
  }
  ```

- **Submit Answer** (player)

  `<-`
  ```json
  {
    "type": "answer",
    "data": {
      "gameId": "<string>",
      "questionIndex": "<number>",
      "answerIndex": "<number>"
    },
    "id": 0
  }
  ```
  `->` (personal response)
  ```json
  {
    "type": "answer_accepted",
    "data": {
      "questionIndex": "<number>"
    },
    "id": 0
  }
  ```

- **Question Result** (broadcast after timer expires or all answered)

  `->` (broadcast)
  ```json
  {
    "type": "question_result",
    "data": {
      "questionIndex": "<number>",
      "correctIndex": "<number>",
      "playerResults": [
        {
          "name": "<string>",
          "answered": "<boolean>",
          "correct": "<boolean>",
          "pointsEarned": "<number>",
          "totalScore": "<number>"
        }
      ]
    },
    "id": 0
  }
  ```

- **Next Question / Game Finished**

  If there are more questions:
  `->` (broadcast — next question, same format as `question` above)

  If it was the last question:
  `->` (broadcast)
  ```json
  {
    "type": "game_finished",
    "data": {
      "scoreboard": [
        {
          "name": "<string>",
          "score": "<number>",
          "rank": "<number>"
        }
      ]
    },
    "id": 0
  }
  ```

## Command Sequence Diagram

```
  Host                  Server                 Player1    Player2
   reg         -->
               <--        reg
                                      <--        reg
                          reg         -->
                                                <--        reg
                          reg                   -->
create_game    -->
               <--    game_created
                                      <--     join_game
               <--    player_joined   -->
               <--    update_players  -->
                                                <--     join_game
               <--    player_joined            -->
               <--    update_players           -->
start_game     -->
               <--      question      -->      -->
                                      <--      answer
               <--   answer_accepted
                                                <--      answer
                          answer_accepted       -->
                   (timer expires)
               <-- question_result    -->      -->
               <--      question      -->      -->
                          ...
               <--   game_finished    -->      -->
```

## Requirements Summary

- WebSocket server using `ws` library
- In-memory storage for players and games
- Server-side timer for each question
- Score calculation based on speed of correct answer
- Proper handling of player disconnects (remove from game, update player list)
- All communication via JSON strings
