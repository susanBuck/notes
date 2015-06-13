Navigate to your root directory (`/Users/YourName/Sites/` on Mac, or `c:\wamp\www\` on Windows). 
<small>FYI: From now on we won't specify these Mac/Windows paths everytime; we'll just refer to *root/*</small>.

Clone a copy of the framework:

	git clone git://github.com/susanBuck/core

This will create a few directory in your root called `core`. 

Open up this directory to see what it contains:

<img src='http://making-the-internet.s3.amazonaws.com/framework-file-structure.png' class='shadow'>

* `core/` is the guts of the framework. You should not edit anything in this directory, because when you'll need to [update](/Framework/Updates) the framework, any changes you would have made will be overwritten. You always want to figure out how to make your changes happen on an application level, rather than at the core level (more on this later).
* `core/samples/sample-environment.php` is a sample environment configuration file that handles things like your database connection.
* `core/samples/sample-app.com` is a sample application which gives you a starting point for any apps you'll make. 


## Spawn your first app

Duplicate both `sample-environment.php` and `sample-app.com` so they are parallel to the `core` folder.

Results:

	root/
		/core/
		/sample-environment.php
		/sample-app.com
		/p1.yourdomain.com


Note how `p1.yourdomain.com` (and any other files you may have already put in your root folder) already exists in the root. This is okay.

Also note how we're duplicating *out of* the `samples/` directory. That way, the originals are there whenever we need to spawn a new app, or set up the framework on a new server.
	
Next...	
Rename `sample-environment.php` to `environment.php` and

Rename `sample-app.com` to `p2.yourdomain.com`

Results:

	root/
		/core/
		/environment.php
		/p1.yourdomain.com
		/p2.yourdomain.com

<!--
FYI, The above actions could be executed with the following commands from within the `core/` directory:

	cp -r samples/sample-app.com/ ../p2.dwa15-practice.biz
	cp -r samples/sample-environment.php ../p2.dwa15-practice.biz/environment.php
-->

## Accessing your app in the browser

In order to load your new p2 app in your browser, you need to point your localhost to this directory.

### Mac / MAMP
Set your Apache Document Root to the following:
	
	/Users/YourUsername/Sites/p2.yourdomain.com
	
Example:
<img src='http://making-the-internet.s3.amazonaws.com/framework-set-local-path.png'><br>

When done, restart your server in order for the changes to take effect.

### Windows / WAMP

From the WAMP icon in your doc, go to Apache: httpd.conf

In httpd.conf look for these lines:
 
	DocumentRoot "c:\wamp\www\"
	<Directory "c:\wamp\www\">
	
And change them to:

	DocumentRoot "c:\wamp\www\p2.yourdomain.com"
	<Directory "c:\wamp\www\p2.yourdomain.com">

<img class='shadow' src='http://making-the-internet.s3.amazonaws.com/framework-wamp-document-root.png'>

Next, go to WAMP Icon: Apache: Apache Modules and make sure `rewrite_module` is checked.

<img class='shadow' src='http://making-the-internet.s3.amazonaws.com/framework-wamp-rewrite-module.png'>

Once you've done the above, **stop and restart** your local server. 







### For both Mac/PC users...

After the above changes, when you point your browser to `http://localhost` you should see something like this:

<img class='shadow' src='http://making-the-internet.s3.amazonaws.com/framework-first-app.png'>

If you do, congratulations! You've successfully installed the framework and created a working application. Per the instructions, you can delete the `diagnostics.php` file.

If you don't, you should try and run `http://localhost/diagnostics.php` to see if it provides any hints. Example diagnostics:
<img class='shadow' src='http://making-the-internet.s3.amazonaws.com/framework-diagnostics.png'>

Also, be sure to check the [Common Problems doc](/Framework/Common_Problems) for possible solutions.


