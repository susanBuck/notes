Git is a command line tool, so before digging into Git it'll be useful to go over some basics of working in the command line (CL). In the following primer, we'll cover instructions for getting your command line set up, as well as some basic commands.

1. [Intro](https://github.com/susanBuck/notes/blob/master/07_Command_Line/00_Intro.md): Learn what Command Line is, and some handy resources you may want to bookmark.
2. Set up:
    + [Mac Terminal](https://github.com/susanBuck/notes/blob/master/07_Command_Line/02_Mac-Terminal.md): For Mac users: this doc will walk you through Terminal, which is the program you'll use to work in the Command Line. In addition to a basic intro, we'll also set you up with some handy customizations.
    + [Windows Cmder](https://github.com/susanBuck/notes/blob/master/07_Command_Line/03_Windows-Cmder.md): For Windows users: this doc will get you set up with Cmder, which is the Command Line program we'll be using. This doc will get you set up with everything you need.

If you hit *any* bumps with the above instructions, don't fret! Feel free to show up to class early, and we can help you one-on-one. We can also go around and help anyone who is stuck at the start of the class.




## Practice

Now that you're set up, fire up Terminal or Cmder and let's get started.

One of the things you'll do most in CL is work with files on your computer and navigate around directories. To start, let's move to your Desktop folder using the `cd` (change directory command). The location of your Desktop on Mac and Windows is slightly different, so run the respective command below:

Mac users:
```bash
$ cd ~/Documents
```

Windows users:
```bash
$ cd My Documents
```

(Moving forward, the commands are the same for Mac/Windows users)

Once you're there, run the command `pwd` (present working directory) which will output your current location so you can confirm you're in the right spot.
```
$ pwd
```

To see the contents of your Desktop, use the `ls` (list) command.
```
$ ls
```

Now on your desktop let's create a new, empty directory using the `mkdir` command. We'll call the directory `practice`.
```bash
$ mkdir practice
```

Now, move into this new directory:
```bash
$ cd practice
```

Now that we're in here, let's create a new file called `touch example.txt` with the `touch` command:
```bash
$ touch example.txt
```

Use the `ls` command again to see that the file was created: 
```bash
$ ls 
```

Now let's edit this file...

Mac users you can edit it directly in the CL with a program called `nano`:

```bash
$ nano example.txt
```

Enter some text into the file, then hit `ctrl` + `x` to save your changes.

Windows users won't have access to `nano`, so you can open the file with plain old Notepad:

```bash
$ notepad example.txt
```

This should bring up Notepad... enter some text, save your changes, then close Notepad.

To confirm your changes were made, both Mac and Windows users can use the `cat` (concatenate) command which will output the contents of any text file directly in the console:

```bash
$ cat example.txt
```

Look good?

We've created a file, we've edited it, now lets delete it by running this command:

```bash
$ rm -i example.txt
remove example.text? (type 'y' for yes and hit Enter)
```

Note the addition of the `-i`... This is a **flag** which is how you send extra instructions when using commands. In this case the `i` flag is short for interactive, which means it'll ask you before deleting files. It's a good habit to use the `i` flag when working with `rm` so you don't accidentally delete anything you didn't mean to.

To learn more about any of the commands so far, you can type `man` followed by the command name. This will tell you how to use the command and all the flag options you have.

```bash
$ man rm
```

The output from the `man` command will often span multiple screens. Use the `Enter` key to page through the output, or hit `ctrl` + `C` to exit.

That's the basics of working with directories and files with CL. See [Common Commands](https://github.com/susanBuck/notes/blob/master/07_Command_Line/04_Common-commands.md) for a quick cheat sheet on all the commands we used above.

Before we wrap up here, let's clean up the folder we created.

First, run the following command to move up one directory...i.e. out of the `example` directory:

```bash
$ cd ../
```

And now delete:
```bash
$ rm -i example
```

## Installing git

To see if Git is installed on your computer, run this command:

```bash
$ git
```

If git is installed, you'll see a bunch of instructions and you're good to go. 

Cmder comes with Git installed, so Windows users are all set.

Mac users, however, may see *Command not found* when they try to run `git`. To fix this, head over to <https://git-scm.com/downloads> and click the link to download Git for Mac. Once it's installed, run the installer then close and re-open Terminal (this step is important!). Try running `git` again and you should be all set.

