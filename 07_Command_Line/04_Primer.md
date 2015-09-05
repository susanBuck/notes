## Command line primer

Now that you're set up, fire up Terminal or Cmder and let's get started.

In the following notes, you'll follow along with a series of commands. In all the notes, each command is prefixed with a `$` to signify that the line is being run in command line. You don't have to actually type in the `$`.


## Navigating around directories

One of the things you'll do most in CL is work with files on your computer and navigate around directories.

When you first open Terminal/Cmder you should be in your home directory, and you can confirm this by typing in the command `pwd` which is short for *present working directory*, i.e. *where am I?*

In my case, on a Mac I see this as a result of `pwd`:

    $ pwd
    /Users/Susan

On Windows, I see this:

    $ pwd
    c:\Users\Susan

Next, type in the command `ls` (list) which will show you everything in your home directory.

One of the directories you should see listed is your Desktop.

Move to your Desktop folder using the `cd` (change directory command).

    $ cd Desktop

Use the `ls` (list) command again to see the contents of your Desktop:

    $ ls

On the desktop let's create a new, empty directory using the `mkdir` command. We'll call the directory `practice`.

    $ mkdir practice

Now, move into this new directory:

    $ cd practice

You can use the `pwd` command again to confirm you're in the `practice` folder.


## Creating text files

In our new practice directory, let's create a new file called `example.txt` with the `touch` command:

    $ touch example.txt

Use the `ls` command again to see that the file was created:

    $ ls

Now let's edit this file...

## Editing text files with nano

To edit text files directly from the command line, you can use the simple CL text editor called nano. Nano is installed by default on Mac and is built into the Cmder program we're using in this class.

    $ nano example.txt

Enter some text into the file, then hit `ctrl` + `x` to save your changes. It will ask you to type in the letter `y` to confirm your save. After typing in `y`, hit Enter.

To confirm your changes were made, you can use the `cat` (concatenate) command which will output the contents of any text file directly in the console:

    $ cat example.txt

Look good?


## Deleting text files

We've created a file, we've edited it, now let's delete it by running this command:

    $ rm -i example.txt
    remove example.text? (type 'y' for yes and hit Enter)

Note the addition of the `-i`... This is a **flag** which is how you send extra instructions when using commands. In this case the `i` flag is short for `interactive`, meaning it'll ask you before deleting files. It's a good habit to use the `i` flag when working with `rm` so you don't accidentally delete anything you didn't mean to.


## Using man pages

__Mac users__: To learn more about any of the commands so far, you can type `man` followed by the command name. This will tell you how to use the command and all the flag options you have. These "manuals" are called "man pages", and they exist for almost all command line programs.

    $ man rm

The output from the `man` command will often span multiple screens. Use the `Enter` key to page through the output, or hit `ctrl` + `z` to exit.

__Windows/Cmder users__: Unfortunately `man` does not work in Cmder, but you can learn more about common commands by typing them it in at [ExplainShell](http://explainshell.com/).

## Cleaning up

Before we wrap up, let's clean up the `practice` directory we created.

First, run the following command to move up one directory (i.e., out of the `practice` directory):

    $ cd ../

And now remove `practice`:

    $ rm -ir practice

Note the addition of the `r` flag, which is needed for recursively removing directories and their contents.


## Installing git

Git is a command line tool we'll use in this course, so now's a good time to make sure you have it installed.

To see if Git is installed, run this command:

    $ git

If git is installed, you'll see a bunch of instructions and you're good to go.

Cmder comes with Git installed, so Windows users are all set.

Mac users, however, may see *Command not found* when they try to run `git`.

To fix this, head over to <https://git-scm.com/downloads> and click the link to download Git for Mac.

Once it's installed, run the installer, then close and re-open Terminal (this step is important!).

Try running `git` again and you should be all set.


## In conclusion...

There's lots more you can do in CL besides working with files and directories. The above exercise was just to get you familiar with working with commands and some basic directory navigation.

See [Common Commands](https://github.com/susanBuck/notes/blob/master/07_Command_Line/05_Common-commands.md) for a quick cheat sheet on all the commands we used above.
