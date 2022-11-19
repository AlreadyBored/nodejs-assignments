# Module "Node.js basics"

## Technical requirements
- Use 18 LTS version of Node.js

# How to check student's project

1) Clone repository with the project to check with `git clone [HTTPS]` or download it.
(where HTTPS is the GitHub URL of the project to be used to clone. To get it:
 a) go to GitHub repository that you want to clone;
 b) click *Code* and copy given URL.)

2) Open following files:

 - [Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/nodejs-basics/assignment.md)
  - [Score calculation](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/nodejs-basics/score.md)

3) Open project in Visual Studio Code or any other code editor.

4) Start to check subtasks according to the assignment description.
For check simplification students expected to have npm-scripts in `package.json` how to run every subtask.
If not, follow below instruction:

All tasks are located inside `src` folder. Open terminal in **src** folder of downloaded project.
For example 1st subtask **create.js** located in *fs* folder:
- Run `node fs/create.js` in your terminal opened in *src* folder.
or go into fs/ subfolder of the task and run `node create.js`.

## Steps to check subtask
- According to this subtask after running this function there should be file named `fresh.txt` created in *files* folder ( At the beggining there was no such file, if found - delete it). 
- Open this file `fresh.txt` and you have to see below text created by the function after you run it: 
*I am fresh and young*.
- Try to run `node fs/create.js` again and the error *FS operation failed* must be thrown.
- If all above works as expected then add *+6* points to the total score as written in `Score calculation`.
- If function works partly deduct points from the maximum allowed for this task.
  (For example function creates fresh.txt file, but on a second run it doesn't throw an error, half of task is executed only. Add only *+3* points for this subtask).
  -If function is not implemented at all mark it as *0*.

- Continue to check all other subtasks in a same way. Add points for each to grand total.

5)  Once you finish to check all subtasks then check for a forfeit if any:
  - `package.json` should not have any external tools/libraries as dependencies.
    **-95% of total task score** Any external tools/libraries are used
  - Check that there are no commits made after deadline.
   **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.).
   
6) Submit total score with details check description to cross-check section of this task at [App RS School](https://app.rs.school/) before deadline.
