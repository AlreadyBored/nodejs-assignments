# Scoring: Node.js basics

## Check
For check simplification you have npm-scripts in `package.json`.  
NB! Some scripts have predefined data (e.g. environment variables, CLI arguments). Feel free to change it during the check if necessary.

## Basic Scope

- File system (src/fs)
    - **+6** `create.js` implemented properly
    - **+10** `copy.js` implemented properly
    - **+10** `rename.js` implemented properly
    - **+6** `delete.js` implemented properly
    - **+6** `list.js` implemented properly
    - **+6** `read.js` implemented properly
- Command line interface(src/cli)
    - **+6** `env.js` implemented properly
    - **+6** `args.js` implemented properly
- Modules(src/modules)
    - **+20** `cjsToEsm.cjs` refactored properly
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
    - **+30** `main.js` implemented properly
- Child Processes (src/cp)
    - **+10** spawns child process
    - **+10** child process `stdin` receives input from master process `stdin`
    - **+10** child process `stdout` sends data to master process `stdout`

## Forfeits

- **-95% of total task score** Any external tools/libraries are used
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)