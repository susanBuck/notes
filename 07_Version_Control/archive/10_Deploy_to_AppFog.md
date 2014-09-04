Note: AppFog is not suggested for Laravel applications because their default build of PHP is not up to date enough to run Laravel. 

---

So far, you've got the flow set up between your local computer and your repo at Github, but there's one more piece of the puzzle: deploying your changes to your live server.

In this section we'll look at how you would deploy to a **PaaS** (Platform as a service) which is just one kind of server you might use to publish work online. 

In this doc we'll use we'll use [AppFog](https://appfog.com/). 

[Read more on the difference between a PaaS and traditional/shared hosting...](http://www.brmullikin.com/web-development).

## AppFog account

Go to AppFog and create a new account.

Sign up for their **Basic** plan which, as of this writing, includes a free 30-day trial. After that, this plan will cost $20 a month. You'll need to maintain this account for the duration of the semester.




## Ruby

AppFog applications are managed using a command line tool called **af** which requires Ruby v1.8.7 or higher. 

Run this command to see if you have Ruby installed on your computer, and if so, if it's a high enough version:

	$ ruby -v
	
If you see something like this, you're good to go:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-ruby-check@2x.png' class='' style='max-width:890px; width:100%' alt=''>

If not, you'll need to install or update Ruby.

__Mac users:__ 

You should have Ruby installed by default but if for some reason you don't, [find instructions here](https://www.ruby-lang.org/en/installation).

__Windows users:__ 

Download and run a [Windows Ruby Installer](http://rubyinstaller.org/). As of this writing, Ruby `1.9.3-p545` is recommended.

When installing, check off the option to add Ruby executables to your PATH and to associate .rb/.rbw files with Ruby:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-setup-ruby-on-windows@2x.png' class='' style='max-width:560px; width:75%' alt=''>

When you're done, run the `ruby -v` command again and confirm your results reflect the screenshots above.




## Install AppFog's CL tool

With Ruby ready to go, you can now install AppFog's CL tool **af** using this gem command:

	$ gem install af

This install process may take a minute or so to complete.

For reference a *gem* is a Ruby package. In this example we're using the `gem` command `install` to download and install the `af` Ruby gem package.

To confirm *af* is ready to go, try out this command:

	$ af info
	
<img src='http://making-the-internet.s3.amazonaws.com/laravel-confirm-af-installation@2x.png' class='' style='max-width:969px; width:100%' alt=''>




## Login to AppFog

You're now ready to start interfacing with AppFog from your command line. Start by logging in:

	$ af login

When prompted, enter your AppFog email and password.

You can see a [full list of af commands here](https://docs.appfog.com/getting-started/af-cli#af-cli-getting-started).




## Create an AppFog application

From your dashboard at appfog.com, find the option to **Create App**.

From there, create a new app with the following specifications. In this example, our new app is called `hello-world-sb`; you'll need to come up with a unique name for your app.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-appfog-new-app@2x.png' class='' style='max-width:1009px; width:100%' alt=''>




## Update your app

Switching back to command line, when you run the following command, you should see your new app listed:

	$ af apps
	
<img src='http://making-the-internet.s3.amazonaws.com/laravel-af-apps@2x.png' class='' style='max-width:785px; width:100%' alt=''>

Change directories into your `hello-world` project's directory. Within this directory, run this command (replacing hello-world with the name of your AppFog app):

	$ af update hello-world
	
Moving forward, you'll repeat this last step anytime you want to deploy changes to your app.