On Mac's, Bash shell is accessed via an included application called **Terminal**.

Find it in `/Users/ComputerName/Applications/Utilities/` or just type `Terminal` into Spotlight.


## Customizing

There are many customizations you can make to your Command Line program that will make your day-to-day use easier.

For example, you can configure...
+ your prompt (i.e. the line you see where you enter commands)
+ the message you see when you first open Terminal
+ aliases you can use to make long commands shorter
+ your PATH variable

Customizations are made via the file `~/.bashrc`, which is what bash reads and executes every time you open Terminal.

We're going to provide you with a template .bashrc you can start with, and customize as needed.

Visit [`bashrc`](999_bashrc) and copy its contents.

Next, open `~/.bashrc` using nano and paste in what you just copied.

Save your changes in nano, then close and re-open Terminal for the changes to take effect.

If everything works, you should see this whenever you open Terminal:

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-after-bashrc@2x.png' style='max-width:526px; width:100%' alt='After adding .bashrc script'>

Read through the above file, as it's well commented and explains everything it does.

That being said, below are some highlights. You don't need to do anything - as everything described is already set up for you in the given bashrc template.




## Sublime from Command Line

Sublime Text includes a Command Line tool called `subl` located at `/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl`.

This tool will let you open files and projects in Sublime directly from the Command Line as well working as an EDITOR for git.

You don't want to have to run the full path to `subl` everytime you use it, so in the given `.bashrc` template, the path to Sublime's CL tool is added to your PATH variable:

```bash
export PATH="/Applications/Sublime Text.app/Contents/SharedSupport/bin/":$PATH
```

To test, try opening any text based file:

```bash
subl foobar.txt
```

For more details, run with the help flag:

```bash
subl --help
```

Ref: [https://www.sublimetext.com/docs/2/osx_command_line.html]



## Aliases
Aliases provide shortcuts to commonly used commands. 

For example, in the template there's an alias called `ll` that calls the list command (`ls`) with commonly used flags (shows file types, colors the output, etc.):

```bash
alias ll="ls -laFG"
```

You can create aliases for commonly used commands, like SSH'ing into a server:

```bash
# Example alias for SSH'ing into a server
alias myserver="ssh user@111.111.111.111"
```

...Or getting to a frequencly acccessed directory:

```bash
# Example alias for quickly getting to a commonly used directory
alias htdocs='cd /Applications/MAMP/htdocs'
```

See the section under *Aliases* for full details.




## Prompt

The prompt is the line you see whenever CL is waiting for a command. In the template .bashrc, the prompt is configured to show you your current directory, plus, if you're in a directory that is a Git repository, it'll show you which branch you're on and if there are any changes to that branch.

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-prompt-customizations@2x.png' style='max-width:802px; width:100%;'>

