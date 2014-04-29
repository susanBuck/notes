Note in the following code examples, always replace `your-username` and `repo-name` with *your* username and repo name.




## Problem: LIVE SERVER - When you attempt to git clone you see an error related to HTTP or SSL

Symptom 1:

	Return: Initialized empty Git repository in /home/user/public_html/.git/
	error:  while accessing https://github.com/your-username/repo-name.git/info/refs
	fatal: HTTP request failed

Symptom 2: 
	
	Issue with the SSL CA cert (path? access rights?) while accessing https://github.com/username/repo-name.git/info/refs

First, try replacing the HTTPS protocol (`https://`) with the HTTP protocol (`http://`). Example:

	git clone http://github.com/your-username/repo-name.git

If that doesn't work, you'll have to disable SSL verify and use the HTTPS protocol (`https://`)

	git config --global http.sslVerify false
	git clone https://github.com/your-username/repo-name.git
	
<small>FYI: There's a third protocol, the git protocol (`git:\\`) that seems to work consistently, but is not ideal to use because you can only use it for pulling data from Github, not pushing. You shouldn't be doing much pushing from your live server, but it'll be nice to be able to just in case.
</small>


If none of the above work, the final protocol you can try is SSH:

1. [Follow these instructions to generate SSH keys and add them to Github](https://help.github.com/articles/generating-ssh-keys)
2. Then use this command: `git clone git@github.com:Username/repo-name.git`




	
## Problem: LIVE SERVER - Permissions Issue / You're getting a error 500  "Internal Server Error"

Run this command on the directory you're trying to access.

	chmod -R 755 /home/your-username/public_html/example/
	
`chmod` Changes the mode (i.e. permissions of a file)
`-R` Make the change recursively (i.e. to every file in the specified directory)
`755` Anyone can read/execute the file, only owner can write to it

<small>Reference: [ss64:chmod](http://www.ss64.com/bash/chmod.html), [unixref:chmod](http://www.unixref.com/guides/chmod-guide.php#5)</small>

Test your site. Does it load? 

If that fixed the problem we need to do a more permanent fix to prevent it happening every time you do a git pull.

Still on your live server, we're going to use the [Unix Visual Editor (vi)](http://www.ccsf.edu/Pub/Fac/vi.html) to make a change to a configuration file that will make it so that newly created files are created with the correct permissions.

Start with this command to open the .bashrc config file in vi:

	vi ~/.bashrc
	
To start editing the file type `i` (for insert). 
At the end of the file add this:

	umask 022 

<small>A umask of 022 allows only you to write data, but anyone can read data.</small>

Hit `esc` to exit insert mode.

Type `:wq` and hit enter to save your changes.

For this change to work, type `exit` to log out, then SSH back in.

Do a test by comitting/pushing a file locally, then do a pull on your live server. After this you should no longer see an Internal Server Error when you try to load your site in the browser.

<small>
Reference: [understanding umask](http://www.cyberciti.biz/tips/understanding-linux-unix-umask-value-usage.html)
</small>

<!--
If that fixed the problem, you might notice the problem reoccurs the next time you do a git pull. To get around this, you should create a *hook* - a bit of code that will automatically get executed whenever you do pulls.

In your repository there should be a folder `.git/hooks` with several `*.sample` files.

Create a new file in that directory called `post-merge` (don't end it with .sample). 

Make this new file executable:

	chmod a+x post-merge

Inside your post-merge file, add this code:

	#!/bin/sh
	find ~/public_html/ -type f -name '*.php' -print | xargs chmod 644

This code invokes your default shell, then searches all directories for any file that ends in .php.  It then hands those filenames to chmod, which sets them as 644. 

Save your work.

Git will run this script after `git pull` finishes.
-->


## Problem: LOCAL SERVER - Permissions Issue / You're getting a error 500 / "Internal Server Error"

Run this command

	chmod -R g-w /Users/your-username/sites/






## Problem: When you try to use any git command, you're told git is not installed

Symptoms look like this:

	git
	-bash: git: command not found

First thing to try: Double check you completely closed and re-opened the command prompt / Terminal window after installing Git. 

If that doesn't fix it...

This issue has only turned up on Macs so far, so the following instructions apply to Mac users:

See if the files for Git exist on your machine. The common git installation location on a Mac is in the `/usr/local/dir` directory. See if you can move into that directory:

	cd /usr/local/git/

Either it will work, or it will tell you that directory does not exist:

	-bash: cd: /usr/local/git/: No such file or directory

If it does not exist it's possible you may have missed the step of installing git. Confirm you visited [the git download page](http://git-scm.com/downloads) and downloaded Git.

If it does exist, the problem could be that your computer doesn't know the path to Git. Let's fix that.

Run this command to open your bash_profile file in a text editor. 
<small>(bash_profile contains configuration information for your [shell](http://en.wikipedia.org/wiki/Shell_(computing))).</small>

	sudo open ~/.bash_profile

In the file that opens up, add this line:

	export PATH=$PATH:/usr/local/git/bin/

Save and close your file, then run this command to essentially trigger the change you just made:

	source ~/.bash_profile
	
Now, try running a git command again.

<small>
Source: ([mountain-lion-git-command-not-found-2-min-fix](http://dwainm.wordpress.com/2012/12/19/mountain-lion-git-command-not-found-2-min-fix/))
</small>





## Problem: You haven't edited any files on the live server, but when you go to do a pull you get an error like this:

	error: Your local changes to '<filename>.php' would be overwritten by merge.  Aborting.
	Please, commit your changes or stash them before you can merge."

You run this command on the offending file

	git diff filename.php

And it reports back something like this:

	diff --git a/<filename>.php b/<filename>.php
	old mode 100755
	new mode 100644

This means something in the file permissions changed, but nothing in the actual file contents changed.

Solution: Run this command to tell git to ignore file mode changes 

	git config core.filemode false

<small>
Source: ([Stackoverflow](http://stackoverflow.com/questions/1257592/removing-files-saying-old-mode-100755-new-mode-100644-from-unstaged-changes-in))
</small>


## Problem: You can install WAMP, but the icon never lights up green

* Are you running Skype? If so, exit it and then try starting the server ([source](http://befused.com/wamp/wamp-skype-conflict))
* You may need to download the extra packages it listed when you choose your WAMP install ([screenshot](http://content.screencast.com/users/susanBuck/folders/Jing/media/63924de8-6a56-4a64-a852-4b3b68bf7c8f/00002852.png))



## You're told your branch is ahead by x commits

Example:

	# On branch master
	# Your branch is ahead of 'origin/master' by 5 commits.
	#
	nothing to commit (working directory clean)
	
This isn't indicative of any major problem but can be cleared up with the following command:

	git fetch origin

Fetch seems to update the local representation of the remote branch, which doesn't necessarily happen when you do the git pulls.

Note, this only happens when you do `git pull origin master` not `git pull`

<small>
Reference: [StackOverflow 1](http://stackoverflow.com/questions/14835515/local-git-clone-is-ahead-of-origin-even-though-no-local-changes-were-made) [StackOverflow 2](http://stackoverflow.com/questions/2432579/git-your-branch-is-ahead-by-x-commits)
</small>




## Still having problems? Compare your repository git config file against this working sample

Via CL, navigate to the repository in question then run this command:

	open .git/config
	
It will open the Git config file for that repository in your text editor.

To compare and contrast, here's a sample config file

	[core]
		bare = false
		repositoryformatversion = 0
		filemode = true
		logallrefupdates = true
		ignorecase = true
	[branch "master"]
	[remote "master"]
		url = https://github.com/your-username/repo-name.git
		fetch = +refs/heads/*:refs/remotes/master/*
	[branch "master"]
		remote = master
		merge = refs/heads/master
