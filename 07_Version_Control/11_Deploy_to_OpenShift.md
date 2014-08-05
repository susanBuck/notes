<!-- 
http://blog.alan-zhang.com/how-to-run-laravel-4-on-openshift
http://thewavetech.com/set-laravel-openshift/
https://github.com/muffycompo/openshift-laravel4-quickstart-app
https://www.openshift.com/developers/deploying-and-building-applications
-->




## OpenShift

So far, you've got the flow set up between your local computer and your repo at Github, but there's one more piece of the puzzle: deploying your changes to your live server.

In this section we'll look at an example of how you would deploy to RedHat's [OpenShift](https://www.openshift.com/)&mdash; an &ldquo;*Open Hybrid Cloud Application Platform*.&rdquo;

For the sake of this course and PHP/Laravel development, here are the some reasons OpenShift is a good option:

+ Built-in Git source code repository making it easy to deploy via Git.
+ Availability of PHP 5.4 (required for Laravel).
+ Free subdomains, with the option to set up your own domains.
+ A free plan for experimentation.

OpenShift's **free plan** provides for *3 gears*. Given this, it's okay to delete old applications as you need room. For example, when you start building P3 you'll have to delete your *hello-world* app to make room. When you start building P4 you'll have to delete your P1 app. At the end of the semester, you should end up with P2, P3 and P4 on the server.




## OpenShift setup and SSH Key

Create a new account at [OpenShift](https://www.openshift.com/).

After setting up your account, the first thing you'll want to do is **set up a SSH key**. This will prevent you from having to enter your password every time you communicate with OpenShift from your command line.

When logged into OpenShift, find the **Settings** tab up top.

On the page that follows, find the **Public Keys** section.

You can use the same `id_rsa.pub` key on your computer that you created when you configured Github. Use the `cat` command to open this file, then copy its contents. 

Mac: 

```bash
$ cat /Users/YourName/.ssh/id_rsa.pub
```

Windows:

```bash
$ cat C:\Users\YourName\.ssh\id_rsa.pub
```

Back in OpenShift, paste in the key and click *Create*.

<img src='http://making-the-internet.s3.amazonaws.com/vc-openshift-add-ssh-key@2x.png' class='' style='max-width:604px; width:100%' alt='New SSH Key on OpenShift'>

That should do it. After your create your first OpenShift app, we'll test that this is working.

<small>
Note: Instead of using your Github key, you could have generated a unique one for OpenShift. This latter technique is more secure and suggested for projects beyond the scope of this class.
</small> 




## New Application

From the top menu, find the **Applications** tab, then click **Create your first application now**.


__Choose a cartridge:__

On the page that follows, you'll see a whole bunch of *cartridges* (managed runtime for your application) to choose from. Find the one for **PHP 5.4**.

<img src='http://making-the-internet.s3.amazonaws.com/vc-openshift-new-php-app@2x.png' class='' style='max-width:573px; width:100%' alt=''>


__Choose a URL:__

The first configuration on the next screen is the **Public URL** for your app. In the left field, enter the name for your app (no spaces, no special characters).

The field on the right is a namespace for *all* your apps on OpenShift. Because this is your first app, it's not yet set.

The namespace will be included on all your OpenShift domains, so pick something specific to you or this course, not something specific to this application.

<img src='http://making-the-internet.s3.amazonaws.com/vc-openshift-name-first-app@2x.png' class='' style='max-width:931px; width:100%' alt=''>

__Source Code:__

If you wanted to create a new, bare application, you'd leave this field blank. However, you're already set up with an existing repository that's on Github, so let's connect this new app with that.

Enter the *https* URL for the Github repository you want to connect this app to. This is simply the URL you see in your browser when you're viewing your app in Github.com.

You can leave the branch field empty, because it will default to the `master` branch which is all we have worked with so far. 

<img src='http://making-the-internet.s3.amazonaws.com/vc-openshift-set-git-url@2x.png' class='' style='max-width:780px; width:75%' alt=''>

__Finish: __
You can leave the remaining fields as their defaults; to finish click **Create Application**. In our tests, it typically took a few minutes for the application process to complete, so don't be surprised if your browser hangs for a little while.

When it's done, you'll see a confirmation with some instructions on what to do next:

<img src='http://making-the-internet.s3.amazonaws.com/vc-openshift-application-generated@2x.png' class='' style='max-width:692px; width:75%' alt=''>

Because we already have a local repository set up, our workflow is different then the process they describe, so ignore these instructions. Instead, click the **Applications** tab from the top menu which should reveal your newly created *helloworld* application:

<img src='http://making-the-internet.s3.amazonaws.com/vc-openshift-your-new-app@2x.png' class='' style='max-width:780px; width:100%' alt=''>

Click the application to proceed to its overview page.

Click on your app's URL to check it out in the browser for the first time.

<img src='http://making-the-internet.s3.amazonaws.com/vc-open-shift-visit-your-new-app@2x.png' class='' style='max-width:1180px; width:100%' alt=''>





## SSH into your app

On the overview page, find the link on the bottom right that asks **&ldquo;Want to log into your application?&rdquo;**. 

When you click this link, it'll reveal a SSH command which you should copy.

<img src='http://making-the-internet.s3.amazonaws.com/vc-openshift-ssh-command@2x.png' class='' style='max-width:1177px; width:100%' alt=''>

In your computer's command line, run this command to SSH into your new OpenShift app. If you set up your SSH keys properly (as described in the section above), you should get automatically logged in.


## Get to know your app

After you SSH in, if you run the `ls` command, you can see there are 4 directories there:

* `app-deployments`
* `app-root`
* `git`
* `php`

Within `app-root` you'll find a `logs` directory, which will come in handy when debugging.

Also within `app-root` is a `repo` directory; this is where your code lives. Because you created your app from your existing *hello-world* repository you should already see your code here.

While you can see your code, avoid making any changes to it here. You want to make all your code changes locally and then push them up to OpenShift.

>> All OpenShift applications are built around a Git source control workflow - you code locally, then push your changes to the server. 

To see all your OpenShift environment variables, run this command:

```bash
$ export
```

Run the `exit` command to disconnect from the OpenShift Shell and return to the command line on your local computer.	





## Deploying to OpenShift via Git

With your OpenShift application up and running, let's now look at the process of updating your code.

First, from your app's dashboard at openshift.com, copy the **Source Code** URL; this will be your OpenShift *remote*.

<img src='http://making-the-internet.s3.amazonaws.com/vc-openshift-git-url@2x.png' class='' style='max-width:1161px; width:100%' alt=''>

Back on your local computer, navigate into your app directory via command line. Within this directory, you want to add a new remote that connects to OpenShift.

First, see what existing remote(s) you have set up:

```bash
$ git remote --v
```	

Now, add the OpenShift remote (replace with your own url you copied above):

```bash
$ git remote add openshift ssh://234890230@helloworld-dwa15sb.rhcloud.com/~/git/helloworld.git/
```

Test it out:

```bash
$ git push openshift master
```
	
If you haven't committed any changes since you first created your OpenShift app, this should just tell you that everything is up to date. Let's actually make a change and confirm you can get it up to OpenShift.

Open `index.php` file and make some change, then stage and commit the change.

```bash
$ git add --all
$ git commit -m "Small change to test deployment to OpenShift"
```bash

Finally, push:

```bash
$ git push openshift master
```
	
This will push your commits up to OpenShift and it will also trigger your application to re-deploy. Given this, it may take a little longer than your standard push.

>> All OpenShift applications are built around a Git source control workflow - you code locally, then push your changes to the server. The server then runs a number of hooks to build and configure your application, and finally restarts your application. 

When it's all done, refresh your app in the browser. Is your change there?







	
## RHC

OpenShift has a Ruby-based command line utility called RHC. This utility isn't required, but it has some useful tools that you may appreciate when working with your OpenShift apps.

To install RHC, follow OpenShift's instructions: 
<https://www.openshift.com/developers/rhc-client-tools-install>

For an example of what RHC can do, check out `tail`; this command will let you see a live stream of the logs for a given application.

```bash
$ rhc tail app-name
```

[You can learn more about what you can do with RHC here.](https://www.openshift.com/blogs/using-rhc-to-manage-paas-apps)
	


 

<!--
## Laravel specific 

Create a new PHP 5.3 app

Connect it with an existing Github app that has Laravel in it.

SSH into your app to remove the default 'php' folder. This will allow the public/ folder to be the default root. [ref](https://www.openshift.com/blogs/openshift-online-march-2014-release-blog)

[OpenShift document root](https://www.openshift.com/blogs/openshift-online-march-2014-release-blog)

The DocumentRoot is chosen by the cartridge control script logic depending on conditions in the following order:

IF php/ dir exists THEN DocumentRoot=php/  
ELSE IF public/ dir exists THEN DocumentRoot=public/  
ELSE IF public_html/ dir exists THEN DocumentRoot=public_html/  
ELSE IF web/ dir exists THEN DocumentRoot=web/  
ELSE IF www/ dir exists THEN DocumentRoot=www/  
ELSE DocumentRoot=/ 

TO DO: Add a .openshift directory
-->

