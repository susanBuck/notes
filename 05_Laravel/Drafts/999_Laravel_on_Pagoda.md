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

