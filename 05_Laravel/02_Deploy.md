With your Laravel app up and running locally, let's look at the procedure for getting it running on a live server.

The following instructions covers deploying to **OpenShift**, **DigitalOcean** and **PagodaBox**. Skip to the one that matches the server you're deploying to.




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

__Download dependences (aka build `vendor/` directory)__
 
If you compare the contents of your local app to your live app, you'll notice the live app is missing a `vendor/` directory. This is because vendors are managed by Composer and not version controlled (if you open `.gitignore` you'll see `vendor/` there).

Given this, you need to have Composer build your vendor's directory with this command:

	$ composer update --prefer-dist
	
When that command is complete, if you view the contents of your app, you should now see a `vendors/` directory.

### Test it out

When you access your OpenShift app URL are you seeing the same Laravel welcome screen you saw on your local server? If yes, you're good to go!



### Moving forward:

With setup complete, here are the two steps you'll take whenever you want update your live app with code changes:

1. From local, push to your `openshift` remote
2. If you made any changes to your dependencies, SSH in and run `composer update --prefer-dist`

---


### DigitalOcean

By the time you get to this doc, you should already have a DigitalOcean droplet created (assuming you used DigitalOcean as your live server for the `hello-world` exercise). Given that, you don't need to create a new Droplet for this app; instead your new Laravel app will sit parallel to any other applications you may already have on your droplet.

Steps 1-3 above are covered in detail in the **[Deploy to DigitalOcean doc](https://github.com/susanBuck/notes/blob/master/07_Version_Control/10_Deploy_to_Digital_Ocean.md)**, so if you need a refresher, go there.

__Step 1)__ SSH into your DigitalOcean Droplet and navigate into your web accessible directory at `/var/www/html`.

__Step 2)__ Git clone your Laravel project: 

	git clone git@github.com:userName/appName.git

__Step 3)__ Create a new subdomain and VirtualHost to access your new Laravel App. 

**IMPORTANT:** For Laravel apps, the root needs to point the the `public` folder within your application. For example:

	<VirtualHost *:80>
		ServerName foobook.dwa15-practice.biz
		DocumentRoot "/var/www/html/foobook/public"
		<Directory "/var/www/html/foobook/public">
			AllowOverride all
		 </Directory>
	</VirtualHost>	

__Step 4)__ 
 
If you compare the contents of your local app to your live app, you'll notice the live app is missing a `vendor/` directory. This is because vendors are managed by Composer and not version controlled (if you open `.gitignore` you'll see `vendor/` there).

Given this, you need to have Composer build your vendor's directory with this command:

	$ composer install --prefer-dist
	
When that command is complete, if you view the contents of your live app, you should now see a `vendors/` directory.

__Step 5)__
Just like on your local server, Laravel needs write access to the storage directory on your live server; run this command to make that happen:

	$ chmod -R 777 app/storage

### Test it out

When you access your DigitalOcean subdomain are you seeing the same Laravel welcome screen you saw on your local server? If yes, you're good to go!



### Moving forward:

With setup complete, here are two steps you'll take whenever you want update your live app at DigitalOcean with code changes:

1. From local, push to your `github` remote.
2. SSH into your DigitalOcean droplet and navigate into your app folder, then run `git pull`.
2. Also while SSH'd in to your app folder, run `composer install --prefer-dist` to install any dependencies.

---

## Pagoda

All the details for getting an app online at Pagoda are covered in the **[Deploy to Pagoda doc](https://github.com/susanBuck/notes/blob/master/07_Version_Control/10_Deploy_to_Pagoda.md)**. Go there and follow the instructions for pushing your new Laravel app up to Pagoda.

Here's a summary of the steps:

1. Create a new Pagoda application.
2. Create a remote on your local project for this new pagoda app.
3. Push to this remote.

At this point, your code is deployed but when you go to your app's url on Pagoda, you'll see a directory listing.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-home-directory-not-set-on-pagoda.png' class='' style='max-width:580px; width:100%;' alt='Document root not set on pagoda'>

This is because Pagoda is not pointing to your `public/` directory, which Laravel requires.

To fix this, you need to create a [Boxfile](http://help.pagodabox.com/customer/portal/articles/175475-understanding-the-boxfile) (capital B, no extension) which contains all configurations (in [yaml](http://en.wikipedia.org/wiki/YAML)) related to your app's deployment for Pagoda. 

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
	  php_version: 5.3.10
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

