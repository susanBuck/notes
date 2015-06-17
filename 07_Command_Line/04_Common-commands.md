
## Common Commands
| Description        | Command
| ------------- |:-------------:| 
| Find out which directory you're in <br> (*present working directory*) | `pwd`
| Go home | `cd ~`
| List the contents of the current directory | `ls` 
| List contents with hidden files & permissions | `ls -la` 
| Change to a directory | `cd /path/to/foobar` 
| Go back one directory | `cd ../`   
| Go back two directories | `cd ../../`   
| Make a directory in current directory | `mkdir foobar` 
| Remove a file (with confirmation) | `rm -i foobar.txt` 
| Remove a directory (with confirmation) | `rm -Ri foobar/`   
| Create a new text-based file | `touch foobar.txt`
| Re-enter previous commands | Up arrow 
| Abort | ctrl + c



## Common Git Commands
| Description        | Command 
| ------------- |:-------------:| -----:|
| What files have changed? | `git status` | 
| Stage a file that's ready to be committed |  `git add foobar.txt`  |
| Stage all changed files |  `git add --all`  |
| Commit |`git commit -m "Commit message goes here"` |
| Push | `git push origin master`|
| Pull | `git pull origin master` |
| Revert any changes to a file | `git checkout foobar.txt` |
| Find out what has changed in a file | `git diff foobar.txt` |
| Initiate a new repo in a directory | `git init` |
| Clone an existing repository | `git clone http://url/to/repostory/` |
| Find out your config settings for the repository you're in | `git config --list` |
| Find out your global git config settings | `git config --global --list` |



## Resources:
- [LPTHW: Command Line Crash Course](http://learnpythonthehardway.org/book/appendixa.html)
- [Tutsplus: 7 Simple and Useful Command-Line Tips](http://code.tutsplus.com/tutorials/7-simple-and-useful-command-line-tips--net-11608)
- [ExplainShell.com](http://explainshell.com/) Type in any command and it will break down each piece.
- [Git Cheat Sheet](http://www.git-tower.com/files/cheatsheet/Git_Cheat_Sheet_grey.pdf)
- [Command Cheat Sheet](https://d1b10bmlvqabco.cloudfront.net/attach/hykay018bam4zp/hzpj56v4gkv2if/i0e6xgtr3j3y/linuxcheatsheet.pdf)
- [Another Command Cheat Sheet](http://www.pixelbeat.org/cmdline.html)
