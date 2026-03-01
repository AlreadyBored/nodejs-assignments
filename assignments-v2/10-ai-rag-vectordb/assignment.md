# Assignment: Knowledge Hub RAG & Vector Database

## Description

Your task is to extend the existing **Knowledge Hub API** with a Retrieval-Augmented Generation (RAG) layer that answers user questions using content stored in the service database.

This assignment is a continuation of Assignment `09` and previous Knowledge Hub assignments. You will work in the same repository created in assignment `05`.

The key idea: RAG should be built on top of existing Knowledge Hub entities (primarily articles), not as an isolated standalone app.

## Technical requirements

- Task should be implemented in TypeScript
- Use 24.x.x version (24.10.0 or upper) of Node.js
- Continue using Nest.js in the same repository
- Use **Google Gemini API** with API key (free tier):
  - for answer generation
  - for embeddings
- Use an **external vector database in Docker** (for example, Qdrant or Chroma)
- Keep application, PostgreSQL, and vector DB in the same Docker Compose environment

## Core RAG flow

1. Extract content from Knowledge Hub data (for example, published articles)
2. Split content into chunks
3. Generate embeddings via Gemini API
4. Store vectors + metadata in vector DB
5. On question: embed query, retrieve top chunks, build grounded prompt, generate answer
6. Return answer with source attribution

## Implementation details

### Endpoints

1. **Index Knowledge Hub data** — `POST /ai/rag/index`

   Builds or refreshes vector index using articles from Knowledge Hub DB.

   Request body (example):
   ```typescript
   interface ReindexRequest {
     onlyPublished?: boolean; // default true
     articleIds?: string[];   // optional selective reindex
   }
   ```

   Response body:
   ```typescript
   interface ReindexResponse {
     indexedArticles: number;
     indexedChunks: number;
     vectorCollection: string;
   }
   ```

   - Server should answer with `status code` **200**

2. **Semantic search in Knowledge Hub** — `POST /ai/rag/search`

   Request body:
   ```typescript
   interface RagSearchRequest {
     query: string;             // required
     limit?: number;            // optional, default 5, max 20
     articleStatus?: 'draft' | 'published' | 'archived'; // optional filter
     categoryId?: string;       // optional filter
     tags?: string[];           // optional filter
   }
   ```

   Response body:
   ```typescript
   interface RagSearchResponse {
     results: Array<{
       articleId: string;
       articleTitle: string;
       chunk: string;
       similarity: number;
     }>;
   }
   ```

   - Server should answer with `status code` **200**
   - Server should answer with `status code` **400** if `query` is missing

3. **Chat with Knowledge Hub RAG** — `POST /ai/rag/chat`

   Request body:
   ```typescript
   interface RagChatRequest {
     question: string;          // required
     conversationId?: string;   // optional
   }
   ```

   Response body:
   ```typescript
   interface RagChatResponse {
     answer: string;
     sources: Array<{
       articleId: string;
       articleTitle: string;
       relevantChunk: string;
     }>;
     conversationId: string;
   }
   ```

   - Server should answer with `status code` **200**
   - Server should answer with `status code` **400** if `question` is missing

4. **Delete article from index** — `DELETE /ai/rag/index/articles/:articleId`

   Removes all vector entries linked to article.

   - Server should answer with `status code` **204** if vectors were removed
   - Server should answer with `status code` **404** if article/index entries are not found

5. **Conversation history (optional)** — `GET /ai/rag/chat/:conversationId/history`

   Optional endpoint for inspecting RAG conversation memory.

### Vector DB requirements

- Vector storage must be external (not only in-memory)
- Vector DB runs in a dedicated Docker container in the same compose file as app + db
- Application connects via internal service hostname and env variables
- Vectors should store metadata for traceability (`articleId`, `title`, optional category/tags)

### Chunking requirements

- Chunk size configurable via env (`RAG_CHUNK_SIZE`, default 800)
- Overlap configurable via env (`RAG_CHUNK_OVERLAP`, default 200)
- Keep chunking deterministic and stable between reindex runs

### Conversation memory

- Store conversation messages per `conversationId`
- Keep last `RAG_CONVERSATION_MAX_MESSAGES` messages (default: 20)

### Error handling

- If vector DB is unavailable, return `503` with descriptive message
- If Gemini API is unavailable, return `503`
- Log integration errors without leaking credentials

### Environment variables

Add to `.env.example`:

```dotenv
GEMINI_API_KEY=your-gemini-api-key
GEMINI_API_BASE_URL=https://generativelanguage.googleapis.com
GEMINI_MODEL=gemini-2.0-flash
GEMINI_EMBEDDING_MODEL=text-embedding-004
RAG_VECTOR_DB_PROVIDER=qdrant
RAG_VECTOR_DB_URL=http://vectordb:6333
RAG_VECTOR_COLLECTION=knowledge_hub_articles
RAG_CHUNK_SIZE=800
RAG_CHUNK_OVERLAP=200
RAG_CONVERSATION_MAX_MESSAGES=20
```

## Docker requirements

Update `docker-compose.yml` in your repository to include vector DB service, for example:

- `vectordb` service (Qdrant or Chroma)
- persistent volume for vector data
- healthcheck and restart policy
- app depends on healthy `vectordb`

## README requirements (mandatory)

In your solution repository `README.md`, you must describe:

1. How to obtain Gemini API key (step-by-step)
2. Which Gemini generation and embedding models are used
3. Which vector DB is used and how to run it with Docker Compose
4. Full startup flow after clone:
   - env setup
   - docker compose startup
   - index building
   - sample RAG requests
5. Known limitations (free-tier quotas, latency, indexing time, regional availability)

## Hints

- Keep RAG logic in a dedicated module (`RagModule`) separated from standard CRUD modules
- Use metadata filters in retrieval to support status/category/tag-aware search
- Ensure source attribution is based on chunks actually passed to generation step
