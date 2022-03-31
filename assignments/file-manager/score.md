# Scoring: File Manager

## Basic Scope

- Basic operations with files
    - **+10** Read file and print it's content in console
    - **+10** Write in file (prompts user to write additional content in file until he writes `EOW`)
    - **+10** Rename file
    - **+10** Copy file
    - **+10** Move file
    - **+10** Delete file
- Operating system info (prints following information in console)
    - **+6** Get EOL (default system End-Of-Line)
    - **+10** Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
    - **+6** Get home directory
    - **+6** Get current *system user name* (Do not confuse with the username that is set when the application starts)
    - **+6** Get CPU architecture for which Node.js binary has compiled
- Child processes
    - **+20** Spawn of the child process (creates IPC channel and prints newly created process's id)
    - **+20** Send data in cp (only strings are supported)
    - **+20** Read available data from cp and print it to console
- Hash calculation (uses Worker Threads internally)
    - **+20** Calculate hash for file 
- Compress and decompress operations
    - **+20** Compress file (using Brotli algorytm)
    - **+20** Decompress file (using Brotli algorytm)

## Advanced Scope

- **+50** All files operations with reading/writing should be performed using Streams API
- **+50** Hash calculation performed in Worker Threads
- **+20** Codebase is written in ESM modules instead of CommonJS
- **+20** Codebase is separated (at least 7 modules)

## Forfeits
- **-95% of total task score** Any external tools/libraries are used
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)