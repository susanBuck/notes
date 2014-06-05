## Create new Laraval project

Move into the directory where you want to create your project.

Use composer to create a new Laravel project in that directory (replace `foobar` with the name of your project):

	$ composer create-project laravel/laravel foobar --prefer-dist
	
FYI: Download will take a little bit of time.	
Move into the project directory

	$ cd foobar
	
Point your local server's document root to the `public/` directory within your new app, for example:

	c:\MAMP\htdocs\foobar\public

<img src='http://making-the-internet.s3.amazonaws.com/laravel-app-setup-document-root.png?@2x' class='' style='max-width:664px; width:75%' alt=''>

If all went well, you should see Laravel's default welcome page when you hit `http://localhost` in your browser:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-app-setup-success.png?@2x' class='' style='max-width:506px; width:75%' alt=''>

### Tips
* If http://localhost doesn't work, check what your *Ports* are set to in MAMP. The Apache port has to be 80 for `http://localhost` to work. Otherwise, you have to specify the specific port, for example `http://localhost:8888`




## Git

In your app directory, initiate a new Git repository:

	$ git init
	
### Github
Create a new, public repository at Github. When doing this, do *not* initialize the repository with a `README.md` file, since you'll be working with a repository that has already been initialized.

Note the SSH URL, for example, `git@github.com:username/foobar.git`

In your project directory, add a new remote origin called `github`, for example:

	$ git remote add github git@github.com:username/foobar.git	
	
### First commit
Run git status to see all your untracked files:

	$ git status
	
Add all your files for comitting:

	$ git add .
	
Commit these changes:

	$ git commit -m "your commit message"

Push your project up to github:

	$ git push github master

When you visit your repository on Github you should see all your changes there. 


## Update your `readme.md` file.

By default, Laravel has a lot of Laravel-specific info in your new app's `README.md` file. Replace this with a description of your project and commit the changes.


## Get your app online (Pagoda Box)

Follow the instructions in Version Control/Deploy_to_Pagoda to deploy your new app to Pagoda. Summary:

1. Create a new, *Empty* app on Pagoda.
2. In your local project directory, set Pagoda as a remote: `git remote add pagoda git@git.pagodabox.com:foobar.git`
3. Deploy by pushing the master branch: `git push pagoda master`

Once your app is deployed, when you go to your app's url on Pagoda, you'll see a directory listing:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-home-directory-not-set-on-pagoda.png' class='' style='max-width:415px; width:75%' alt=''> 

This is because Pagoda is not pointing to your `public/` directory, and can be fixed with a boxfile...




## Pagoda Boxfile 

A Pagoda [Boxfile](http://help.pagodabox.com/customer/portal/articles/175475) (capital B, no extension) is a file you create which contains all configurations (in [yaml](http://en.wikipedia.org/wiki/YAML)) related to your app's deployment for Pagoda. 

The key configuration we need to first set is `document_root: public` but we'll also set up a variety of other configurations as well.

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

**Reminder: You have two remotes for your app: One at Github and one at Pagoda. Make sure you push to two after significant changes**


	

## More about the Boxfile

The above Boxfile was designed specifically to work with Laravel. In addition to setting your document_root, it also does the following:

+ Sets an environment called `LARAVEL_ENV`. to `production`.
+ Runs `composer install` after each deployment.
+ Makes sure the directories that Laravel needs to be writable are writable.
+ Clears any caches.
+ Loads the necessary php extensions.

For more information on the Boxfile, check out [Pagoda's guide](http://help.pagodabox.com/customer/portal/articles/1142671)




## Set up a real domain

If you want to use a real domain for your app instead of the free subdomain Pagoda provides you, goto the **DNS/SSL** tab in your app's Admin in Pagoda and add a new DNS alias. After you do this, you'll be given an IP address ([screenshot](http://making-the-internet.s3.amazonaws.com/laravel-pagoda-dns.png)).

Register a new domain via a registrar like [Namecheap](http://namecheap.com) and within your **DNS settings** create a new **A (Address)** Record that points to the IP address Pagoda gave you ([screenshot](http://making-the-internet.s3.amazonaws.com/laravel-dns-settings-namecheap.png)).





