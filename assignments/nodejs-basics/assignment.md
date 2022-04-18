# Assignment: Node.js basics

## Description

Your task is to complete several simple tasks to learn Node.js basics

Assignment contains several nested folders inside `src`. Your task is to implement necessary functionality inside them

## Technical requirements

- Any external tools and libraries are prohibited
- Use 16 LTS version of Node.js
- Don't change signature of pre-written functions (e.g. don't rename them, don't remove export, don't make them synchronous, etc.)
- Prefer asynchronous API whenever possible

## Subtasks

### File system (src/fs)

You should implement several functions in dedicated files
- `create.js` - implement function that creates new file `fresh.txt` with content `I am fresh and young` inside of the `files` folder (if file already exists `Error` with message `FS operation failed` must be thrown)
- `copy.js` - implement function that copies folder `files` files with all its content into folder `files_copy` at the same level (if `files` folder doesn't exists or `files_copy` has already been created `Error` with message `FS operation failed` must be thrown)
- `rename.js` - implement function that renames file `wrongFilename.txt` to `properFilename` with extension `.md` (if there's no file `wrongFilename.txt` or `properFilename.md` already exists `Error` with message `FS operation failed` must be thrown)
- `delete.js` - implement function that deletes file `fileToRemove.txt` (if there's no file `fileToRemove.txt` `Error` with message `FS operation failed` must be thrown)
- `list.js` - implement function that prints all array of filenames from `files` folder into console (if `files` folder doesn't exists `Error` with message `FS operation failed` must be thrown)
- `read.js` - implement function that prints content of the `fileToRead.txt` into console (if there's no file `fileToRead.txt` `Error` with message `FS operation failed` must be thrown)

### Command line interface(src/cli)

You should implement several functions in dedicated files

- `env.js` - implement function that parses environment variables and prints them to the console in the format `name1=value1; name2=value2`
- `args.js` - implement function that parses command line arguments and prints them to the console in the format `propName is value, prop2Name is value2`

### Modules(src/modules)

You should refactor file (you can add additional imports if needed)

- `cjsToEsm.cjs` - rewrite it to it's equivalent in ECMAScript notation (and switch extension to `.mjs`)

### Hash (src/hash)

You should implement several functions in dedicated files

- `calcHash.js` - implement function that calculates SHA256 hash for file `fileToCalculateHashFor.txt` and return it as `hex`

### Streams (src/streams)

You should implement several functions in dedicated files

- `read.js` - implement function that reads file `fileToRead.txt` content using Readable Stream and prints it's content into `process.stdout`
- `write.js` - implement function that writes into file `fileToWrite.txt` content using Writable Stream
- `transform.js` - implement function that reads from `process.stdin`, reverses text using Transform Stream and then writes it into `process.stdout`

### Zlib (src/zip)

You should implement several functions in dedicated files

- `compress.js` - implement function that compresses file `fileToCompress.txt` to `archive.zip` using `zlib` transform streams
- `decompress.js` - implement function that decompresses `archive.zip` using `zlib` transform streams

### Worker Threads (src/wt)

You should implement several functions in dedicated files

- `worker.js` - extend given function to work with data received from main thread and make it able to send result of the computation to the main thread
- `main.js` - implement function that creates number of worker threads (equal to the number of host machine CPUs) from file `worker.js` and able to send data to those threads and to receive result of the computation from them

### Child Processes (src/cp)

You should implement several functions in dedicated files

- `cp.js` - spawns child process from file `script.js`. This function should create IPC-channel between `stdin` and `stdout` of master process and child process:
    - child process `stdin` should receive input from master process `stdout`
    - child process `stdout` should send data to master process `stdin`