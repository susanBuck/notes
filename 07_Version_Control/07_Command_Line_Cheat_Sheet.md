
## Navigating around
| Description        | Mac/Unix Command           | Windows Command |
| ------------- |:-------------:| -----:|
| List the contents of the current directory | `ls` | `dir` |
| List contents with hidden files & permissions | `ls -a` | `dir /a` |
| Change to a directory      			     | `cd /path/to/directory-name`      |  same as Mac  |
| Go back one directory 					 | `cd ../`      		   |  same as Mac  |
| Make a directory in current direcotory | `mkdir directory-name` | same as Mac |
| Remove a file 							 | `rm name_of_file.txt`   | `del name_of_file.txt` |
| Remove a directory 							 | `rm -R directory-name/`   | `rmdir directory-name/ /S` |
| Create a new text-based file | `touch filename.txt` | `cd. > filename.txt`
| Open a text-based file to edit <br><small>[More info...](/Version_Control/Editing_text_files_in_CL)</small> | `open filename.txt` | `notepad filename.txt` |
| Clear the screen | `clear` | `cls`
| Re-enter previous commands | Up arrow | same as Mac

## Git Specific
| Description        | Command (Same for Mac/Unix/Win)
| ------------- |:-------------:| -----:|
| What files have changed? | `git status` | 
| Stage a file that's ready to be committed |  `git add name_of_file.txt`  |
| Commit |`git commit -m "Commit message goes here"` |
| Push | `git push origin master`|
| Pull | `git pull origin master` |
| Revert any changes to a file | `git checkout name_of_file.txt` |
| Find out what has changed in a file | `git diff name_of_file.txt` |
| Initiate a new repo in a directory | `git init` |
| Clone an existing repository | `git clone http://url/to/repostory/` |
| Find out your config settings for the repository you're in | `git config --list` |
| Find out your global git config settings | `git config --global --list` |



## More in-depth cheat sheets:

- [ExplainShell.com](http://explainshell.com/) fantastic tool; type in any command and it will break down each piece.
- [General Mac CL commands](http://www.pixelbeat.org/cmdline.html)
- [General Windows CL commands](http://blog.simplyadvanced.net/cheat-sheet-for-windows-command-prompt/)
- [Git Specific](http://www.git-tower.com/files/cheatsheet/Git_Cheat_Sheet_grey.pdf)
