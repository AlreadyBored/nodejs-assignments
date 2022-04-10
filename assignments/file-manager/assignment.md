# Assignment: File Manager

## Description

Your task is to implement File Manager using Node.js APIs.

The file manager should be able to do the following:

- Work using CLI
- Perform basic file operations (copy, move, delete, rename)
- Utilize Streams API
- Get information about the host machine operating system
- Spawn child processes and interact with them
- Perform CPU-intensive calculations using Worker Threads
- Compress and decompress files

## Technical requirements

- No external dependencies should be required
- The program is started by npm-script start in following way:
npm run start -- --username=*your_username* --password=*your_password*
- After starting the program displays the following text in the console (with same colors and formatting)  
<span style="color:green">Welcome to the File Manager, **Username**!</span>  
- After program work finished the program displays the following text in the console (with same colors and formatting):  
<span style="color:green">Thank you for using File Manager, **Username**!</span>  

- At the start and after each end of input/operation current working directory should be printed in following way:
You are in <span style="color:blue">*path to working directory*</span>
- Starting working directory is current user's home directory (for example, on Windows it's something like `system_drive/Users/username`)
- By default program should prompt user in console to print commands and wait for results  
- After all operations following message should be shown:
    - Operation *operation name* <span style="color:green">succeed</span>
    - Operation *operation name* <span style="color:red">failed</span>

List of operations and their syntax:
- Navigation & working directory
    - Go upper from current directory
    ```bash
    nwd up
    ```
    - Go to dedicated folder from current directory
    ```bash
    nwd go --path path_to_directory
    ```
    - List all files and folder in current directory
    ```bash
    nwd ls
    ```
- Basic operations with files
    - Read file and print it's content in console: 
    ```bash
    file cat --file path_to_file
    ```
    - Write in file (prompts user to write additional content in file until he writes `EOW`): 
    ```bash
    file add --file path_to_file
    ```
    - Rename file: 
    ```bash
    file rn --file path_to_file --n new_filename
    ```
    - Copy file: 
    ```bash
    file cp --file path_to_file --destination path_to_new_directory
    ```
    - Move file: 
    ```bash
    file mv --file path_to_file --destination path_to_new_directory
    ```
    - Delete file: 
    ```bash
    file rm --file path_to_file
    ```
- Operating system info (prints following information in console)
    - Get EOL (default system End-Of-Line): 
    ```bash
    os --EOL
    ```
    - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them): 
    ```bash
    os --cpus
    ```
    - Get home directory: 
    ```bash
    os --homedir
    ```
    - Get current *system user name* (Do not confuse with the username that is set when the application starts): 
    ```bash
    os --username
    ```
    - Get CPU architecture for which Node.js binary has compiled: 
    ```bash
    os --architecture
    ```
- Child processes
    - Spawn of the child process (creates IPC channel and prints newly created process's id)
    ```bash
    cp spawn --source path_to_source
    ```
    - Send data in cp (only strings are supported)
    ```bash
    cp send --id cp_id data data_to_send
    ```
    - Read available data from cp and print it to console
    ```bash
    cp read --id cp_id
    ```
- Hash calculation (uses Worker Threads internally)
    - Calculate hash for file 
    ```bash
    hash --filename *path_to_file*
    ```
- Compress and decompress operations
    - Compress file (using Brotli algorytm)
    ```bash
     zip compress --filename path_to_file --destination path_to_destination
    ```
    - Decompress file (using Brotli algorytm)
    ```bash
     zip decompress --filename path_to_file --destination path_to_destination
    ```
    