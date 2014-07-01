Git is setup on your computer, Github.com is all configured&mdash; now it's time to practice with your first repository.

For the following scenario, we're going to create a new project called `hello-world` which we will initiate as a git repository and track on Github.com.


## Set up your practice project

Create a new directory in the document root of your local server called `hello-world`. 

Within this directory, create a new file called `README.md` with the following contents:

	# Hello World

	Just for practice


## Initiate your repository

From CL, within your `hello-world` directory, run the command `git init`. 

For example:

	$ cd /Users/Yourname/Documents/Sites/hello-world
	$ git init
	Initialized empty Git repository in /Users/Susan/Sites/hello-world/.git/




## Create a new remote repository on Github.com

Now, let's create a home for this project on Github.com.

In Github, create a __New Repository__ called `hello-world`. 

Use the following settings:

<img src='http://making-the-internet.s3.amazonaws.com/vc-hello-world-repository-on-github.png?@2x' style='max-width:854px; width:75%'>

After your repository is created, copy the SSH URL for your repository at Github:

<img src='http://making-the-internet.s3.amazonaws.com/vc-get-repo-url.png?@2x' style='max-width:812px; width:75%'>




## Connect your local repo and your remote repo

Returning to CL on your computer, run this command, replacing the SSH URL with the one you copied in the above step:

	$ git remote add github git@github.com:username/hello-world.git

This will create a connection between your local repository and the remote repository at Github.com. `github` is the nickname we're giving this connection.

Using the `git config -l` command you can verify your remote was added:

	$ git config -l
	
This should yield a bunch of lines, including the github remote:

	remote.github.url=git@github.com:username/hello-world.git



## Tips

* If you decide to remove an existing remote use this command: `git remote remove name-of-remote`.

* If you decide to update the URL for an existing remote, use this command: `git set-url name-of-remote new-remote-url`.

* You can tell if a directory is a git repository if it contains a hidden directory called `.git`:

<img src='http://making-the-internet.s3.amazonaws.com/vc-how-to-tell-if-a-dir-is-version-controlled.png?@2x' style='max-width:520px; width:75%'>

* All the git configurations for a given repository are stored in this `.git` directory, in a filed called `config`. You can edit your configurations via git commands, or by editing this file directly.

* Need to "un-git* a directory? All you have to do is delete the `.git` directory.

* If you get a message about `src refspec master does not match any.` after trying to push&mdash; it means you have not yet done a commit.

