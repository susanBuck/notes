Git is set up on your computer, you have an account at Github.com&mdash; now it's time to practice with your first repository.

For the following scenario, we're going to create a new project called `hello-world` which we will initiate as a git repository and track on Github.com.


## Set up your practice project

Move into your home directory, and create a new directory called `dev`. This is where you'll put all your repos.

Move into `dev` and create a new project called `hello-world`.

Move into `hello-world`.

Mac users:

    cd ~/
    mkdir dev
    cd dev
    mkdir hello-world 
    cd hello-world

Windows users:

    cd c:\Users\Your-Username\
    mkdir dev
    cd dev
    mkdir hello-world
    cd hello-world

Within this directory, create a new file called `README.md` with the following contents:

    # Hello World
    Just for practice



## Initiate your repository

From CL, within your `hello-world` directory, run the command `git init`. 

Example:

    $ git init
    Initialized empty Git repository in /Users/Susan/Sites/hello-world/.git/




## Create a new remote repository on Github.com
  
Now, let's create a home for this project on Github.com.

In Github, create a __New Repository__ called `hello-world`. 
 
Use the following settings:

<img src='http://making-the-internet.s3.amazonaws.com/vc-hello-world-repository-on-github.png?@2x' style='max-width:875px; width:100%'>

After your repository is created, copy the SSH URL for your repository at Github: 

<img src='http://making-the-internet.s3.amazonaws.com/vc-get-repo-url.png?@2x' style='max-width:1019px; width:100%'>

Make sure that SSH option is checked, and that the URL you copy has an `@` in it, like `git@github.com:username/hello-world.git`. 
Github also offers an https URL, but we'll be using SSH since we configured SSH keys when we set up your Github connection.


## Connect your local repo and your remote repo

Returning to CL on your computer, run this command, replacing the SSH URL with the one you copied in the above step:

    $ git remote add origin git@github.com:username/hello-world.git


This will create a connection between your local repository and the remote repository at Github.com. `origin` is a nickname we're giving this connection.
We're suggesting `origin` because that is what Github uses as the default remote name, so it is what you'll see in most of their instructions.

You can use this command to verify your remote was added:

    $ git remote -v

	
Example results:

    origin	git@github.com:susanBuck/hello-world.git (fetch)
    origin	git@github.com:susanBuck/hello-world.git (push)


## Tips

* If you decide to remove an existing remote use this command: `git remote remove name-of-remote`.

* If you decide to update the URL for an existing remote, use this command: `git set-url name-of-remote new-remote-url`.

* To see a list of all current remotes use this command: `git remote -v`.

* To see all your git configurations use this command: `git config -l`.

* You can tell if a directory is a git repository if it contains a hidden directory called `.git`:

<img src='http://making-the-internet.s3.amazonaws.com/vc-how-to-tell-if-a-dir-is-version-controlled.png?@2x' style='max-width:520px; width:75%'>

* All the git configurations for a given repository are stored in this `.git` directory, in a filed called `config`. You can edit your configurations via git commands, or by editing this file directly.

* Need to "un-git" a directory? All you have to do is delete the hidden `.git` directory.

* If you get a message about `src refspec master does not match any.` after trying to push&mdash; it means you have not yet done a commit.

