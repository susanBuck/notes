So far, you've got the flow set up between your local computer and your repo at Github, but there's one more piece of the puzzle: deploying your changes to your live server.

In this section we'll look at an example of how you would deploy to a shared hosting plan by SSH'ing into your server.

SSH is a secure method used to remotely connect to a server. The idea here is to SSH to your live server and run git commands on your live server, just like you've been doing on your local machine.

In order to do this, though, you'll first need to make sure your host allows SSH connections. Once that is confirmed, you'll need to determine if Git is available on your server.




## Confirm your server has SSH access and Git

If you don't know if your server allows SSH access and has Git installed, the easiest route to find out is to file a support ticket and ask them. 

If you do have SSH access to your server, you should be able to SSH in with a command like this:

	$ ssh username@servername.com
	
If you're succesful in SSH'ing in, run the git command to see if Git is installed:

	$ git
	
If you see a readout of a bunch of commands, it means Git is installed 
and you're good to go.

If, however, you see an error telling you the command `git` is not recognized or not found, you may have hit a dead end. At this point you can either try to install Git yourself (this is often impossible on a shared host because of limited priveleges) or contact your host's support team to see if they can install it for you.

Resources if you want to attempt installing Git on your server yourself:

* [Git SCM: Installing Git](http://git-scm.com/book/en/Getting-Started-Installing-Git)
* [How to install Git on a shared host](http://joemaller.com/908/how-to-install-git-on-a-shared-host/ )

If you find out your host does not have SSH and/or Git, see the notes on *Deploying via RSync*.




## SSH Key
Your live server is going to need a SSH key for Github, just like your local computer did. This will give your live server access to your Github.com repositories.

Here's a quick recap of the procedure (see the *Setup Github* notes for complete details).

Move into your .ssh directory:

Mac: 

	$ cd /Users/YourName/.ssh

Windows:

	$ cd C:\Users\YourName\.ssh

Generate a new SSH key in this directory with the following command:

	$ ssh-keygen -t rsa -C "your_email@example.com"
	
This will generate a new file in your .ssh directory called `id_rsa.pub`. 
		
(Mac users only) Add your new key to the ssh-agent:
 
	ssh-add id_rsa	

In your Github.com account settings, add a new SSH key and fill it with the contents of `id_rsa.pub`.




## Configure
Again, like on our local systems, you need to configure your git `user.name` and `user.email` key.

For your live server, you may want to set the name to be `Live Server` rather than your own name. This way, when commits come from the live server, you can identify them.

You can fill in any email you want.

	$ git config --global user.name "Live Server"
	$ git config --global user.email "your_email@youremail.com"

Also, add the configuration to make sure git output is color-coded:

	$ git config --global color.ui true



## Navigate to public_html

Change directories into your `public_html` (aka `www`) directory (this is where the web accessible part of your server lives).

At this point, you're ready to clone your `hello-world` repository into your live server but you have to decide *where* you want to clone it. There are two options here. Read through both options before deciding which route you'd like to go.

### Option 1) Clone into the `public_html` directory.

Use this option if you plan on running only one web site / application from your web host. 

Your clone command will look like this:

	$ git clone git@github.com:username/hello-world.git .
	
Note the period at the end...This tells git to clone the hello-world.git repo into the current working directory (`public_html`).

Now you should be able to access your files via `http://yourdomain.com`.


### Option 2) Clone into a subdirectory within `public_html`

Use this option if your web host allows you to run multiple sites (using different domains) from the web host. In this scenario, each site/project should be contained within its own directory.

Your clone command will look like this:

	$ git clone git@github.com:username/hello-world.git 

Note there is *no* period this time. The result will be a new subdirectory called `hello-world` with all your files.

Now you should be able to access your files via `http://yourdomain.com/helloworld`.

*Or*, if your web host allows multiple sites, you can point an add-on domain's document root to the `/public-html/hello-world/` directory. Then, you'd be able to acccess your site via `http://otherdomain.com`.



## Deploying

Your live server is now tapped into your Github.com repo and ready for deployments. 

Any time you want to deploy your work you will run this command:

	git pull origin master


## Tips

Now that you have a version control workflow set up, you should avoid editing files live on your server at all costs. Instead, it's better to make any changes locally, push your changes up to Github.com, then pull them down to your live server. 

