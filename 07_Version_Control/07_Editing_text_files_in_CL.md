
## Editing text files from Command Line

As you work with Command Line, you'll occasionally need to make edits to text based configuration files.

There are two challenges you may face when making these edits in a [GUI](http://en.wikipedia.org/wiki/Graphical_user_interface) based text editor like [Sublime](http://www.sublimetext.com/), TextEdit (Mac), Notepad (Win), etc.:

1. The file is locked/read-only and needs special priveledges; it will let you open in a GUI but won't let you save.

2. You can't find the file because it's hidden or in a hard-to-locate system path or is hidden.

3. You're SSH'd into a live server where you can't open files directly in your GUI.


There are several ways around these problems, and we'll look at solutions for both Mac/Unix and Windows.

For practice, we're going to attempt to make an edit to your system hosts file:

Mac: `/private/etc/hosts`

Windows: `c:/Windows/System32/drivers/etc/hosts`

<small>
FYI: Windows users: when you're SSH'd into your servers, you're tapped into a Unix based system, so in that case you'll actually want to follow the Mac/Unix instructions.
</small>

## Mac / Unix

If you open Finder and attempt to locate `/private/etc/hosts` you'll run into problems because it's in hidden directories. There are ways to toggle hidden files on, but rather than do that, we'll look at how we can edit `hosts` using a CL editor called *nano*:

Let's start by opening that hosts file:

	sudo nano /private/etc/hosts

We prefixxed our `nano` command with [sudo](http://ss64.com/osx/sudo.html). Sudo lets us execute the command as the *superuser* which is necessary because hosts is a locked file.

After that command you should see the hosts file loaded up in nano:

<img src='http://making-the-internet.s3.amazonaws.com/vc-nano.png'>

When working a GUI editor such as TextEdit, you can use the mouse to navigate around the file. With CL editors, however, you rely solely on the keyboard.

Nano, specifically, has many shortcuts that all start with the ctrl key. In documentation, the shortcuts are always prefixed with a `^` character.

For example, if you see `^X` it means hit *ctrl + X*; this command allows you to exit the file you're currently editing.

After hitting `^X` it will ask you if you want to save. Type the letter `y` for yes.

<img src='http://making-the-internet.s3.amazonaws.com/vc-nano-edit.png'>


For a quick reference of shortcuts available in nano check out this [cheat sheet](http://mintaka.sdsu.edu/reu/nano.html) and for a more thorough set of documentation check out the [nano editor homepage](http://www.nano-editor.org/).

### Hate nano?
Some people *love* working with command line text editors, others hate it. If you fall in the latter camp, you can prompt an edit session from your favorite GUI text editor using the `open` command. (Note, this only works on your local computer, not when SSH'd into a live server.)

For example, let's open up `hosts` using Sublime Text (if you use another text editor, replace the path to your editor of choice): 

	sudo open -a '/Applications/Sublime Text.app' /private/etc/hosts
	
With this method, you still get the benefits of using `sudo`, and you still can easily access a hidden system file, but you get to do it from the comforts of a GUI code editor. 


## Windows CL Text Editing

By default, Windows doesn't come with any of the good CL editors like nano, but it does come with a fantastically retro MS-Dos editor.

Type `edit` plus the path to your file:

	edit c:/Windows/System32/drivers/etc/hosts
	
<img src='http://making-the-internet.s3.amazonaws.com/vc-windows-command-line-editor.png'>

Alternatively, you could also open `hosts` with Notepad like so:

	notepad c:/Windows/System32/drivers/etc/hosts
	
Most versions of Windows will have no problems with you saving `hosts` from either the MS-Dos editor or NotePad, with the exception of Vista which will require you have administrator priveledges.

The easiest way to do this in Vista, then, is to first [manually open NotePad as the administrator](http://making-the-internet.s3.amazonaws.com/vc-open-as-admin-notepad.png).

Then, once it's open you can goto *File: Open…* to locate the hosts file. When browsing for hosts, make sure [*All Files* is selected in the finder window](http://making-the-internet.s3.amazonaws.com/vc-notepad-all-files-hosts.png), otherwise hosts won't display.