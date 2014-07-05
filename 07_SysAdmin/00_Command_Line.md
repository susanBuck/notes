## Resources:
- [Tutsplus: 7 Simple and Useful Command-Line Tips](http://code.tutsplus.com/tutorials/7-simple-and-useful-command-line-tips--net-11608)
- [ExplainShell.com](http://explainshell.com/) fantastic tool; type in any command and it will break down each piece.
- [General Mac CL commands](http://www.pixelbeat.org/cmdline.html)
- [Git Specific](http://www.git-tower.com/files/cheatsheet/Git_Cheat_Sheet_grey.pdf)




## What is the Command Line?
The **Command Line Interface (CLI)** is a means of interacting with your computer via text commands. While it seems that the CLI is archaic compared to GUIs (Graphical User Interfaces) it's actually a very powerful method for interacting with files and programs.

The application where you type your commands (and see any results of those commands) is called a *shell*. There are different types of shells, but the most common is the **Bash shell** which is what Linux and Mac systems use, via the application called **Terminal**.

Windows systems includes the limited **Command Prompt** application, which has nowhere near the power of *Bash*. Given this, we're going to use a console emulator called **Cmder** which will allow you to *mostly* replicate anything you'd do in a Bash shell.




## Programs

### Mac - **Terminal**

Comes installed on Macs by default. 

Find in `/Users/ComputerName/Applications/Utilities/` or just type `Terminal` into Spotlight.

### Windows - **Cmder** 

Cmder is a Windows frontend for the standard Windows Command Shell (aka `cmd.exe`)

Download from <http://bliker.github.io/cmder/> (Make sure you download the **full version** of Cmder, not the mini version.)





## Common Commands
| Description        | Command
| ------------- |:-------------:| 
| Find out which directory you're in <br> (Present working directory) | `pwd`
| List the contents of the current directory | `ls` 
| List contents with hidden files & permissions | `ls -a` 
| Change to a directory | `cd /path/to/foobar` 
| Go back one directory | `cd ../`   
| Go back two directories | `cd ../../`   
| Make a directory in current direcotory | `mkdir foobar` 
| Remove a file | `rm foobar.txt` 
| Remove a directory | `rm -R foobar/`   
| Create a new text-based file | `touch foobar.txt`
| Re-enter previous commands | Up arrow 
| Abort | ctrl + c



## Common Git Commands
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



