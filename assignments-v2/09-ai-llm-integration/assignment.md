# Assignment: Knowledge Hub AI Integration

## Description

Your task is to extend the existing **Nest.js Knowledge Hub API** with AI-powered capabilities that work with real data from the service database.

This assignment is a continuation of previous Knowledge Hub assignments. You will work in the same repository created in assignment `05`.

The main goal is to integrate a **specific free LLM API** (Google Gemini API) into the service architecture and expose practical AI endpoints for existing Knowledge Hub entities.

## Technical requirements

- Task should be implemented in TypeScript
- Use 24.x.x version (24.10.0 or upper) of Node.js
- Continue using Nest.js in the same repository
- Use **Google Gemini API** with API key (free tier)
- LLM calls should be done via HTTP API integration

## Implementation details

### AI endpoints (based on Knowledge Hub data)

1. **Summarize Article** — `POST /ai/articles/:articleId/summarize`

   Generates a summary for an existing article from the database.

   Request body:
   ```typescript
   interface SummarizeArticleRequest {
     maxLength?: 'short' | 'medium' | 'detailed'; // optional, defaults to 'medium'
   }
   ```

   Response body:
   ```typescript
   interface SummarizeArticleResponse {
     articleId: string;
     summary: string;
     originalLength: number;
     summaryLength: number;
   }
   ```

   - Server should answer with `status code` **200** and summary result
   - Server should answer with `status code` **404** if article doesn't exist

2. **Translate Article** — `POST /ai/articles/:articleId/translate`

   Translates article content for an existing article from the database.

   Request body:
   ```typescript
   interface TranslateArticleRequest {
     targetLanguage: string;    // required
     sourceLanguage?: string;   // optional
   }
   ```

   Response body:
   ```typescript
   interface TranslateArticleResponse {
     articleId: string;
     translatedText: string;
     detectedLanguage: string;
   }
   ```

   - Server should answer with `status code` **200** and translation result
   - Server should answer with `status code` **400** if `targetLanguage` is missing
   - Server should answer with `status code` **404** if article doesn't exist

3. **Analyze Article Content** — `POST /ai/articles/:articleId/analyze`

   Analyzes article text and returns review insights.

   Request body:
   ```typescript
   interface AnalyzeArticleRequest {
     task?: 'review' | 'bugs' | 'optimize' | 'explain'; // optional, defaults to 'review'
   }
   ```

   Response body:
   ```typescript
   interface AnalyzeArticleResponse {
     articleId: string;
     analysis: string;
     suggestions: string[];
     severity: 'info' | 'warning' | 'error';
   }
   ```

   - Server should answer with `status code` **200** and analysis result
   - Server should answer with `status code` **404** if article doesn't exist

4. **Optional Generic Prompt Endpoint** — `POST /ai/generate` (optional)

   Optional endpoint for non-article requests (free-form generation). If implemented, it should be validated and rate-limited similarly to article endpoints.

### Cross-cutting requirements

1. **Gemini integration module**

   Implement a dedicated integration layer/module for Gemini API calls (for example, `AiModule` + `GeminiService`).

2. **Prompt templates**

   Prompt templates should be stored in a dedicated module/directory (for example, `src/ai/prompts/`), not hardcoded in controllers.

3. **Input validation**

   All AI request bodies and params should be validated with DTO classes and validation pipes.

4. **Rate limiting**

   Implement configurable rate limiting for AI routes:
   - Maximum `AI_RATE_LIMIT_RPM` requests per minute (default: 20)
   - Return `429` and `Retry-After` when exceeded

5. **Response caching**

   For summarize/translate endpoints:
   - Cache responses in memory by deterministic key (`articleId` + request params + article `updatedAt`)
   - TTL configurable via `AI_CACHE_TTL_SEC` (default: 300)

6. **Usage tracking**

   Track AI usage in memory since service startup:
   - total AI requests
   - requests by endpoint
   - optional token usage if Gemini response metadata provides it

7. **Error handling**

   Handle Gemini API failures gracefully:
   - timeout/network issues → `503`
   - invalid API key / auth errors → `500` (without leaking secrets)
   - upstream rate limit → retry with exponential backoff (up to 3 retries) or return `503`

8. **Logging and security**

   Reuse existing logging/error-handling standards from previous assignments.
   API keys and sensitive headers must never be logged.

### Environment variables

Add to `.env.example`:

```dotenv
GEMINI_API_KEY=your-gemini-api-key
GEMINI_API_BASE_URL=https://generativelanguage.googleapis.com
GEMINI_MODEL=gemini-2.0-flash
AI_RATE_LIMIT_RPM=20
AI_CACHE_TTL_SEC=300
```

## README requirements (mandatory)

In your solution repository `README.md`, you must describe:

1. How to obtain Gemini API key (step-by-step)
2. Which Gemini model is used
3. Exact setup steps after cloning the repository:
   - required `.env` variables
   - where to paste API key
   - how to run the app and test AI endpoints
4. Known limitations (for example: free-tier quotas, latency, regional availability)

## Hints

- Keep AI integration isolated in a dedicated module (`AiModule`) with a `GeminiService`
- Use deterministic cache keys that include article update version (`updatedAt`) to avoid stale content
- Fail gracefully when Gemini API is unavailable and return actionable error messages
