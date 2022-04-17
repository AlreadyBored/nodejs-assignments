# Scoring: Node.js basics

## Basic Scope

- File system (src/fs)
    - **+6** `create.js` implemented properly
    - **+6** `copy.js` implemented properly
    - **+6** `rename.js` implemented properly
    - **+6** `delete.js` implemented properly
    - **+6** `list.js` implemented properly
    - **+6** `read.js` implemented properly
- Command line interface(src/cli)
    - **+6** `args.js` implemented properly
    - **+6** `commands.js` implemented properly
- Modules(src/modules)
    - **+6** `cjsToEsm.cjs` refactored properly
    - **+6** `esmToCjs.mjs` refactored properly
- Hash (src/hash)
    - **+10** `calcHash.js` implemented properly
- Streams (src/streams)
    - **+10** `read.js` implemented properly
    - **+10** `write.js` implemented properly
    - **+10** `transform.js` implemented properly
- Zlib (src/zip)
    - **+10** `compress.js` implemented properly
    - **+10** `decompress.js` implemented properly

## Advanced Scope

- Worker Threads (src/wt)
    - **+10** `worker.js` implemented properly
    - **+10** `main.js` implemented properly
- Child Processes (src/cp)
    - **+10** spawns child process
    - **+10** child process `stdin` receives input from master process  `stdout`
     - **+10** child process `stdout` sends data to master process `stdin`

## Forfeits

- **-95% of total task score** Any external tools/libraries are used
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)