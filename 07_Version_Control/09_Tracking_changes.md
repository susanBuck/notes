With your repository set up and plugged into Github.com, you're ready to start tracking changes on your project.

Within your `hello-world` directory, run `git status` to see what changes git has tracked:

	$ git status

At this point, you should have one untracked file&mdash; the `README.md` file.

<img src='http://making-the-internet.s3.amazonaws.com/vc-git-status.png?@2x' class='' style='max-width:520px; width:75%' alt=''>

Stage (aka `add`) this new file with the following command:

	$ git add README.md

Now, try `git status` again, and you should see you have a file waiting to be committed:

	$ git status
	
<img src='http://making-the-internet.s3.amazonaws.com/vc-git-add.png?@2x' class='' style='max-width:589px; width:75%' alt=''>
 
Next, commit this change using the `commit` command, plus the `-m` switch which indicates we'll also be including a commit message:

	$ git commit -m "Added readme file" 

<img src='http://making-the-internet.s3.amazonaws.com/vc-git-commit.png?@2x' class='' style='max-width:589px; width:75%' alt=''>

Finally, push this change to Github.com. 

	$ git push github master
	
<img src='http://making-the-internet.s3.amazonaws.com/vc-git-push.png?@2x' class='' style='max-width:589px; width:75%' alt=''>

To double check your commit made it to Github.com, look for your new README.md file on Github.com:

<img src='http://making-the-internet.s3.amazonaws.com/vc-first-commit-in-github.png?@2x' class='' style='max-width:822px; width:75%' alt=''>




## Practice

Make a change to your README.md file and add a new file called `index.html`. 

Stage and commit these changes:

	$ git add README.md
	$ git add index.html
	$ git commit -m "Updated readme file; added index file"
	$ git push github master




## Tips

* `git status` is a command you should take advantage of frequently; it will give you a sense of what's going on your repository: what has changed, if any files are untracked, etc.

* `git diff` is another useful command that will tell you what differences exist in a file that have changed. To use: `git diff filename` where `filename` is the file you wish to inspect.

* If you ever want to undo any changes made to a file that haven't yet been added, you can use the `git checkout` command. To use: `git checkout filename`.

* If you ever delete a file from a project, you'll use the `git rm` command instead of `git add`.

* Whether you're tracking a brand new file, or just staging changes to an existing file, you'll use the `git add` command.