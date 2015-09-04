On Macs, Bash shell is accessed via an included application called **Terminal**.

Find it in `/Users/ComputerName/Applications/Utilities/` or just type `Terminal` into Spotlight.


## Customizing

There are many customizations you can make to your Command Line program that will make your day-to-day use easier.

For example, you can configure...
+ your prompt (i.e., the line you see where you enter commands)
+ the message you see when you first open Terminal
+ aliases you can use to make long commands shorter
+ your PATH variable

Our first configurations will be made via the file `~/.bashrc`.

We're going to provide you with a template `.bashrc` file you can start with and customize as needed.

Visit [bashrc](https://raw.githubusercontent.com/susanBuck/notes/master/07_Command_Line/999_bashrc) and copy its contents.

Next, open `~/.bashrc` with *nano*, a command line text editor. That's done with the command `nano` which we'll prefix with `sudo` in order to open the file as an administrator:

```bash
$ sudo nano ~/.bashrc
```

At this point, you'll see the contents of `~/.bashrc` which may or may not be empty. If it's empty, go ahead and paste in the contents we had you copy above. If it's not empty, paste in the contents *after* what is already there.

Save your changes in nano by hitting `ctrl` + `x`.

Nano will ask you if you want to *Save modified buffer*. Type the letter `y` to confirm that you do.

Nano will confirm what filename the changes will be saved to&mdash; in this case `.bashrc`. Hit enter to confirm the save.

Next, we need to edit `~/.bash_profile` and tell it to load `~/.bashrc`.

Open `~/.bash_profile` in nano:

```bash
$ sudo nano ~/.bash_profile
```

Paste in this code:

```bash
if [ -f ~/.bashrc ]; then
   source ~/.bashrc
fi
```

Hit `ctrl` + `x` to save and exit.
Type the letter `y` to confirm you want to save.

__Close and re-open Terminal for the changes to take effect.__

If everything works, you should see this whenever you open Terminal:

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-after-bashrc@2x.png' style='max-width:526px; width:100%' alt='After adding .bashrc script'>

Read through the template file, as it's well commented and explains everything it does.

That being said, below are some highlights. You don't need to do anything - as everything described is already set up for you in the given `.bashrc` template.






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

...Or getting to a frequently accessed directory:

```bash
# Example alias for quickly getting to a commonly used directory
alias htdocs='cd /Applications/MAMP/htdocs'
```

See the section under *Aliases* in the `.bashrc` file for full details.




## Prompt

The prompt is the line you see whenever CL is waiting for a command. In the template `.bashrc`, the prompt is configured to show you your current directory, plus, if you're in a directory that is a Git repository, it'll show you which branch you're on and if there are any changes to that branch.

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-prompt-customizations@2x.png' style='max-width:802px; width:100%;'>
