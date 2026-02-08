# Assignment: Node.js Fundamentals

## Description

Your task is to complete several tasks to learn Node.js core APIs. You will build a **Data Processing Toolkit** — a set of utilities that work with the file system, streams, CLI, hashing, compression, worker threads, and child processes.

Fork the starter repository and implement the required functionality inside the `src/` folder. Each subtask has its own dedicated file inside a corresponding subfolder.

## Technical requirements

- Any external tools and libraries are prohibited
- Use 24.x.x version (24.10.0 or upper) of Node.js
- Don't change the signature of pre-written functions (e.g. don't rename them, don't make them synchronous, etc.)
- Prefer asynchronous API whenever possible

## Subtasks

### File System (src/fs)

You should implement several functions in dedicated files:

- `create.js` — implement function that creates a new JSON file `config.json` with the following content inside the `workspace` folder:
  ```json
  {
    "name": "Data Toolkit",
    "version": "1.0.0",
    "features": ["fs", "streams", "cli"]
  }
  ```
  If the file already exists, `Error` with message `FS operation failed` must be thrown.

- `copy.js` — implement function that recursively copies the `workspace` folder with all its content into a `workspace_backup` folder at the same level. If the `workspace` folder doesn't exist or `workspace_backup` has already been created, `Error` with message `FS operation failed` must be thrown.

- `rename.js` — implement function that renames the file `data.csv` to `processed_data.csv`. If there's no file `data.csv` or `processed_data.csv` already exists, `Error` with message `FS operation failed` must be thrown.

- `delete.js` — implement function that deletes the file `obsolete.txt`. If there's no file `obsolete.txt`, `Error` with message `FS operation failed` must be thrown.

- `list.js` — implement function that prints an array of all files and folders from the `workspace` folder into the console. Each entry should be an object with `name` (string) and `sizeKB` (number, file size in kilobytes rounded to 2 decimal places) properties. For directories, `sizeKB` should be `null`. If the `workspace` folder doesn't exist, `Error` with message `FS operation failed` must be thrown.

- `read.js` — implement function that prints content of the `report.txt` into the console. If there's no file `report.txt`, `Error` with message `FS operation failed` must be thrown.

### Command Line Interface (src/cli)

You should implement several functions in dedicated files:

- `args.js` — implement function that parses command line arguments given in the format `--input path/to/file --output path/to/output --format json` and prints them to the console in the format `input is path/to/file, output is path/to/output, format is json`

- `env.js` — implement function that parses environment variables with the prefix `DPT_` and prints them to the console in the format `DPT_name1=value1; DPT_name2=value2`

### Hash (src/hash)

You should implement a function in a dedicated file:

- `calcHash.js` — implement function that calculates the SHA256 hash for file `data.txt` and logs it into the console as a `hex` string using Streams API

### Streams (src/streams)

You should implement several functions in dedicated files:

- `read.js` — implement function that reads file `input.txt` content using Readable Stream and prints its content into `process.stdout`

- `write.js` — implement function that writes `process.stdin` data into file `output.txt` content using Writable Stream

- `transform.js` — implement function that reads data from `process.stdin`, converts each line to upper case using Transform Stream, and then writes it into `process.stdout`

### Zlib (src/zip)

You should implement several functions in dedicated files:

- `compress.js` — implement function that compresses file `archive_me.txt` to `archive.gz` using `zlib` and Streams API

- `decompress.js` — implement function that decompresses `archive.gz` back to the `archive_me.txt` with same content as before compression using `zlib` and Streams API

### Worker Threads (src/wt)

You should implement several functions in dedicated files:

- `worker.js` — implement a function that receives a range `{ start, end }` from the main thread and finds all prime numbers within that range. The function should send the result back to the main thread.

- `main.js` — implement function that creates a number of worker threads (equal to the number of host machine logical CPU cores) from file `worker.js` and distributes the range `[2, 10_000_000]` evenly among them. For example: on a host machine with **4** cores you should create **4** workers, each computing primes in its own subrange. After all workers finish, the function should log an array of results into the console. The results are an array of objects with 2 properties:
  - `status` — `'resolved'` in case of successfully received value from `worker` or `'error'` in case of error in `worker`
  - `data` — array of prime numbers from `worker` in case of success or `null` in case of error

  The results in the array must be in the same order that the workers were created.

### Child Processes (src/cp)

You should implement a function in a dedicated file:

- `cp.js` — implement function `spawnChildProcess` that receives an array of arguments `args` and creates a child process from file `script.js`, passing these `args` to it. This function should create an IPC-channel between `stdin` and `stdout` of the master process and child process:
  - child process `stdin` should receive input from master process `stdin`
  - child process `stdout` should send data to master process `stdout`

## Hints

- Use `fs/promises` API for file system operations
- Use `crypto.createHash` with Streams for hash calculation
- Use `os.cpus().length` to get the number of CPU cores
- Use `child_process.spawn` or `child_process.fork` for child processes
