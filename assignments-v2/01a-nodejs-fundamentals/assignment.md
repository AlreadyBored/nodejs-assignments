# Assignment: Node.js Basics

## Description

Your task is to complete several tasks to learn Node.js core APIs. Each subtask is a standalone exercise in a dedicated file inside the corresponding subfolder of `src/`.

Fork the starter repository and implement the required functionality.

## Technical requirements

- Any external tools and libraries are prohibited
- Use 24.x.x version (24.10.0 or upper) of Node.js
- Don't change the signature of pre-written functions (e.g. don't rename them, don't make them synchronous, etc.)
- Prefer asynchronous API whenever possible

## Subtasks

### File System (src/fs)

You should implement several functions in dedicated files:

- `snapshot.js` — implement function that recursively scans the `workspace` directory and writes a `snapshot.json` file next to it. The JSON file should contain a flat array of all entries with file contents:
  ```json
  [
    { "path": "file1.txt", "type": "file", "size": 1024, "content": "file contents as base64 string" },
    { "path": "subdir", "type": "directory" },
    { "path": "subdir/nested.txt", "type": "file", "size": 512, "content": "nested file contents as base64 string" }
  ]
  ```
  Paths should be relative to `workspace`. Size is in bytes (only for files). File contents should be stored as base64-encoded strings. If `workspace` doesn't exist, `Error` with message `FS operation failed` must be thrown.

- `restore.js` — implement function that reads `snapshot.json` and recreates the directory/file structure described in it inside a `workspace_restored` folder. Directories should be created, files should be recreated with their original content (decoded from base64). If `snapshot.json` doesn't exist, `Error` with message `FS operation failed` must be thrown. If `workspace_restored` already exists, `Error` with message `FS operation failed` must be thrown.

- `findByExt.js` — implement function that recursively finds all files with a specific extension inside the `workspace` directory and prints their relative paths sorted alphabetically, one per line. The extension is provided as a CLI argument `--ext <extension>` (e.g. `--ext txt` or `--ext js`). If the `--ext` argument is not provided, default to `.txt`. If `workspace` doesn't exist, `Error` with message `FS operation failed` must be thrown.

- `merge.js` — implement function that reads all `.txt` files from the `workspace/parts` folder in alphabetical order by filename, concatenates their content (separated by newline), and writes the result to `workspace/merged.txt`. If the `parts` folder doesn't exist or contains no `.txt` files, `Error` with message `FS operation failed` must be thrown.

### CLI (src/cli)

You should implement several functions in dedicated files:

- `interactive.js` — implement a simple interactive command-line interface using the `readline` module. The program should:
  - Display a prompt `> ` and wait for user input
  - Support the following commands:
    - `uptime` — prints process uptime in seconds (e.g. `Uptime: 12.34s`)
    - `cwd` — prints the current working directory
    - `date` — prints the current date and time in ISO format
    - `exit` — prints `Goodbye!` and terminates the process
  - On unknown command, print `Unknown command`
  - On `Ctrl+C` or end of input, print `Goodbye!` and exit

- `progress.js` — implement a function that simulates a progress bar in the terminal. The bar should go from 0% to 100% over approximately 5 seconds, updating in place (using `\r`) every 100ms. The output format should be: `[████████████████████          ] 67%` (30-character bar). When complete, print `Done!` on a new line.

### Modules (src/modules)

You should implement a function in a dedicated file:

- `dynamic.js` — implement a function that accepts a plugin name as a command line argument and dynamically imports the corresponding module from the `plugins/` subdirectory. Each plugin module exports a `run()` function that returns a string. After importing, call `run()` and print the result. Three plugins are pre-created: `uppercase.js`, `reverse.js`, `repeat.js`. If the plugin doesn't exist, print `Plugin not found` and exit with code 1.

### Hash (src/hash)

You should implement a function in a dedicated file:

- `verify.js` — implement function that reads a `checksums.json` file containing an object where keys are filenames and values are expected SHA256 hex hashes:
  ```json
  {
    "file1.txt": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    "file2.txt": "486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7"
  }
  ```
  For each file listed, calculate its actual SHA256 hash using Streams API and print the result:
  ```
  file1.txt — OK
  file2.txt — FAIL
  ```
  If `checksums.json` doesn't exist, `Error` with message `FS operation failed` must be thrown.

### Streams (src/streams)

You should implement several functions in dedicated files:

- `lineNumberer.js` — implement function that reads data from `process.stdin`, prepends each line with its line number (starting from 1) using a Transform Stream, and writes the result to `process.stdout`. Example: input `hello\nworld` → output `1 | hello\n2 | world`

- `filter.js` — implement function that reads data from `process.stdin`, filters only lines that contain a pattern (given as a CLI argument `--pattern <string>`), and writes matching lines to `process.stdout` using a Transform Stream

- `split.js` — implement function that reads file `source.txt` using a Readable Stream and splits it into chunk files: `chunk_1.txt`, `chunk_2.txt`, etc. Each chunk should contain at most N lines (N is given as a CLI argument `--lines <number>`, default: 10). Must use Streams API.

### Zlib (src/zip)

You should implement several functions in dedicated files:

- `compressDir.js` — implement function that reads all files from the `workspace/toCompress/` directory, recursively compresses the entire directory structure (preserving directory paths and file names) into a single `.br` archive file `archive.br` and saves it to `workspace/compressed/` directory (creating it if it doesn't exist). Must use Streams API. If `toCompress` doesn't exist, `Error` with message `FS operation failed` must be thrown.

- `decompressDir.js` — implement function that reads the `archive.br` file from `workspace/compressed/`, decompresses it, and extracts the original directory structure with all files to `workspace/decompressed/` directory (creating it if it doesn't exist). The decompressed content must match the original. If `compressed` doesn't exist or `archive.br` doesn't exist, `Error` with message `FS operation failed` must be thrown.

### Worker Threads (src/wt)

You should implement several functions in dedicated files:

- `worker.js` — implement a function that receives an array of numbers from the main thread, sorts them in ascending order, and sends the sorted array back to the main thread

- `main.js` — implement function that reads a JSON file `data.json` containing an array of numbers (e.g. `[5, 3, 8, 1, 9, 2, ...]`). The function should:
  1. Split the array into N chunks (where N = number of logical CPU cores)
  2. Create N worker threads from `worker.js`, sending one chunk to each
  3. Collect sorted chunks from all workers
  4. Merge the sorted chunks into a single sorted array (using k-way merge algorithm)
  5. Log the final sorted array to the console

  The results must be collected in the same order as workers were created.

### Child Processes (src/cp)

You should implement a function in a dedicated file:

- `execCommand.js` — implement function `execCommand` that takes a command string as a CLI argument (e.g. `node src/cp/execCommand.js "ls -la"`), spawns it as a child process using `spawn`, and:
  - pipes the child's `stdout` to `process.stdout`
  - pipes the child's `stderr` to `process.stderr`
  - passes environment variables from the parent process to the child process
  - when the child exits, the parent process exits with the same exit code

