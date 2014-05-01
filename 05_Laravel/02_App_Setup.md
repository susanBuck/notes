## Create new Larval project

Move into the directory where you want to create your project.

Use composer to create a new Larval project in that directory:

	$ composer create-project laravel/laravel placecoder --prefer-dist
	
FYI: Download will take a little bit of time.	

Move into the project directory

	$ cd placecoder
	
Point your local server to the `public/` directory within your new app.


## Create a new app at Pagoda 

When given the option, start your app as an **Empty Repo** (there are Laravel QuickStart options, but we want to set it up ourselves).

### SSH Key at pagoda


## Connect to Pagoda

While in your apps folder, initiate a new git repository:

	$ git init
	
Run git status to see all your untracked files

	$ git status
	
Add all your files for comitting

	$ git add .
	
Commit these changes

	$ git commit -m 'your commit message'
	
Set your Pagoda git clone url 
<small>(FYI This is where you'd start if you were working on an existing project that was already set up with a repo)</small>

	$ git remote add pagoda git@git.pagodabox.com:placecoder.git
	
(FYI, this URL can be found in your App's Administration Settings too)

You can double check these settings via:

	$ git config -l
	
First push/deploy!

	$ git push pagoda master
	
Breakdown of the above command:
 
* `git push` The git command to push commits to a remote repository
* `pagoda` The name of the remote (we set this a few steps above)
* `master` The branch you're pushing
	
Give it some time to work...

Note that by default, Pagoda apps are set to *Automatically deploy on git push*, which is why you only have to push to Pagoda and not do any other actions for deployment. This can be toggled off in Pagoda via the Admin panel.

So now your app is deployed but when you go to your app's url on Pagoda, you'll see a directory listing ([screenshot](http://making-the-internet.s3.amazonaws.com/laravel-home-directory-not-set-on-pagoda.png)).

This is because Pagoda is not pointing to your `public/` directory.

To fix this, you need to create a [Boxfile](http://help.pagodabox.com/customer/portal/articles/175475) (capital B, no extension) which contains all configurations (in [yaml](http://en.wikipedia.org/wiki/YAML)) related to your app's deployment for Pagoda. 

The key configuration we need is `document_root: public` but we'll also set up a variety of other configurations as well.

Create this file in the root of your app project and fill it with this code (edit `name:` to match your app name):
	
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


After you add `Boxfile` commit your changes and push / deploy to Pagoda again:

	$ git push pagoda master
	
Refresh your Pagoda URL and you should now see your app working just like it is on your local server.
	
Note: You don't have to run `composer install` on Pagoda after adding Packages because it's being done for you via the Boxfile whenever you deploy:

	after_build:
		- "if [ ! -f composer.phar ]; then curl -s http://getcomposer.org/installer | php; fi; php composer.phar install"

For more information on the Boxfile, check out [Pagoda's guide](http://help.pagodabox.com/customer/portal/articles/1142671)


## Github

In addition to having a repository of your code at Pagoda, you'll also store a repository at Github. This will make it easy to share your work.

Create a new, public repostiory at Github. When doing this, do *not* initialize the repository with a README file, since you'll be working with a repository that has already been initialized.

Note the SSH URL, for example, `git@github.com:username/foobar.git`

In your project directory, add a new remote origin, for example:

	$ git remote add github git@github.com:username/foobar.git
	
Push your project up to github:

	$ git push github master

When you visit your repository on Github you should see all your changes there. 

Note you wow have **two** remote origins: `pagoda` and `github`, so make sure to push to both of these when checking in work.


## Set up a real domain

To use a real domain for your app instead of what Pagoda gives you (ex: http://foobar.pagodabox.com) goto the **DNS/SSL** tab in your app's Admin in Pagoda and add a new DNS alias. After you do this, you'll be given an IP address ([screenshot](http://making-the-internet.s3.amazonaws.com/laravel-pagoda-dns.png)).

Register a new domain via a registrar like [Namecheap](http://namecheap.com) and within your **DNS settings** create a new **A (Address)** Record that points to the IP address Pagoda gave you. ([screenshot](http://making-the-internet.s3.amazonaws.com/laravel-dns-settings-namecheap.png)).






## Set up a practice route

In `/app/routes.php` define a practice route:

```
Route::get('/practice', function() {
	
	echo 'Hello World!';
			
});

```

Load this route ala http://foobar.dev/practice and make sure you see *Hello World* on the screen.

For now on, whenever we say *"try this in your testing route"* we mean running the code in this route closure.

For example, if we say:

>> Run `echo App::environment();` in your practice route to see how you can get Laravel to tell you what environment you're on.

...we're expecting you to do this:

```
Route::get('/practice', function() {
		
	echo App::environment();
				
});
```
