# Scoring: WebSocket — Live Quiz Game

## Basic Scope

- **+10** WebSocket server starts and accepts connections
- **+15** Player registration/login (`reg`) works correctly — stores player data, handles duplicate names, returns error on wrong password
- **+15** Game creation (`create_game`) works correctly — validates questions, generates 6-character code, stores game
- **+15** Joining a game (`join_game`) works correctly — validates code, adds player, broadcasts `player_joined` and `update_players`
- **+15** Starting a game (`start_game`) works correctly — only host can start, sends first question to all players (without correct answer)
- **+15** Submitting answers (`answer`) works correctly — validates answer, stores it, sends `answer_accepted`
- **+15** Question results (`question_result`) are broadcast after timer expires — includes correct answer and per-player results

## Advanced Scope

- **+25** Full game flow works end-to-end: create → join → start → answer all questions → `game_finished` with final scoreboard and ranks
- **+15** Scoring with speed bonus is implemented correctly (`basePoints * timeRemaining / timeLimit`)
- **+15** Server-side timer is implemented — question results are sent after `timeLimitSec` even if not all players answered
- **+15** Disconnects are handled correctly — player is removed from the game, `update_players` is broadcast, game continues

## Hacker Scope

- **+15** Bot player is implemented for single play — automatically joins and answers questions (randomly or with a strategy)
- **+15** Pause/resume game functionality — host can pause the game (timer stops, no answers accepted) and resume it

## Forfeits

- **-95% of total task score** Any external tools/libraries beyond those listed in technical requirements
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
