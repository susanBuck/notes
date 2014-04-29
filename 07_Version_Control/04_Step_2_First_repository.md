## Create an account at Github.com
Visit Github.com and create yourself an account if you don't already have one. A free one should do for now, but if you ever want private code repositories they have paid plans.

## Create a new repository
After your account is created, create a __New Repository__ for your first practice which we'll call `Hello World`. Use the following settings:

<img src='http://making-the-internet.s3.amazonaws.com/vc-new-repository.png'>

## Clone your repository from Github.com to your local computer
Go back to your command line and navigate to your web folder that was created when you set up your local host 
(Mac: `/Users/YourName/Sites` or Windows: `c:\wamp\www`). 

Once in the appropriate folder, we want to clone your Hello World project from Github.com to your computer.

To do that, use the git __clone__ command followed by the path to your Hello World repository. Example:

	git clone https://github.com/your-username/hello-world.git

After the clone is complete, you should see the hello-world directory in your sites/www folder.

<img src='http://making-the-internet.s3.amazonaws.com/vc-clone-success.png'>

Also, when you access `http://localhost/hello-world` in your browser you should see a directory listing like so:

<img src='http://making-the-internet.s3.amazonaws.com/vc-hello-world-dir.png'>

The reason we're seeing a directory listing is because our practice project site doesn't have an __index__ file yet. Let's create that, which will be our first new change on our project.

Using your code editor of choice, create a new HTML file that says `Hello World!` and save it as `index.html` in your new `hello-world/` directory.

Now, when you visit `http://localhost/hello-world/` you should see your new page instead of a directory.

<img src='http://making-the-internet.s3.amazonaws.com/vc-index-page.png'>


## Track your first change
Let's check the work we just did (new index.html) into your repository.

Via command line, navigate inside of your `hello-world/` directory.

Run the following command to see what has changed in our project so far:

	git status

<img src='http://making-the-internet.s3.amazonaws.com/vc-first-git-status.png'>

Just as expected, Git has detected a new (i.e. untracked) file called `index.html`.

Let's stage (aka add) this new file with the following command:

	git add index.html

Now, try git status again, and you should see you have a file waiting to be committed:

	git status
	
<img src='http://making-the-internet.s3.amazonaws.com/vc-git-add.png'>

Now, let's commit this change using the commit command, plus the `-m` switch which indicates we'll also be including a commit message:

	git commit -m "Added main index page"
	
<img src='http://making-the-internet.s3.amazonaws.com/vc-git-commit.png'>

Finally, let's push this change to Github.com. You'll be asked for your Github.com credentials in order to do this.

	git push origin master
	
<img src='http://making-the-internet.s3.amazonaws.com/vc-git-push.png'>

Your remote repository (what's on Github.com) is referred to as *origin*. 
The default branch name in Git is *master*.

So if we say git push origin master, we're saying push to our remote repository our master branch.


To double check your commit made it to Github.com, look for your new index.html file on Github.com:

<img src='http://making-the-internet.s3.amazonaws.com/vc-first-commit-in-github.png'>

## Practice
Let's do a practice change before we move on.
Edit your `index.html` file on your computer to have multiple exclamation points at the end.

After you save this change, do a git status to see that Git has picked up on this change:

For fun, have git tell you more about this change with the git diff command

	git diff index.html

Let's stage these changes:

	git add index.html

And commit:

	git commit -m "Added more emphasis"

And finally, push:

	git push origin master


