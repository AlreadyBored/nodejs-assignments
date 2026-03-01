# Assignment: AI/LLM Integration — AI Content Assistant

## Description

Your task is to create an **AI Content Assistant API** — a Fastify server that provides a set of useful AI-powered endpoints by making requests to an OpenAI-compatible LLM.

The server acts as an intermediary between the client and the LLM, adding prompt engineering, validation, rate limiting, caching, and usage tracking on top of raw API calls.

## Technical requirements

- Task should be implemented in TypeScript
- Use 24.x.x version (24.10.0 or upper) of Node.js
- Use [Fastify](https://fastify.dev/) as the web framework
- Use the official [OpenAI Node.js SDK](https://www.npmjs.com/package/openai) (`openai` npm package)
- Only `fastify`, `@fastify/*` plugins, `openai`, `dotenv`, `cross-env`, `typescript`, `tsx`, `ts-node`, `ts-node-dev`, `nodemon`, linter/formatter and their plugins, bundler and its plugins, `@types/*`, `uuid`, and testing tools are allowed

## Implementation details

### Endpoints

1. **Summarize Text** — `POST /api/summarize`

   Accepts a text and returns a concise summary.

   Request body:
   ```typescript
   interface SummarizeRequest {
     text: string;            // required, the text to summarize
     maxLength?: 'short' | 'medium' | 'detailed'; // optional, defaults to 'medium'
   }
   ```

   Response body:
   ```typescript
   interface SummarizeResponse {
     summary: string;
     originalLength: number;  // character count of original text
     summaryLength: number;   // character count of summary
   }
   ```

   - Server should answer with `status code` **200** and the summary
   - Server should answer with `status code` **400** if `text` is missing or empty

2. **Translate Text** — `POST /api/translate`

   Accepts a text and a target language, returns the translated text.

   Request body:
   ```typescript
   interface TranslateRequest {
     text: string;              // required
     targetLanguage: string;    // required (e.g. "Spanish", "French", "Japanese")
     sourceLanguage?: string;   // optional (auto-detect if not provided)
   }
   ```

   Response body:
   ```typescript
   interface TranslateResponse {
     translatedText: string;
     detectedLanguage: string;  // the detected source language
   }
   ```

   - Server should answer with `status code` **200** and the translation
   - Server should answer with `status code` **400** if `text` or `targetLanguage` is missing

3. **Analyze Code** — `POST /api/analyze-code`

   Accepts source code and returns an analysis (code review, bug detection, optimization suggestions, or explanation).

   Request body:
   ```typescript
   interface AnalyzeCodeRequest {
     code: string;              // required
     language: string;          // required (e.g. "typescript", "python", "go")
     task?: 'review' | 'bugs' | 'optimize' | 'explain'; // optional, defaults to 'review'
   }
   ```

   Response body:
   ```typescript
   interface AnalyzeCodeResponse {
     analysis: string;          // the main analysis text
     suggestions: string[];     // actionable suggestions as a list
     severity: 'info' | 'warning' | 'error'; // overall severity assessment
   }
   ```

   - Server should answer with `status code` **200** and the analysis
   - Server should answer with `status code` **400** if `code` or `language` is missing

4. **Chat** — `POST /api/chat`

   A conversational endpoint that maintains context across messages within a session.

   Request body:
   ```typescript
   interface ChatRequest {
     message: string;        // required
     sessionId?: string;     // optional — if provided, continues existing conversation
   }
   ```

   Response: **Server-Sent Events (SSE) stream**

   The response should use `Content-Type: text/event-stream` and stream tokens as they arrive from the LLM:
   ```
   data: {"token": "Hello"}

   data: {"token": " there"}

   data: {"token": "!"}

   data: {"done": true, "sessionId": "abc-123", "usage": {"promptTokens": 50, "completionTokens": 12}}

   ```

   - Each SSE event contains either a `token` (partial response) or a `done` flag with metadata
   - The server stores conversation history per `sessionId` (in-memory, up to the last 20 messages)
   - If no `sessionId` is provided, a new session is created and the `sessionId` is returned in the final event
   - Server should answer with `status code` **400** if `message` is missing

5. **Usage Statistics** — `GET /api/usage`

   Returns aggregated usage statistics for the server since startup.

   Response body:
   ```typescript
   interface UsageResponse {
     totalRequests: number;
     totalTokens: {
       prompt: number;
       completion: number;
     };
     estimatedCost: number;   // in USD, based on model pricing
     requestsByEndpoint: {
       summarize: number;
       translate: number;
       analyzeCode: number;
       chat: number;
     };
   }
   ```

### Cross-Cutting Requirements

1. **Prompt Templates**

   Each endpoint should use a carefully crafted **system prompt** that instructs the LLM on its role and expected output format. Prompts should be stored in a dedicated module/directory (e.g. `src/prompts/`), not hardcoded in route handlers.

2. **JSON Schema Validation**

   All request bodies should be validated using Fastify's built-in JSON Schema validation. Invalid requests should return `status code` **400** with a descriptive error message.

3. **Rate Limiting**

   Implement rate limiting for AI endpoints:
   - Maximum `RATE_LIMIT_RPM` requests per minute (configurable via `.env`, default: 20)
   - When the limit is exceeded, respond with `status code` **429** and a `Retry-After` header
   - Rate limiting should be per-client (based on IP or a simple token)

4. **Response Caching**

   For `/api/summarize` and `/api/translate` endpoints:
   - Cache responses based on a hash of the input (text + parameters)
   - Use an in-memory cache with a TTL (configurable via `CACHE_TTL_SEC` env variable, default: 300 seconds)
   - If a cached response exists and is not expired, return it without calling the LLM
   - Cached responses should include a `X-Cache: HIT` header; non-cached responses should include `X-Cache: MISS`

5. **Token Tracking & Cost Estimation**

   After each LLM request:
   - Extract token usage from the OpenAI response (`usage.prompt_tokens`, `usage.completion_tokens`)
   - Accumulate totals in memory
   - Calculate estimated cost based on the model used (e.g., `gpt-4o-mini`: $0.15 / 1M input tokens, $0.60 / 1M output tokens)

6. **Error Handling**

   Handle OpenAI API errors gracefully:
   - Rate limit errors (429) from OpenAI — retry with exponential backoff (up to 3 retries) or return 503
   - Invalid API key — return 500 with a message indicating configuration error (do not expose the key)
   - Network timeouts — return 503 with a message indicating the AI service is temporarily unavailable
   - All errors should be logged

### Environment Variables

Add to `.env.example`:
```
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o-mini
PORT=4000
RATE_LIMIT_RPM=20
CACHE_TTL_SEC=300
```

## Hints

- Use OpenAI's `stream: true` option for the chat endpoint to get streaming responses
- For SSE, set the response headers manually: `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`
- Use `crypto.createHash('sha256').update(input).digest('hex')` for cache key generation
- Consider using `@fastify/rate-limit` plugin or implement a simple sliding window counter
- The `openai` package returns usage information in the response object: `response.usage.prompt_tokens`, `response.usage.completion_tokens`
