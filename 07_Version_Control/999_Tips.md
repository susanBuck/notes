## Hard Resetting - &ldquo;Pull in case of emergencies&rdquo;

If you ever find yourself backed into a corner with lots of merges and conflicts you're unsure how to resolve, there's a last-resort solution with the following commands:

	git fetch --all
	git reset --hard origin/master
	
git fetch downloads the latest from remote without trying to merge. 

git reset resets the master branch to what you just fetched.

**Warning: this will overwrite any changes you might have had in your repository.** 

Given this, you only want to do this in situations where you're okay to reset your working directory.

The most common scenario for this is when your know your Github repository has the code exactly as you want it, but your local or live repository got messed up with changes you don't actually want to make.


## Checking log files
Log files can provide useful information as you troubleshoot. Here's where you can find your log files:

Mac MAMP: `/Applications/MAMP/logs/`
Windows WAMP: `c:/wamp/www/logs/`

On a shared server:
Create a file called `phpinfo.php` and in it put this line of code:

	<?php phpinfo(); ?>

When you run that page you'll get a listing of information about your server. Search for `error_log` to see what path it stores your error_logs in. 

If it doesn't give a path but just says "error_log" that means the log will be generated in the directory from which the error is created ([screenshot](http://content.screencast.com/users/susanBuck/folders/Jing/media/bc263b92-c757-4ab1-aed0-f9f7bd3f77cf/00002854.png)).

Example: If my file `susanbuck.net/index.php` generated an error, I'd see a log file in `susanbuck.net/error_log`

## Is this directory a repo?
You can tell if a directory has been set up as a repo because it will have a .git folder in it.
To see this folder, though, you have to make sure your system is showing hidden files. ([Windows](http://windows.microsoft.com/en-US/windows-vista/Show-hidden-files)) ([Mac](http://osxdaily.com/2009/02/25/show-hidden-files-in-os-x/))

Alternatively, you could just run the `git status` command and it will let you know if the current directory is/is not a repo.

## How to delete a repo @ Github.com
Go to that repo's page and click the Admin button ([screenshot](http://content.screencast.com/users/susanBuck/folders/Jing/media/f29dc9eb-9d96-4e95-8463-9528eb8e0033/00002850.png)). From there, scroll down and you'll see the option under the heading "Danger Zone".

## Cache your password on your live server with github.com so you don't have to repeatedly enter it
Cache it for 15 minutes:

	git config --global credential.helper cache

Cache it for an hour:

	git config --global credential.helper 'cache --timeout=3600'

See the section on *Password Caching* in this [Set Up Git](https://help.github.com/articles/set-up-git) article for more details.
