## Jumpstarter

So far, you've got the flow set up between your local computer and your repo at Github, but there's one more piece of the puzzle: deploying your changes to your live server.

In this section we'll look at an example of how you would deploy to a **PaaS** (Platform as a Service) which is just one kind of server you might use to publish work online. 

In this doc we'll use [Jumpstarter](https://jumpstarter.io).

[Read more on the difference between a PaaS and traditional/shared hosting...](http://www.brmullikin.com/web-development).



## Jumpstarter setup

Create a new account at [Jumpstarter](https://jumpstarter.io/).

After setting up your account, the first thing you'll want to do is **set up a SSH key**. This will prevent you from having to enter your password everytime you communicate with Jumpstarter from your command line.

In your Jumpstarter user settings, find the option to add a *SSH key* (drop down menu on the top right). 

You can copy the same `id_rsa.pub` key you created when you configured Github. Use the `cat` command to open this file, then copy its contents. 

Mac: 

	$ cat /Users/YourName/.ssh/id_rsa.pub

Windows:

	$ cat C:\Users\YourName\.ssh\id_rsa.pub

Back in Jumpstarter, paste in the key and give it a descriptive name.

<img src='http://making-the-internet.s3.amazonaws.com/version-control-jumpstarter-add-ssh-key@2x.png' class='' style='max-width:966px; width:75%' alt=''>

<small>
Note: Instead of using your Github key, you could have generated a unique one for Jumpstarter. This latter technique is more secure and suggested for projects beyond the scope of this class.
</small>




## New Jumpstarter Project

From the menu in the top, find the option to create a new project.

Choose the **PHP 5.5 & MySQL** option:

<img src='http://making-the-internet.s3.amazonaws.com/version-control-jumpstarter-new-php-project@2x.png' class='' style='max-width:970px; width:100%' alt=''>

Name your project and click *Create Project*:

<img src='http://making-the-internet.s3.amazonaws.com/version-control-jumpstarter-name-project@2x.png' class='' style='max-width:960px; width:100%' alt=''>

In a few seconds, your new project should be online. Note how Jumpstarter created  a unique subdomain for your project based on the name you gave it. 

<img src='http://making-the-internet.s3.amazonaws.com/version-control-jumpstarter-project-created@2x.png' class='' style='max-width:958px; width:100%' alt=''>

At this point, when you visit the URL of your new project you should see a phpinfo report:

<img src='http://making-the-internet.s3.amazonaws.com/version-control-jumpstarter-project-first-visit@2x.png' class='' style='max-width:834px; width:100%' alt=''>




## Deploying to Jumpstarter via Git

With your Jumpstarter project up and running, it's time to get your code pushed to it. We'll use git to deploy changes.

In the Jumpstarter Git tab for your project, choose the option to **Activate Git**.

<img src='http://making-the-internet.s3.amazonaws.com/version-control-jumpstarter-activate-git@2x.png' class='' style='max-width:964px; width:100%' alt=''>

On the next screen, take note of the command to add Jumpstarter as a remote.

<img src='http://making-the-internet.s3.amazonaws.com/version-control-jumpstarter-remote-url@2x.png' class='' style='max-width:971px; width:100%' alt=''>

We're going to use this command but instead of calling the remote `production` we'll call it `jumpstarter`. You can call yours whichever you prefer.

Back on your local computer in your hello-world directory, run the command to add Jumpstarter as a remote:

	$ git remote add jumpstarter username-projectsubdomain@ssh.jumpstarter.io:/var/www-git/repo.git

If you copy the code from above, be sure to replace `username-projectsubdomain` with the appropriate value.

Finally, push to this new remote:

	$ git push jumpstarter master

When the push is complete, refresh your Jumpstarter URL to make sure you're seeing the contents of your hello-world app.
