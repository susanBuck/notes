## Command Line Primer

Git is a command line tool, so before digging into Git it'll be useful to go over some basics of working in the command line (CL). In the following primer, we'll cover instructions for getting your command line set up, as well as some basic commands.

1. [Intro](https://github.com/susanBuck/notes/blob/master/07_Command_Line/00_Intro.md): Learn what Command Line is, and some handy resources you may want to bookmark.
2. Set up:
    + [Mac Terminal](https://github.com/susanBuck/notes/blob/master/07_Command_Line/02_Mac-Terminal.md): For Mac users: this doc will walk you through Terminal, which is the program you'll use to work in the Command Line. In addition to a basic intro, we'll also set you up with some handy customizations.
    + [Windows Cmder](https://github.com/susanBuck/notes/blob/master/07_Command_Line/03_Windows-Cmder.md): For Windows users: this doc will get you set up with Cmder, which is the Command Line program we'll be using. 

**If you hit *any* bumps with the above instructions, don't fret! Feel free to show up to class early, and we can help you one-on-one. We can also go around and help anyone who is stuck at the start of the class.**




## Practice

Now that you're set up, fire up Terminal or Cmder and let's get started.

### Navigating on the command line

One of the things you'll do most in CL is work with files on your computer and navigate around directories.

When you first open Terminal/Cmder you should be in your home directory, and you can confirm this by typing in the command `pwd` which is short for *present working directory*, i.e. *where am I?*

In my case, on a Mac I see this as a result of pwd:


    $ pwd
    /Users/Susan


On Windows, I see this:


    $ pwd
    c:\Users\Susan


Next, type in the command `ls` (list) which will show you everything in your home direcory.

One of the directories you should see listed is your Desktop.

Move to your Desktop folder using the `cd` (change directory command). 


    $ cd Desktop


Use the `ls` (list) command again to see the contents of your Desktop:

    $ ls


On the desktop let's create a new, empty directory using the `mkdir` command. We'll call the directory `practice`.

    $ mkdir practice


Now, move into this new directory:

    $ cd practice

### Working with text files

In our new practice directory, let's create a new file called `example.txt` with the `touch` command:

    $ touch example.txt


Use the `ls` command again to see that the file was created: 

    $ ls 


Now let's edit this file...

#### Editing with nano or notepad

Mac users you can edit it directly in the CL with a program called `nano`:

    $ nano example.txt

Enter some text into the file, then hit `ctrl` + `x` to save your changes. It will ask you to type in the letter `y` to confirm your save. After typing in `y`, hit Enter.

Windows users won't have access to `nano`, so you can open the file with plain old Notepad:

    $ notepad example.txt


This should bring up Notepad. Enter some text, save your changes, then close Notepad.

To confirm your changes were made, both Mac and Windows users can use the `cat` (concatenate) command which will output the contents of any text file directly in the console:


    $ cat example.txt

Look good?

#### Quitting files in vi on Mac

Mac and Linux users will also have the vi text editor installed, and some programs (including git) 
will use vi as their default text editor. We're recommending that you use either nano or Sublime 
because they are a bit more user-friendly when you're first learning. However, as you start using 
your command line more, you'll probably eventually end up in vi by accident. Just so that you know 
what it looks like when a document is opened in vi, let's try it once now. 

    $ vi example.txt

You should see the contents of your text file. Now, to quit without saving:

1. Press Esc
2. Press : (colon). The cursor should reappear at the lower left corner of the screen beside a colon prompt.
3. Enter the following: q!
4. Press enter / return.

If you want to experiment with using vi as a text editor, there are a lot of great primers online, 
but for now this should be enough to handle any surprise vi moments.

#### Deleting files on the command line

We've created a file, we've edited it, now let's delete it by running this command:


    $ rm -i example.txt
    remove example.text? (type 'y' for yes and hit Enter)


Note the addition of the `-i`... This is a **flag** which is how you send extra instructions when using commands. In this case the `i` flag is short for interactive, which means it'll ask you before deleting files. It's a good habit to use the `i` flag when working with `rm` so you don't accidentally delete anything you didn't mean to.

### Using man pages

To learn more about any of the commands so far, you can type `man` followed by the command name. This will tell you how to use the command and all the flag options you have.


    $ man rm


The output from the `man` command will often span multiple screens. Use the `Enter` key to page through the output, or hit `ctrl` + `C` to exit.

Those are the basics of working with directories and files with CL. See [Common Commands](https://github.com/susanBuck/notes/blob/master/07_Command_Line/04_Common-commands.md) for a quick cheat sheet on all the commands we used above.

### Cleaning up

Before we wrap up, let's clean up the `practice` folder we created.

First, run the following command to move up one directory (i.e., out of the `practice` directory):


    $ cd ../


And now delete:

    $ rm -i practice


## Installing git

To see if Git is installed on your computer, run this command:


    $ git


If git is installed, you'll see a bunch of instructions and you're good to go. 

Cmder comes with Git installed, so Windows users are all set.

Mac users, however, may see *Command not found* when they try to run `git`. 

To fix this, head over to <https://git-scm.com/downloads> and click the link to download Git for Mac. 

Once it's installed, run the installer, then close and re-open Terminal (this step is important!). 

Try running `git` again and you should be all set.


## In conclusion...

There's lots more you can do in CL besides working with files and directories. The above exercise was just to get you familiar with working with commands and some basic navigation.

As mentioned above, don't fret if you hit any bumps. We'll be on hand before, during and after class to walk you through any issues.

See you in class!








