# Scoring: Data Processing CLI

## Basic Scope

- **+6** Application starts with npm run start and displays welcome message
- **+10** Application exits gracefully with `.exit` command or `Ctrl+C` and displays goodbye message
- **+5** Current working directory is printed at startup and after each successful operation
- **+10** Unknown or invalid commands display `Invalid input` and application continues running
- **+10** Operations that fail display `Operation failed` and application continues running

### Navigation Commands
- **+8** `up` command moves up one directory level correctly
- **+8** `cd` command navigates to specified directory (both relative and absolute paths)
- **+12** `ls` command lists files and folders with proper sorting (folders first, then files, alphabetically)

### Data Processing Commands
- **+20** `csv-to-json` command works correctly (headers parsed, rows converted to objects, output is valid JSON array, uses Streams)
- **+20** `json-to-csv` command works correctly (headers from object keys, values as rows, uses Streams)
- **+12** `count` command works correctly (lines, words, characters counted via Streams, output format matches specification)
- **+12** `hash` command works correctly (SHA256 by default, supports `md5` and `sha512` via `--algorithm` option, uses Streams)
- **+8** `encrypt` command works correctly (AES-256-GCM, key derivation from password+salt, Streams, output format matches spec)
- **+8** `decrypt` command works correctly (AES-256-GCM, key derivation from password+salt, Streams, authTag verified, result matches original)

### Path Resolution
- **+15** All file paths in commands are correctly resolved relative to current working directory
- **+10** All file operations properly handle errors (non-existent files, invalid paths, permission errors)

## Advanced Scope

- **+25** `log-stats` command works correctly:
    - **+5** File is split into chunks equal to the number of CPU cores (line boundaries preserved)
    - **+10** Each chunk is processed in a separate Worker Thread
    - **+5** Partial stats are merged correctly (counters, maps, totals)
    - **+5** Final output JSON matches the specification
- **+15** Project structure follows the specification (separate files for navigation, commands, utilities, worker)
- **+20** Interactive REPL implementation:
    - **+10** Maintains application state (current working directory) across commands
    - **+10** Properly handles readline for continuous command input

## Forfeits

- **-95% of total task score** Any external tools/libraries are used
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)
