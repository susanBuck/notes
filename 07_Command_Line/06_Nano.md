Nano was briefly covered in the Primer section, but lets take a closer look at why you would want to use nano, and instructions on how to use nano as an administrator.

---

There are many ways you can edit text files on your computer. You can use a GUI like TextEdit (Mac), Notepad (Windows), Atom, etc. Or you can use a Command Line based text editor such as nano, vim, or vi.

Some developers love CL editors, others prefer GUIs. If you're in the latter category, there will still be times when you need to use a CL text editor because a GUI editor will have limitations. For example:

1. Some files are locked/read-only and needs administrator privileges to alter; your GUI editor may let you open the file, but it won't let you save.

2. You can't find the file you need to edit because it's hidden or in a hard-to-locate system path.

3. You're SSH'd into a live server where you can't open files directly in your GUI.

Given this, it's important to feel comfortable with a CL based editor. For our purposes, we'll use **nano**. It's not the most powerful CL editor, but it'll get the job done and it's the simplest to work with.

Let's look at how to use nano...


## Opening files
You can initiate editing a file like this:

```bash
$ nano example.txt
```

In our example, we're working with a file called `example.txt` that has the contents `Hello World!` in it.

Once we initiate nano on this file, we see this:

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-nano-example-txt@2x.png' class='' style='max-width:989px; width:100%' alt=''>

Once your file is open in nano you can start making edits. Use the arrow keys on your keyboard to navigate around the file.




## Saving
Nano uses keyboard shortcuts that all start with the *ctrl* key. In documentation, the shortcuts are always prefixed with a `^` character.

For example, if you see `^X` it means hit *ctrl + X*; this command allows you to exit the file you're currently editing.

After hitting `^X` it will ask you if you want to save. Type the letter `y` for yes and then hit *Enter*.

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-nano-edit@2x.png' class='' style='max-width:989px; width:100%' alt=''>

For a quick reference of shortcuts available in nano check out this [cheat sheet](http://mintaka.sdsu.edu/reu/nano.html) and for more thorough documentation check out the [nano editor homepage](http://www.nano-editor.org/).




## Edit as admin

Some files require administrator privileges to edit. You can examine the permissions of a file to find out if it does need admin privileges, or you'll simply find out when you go to edit a file as a regular user and you're told you don't have access.

On Mac/Unix environments, you can prefix your `nano` command with [sudo](http://ss64.com/osx/sudo.html) to run the command as a *super user*:

```bash
$ sudo nano example.txt
```

In Windows/Cmder, you can use the [elevate](http://code.kliu.org/misc/elevate/) command:

```bash
$ elevate nano example.txt
```
