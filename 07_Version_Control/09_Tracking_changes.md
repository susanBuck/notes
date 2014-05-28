
## Tracking changes
Let's check the work we just did (new index.html) into your repository.

Via command line, navigate inside of your `hello-world/` directory.

Run the following command to see what has changed in our project so far:

	git status

<img src='http://making-the-internet.s3.amazonaws.com/vc-first-git-status.png'>

Just as expected, Git has detected a new (i.e. untracked) file called `index.html`.

Stage (aka add) this new file with the following command:

	git add index.html

Now, try `git status` again, and you should see you have a file waiting to be committed:

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

After you save this change, run `git status` to see that Git has picked up on this change:

For fun, have git tell you more about this change with the `git diff `command

	git diff index.html

Let's stage these changes:

	git add index.html

And commit:

	git commit -m "Added more emphasis"

And finally, push:

	git push origin master

