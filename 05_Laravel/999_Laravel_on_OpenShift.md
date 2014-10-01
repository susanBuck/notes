## OpenShift

All the details for getting an app online at OpenShift are covered in the **[Deploy to OpenShift doc](https://github.com/susanBuck/notes/blob/master/07_Version_Control/11_Deploy_to_OpenShift.md)**. Go there and follow the instructions for pushing your new Laravel app up to OpenShift.

Here's a summary of the steps:

1. Create a new OpenShift application; make sure you use the *PHP 5.4 Cartridge* so it's compatible with Laravel. When setting up your app, point the source code to your github.com repo created in the above mentioned instructions.
2. Create a remote on your local project for this new OpenShift app.
3. Push to this remote.
4. SSH into your OpenShift app.

Once you've completed the steps above, which are standard procedure for getting any application on OpenShift, there are two additional steps you need to take that are Laravel specific:





__Make sure your storage folder is writable:__

While SSH'd into your OpenShift app, navigate to your document root (`/app-root/repo`). If you list the contents of this directory, you should see all your app files, since it was tapped into your github.com repository.

Laravel needs write access to the storage directory so set that now:

	$ chmod -R 777 app/storage
	
	
__Auto-run `composer install` on deployment__

Every time you push new code to OpenShift, you'll want to run `composer install` to make sure your dependencies are up to date. You could manually SSH in and run this, or you can configure OpenShift to manually do it whenever you deploy changes.

This is done with what OpenShift calls [**Markers**](http://openshift.github.io/documentation/oo_cartridge_guide.html#php-markers). Locally, in the *root of your application* create the following directory/file:

`.openshift/markers/use_composer`

The file you're creating (`use_composer`) is empty and does not need an extension&mdash; just its existence will signal to OpenShift that it needs to run `composer install`.

Add, commit and push this change to your OpenShift remote. 

From now on, whenever you push changes to OpenShift, `composer install` will automatically be run for you.

Be patient with the deployment process after making this change&mdash; it can take upwards of 10+ minutes to complete the `composer install` depending on how many dependencies have to be loaded.

### Test it out

When you access your OpenShift application URL are you seeing the same Laravel welcome screen you saw on your local server? If yes, you're good to go!

### A note on document root on OpenShift

When you set up Laravel locally, you had to specifically point your document root to the `public/` folder. Similarly, if you skim the deployment instructions for the other live servers, you'll notice a step outlining how to point your live document root to `public/`.

With OpenShift, you don't have to take this step because by default, OpenShift will look for a directory called `public/` to act as the document root. Convenient, right?

For reference, here's the logic OpenShift uses to determine what your DocumentRoot should be:

	IF php/ dir exists THEN DocumentRoot=php/  
	ELSE IF public/ dir exists THEN DocumentRoot=public/  
	ELSE IF public_html/ dir exists THEN DocumentRoot=public_html/  
	ELSE IF web/ dir exists THEN DocumentRoot=web/  
	ELSE IF www/ dir exists THEN DocumentRoot=www/  
	ELSE DocumentRoot=/  
	
([ref](https://www.openshift.com/blogs/openshift-online-march-2014-release-blog))

### Moving forward:

With setup complete, here are the two steps you'll take whenever you want update your live app with code changes:

1. From local, push to your `openshift` remote
2. If you made any changes to your dependencies, SSH in and run `composer install`

---
