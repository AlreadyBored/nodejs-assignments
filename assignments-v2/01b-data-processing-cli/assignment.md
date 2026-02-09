# Assignment: Data Processing CLI

## Description

Your task is to build a **Data Processing Toolkit** — an interactive command-line application that performs various useful data processing operations. The tool should work as a persistent Node.js process that accepts commands.

Unlike the Node.js Basics assignment where you practiced APIs in isolation, here you will combine them into a real, cohesive tool with interactive file system navigation and data processing capabilities.

## Technical requirements

- Any external tools and libraries are prohibited
- Use 24.x.x version (24.10.0 or upper) of Node.js
- All file operations must use **Streams API** for efficiency (do not read entire files into memory)
- Prefer asynchronous API whenever possible
- The program should be an interactive REPL (Read-Eval-Print Loop)
- File paths in commands can be relative or absolute

## CLI Interface

The program is started via npm-script `start`:

```bash
npm run start
```

Which runs:

```bash
node src/main.js
```

The program should:
- Display a welcome message on startup: `Welcome to Data Processing CLI!`
- Print the current working directory initially: `You are currently in /path/to/home`
- Continuously prompt the user to enter commands: `>`
- Accept commands in the format: `<command> [arguments]`
- Display error messages for unknown or invalid commands without crashing
- Allow users to exit with `.exit` command or `Ctrl+C`
- Display a goodbye message on exit: `Thank you for using Data Processing CLI!`
- After each successful operation, print the current working directory again
- At the start of the program, working directory should be the user's home directory

If a command is unknown, invalid, or has missing required arguments, the program should print an error message like `Invalid input` and prompt for a new command.

If an operation fails, the program should print `Operation failed` and prompt for a new command.

## Commands

### Navigation & Working Directory Commands

#### `up` — Move up one directory level

```bash
up
```

**Behavior:**
- Moves up one directory level from the current working directory
- If already in the root directory, does nothing (no error)
- After successful navigation, prints the new current working directory path

#### `cd` — Change to a specified directory

```bash
cd path_to_directory
```

- `path_to_directory` — relative or absolute path to navigate to (**required**)

**Behavior:**
- Navigates to the specified directory
- Can accept both relative and absolute paths
- If path doesn't exist or is not a directory, prints `Operation failed` and stays in current directory
- If successful, prints the new current working directory path

#### `ls` — List files and directories in current directory

```bash
ls
```

**Output:**
- A list of all files and folders in the current directory
- Folders listed first, then files, all in alphabetical order
- Each entry shows the name (with extension for files) and type (file or folder)

**Example:**
```
folder1    [folder]
folder2    [folder]
file1.txt  [file]
file2.md   [file]
```

### Data Processing Commands

#### 1. `csv-to-json` — Convert CSV to JSON

Convert a CSV file to a JSON file using Streams.

```bash
csv-to-json --input data.csv --output data.json
```

- `--input` — path to the input CSV file (**required**)
- `--output` — path to the output JSON file (**required**)

**Behavior:**
- The first line of the CSV file is treated as headers
- Each subsequent line becomes a JSON object with header names as keys
- The output file should contain a JSON array of objects
- Must use Readable Stream → Transform Stream → Writable Stream pipeline
- Paths are relative to the current working directory or can be absolute
- If the input file doesn't exist, print `Operation failed`

**Example:**

Input `data.csv`:
```
name,age,city
Alice,30,New York
Bob,25,London
```

Output `data.json`:
```json
[
  { "name": "Alice", "age": "30", "city": "New York" },
  { "name": "Bob", "age": "25", "city": "London" }
]
```

#### 2. `json-to-csv` — Convert JSON to CSV

Convert a JSON file (array of objects) to a CSV file using Streams.

```bash
json-to-csv --input data.json --output data.csv
```

- `--input` — path to the input JSON file (**required**)
- `--output` — path to the output CSV file (**required**)

**Behavior:**
- Input must be a JSON array of objects
- The first line of the output is the headers (keys from the first object)
- Each object becomes a CSV row
- Paths are relative to the current working directory or can be absolute
- If the input file doesn't exist or contains invalid JSON, print `Operation failed`

#### 3. `count` — Count lines, words, and characters in txt file

Count lines, words, and characters in a file (similar to the `wc` command).

```bash
count --input file.txt
```

- `--input` — path to the input file (**required**)

**Output format:**
```
Lines: 42
Words: 350
Characters: 2048
```

**Behavior:**
- Must use Streams API to process the file (do not load the entire file into memory)
- A word is any sequence of non-whitespace characters
- Paths are relative to the current working directory or can be absolute
- If the input file doesn't exist, print `Operation failed`

#### 4. `hash` — Calculate file hash

Calculate a cryptographic hash of a file.

```bash
hash --input file.txt
hash --input file.txt --algorithm md5
```

- `--input` — path to the input file (**required**)
- `--algorithm` — hash algorithm to use (optional, default: `sha256`). Supported values: `sha256`, `md5`, `sha512`

**Output format:**
```
sha256: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

**Behavior:**
- Must use `crypto.createHash` with Streams API
- Paths are relative to the current working directory or can be absolute
- If the input file doesn't exist, print `Operation failed`
- If the algorithm is not supported, print `Operation failed`

#### 5. `encrypt` — Encrypt a file

Encrypt a file using `AES-256-GCM`.

```bash
encrypt --input file.txt --output file.txt.enc --password mySecret
```

- `--input` — path to the input file (**required**)
- `--output` — path to the output encrypted file (**required**)
- `--password` — password used to derive the encryption key (**required**)

**Output file format (binary):**
- First 16 bytes: `salt`
- Next 12 bytes: `iv`
- Then: `ciphertext`
- Last 16 bytes: `authTag`

**Behavior:**
- Must derive a 32-byte key from `password` and `salt`
- Must encrypt using `AES-256-GCM`
- Must use Streams API end-to-end
- You must not load the full file into memory. The only allowed in-memory buffering is:
  - the header (first 28 bytes = `salt` + `iv`)
  - the authentication tag (last 16 bytes)
- Paths are relative to the current working directory or can be absolute
- If the input file doesn't exist, print `Operation failed`

#### 6. `decrypt` — Decrypt a file

Decrypt a file produced by `encrypt`.

```bash
decrypt --input file.txt.enc --output file.txt --password mySecret
```

- `--input` — path to the input encrypted file (**required**)
- `--output` — path to the output file (**required**)
- `--password` — password used to derive the encryption key (**required**)

**Behavior:**
- Must parse `salt` (first 16 bytes) and `iv` (next 12 bytes) from the input
- Must parse `authTag` (last 16 bytes) from the input
- Must decrypt using `AES-256-GCM` with authentication tag verification
- Must use Streams API end-to-end
- The decrypted result must match the original file content exactly
- Paths are relative to the current working directory or can be absolute
- If the input file doesn't exist or auth fails, print `Operation failed`

#### 7. `sort-large` — Sort a large file using Worker Threads

Sort a large text file line by line in alphabetical order, using Worker Threads for parallel processing.

```bash
sort-large --input huge.txt --output sorted.txt
```

- `--input` — path to the input text file (**required**)
- `--output` — path to the output sorted file (**required**)

**Behavior:**
1. Read the input file and split it into N chunks (where N = number of CPU cores)
2. Send each chunk to a Worker Thread for sorting
3. Each Worker sorts its chunk alphabetically and returns the sorted lines
4. The main thread merges the sorted chunks using a merge-sort merge step
5. Write the final sorted result to the output file

- Must use Worker Threads (`worker_threads` module)
- The number of workers should equal the number of logical CPU cores (`os.cpus().length`)
- Paths are relative to the current working directory or can be absolute
- If the input file doesn't exist, print `Operation failed`

## Project Structure

```
src/
  main.js          — entry point, sets up REPL, handles navigation state
  repl.js          — REPL handler, command parsing and dispatching
  navigation.js    — navigation commands (up, cd, ls)
  commands/
    csvToJson.js   — csv-to-json command handler
    jsonToCsv.js   — json-to-csv command handler
    count.js       — count command handler
    hash.js        — hash command handler
    encrypt.js     — encrypt command handler
    decrypt.js     — decrypt command handler
    sortLarge.js   — sort-large command handler
  workers/
    sortWorker.js  — worker thread for sort-large command
  utils/
    pathResolver.js  — resolve paths relative to current working directory
    argParser.js     — parse command line arguments
```

## Hints

- Use `readline` module for interactive input
- Use `stream.pipeline` (from `stream/promises`) to connect streams and handle errors properly
- For CSV parsing in the Transform stream, handle the first line (headers) separately from data lines
- For `json-to-csv`, you'll need to buffer the JSON input to parse it, but write the CSV output via a stream
- For `sort-large`, use `os.cpus().length` to determine the number of workers
- For merging sorted arrays, implement a k-way merge: compare the first element of each sorted chunk, pick the smallest, advance that chunk's pointer
- Always resolve file paths relative to the current working directory before performing operations
- Use `path.resolve()` to combine current working directory with relative paths
- Use `process.cwd()` is NOT appropriate here - maintain your own current working directory variable
- Maintain the current working directory as application state throughout the session
