## Programs

__Mac__

*Terminal* (comes by default with your OS)

__Windows__

*cmder* <http://bliker.github.io/cmder/>




## Navigating around
| Description        | Command
| ------------- |:-------------:| 
| Find out which directory you're in <br> (Present working directory) | `pwd`
| List the contents of the current directory | `ls` 
| List contents with hidden files & permissions | `ls -a` 
| Change to a directory | `cd /path/to/foobar` 
| Go back one directory | `cd ../`      
| Make a directory in current direcotory | `mkdir directory-name` 
| Remove a file | `rm foobar.txt` 
| Remove a directory | `rm -R foobar/`   
| Create a new text-based file | `touch foobar.txt` 
| Open a text-based file to edit <br><small>[More info...](/Version_Control/Editing_text_files_in_CL)</small> | Clear the screen | `clear` 
| Re-enter previous commands | Up arrow 


## Git Specific
| Description        | Command 
| ------------- |:-------------:| -----:|
| What files have changed? | `git status` | 
| Stage a file that's ready to be committed |  `git add foobar.txt`  |
| Commit |`git commit -m "Commit message goes here"` |
| Push | `git push origin master`|
| Pull | `git pull origin master` |
| Revert any changes to a file | `git checkout foobar.txt` |
| Find out what has changed in a file | `git diff foobar.txt` |
| Initiate a new repo in a directory | `git init` |
| Clone an existing repository | `git clone http://url/to/repostory/` |
| Find out your config settings for the repository you're in | `git config --list` |
| Find out your global git config settings | `git config --global --list` |




## More in-depth cheat sheets:

- [ExplainShell.com](http://explainshell.com/) fantastic tool; type in any command and it will break down each piece.
- [General Mac CL commands](http://www.pixelbeat.org/cmdline.html)
- [Git Specific](http://www.git-tower.com/files/cheatsheet/Git_Cheat_Sheet_grey.pdf)
