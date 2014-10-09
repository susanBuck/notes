## Pagoda Boxfile 

A Pagoda [Boxfile](http://help.pagodabox.com/customer/portal/articles/175475) (capital B, no extension) is a file you create which contains all configurations (in [yaml](http://en.wikipedia.org/wiki/YAML)) related to your app's deployment for Pagoda. 

The key configuration you need to set is `document_root: public` but you'll also set up a variety of other configurations as well.

Create this file in the root of your app project and fill it with this code (edit `name: foobar` to match your app name):
	
	global:
	  env:
	    - LARAVEL_ENV: production
	web1:
	  after_build:
	    - "if [ ! -f composer.phar ]; then curl -s http://getcomposer.org/installer | php; fi; php composer.phar install"
	  name: foobar
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


After you add `Boxfile` commit your changes and push / deploy to Pagoda again:

	$ git add Boxfile
	$ git commit -m "Added Pagoda Boxfile"
	$ git push pagoda master

Pushing to Pagoda will trigger your entire app to re-deploy, so it's not as quick as when you push to Github.com.

Read any output it gives you, making sure there aren't any issues with deployment.
	
When deployment/pushing is done, refresh your Pagoda URL and you should now see your app working just like it is on your local server.




## More about the Boxfile

The above Boxfile was designed specifically to work with Laravel. In addition to setting your document_root, it also does the following:

+ Sets an environment called `LARAVEL_ENV`. to `production`.
+ Runs `composer install` after each deployment.
+ Makes sure the directories that Laravel needs to be writable are writable.
+ Set the `document_root` to `public`
+ Specify the PHP version to use. As of this writing, the newest version Pagoda has is 5.4.14, which supports the Laravel requirement of being > 5.4.0.
+ Clears any caches.
+ Loads the necessary php extensions.

Some of the above won't make sense yet, but you'll be using it as we move along.

For more information on the Boxfile, check out [Pagoda's guide](http://help.pagodabox.com/customer/portal/articles/1142671).



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

