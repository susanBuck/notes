## Editing text files from Command Line

As you work via the Command Line, you'll occasionally need to make edits to text based configuration files.

There are two challenges you may face when making these edits in a [GUI](http://en.wikipedia.org/wiki/Graphical_user_interface)-based text editor like [Sublime](http://www.sublimetext.com/), TextEdit (Mac), Notepad (Win), etc.:

1. The file is locked/read-only and needs special privileges; it will let you open in a GUI but won't let you save.

2. You can't find the file because it's hidden or in a hard-to-locate system path.

3. You're SSH'd into a live server where you can't open files directly in your GUI.

Given this, feeling comfortable editing text files via CL is important. 

In the following instructions we'll cover the CL text editor *nano* which will work on all three platforms we'll use in this course:

+ Mac's Terminal
+ Window's Cmder
+ When SSH'd into your live/production Linux servers.




## Opening
You can initiate editing a file like this:

```bash
$ nano example.txt
```

In our example, we're working with a file called `example.text` that just has the contents `Hello World!` in it.

Once we initiate nano on this file, we see this:

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-nano-example-txt@2x.png' class='' style='max-width:989px; width:100%' alt=''>


Once your file is open in nano you can start making edits. Use the arrow keys on your keyboard to navigate around the file.

## Saving

Nano uses keyboard shortcuts that all start with the *ctrl* key. In documentation, the shortcuts are always prefixed with a `^` character.

For example, if you see `^X` it means hit *ctrl + X*; this command allows you to exit the file you're currently editing.

After hitting `^X` it will ask you if you want to save. Type the letter `y` for yes.

<img src='http://making-the-internet.s3.amazonaws.com/sysadmin-nano-edit@2x.png' class='' style='max-width:989px; width:100%' alt=''>

For a quick reference of shortcuts available in nano check out this [cheat sheet](http://mintaka.sdsu.edu/reu/nano.html) and for a more thorough set of documentation check out the [nano editor homepage](http://www.nano-editor.org/).

## Tips
Mac/Linux Only:
If you ever need to edit a file that requires administrator privileges, you can prefix your `nano` command with [sudo](http://ss64.com/osx/sudo.html). Sudo lets you execute a command as the *superuser*.

```bash
$ sudo nano example.txt
```


