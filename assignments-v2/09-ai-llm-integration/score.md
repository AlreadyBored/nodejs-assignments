# Scoring: Knowledge Hub AI Integration

Max total score: 186


## Basic Scope

- **+20** `POST /ai/articles/:articleId/summarize` works correctly with real article data from Knowledge Hub DB
- **+16** `POST /ai/articles/:articleId/translate` works correctly with real article data from Knowledge Hub DB
- **+16** `POST /ai/articles/:articleId/analyze` works correctly and returns structured analysis response
- **+16** Gemini API integration is implemented correctly (API key via `.env`, model configurable)
- **+10** Prompt templates are stored in a dedicated module (not hardcoded in controllers)
- **+16** Request validation is implemented for AI routes (DTO + validation pipes, proper 400/404 behavior)

## Advanced Scope

- **+16** Rate limiting is implemented for AI routes (configurable RPM, `429` + `Retry-After`)
- **+16** Usage tracking endpoint is implemented (totals + by-endpoint counters, optional token counters)
- **+10** Gemini API errors are handled gracefully (timeouts, auth errors, upstream rate limits)
- **+10** Response caching is implemented for summarize/translate with TTL and deterministic cache key
- **+10** Optional generic endpoint (`POST /ai/generate`) is implemented with validation and guardrails

## Hacker Scope

- **+10** Structured AI output validation (schema-based response checks with safe fallback)
- **+10** AI observability improvements (latency metrics, cache hit ratio, diagnostics)
- **+10** Conversation context support for generic endpoint (session-based short-term memory)

## Forfeits

- **-95% of total task score** Any external tools/libraries beyond those listed in technical requirements
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- **-10** Gemini integration is missing or replaced with a different LLM provider
- **-10** README does not contain complete Gemini setup instructions (how to run after clone + API key setup)
- **-5** The `.env` file with actual API key is present in the repository (should be `.env.example` instead)
