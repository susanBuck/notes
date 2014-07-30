With your Laravel app up and running locally, let's look at the procedure for getting it running on a production (aka live) server.

The following instructions cover deploying to **OpenShift**, **DigitalOcean** and **PagodaBox**. Skip to the one that matches the server you're deploying to.




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








### DigitalOcean

By the time you get to this doc, you should already have a DigitalOcean droplet created (assuming you used DigitalOcean as your production server for the `hello-world` exercise). Given that, you don't need to create a new Droplet for this app; instead your new Laravel app will sit parallel to any other applications you may already have on your droplet.

__Step 1)__ SSH into your DigitalOcean Droplet and navigate into your web accessible directory at `/var/www/html`.

__Step 2)__ Git clone your Laravel project: 

	git clone git@github.com:userName/appName.git

__Step 3)__ Create a new subdomain and VirtualHost to access your new Laravel App. 

**IMPORTANT:** For Laravel apps, the root needs to point the the `public` folder within your application. For example:

	<VirtualHost *:80>
		ServerName foobook.dwa15-practice.biz
		DocumentRoot "/var/www/html/foobook/public"
		<Directory "/var/www/html/foobook/public">
			AllowOverride All
		 </Directory>
	</VirtualHost>	

__Step 4)__ If you haven't already installed Composer on your Droplet, you'll need to do that now. 

Here's a summary of the commands ([full details here](https://github.com/susanBuck/notes/blob/master/05_Laravel/01_Composer_Setup.md#install-composer-on-mac)):

```bash
$ cd /usr/local/bin
$ curl -sS https://getcomposer.org/installer | php 
$ mv composer.phar composer
$ composer
```

__Step 5)__ 
 
If you compare the contents of your local application files to your production application files on DigitalOcean, you'll notice the DigitalOcean version is missing a `vendor/` directory. This is because vendors are managed by Composer and not version controlled (if you open `.gitignore` you'll see `vendor/` there).

Given this, you need to have Composer build your vendor's directory with this command:

```bash
$ composer install --prefer-dist
```
	
When that command is complete, if you view the contents of your live app, you should now see a `vendors/` directory.


__Step 6)__
Laravel requires the PHP extension mcrypt so run this command to make sure it's enabled:

```bash
$ sudo php5enmod mcrypt
```

You should also make sure Apache mod_rewrite is enabled since Laravel needs that for routing:

```bash
$ a2enmod rewrite
```

Restart Apache to make these two change take effect:

```bash
$ sudo service apache2 restart
```

__Step 5)__
Just like on your local server, Laravel needs write access to the storage directory on your production server; run this command to make that happen:

	$ chmod -R 777 app/storage

### Test it out

When you access your DigitalOcean subdomain are you seeing the same Laravel welcome screen you saw on your local server? If yes, you're good to go!



### Moving forward:

With setup complete, here are two steps you'll take whenever you want update your production application at DigitalOcean with code changes:

1. From local, push to your `github` remote.
2. SSH into your DigitalOcean droplet and navigate into your app folder, then run `git pull`.
2. Also while SSH'd in to your app folder, run `composer install` to install any dependencies.

---





## PagodaBox

All the details for getting an app online at PagodaBox are covered in the **[Deploy to Pagoda doc](https://github.com/susanBuck/notes/blob/master/07_Version_Control/10_Deploy_to_Pagoda.md)**. Go there and follow the instructions for pushing your new Laravel app up to PagodaBox.

Here's a summary of the steps:

1. Create a new PagodaBox application.
2. Create a remote on your local project for this new pagoda app.
3. Push to this remote.

At this point, your code is deployed but when you go to your app's url on PagodaBox, you'll see a directory listing.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-home-directory-not-set-on-pagoda.png' class='' style='max-width:580px; width:100%;' alt='Document root not set on pagoda'>

This is because PagodaBox is not pointing to your `public/` directory, which Laravel requires.

To fix this, you need to create a [Boxfile](http://help.pagodabox.com/customer/portal/articles/175475-understanding-the-boxfile) (capital B, no extension) which contains all configurations (in [yaml](http://en.wikipedia.org/wiki/YAML)) related to your app's deployment for PagodaBox. 

The key configuration we need is `document_root: public` but we'll also set up a variety of other configurations as well.

Create a file called `Boxfile` in the root of your app project and fill it with this code (edit `name:` to match your app name):
	
	global:
	  env:
	    - LARAVEL_ENV: production
	web1:
	  after_build:
	    - "if [ ! -f composer.phar ]; then curl -s http://getcomposer.org/installer | php; fi; php composer.phar install"
	  name: application name
	  shared_writable_dirs:
	    - /app/storage/cache
	    - /app/storage/logs
	    - /app/storage/meta
	    - /app/storage/sessions
	    - /app/storage/views
	  document_root: public
	  php_version: 5.4.14
	  php_extensions:
	    - zip
	    - pdo_mysql
	    - mcrypt
	    - memcached
	  after_deploy:
	    - "rm -f app/storage/cache/*"
	    - "rm -f app/storage/views/*"


After you add `Boxfile` commit your changes and push/deploy to Pagoda again:

	$ git add Boxfile
	$ git commit -m "Added Pagoda Boxfile"
	$ git push pagoda master
	
Refresh your Pagoda URL and you should now see your app working just like it is on your local server.
	
Note: You don't have to run `composer install` on Pagoda after adding Packages because it's being done for you via the Boxfile whenever you deploy:

	after_build:
		- "if [ ! -f composer.phar ]; then curl -s http://getcomposer.org/installer | php; fi; php composer.phar install"

For more information on the Boxfile, check out [Pagoda's guide](http://help.pagodabox.com/customer/portal/articles/175475-understanding-the-boxfile)

### Moving forward:

With setup complete, whenever you want to deploy new code changes to Pagoda, all you have to do is push to your Pagoda remote:

	$ git push pagoda master



---

## Tips / Notes

* If you're seeing a **blank white screen**, make sure your `vendors/` directory exists. It should exist by default on your local app, because it comes with laravel by default. It won't exist on your live app, however, because `vendors` is set to be ignored in version control via `.gitignore`. To build/update the vendors directory, SSH into your live server and run `composer update --prefer-dist`.

* When using the `composer create-project` command, we added the `--prefer-dist ` flag. You can read more about `--prefer-dist` and how it differs from `--prefer-source` [here](https://getcomposer.org/doc/03-cli.md#install).

