# Assignment: AI RAG & Vector Database — Smart Knowledge Base

## Description

Your task is to create a **Smart Knowledge Base** — an AI chatbot that answers questions based on documents you upload. The system uses **Retrieval-Augmented Generation (RAG)**: when a user asks a question, the server finds the most relevant parts of the uploaded documents and uses them as context for the LLM to generate an accurate, grounded answer.

## Technical requirements

- Task should be implemented in TypeScript
- Use 24.x.x version (24.10.0 or upper) of Node.js
- Use [Fastify](https://fastify.dev/) as the web framework
- Use the official [OpenAI Node.js SDK](https://www.npmjs.com/package/openai) (`openai` npm package) for both chat completions and embeddings
- Only `fastify`, `@fastify/*` plugins, `openai`, `dotenv`, `cross-env`, `typescript`, `tsx`, `ts-node`, `ts-node-dev`, `nodemon`, `uuid`, linter/formatter and their plugins, bundler and its plugins, `@types/*`, and testing tools are allowed
- For the **Basic Scope**, implement vector storage **in-memory** (no external vector database required)
- For the **Advanced Scope**, optionally use [ChromaDB](https://www.trychroma.com/) via Docker

## Core Concepts

### What is RAG?

Retrieval-Augmented Generation (RAG) is a pattern that enhances LLM responses by:
1. **Retrieving** relevant information from a knowledge base
2. **Augmenting** the LLM prompt with this information
3. **Generating** a response that is grounded in the retrieved data

### The RAG Pipeline

```
User Question
     │
     ▼
┌─────────────┐
│  Embed the   │  ← OpenAI Embeddings API
│  question    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Search for   │  ← Cosine similarity against
│ similar      │    document chunk embeddings
│ chunks       │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Build prompt │  ← System prompt + relevant chunks
│ with context │    + user question
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Generate     │  ← OpenAI Chat Completions API
│ answer       │
└──────┬──────┘
       │
       ▼
  Answer with
  source attribution
```

## Implementation details

### Endpoints

1. **Upload Document** — `POST /api/documents`

   Upload a text document to the knowledge base.

   Request body:
   ```typescript
   interface UploadDocumentRequest {
     title: string;                        // required
     content: string;                      // required, plain text
     metadata?: Record<string, string>;    // optional key-value metadata
   }
   ```

   Processing steps:
   1. Split `content` into chunks of ~500-1000 characters with ~100-character overlap between consecutive chunks
   2. Generate embeddings for each chunk using OpenAI Embeddings API (`text-embedding-3-small` model)
   3. Store the document, its chunks, and their embedding vectors

   Response body:
   ```typescript
   interface UploadDocumentResponse {
     id: string;          // document id (uuid)
     title: string;
     chunksCount: number; // number of chunks created
     createdAt: string;   // ISO timestamp
   }
   ```

   - Server should answer with `status code` **201** and the document info
   - Server should answer with `status code` **400** if `title` or `content` is missing

2. **List Documents** — `GET /api/documents`

   Response body:
   ```typescript
   interface DocumentListResponse {
     documents: Array<{
       id: string;
       title: string;
       chunksCount: number;
       metadata: Record<string, string>;
       createdAt: string;
     }>;
   }
   ```

   - Server should answer with `status code` **200**

3. **Delete Document** — `DELETE /api/documents/:id`

   Removes the document and all its associated chunks and embeddings from storage.

   - Server should answer with `status code` **204** if the document was found and deleted
   - Server should answer with `status code` **404** if the document doesn't exist

4. **Semantic Search** — `POST /api/search`

   Find the most relevant chunks across all documents.

   Request body:
   ```typescript
   interface SearchRequest {
     query: string;      // required
     limit?: number;     // optional, default 5, max 20
   }
   ```

   Processing steps:
   1. Generate an embedding for the query
   2. Calculate cosine similarity between the query embedding and all stored chunk embeddings
   3. Return the top-K most similar chunks

   Response body:
   ```typescript
   interface SearchResponse {
     results: Array<{
       documentId: string;
       documentTitle: string;
       chunk: string;           // the text of the matched chunk
       similarity: number;      // cosine similarity score (0 to 1)
     }>;
   }
   ```

   - Server should answer with `status code` **200**
   - Server should answer with `status code` **400** if `query` is missing

5. **Chat with Knowledge Base** — `POST /api/chat`

   Ask a question and get an AI-generated answer based on the uploaded documents.

   Request body:
   ```typescript
   interface ChatRequest {
     question: string;           // required
     conversationId?: string;    // optional, to continue a conversation
   }
   ```

   Processing steps:
   1. Generate an embedding for the question
   2. Find the top 3-5 most similar chunks from the vector store
   3. Build a prompt that includes:
      - A system message instructing the AI to answer based on the provided context
      - The relevant chunks as context
      - Previous conversation messages (if `conversationId` is provided)
      - The user's question
   4. Send the prompt to the LLM and return the answer

   Response body:
   ```typescript
   interface ChatResponse {
     answer: string;
     sources: Array<{
       documentId: string;
       documentTitle: string;
       relevantChunk: string;    // the chunk that was used as context
     }>;
     conversationId: string;     // new or existing conversation id
   }
   ```

   - Server should answer with `status code` **200**
   - Server should answer with `status code` **400** if `question` is missing
   - If no documents are uploaded, the AI should respond saying it has no knowledge base to answer from

6. **Conversation History** — `GET /api/chat/:conversationId/history`

   Response body:
   ```typescript
   interface ConversationHistoryResponse {
     conversationId: string;
     messages: Array<{
       role: 'user' | 'assistant';
       content: string;
       timestamp: string;
     }>;
   }
   ```

   - Server should answer with `status code` **200**
   - Server should answer with `status code` **404** if the conversation doesn't exist

### Vector Storage (In-Memory)

For the Basic Scope, implement vector storage in-memory:

```typescript
interface StoredChunk {
  id: string;
  documentId: string;
  text: string;
  embedding: number[];    // vector of floats from OpenAI Embeddings API
}
```

**Cosine Similarity** formula:
```
similarity(A, B) = (A · B) / (|A| * |B|)
```

Where:
- `A · B` = sum of (A[i] * B[i]) for all i
- `|A|` = sqrt(sum of A[i]^2 for all i)

### Document Chunking

Split documents into chunks using the following strategy:
- **Chunk size**: ~800 characters (configurable via `CHUNK_SIZE` env variable)
- **Overlap**: ~200 characters (configurable via `CHUNK_OVERLAP` env variable)
- Split on paragraph boundaries when possible (split on `\n\n`), falling back to sentence boundaries (`.`), then word boundaries

### Conversation Memory

- Store conversation messages per `conversationId` in memory
- Keep the last `CONVERSATION_MAX_MESSAGES` messages (configurable, default: 20)
- Include conversation history in the prompt when `conversationId` is provided

### Environment Variables

Add to `.env.example`:
```
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4o-mini
EMBEDDING_MODEL=text-embedding-3-small
PORT=4000
CHUNK_SIZE=800
CHUNK_OVERLAP=200
CONVERSATION_MAX_MESSAGES=20
```

## Hints

- Use `openai.embeddings.create({ model: "text-embedding-3-small", input: text })` to generate embeddings
- The `text-embedding-3-small` model returns 1536-dimensional vectors
- For cosine similarity, you can normalize vectors to unit length first, then dot product equals cosine similarity
- The system prompt for the chat endpoint should instruct the AI to:
  - Only answer based on the provided context
  - If the context doesn't contain relevant information, say so
  - Cite which documents the answer is based on
- For chunking, consider edge cases: very short documents (single chunk), very long paragraphs, documents with no paragraph breaks
- Store the `sources` based on which chunks were actually included in the prompt, not all chunks in the store
