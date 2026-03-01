# Scoring: AI RAG & Vector Database — Smart Knowledge Base

## Basic Scope

- **+20** `POST /api/documents` works correctly: accepts title and content, splits into chunks, generates embeddings, stores in memory, returns document info with chunksCount
- **+10** `GET /api/documents` returns the list of all uploaded documents
- **+10** `DELETE /api/documents/:id` removes the document and all associated chunks/embeddings
- **+20** In-memory vector storage is implemented with cosine similarity search
- **+25** `POST /api/chat` implements the full RAG pipeline: embed question → find similar chunks → inject into prompt → generate answer with source attribution
- **+15** Source attribution in chat responses correctly identifies which documents/chunks were used

## Advanced Scope

- **+15** `POST /api/search` (semantic search) endpoint works correctly — returns top-K chunks ranked by similarity
- **+15** Conversation memory is implemented — `conversationId` tracks multi-turn dialogues, history is included in prompts
- **+10** `DELETE /api/documents/:id` correctly removes all associated embeddings from the vector store (search results no longer include deleted document's chunks)
- **+10** Document metadata filtering: `POST /api/search` accepts optional `metadata` filter to narrow results
- **+10** Chunk size and overlap are configurable via `.env` variables (`CHUNK_SIZE`, `CHUNK_OVERLAP`)
- **+10** ChromaDB is used via Docker instead of in-memory vector storage

## Hacker Scope

- **+10** Hybrid search: combines keyword matching (simple text search) with semantic similarity, merging and re-ranking results
- **+10** Re-ranking: after initial retrieval, re-rank chunks using a secondary scoring method (e.g., ask the LLM to rate relevance, or use reciprocal rank fusion)
- **+10** Large document handling: documents larger than 50KB are processed via streaming chunking without loading the entire content into memory at once

## Forfeits

- **-95% of total task score** Any external tools/libraries beyond those listed in technical requirements
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- **-5** The `.env` file with actual API key is present in the repository (should be `.env.example` instead)
