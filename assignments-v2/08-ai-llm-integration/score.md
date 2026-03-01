# Scoring: AI/LLM Integration — AI Content Assistant

## Basic Scope

- **+15** `POST /api/summarize` endpoint works correctly (sends text to LLM, returns summary with originalLength and summaryLength)
- **+15** `POST /api/translate` endpoint works correctly (sends text to LLM, returns translation with detectedLanguage)
- **+15** `POST /api/analyze-code` endpoint works correctly (sends code to LLM, returns analysis, suggestions array, and severity)
- **+15** `POST /api/chat` endpoint works correctly (sends message to LLM, returns response)
- **+15** OpenAI SDK is properly integrated (API key from `.env`, model configurable)
- **+10** Prompt templates are stored in a dedicated module (not hardcoded in route handlers)
- **+15** JSON Schema validation is used for all request bodies (returns 400 for invalid input)

## Advanced Scope

- **+20** SSE streaming is implemented for `/api/chat` — tokens are streamed as `text/event-stream` events with proper format
- **+15** Token tracking and cost estimation: `GET /api/usage` returns correct totals (totalRequests, totalTokens, estimatedCost, requestsByEndpoint)
- **+15** Rate limiting is implemented (configurable RPM via `.env`, returns 429 with `Retry-After` header when exceeded)
- **+10** OpenAI API errors are handled gracefully (rate limits, invalid key, timeouts — appropriate HTTP status codes and logged)
- **+10** Conversation context management: `/api/chat` maintains session history per `sessionId` (up to last 20 messages)

## Hacker Scope

- **+15** Response caching for `/api/summarize` and `/api/translate` (in-memory with TTL, `X-Cache: HIT/MISS` header, cache key from input hash)
- **+10** Graceful degradation when AI API is unavailable (returns 503 with descriptive message, retries with exponential backoff)
- **+5** Model selection is configurable per-request (optional `model` field in request body, falls back to `.env` default)

## Forfeits

- **-95% of total task score** Any external tools/libraries beyond those listed in technical requirements
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- **-5** The `.env` file with actual API key is present in the repository (should be `.env.example` instead)
