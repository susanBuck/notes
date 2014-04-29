With your new app created, lets set it up as a git repository.

First, visit Github.com and create a new repository. For consistency, make sure your repository name matches the directory name of your app (which matches the domain of your app).

Also, make sure you check the option to *Initialize the repository with a README file*. 

<img src='http://making-the-internet.s3.amazonaws.com/framework-new-repository-at-github.png'>

Back to command line...Navigate into p2.yourdomain.com so you can initiate it as a repository. 

<small>Note, this procedure is a litte different than from when you created your practice *hello-world* repository. In that case, we created the repo on Github and just cloned it. Here, because we have files already in our project (i.e. it's not a blank slate), instead of cloning, we're going to initiate it as a repository and then connect it to Github. Slightly different steps, but the end result is the same: a repository on local that's sync'd with a repository on Github.
</small>

In your project directory, initiate it as a Github repository:

	git init

Expected results:

	Initialized empty Git repository in /Users/your-username/Sites/p2.yourdomain.com/.git/
	
Now, connect this repository to its home at Github (make sure you use HTTPS here):

	git remote add origin https://github.com/your-username/p2.yourdomain.com
	
Do a git pull to make sure things are in sync. The only thing git should need to sync is the README.md file that was initialized when you created the repo at Github.

	git pull origin master
	
Run git status to see that git recognizes all the files in your new repo:

	git status
	
Expected results: 

	# On branch master
	#
	# Initial commit
	#
	# Untracked files:
	#   (use "git add <file>..." to include in what will be committed)
	#
	#	.htaccess
	#	config/
	#	controllers/
	#	index.php
	#	views/
	nothing added to commit but untracked files present (use "git add" to track)	
	
Start tracking all these files:

	git add .
	
Commit:

	git commit -m "First commit"
	
Push:

	git push origin master
	
To double check everything worked, you can visit your repo Github.com to see all your app files there:

<img src='http://making-the-internet.s3.amazonaws.com/framework-first-commits-on-github.png'>
