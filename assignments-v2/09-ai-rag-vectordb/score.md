# Scoring: Knowledge Hub RAG & Vector Database

## Basic Scope

- **+20** `POST /ai/rag/index` indexes Knowledge Hub article data into vector storage correctly
- **+15** `POST /ai/rag/search` performs semantic search and returns ranked chunks with article attribution
- **+25** `POST /ai/rag/chat` implements end-to-end RAG (retrieve relevant chunks, build grounded prompt, return answer + sources)
- **+10** `DELETE /ai/rag/index/articles/:articleId` removes article vectors from index correctly
- **+15** Gemini generation + Gemini embeddings are integrated correctly (configured via `.env`)
- **+15** Chunking configuration is implemented via env (`RAG_CHUNK_SIZE`, `RAG_CHUNK_OVERLAP`)

## Advanced Scope

- **+20** External vector DB is used via Docker Compose (separate container, healthy startup, app connectivity)
- **+10** Retrieval supports metadata-aware filtering (status/category/tags)
- **+10** Conversation memory for RAG chat is implemented with configurable max history size
- **+10** Reindex strategy handles updates/deletes consistently (no stale vectors in results)
- **+10** Resilient error handling for vector DB/Gemini outages (`503` + logs)

## Hacker Scope

- **+10** Hybrid retrieval (semantic + lexical) with merged ranking
- **+10** Secondary re-ranking strategy improves relevance of top chunks
- **+10** Incremental indexing pipeline (index only changed articles, with idempotent behavior)

## Forfeits

- **-95% of total task score** Any external tools/libraries beyond those listed in technical requirements
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
- **-15** RAG remains in-memory only and does not use external vector DB container
- **-10** Gemini integration is missing or replaced with a different LLM provider
- **-10** README does not contain complete runbook (Gemini setup + vector DB startup + indexing flow)
- **-5** The `.env` file with actual API key is present in the repository (should be `.env.example` instead)
