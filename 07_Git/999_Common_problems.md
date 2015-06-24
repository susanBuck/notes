Note in the following code examples, always replace `your-username` and `repo-name` with *your* username and repo name.

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

## Problem: You're told your branch is ahead by x commits

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
