## Hard Resetting - &ldquo;Pull in case of emergencies&rdquo;

If you ever find yourself backed into a corner with lots of merges and conflicts you're unsure how to resolve, there's a last-resort solution with the following commands (replace `origin` with the name of your remote):

```bash
$ git fetch --all
$ git reset --hard origin/master
```
	
`git fetch` downloads the latest from remote without trying to merge. 

`git reset` resets the master branch to what you just fetched.

**Warning: this will overwrite any changes you might have had in your repository.** 

Given this, you only want to do this in situations where you're okay to reset your working directory.

The most common scenario for this is when your know your Github repository has the code exactly as you want it, but your local or live repository got messed up with changes you don't actually want to make.


## Git: Ignore a file that's already in the repo

```bash
$ git update-index --assume-unchanged name_of_file.php
```

## Is this directory a repo?
You can tell if a directory has been set up as a repo because it will have a .git folder in it.
To see this folder, though, you have to make sure your system is showing hidden files. ([Windows](http://windows.microsoft.com/en-US/windows-vista/Show-hidden-files)) ([Mac](http://osxdaily.com/2009/02/25/show-hidden-files-in-os-x/))

Alternatively, you could just run the `git status` command and it will let you know if the current directory is/is not a repo.

## Delete a repo @ Github.com
Go to that repo's page and click the Admin button ([screenshot](http://content.screencast.com/users/susanBuck/folders/Jing/media/f29dc9eb-9d96-4e95-8463-9528eb8e0033/00002850.png)). From there, scroll down and you'll see the option under the heading "Danger Zone".

