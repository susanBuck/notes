## Git via Command Line
Git can be operated via either a GUI app or via the Command Line (CL).

We're going to use CL because this gives you the most powerful and consistent access to Git.

Once you get the hang of CL you can explore some visual apps.

## See if Git is installed

First, let's see if your computer already has Git installed by running the `git` command:

```bash
$ git
```

If you see a readout of a bunch of commands, it means Git is installed and you're good to go; skip down to the section titled *Initial Git Configuration*.

*Git is installed:*

<img src='http://making-the-internet.s3.amazonaws.com/vc-git-success@2x.png' style='max-width:589px; width:100%'> 

If, however, you see an error telling you the command `git` is not recognized or not found, you'll need to install Git.

*Git is not installed*:

<img src='http://making-the-internet.s3.amazonaws.com/vc-git-not-installed.png'>

## Windows Users
If you're using *cmder* and you downloaded the full version (as suggested), it comes with Git installed, so the above command should definitely show that Git ready to go. 

## Install Git using a package manager
If you're using Mac OS or a Linux distribution, and Git was *not* yet installed, we're going to install it using a package manager.

### Mac OS
On a Mac, we recommend using [homebrew](http://brew.sh/). You can install homebrew by running this command in your terminal:
```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
You can use homebrew to install a lot of other command line tools used in web development. Homebrew will also keep track of all the dependencies necessary to make any given tool work as well as make it easy to update command line tools that you've installed using homebrew.
[](Need to check if brew install requires opening a new terminal or aliasing git etc.)

### Linux
On debian-based systems:
```bash
sudo apt-get install git
```
On RedHat-based systems:
```bash
yum install git
```
## Other installation resources
If you're running an **older operating system** and the latest Git build doesn't work, you may have to try an older version of git. [You can find older builds of git here.](https://code.google.com/p/git-osx-installer/)

__Tips:__

Find out what version of git you're running: 
```bash
$ git --version
```

Find out where git is installed on Mac or Linux:

```bash
$ which git
```

Find out where git is installed on Windows:

```bash
$ where.exe git
```

## Initial Git configuration
[](Move this all to a configuration slide?)
Once you've confirmed Git is installed, you need to do some initial setup.

Run the following commands to set a user name and email key to be associated with any commits coming from your computer. Replace the name and email with your own details.

```bash
$ git config --global user.name "Sam Seaborn"
$ git config --global user.email sam@gmail.com
```

Run the following command to make any Git input color coded (i.e. easier to read):

```bash
$ git config --global color.ui true
```

## Which text editor to use

Sometimes git will need you to make changes in a text editor - for example, when adding a commit message.

When deciding which editor to use, git follows this order of preference: 

1. `$GIT_EDITOR` environment variable
2. `core.editor` configuration
3. `$VISUAL`
4. `$EDITOR`
5. Default chosen at compile time, which is usually vi.

Mac users: If you're using our .bashrc template, $GIT_EDITOR is set to Sublime Text if it exists, otherwise nano.





