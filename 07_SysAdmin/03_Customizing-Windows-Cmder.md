## Aliases

Run `alias help` for details

Aliases are stored in `config/aliases`

Run `alias name=full command` to create an alias, or edit `config/aliases`.





## Sublime from Command Line

Sublime Text includes a Command Line tool called `subl.exe` located at `C:\Program Files\Sublime Text 3.app\subl.exe`.

This tool will let you open files and projects in Sublime directly from the Command Line as well working as an EDITOR for git.

To make it easy to launch this tool, you can add its directory to your PATH variable. This way, when you execute `subl` from the command line, Windows will know where to look for it.

Add the following dir to your PATH. Note we're using the short path to `subl.exe` which is found by running `DIR /X`. If your short path is slightly different then above, make the necessary edits.

```
C:\PROGRA~1\SUBLIM~1\
```

Ref: 
+ <https://scotch.io/tutoria«command-line-using-subl-exe-windows>
+ [Editing PATH in Windows](#)




## Changing the prompt character

In `config/prompt.lua` set in the function `lambda_prompt_filter()`.

Defaults to a lambda character.




## Git prompt

When you're in a git directory, the prompt is customized by the file `/config/git.lua`, in the method `git_prompt_filter()`. This will do things like add the branch name, make the colors red if there are changes, etc.


