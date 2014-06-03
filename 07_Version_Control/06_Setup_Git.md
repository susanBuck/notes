## Git via Command Line
Git can be operated via either a GUI app or via the Command Line.

We're going to start with CL because this gives you the most powerful and consistent access to Git.

Once you get the hang of CL you can explore some visual apps.


## See if Git is installed

First, let's see if your computer already has Git installed by running the `git` command:

	$ git


If you see a readout of a bunch of commands, it means Git is installed 
and you're good to go; skip down to the section titled *Initial Git Configuration*.

*Git is installed:*
<img src='http://making-the-internet.s3.amazonaws.com/vc-git-success.png'> 

If, however, you see an error telling you the command `git` is not recognized or not found, you'll need to install Git.

*Git is not installed*:
<img src='http://making-the-internet.s3.amazonaws.com/vc-git-not-installed.png'>

Windows Users: If you're using *Cmder* and you downloaded the full version (as suggested), it comes with Git already installed, so the above command should definitely show that Git is already installed.




## Download and install Git
If Git was *not* yet installed, head to the [download page](http://git-scm.com/downloads) and choose your operating system. 

Download the program and run through installation.

**Once installation is complete, close and re-open your CL shell.** 

Now, try the `git` command again. Do you see a bunch of instructions and commands related to Git? Good, you're all set! 

If you don't&mdash; are you sure you completely closed and re-opened your CL shell? 




## Initial Git configuration

Once you've confirmed Git is installed, you need to do a little initial setup.

Run the following commands to set a user name and email key to be associated with any commits coming from your computer. Be sure to replace the name and email with your own details.

	git config --global user.name "Sam Seaborn"
	git config --global user.email sam@gmail.com

Let's do one more configuration which will make any Git input color coded (i.e. easier to read):

	git config --global color.ui true

That's it! Git is installed and you're ready for the next steps.