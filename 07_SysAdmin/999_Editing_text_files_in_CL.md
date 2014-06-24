## Editing text files from Command Line

As you work via the Command Line, you'll occasionally need to make edits to text based configuration files.

There are two challenges you may face when making these edits in a [GUI](http://en.wikipedia.org/wiki/Graphical_user_interface)-based text editor like [Sublime](http://www.sublimetext.com/), TextEdit (Mac), Notepad (Win), etc.:

1. The file is locked/read-only and needs special priveledges; it will let you open in a GUI but won't let you save.

2. You can't find the file because it's hidden or in a hard-to-locate system path or is hidden.

3. You're SSH'd into a live server where you can't open files directly in your GUI.


There are several ways around these problems, and we'll look at solutions for both Mac/Unix and Windows.



## Mac CL Text Editing

One Unix tool for editing files directly in your CL is `nano`:

	nano /Users/Susan/Documents/foobar.txt

Here's an example of nano at work, displaying a `hosts` file:

<img src='http://making-the-internet.s3.amazonaws.com/vc-nano.png'>

When working a GUI editor such as TextEdit, you can use the mouse to navigate around the file. With CL editors, however, you rely solely on the keyboard.

Nano, specifically, has many shortcuts that all start with the *ctrl* key. In documentation, the shortcuts are always prefixed with a `^` character.

For example, if you see `^X` it means hit *ctrl + X*; this command allows you to exit the file you're currently editing.

After hitting `^X` it will ask you if you want to save. Type the letter `y` for yes.

<img src='http://making-the-internet.s3.amazonaws.com/vc-nano-edit.png'>

For a quick reference of shortcuts available in nano check out this [cheat sheet](http://mintaka.sdsu.edu/reu/nano.html) and for a more thorough set of documentation check out the [nano editor homepage](http://www.nano-editor.org/).

If you ever need to edit a file that requires adminstrator priveleges, you can prefix your `nano` command with [sudo](http://ss64.com/osx/sudo.html). Sudo lets you execute a command as the *superuser*.


### Hate nano?
Some people *love* working with Command Line text editors, others hate it. If you fall in the latter camp, you can prompt an edit session from your favorite GUI text editor using the `open` command. (Note, this only works on your local computer, not when SSH'd into a live server.)

For example, let's open up `hosts` using Sublime Text (if you use another text editor, replace the path to your editor of choice): 

	sudo open -a '/Applications/Sublime Text.app' /private/etc/hosts
	
With this method, you still get the benefits of using `sudo`, and you still can easily access a hidden system file, but you get to do it from the comforts of a GUI code editor. 




## Windows CL Text Editing

By default, Windows doesn't come with any of the good CL editors like nano (even if you're using *Cmder*). Some Windows systems come with a fantastically retro MS-DOS-style editor which you can fire up with the `edit command`. For example:

	edit c:\Users\Susan\Documents\foobar.txt
	
Because this editor is pretty archaic, and not available on all Windows systems, we suggest using `notepad` to edit files:

	notepad c:\Users\Susan\Documents\foobar.txt
	
