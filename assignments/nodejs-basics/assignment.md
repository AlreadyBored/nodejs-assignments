# Assignment: Node.js basics

## Description

Your task is to complete several simple tasks to learn Node.js basics

Assignment contains several subfolders. Your task is to implement necessary functionality inside them

## Technical requirements

- Any external tools and libraries are prohibited

## Subtasks

### File system (src/fs)

You should implement several functions in dedicated files

- `create.js` - implement function that creates new file `fresh.txt` with content `I am fresh and young` inside of the `files` folder
- `copy.js` - implement script that copies folder `files` files with all its content into folder `files_copy` at the same level
- `rename.js` - implement function that renames file `wrongFilename.txt` to `properFilename` with extension `.md`
- `delete.js` - implement function that deletes file `fileToRemove.txt`
- `list.js` - implement function that prints all filenames from `files` folder into console
- `read.js` - implement function that prints content of the `fileToRead.txt` into console

### Command line interface(src/cli)

You should implement several functions in dedicated files

- `args.js` - implement function that parses environment variables
- `commands.js` - implement function that parses command line arguments

### Modules(src/modules)

You should refactor files

- `cjsToEsm.cjs` - rewrite it to it's equivalent in ECMAScript notation
- `esmToCjs.mjs` - rewrite it to it's equivalent in CommonJS notation

### Hash (src/hash)

You should implement several functions in dedicated files

- `calcHash.js` - implement function that calculates SHA256 hash for file `fileToCalculateHashFor.txt`

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

- `cp.js` - spawns child process from file `script.py`. This function should create IPC-channel between `stdin` and `stdout` of master process and child process:
    - child process `stdin` should receive input from master process `stdout`
    - child process `stdout` should send data to master process `stdin`