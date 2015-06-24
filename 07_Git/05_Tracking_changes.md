With your repository set up and plugged into Github.com, you're ready to start tracking changes to your project. Everything we have done to this point has been setup-related changes that you only do once when starting a new project. Everything that follows reflects the kind of Git work you'll do on a day-to-day basis.

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

Finally, push this change to Github.com. [](For me, this has always been "git push origin master" but I think we can sort that out.)

	$ git push github master
	
<img src='http://making-the-internet.s3.amazonaws.com/vc-git-push.png?@2x' class='' style='max-width:589px; width:75%' alt=''>

To double check your commit made it to Github.com, look for your new README.md file on Github.com:

<img src='http://making-the-internet.s3.amazonaws.com/vc-first-commit-in-github.png?@2x' class='' style='max-width:822px; width:75%' alt=''>




## Practice

Edit your README.md file adding the date to the top of the file.

Also, add a new file called `index.php` and include this code:

```html
<h1>Hello World!</h1>
```

Now lets track these changes in Github (one edit of an existing file, one new file).

You can stage the files one at a time:

```
$ git add README.md
$ git add index.php
```
	
Or you can use this command to stage any changed or new files:

```bash
$ git add --all
```

Once your changes are staged, commit:

```bash
$ git commit -m "Updated readme file; added index file."
```

And finally, push your commit:

```bash
$ git push github master
```

Check your repository in Github.com to make sure the commit is there.




## Tips

* `git status` is a command you should take advantage of frequently; it will give you a sense of what's going on your repository: what has changed, if any files are untracked, etc.

* `git diff` is another useful command to show what changes have been made. You can see all changes with just `git diff` or see just the changes on a particular file with `git diff <file>`.

* If you want to undo changes made to a file that haven't yet been staged, you can use the command `git checkout <file>`.

* If you stage a file but decide you want to unstage it, run this command: `git reset HEAD <file>`. This won't revert any changes to that file (that's what `checkout` does), it will just remove it from the stage.

* If you delete a file from a project, you'll use the `git rm <file>` command instead of `git add <file>`.



