# Scoring: Node.js Basics

## Check

For check simplification you have npm-scripts in `package.json`.
NB! Some scripts have predefined data (e.g. environment variables, CLI arguments). Feel free to change it during the check if necessary.

## Basic Scope

- File System (src/fs)
    - **+10** `snapshot.js` implemented properly (recursive scan, correct JSON structure with path/type/size)
    - **+10** `restore.js` implemented properly (reads snapshot, recreates structure)
    - **+6** `findByExt.js` implemented properly (recursive search, sorted output)
    - **+6** `merge.js` implemented properly (reads .txt files in order, concatenates, writes result)
- CLI (src/cli)
    - **+10** `interactive.js` implemented properly (readline prompt, supports uptime/cwd/date/exit commands, handles Ctrl+C)
    - **+6** `progress.js` implemented properly (in-place updating progress bar, 0-100% over ~5 seconds)
- Modules (src/modules)
    - **+10** `dynamic.js` implemented properly (dynamic import from plugins/, calls run(), handles missing plugin)
- Hash (src/hash)
    - **+12** `verify.js` implemented properly (reads checksums.json, calculates SHA256 via Streams, prints OK/FAIL per file)
- Streams (src/streams)
    - **+10** `lineNumberer.js` implemented properly (Transform stream, prepends line numbers)
    - **+10** `filter.js` implemented properly (Transform stream, filters by pattern from CLI arg)
    - **+10** `split.js` implemented properly (Readable stream, splits file into chunks by line count)
- Zlib (src/zip)
    - **+10** `compressDir.js` implemented properly (reads all files from workspace/toCompress/, recursively compresses entire directory structure into single .br archive, saves to workspace/compressed/)
    - **+10** `decompressDir.js` implemented properly (reads archive.br from workspace/compressed/, decompresses and extracts to workspace/decompressed/, result matches original)

## Advanced Scope

- Worker Threads (src/wt)
    - **+10** `worker.js` implemented properly (receives array, returns sorted array)
    - **+30** `main.js` implemented properly (reads data.json, splits by CPU count, distributes to workers, k-way merges results)
- Child Processes (src/cp)
    - **+10** `execCommand.js` spawns child process from CLI argument
    - **+10** child process stdout/stderr piped to parent stdout/stderr
    - **+10** parent exits with the same exit code as child

## Forfeits

- **-95% of total task score** Any external tools/libraries are used
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
