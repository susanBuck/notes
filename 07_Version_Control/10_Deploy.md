So far, you've got the flow set up between your local computer and your repo at Github, but there's one more piece of the puzzle: deploying your changes to your live server.

To do this, you'll need to have the following:

1. [SSH (Secure Shell)](http://en.wikipedia.org/wiki/Secure_Shell) access to your server 
2. Git CL running on your server

## Mac SSH
Load Terminal and run the following command (replace with your own username / servername).

	ssh dwapract@thedoctor.asmallorange.com
	
Enter your password when prompted.
	
## Windows SSH 
Load a SSH client such as: [PuTTy](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).
On the first PuTTy screen, enter your server name and click open ([screenshot](http://note.io/1dQrelX)).
On the next screen, you'll be prompted for your host username and password ([screenshot](http://note.io/18DUcxj)).

If all goes well, you should be logged into your server at this point.

## Navigate to your public folder

Once you're SSH'd into your server, navigate to your `public_html` or `www` directory (this is where the web accessible part of your server lives).

Within your public folder, you will either see the root contents of your site, including a `index.php` (or .html) file, or a list of domains connected to your site. 

If you see the latter, navigate into the domain from which you want to run your project.


## See if Git is installed
Just like on our local systems, we want to check and see if Git is installed on our live servers.

Enter the git command to see:

	git 
	
If you see a bunch of instructions about git commands, then git is installed.

Like on your local system, if you see the following message, it means git is not installed:

	git: command not found
	
If you don't have Git installed you have the following options:

1. File a support ticket with your web host and ask them to install Git (worth a shot).

2. Install Git yourself (you'll have varying luck with this, depending on the permissions your shared server allows you).
Resources/Instructions:
[Git SCM: Installing Git](http://git-scm.com/book/en/Getting-Started-Installing-Git)
[How to install Git on a shared host](http://joemaller.com/908/how-to-install-git-on-a-shared-host/ )


3. If for some reason you can not run Git on your web host, you can use RSync as a secondary solution ([Further instructions...](/Version_Control/RSync_alternative)). It's not as good, but it's better than nothing.

## Configure
Again, like on our local systems, you need to configure your name and email key.

For our live server, we'll set the name to be `Live Server` rather than your own name. This way, when commits come from the live server, you can identify them.

You can fill in any email you want.

Run these commands:

	git config --global user.name "Live Server"
	git config --global user.email "your_email@youremail.com"

Let's do one more configuration which will make any Git input color coded (i.e. easier to read):

	git config --global color.ui true

## Clone your repo at Github.com to your live server
Example (enter Github username/password when prompted):
	
	git clone https://github.com/your_git_username/hello-world.git
	
Note, this is a common sticking point on some servers - if you see any errors mentioning HTTP/SSL when running this above command, visit the [Common Problems doc](/Version_Control/Common_problems) for a solution.

If all goes well, you should now see a directory called `hello-world/`

Run the command `cd hello-world/` to move into that directory

Once in the directory run the git status command just to make sure everything is in working order:

	git status

You should see this:

	# On branch master
	nothing to commit (working directory clean)

Your live server is now tapped into your Github.com repo and ready for deployments. 

__Any time you want to deploy your work you will run this command:__

	git pull origin master
