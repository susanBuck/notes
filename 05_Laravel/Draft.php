## Vocabulary

Composer = Package manager for server side files
Bower    = Package manager for client side files
Gulp     = Taskrunner
Homebrow = Package manager for Apple (written in Ruby)
Node     = 
NPM      = Node Package Manager


## Command Line

Windows users, download cmder: <http://bliker.github.io/cmder/>





## Install Node

Visit <http://node.js.org> and hit the big green Install button. It should detect your operating system and download the appropriate installer.

After running the installer, you should have access to `npm` (Node Package Manager), which is Node's version of Composer.

For Window's users `npm` is located at `C:\Program Files\nodejs\npm.cmd` (assuming you installed nodejs in `Program Files`). To create an alias for npm run this command:

	$ alias npm=C:\Progra~1\nodejs\npm.cmd $*

At this point, both Mac users and Windows users should be able to run this command:

	$ npm 

It give you a bunch of information back. If it says `command not found` or something similar, installation didn't work.



## Set up Git

### Alias to create an SSH key

Create 

	alias sshkey="cat ~/.ssh/id_rsa.pub | pbcopy && echo 'Copied to clipboard.'"

Test

	sshkey
	
Get all existing alias'

	$ alias
	
## Set up MAMP

### Virtual hosts


## Set up Composer

References:

* [Laracast: Laravel Installation for Newbs](https://laracasts.com/lessons/laravel-installation-for-newbs)
* [Laracast: From Zero to Deploy with Fortrabbit](https://laracasts.com/lessons/from-zero-to-deploy-with-fortrabbit)
* Chapter 2: Composer All Over


Move into your bin directory
Mac: Paths are set in /etc/paths
	
	$ cd /usr/local/bin
	
Download and install composer.phar

	$ curl -sS https://getcomposer.org/installer | php 

Rename from composer.phar to composer

	$ mv composer.phar composer

Test it works

	$ composer

## Create new Larval project
p.24

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
	    - eaccelerator
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



## Laravel Architecture overview

TODO...

http://laravel.com/docs/lifecycle#start-files



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

	


## Add new packages

Packages can be found from [Packagist](https://packagist.org/). 

Let's practice with a helpful debugging package called Krumo which will allow you to pretty print arrays, objects, etc.

Visit the Packagist page for Krumo: <https://packagist.org/packages/oodle/krumo>

Note the require line it gives you: `"oodle/krumo": "dev-master"`

In `/composer.json` add this line, ex:

	"require": {
			"laravel/framework": "4.1.*",
			"oodle/krumo": "dev-master"
	},

Run this to verify your json is okay:

	$ composer validate
	
Install the new dependency

	$ composer install

Update composer.lock file:

	$ composer update
	
This will add the following directory: `/vendor/oodle/krumo/`

Test it out in your practice route:

	# Print an example array
	$example = Array('Apples', 'Oranges', 'Pears');
	krumo::dump($example);
	
	# Print all your configurations
	krumo::dump(Config::getItems());
	
TODO: Create an alias for this
	


## Environments

### Reference
* <http://laravel.com/docs/configuration#environment-configuration>
* <https://laracasts.com/lessons/environments-and-configuration>

### Environment configurations

Configurations in Laravel **cascade**. This means that there are a default set of configurations which live in `app/config`, but you can overwrite them based on specific environments.

This is done by creating new directories for each environment in `app/config`.

Start by creating a directory called `development` and one called `production`. 
In *both* of these directories, create a file called `app.php` and paste in the following array:

````
<?php
return array(

	/*
	|--------------------------------------------------------------------------
	| Application URL
	|--------------------------------------------------------------------------
	|
	| This URL is used by the console to properly generate URLs when using
	| the Artisan command line tool. You should set this to the root of
	| your application so that it is used when running Artisan tasks.
	|
	*/

	'url' => 'http://localhost',
	
);
````

Change the URL respectively...i.e. perhaps `http://foobar.dev` in local and `http://foobar.pagodabox.com` in production

This setting will now overwrite the default url set in `app/config/app.php`. 

Note how you don't have to replicate everything in `app/config/app.php`, just the values you wish to overwrite.

### How does Laravel know which environment you're working from?

Environment detection operates from `bootstrap/start.php`; by default Laravel assumes the `production` environment but you can make Laravel detect environments based on hosts.

For example, if you wanted it to detect your computer as a `development` environment you'd do something like this:

```
<?php

$env = $app->detectEnvironment(array(

    'development' => array('your-machine-name'),

));
```

Note that `your-machine-name` can be retreived by running `hostname` from command line. For reference, on a Mac your hostname might look something like this: `Jane-Doe-MacBook-Air.local`.

This is the method suggested in the Laravel Docs ([ref](http://laravel.com/docs/configuration#environment-configuration)) and it works okay if you're working on your app independently, but it will be a problem if you have teammates running your code because their machine name will be different than yours.

Given that, we're going to implement alternative environment detection ([ref](http://crynobone.com/posts/5/alternative-environment-detection-for-laravel-4)):

At the root of your project create a new file called `environment.php` and fill it with this code:


	<?php
	/*
	|--------------------------------------------------------------------------
	| Set your environment for this machine 
	|--------------------------------------------------------------------------
	|
	| This file is included from boostrap/start.php detectEnvironment
	|
	| This file should be in .gitignore because it's unique to each machine
	| that may need to run this app. Make sure any teammembers on your team
	| manually create this file on their own system.
	|
	*/
	
	return 'development';


Next, in `bootstrap/start.php` make your detectEnvironment closure look like this:


	$env = $app->detectEnvironment(function()
	{
	    
		# First see if LARAVEL_ENV exists - It's a global env in Pagoda's 
		# Boxfile that will set the environment (typically 'production')
		if(isset($_ENV['LARAVEL_ENV'])) 
		{
			# If it does exist, use it
			return $_ENV['LARAVEL_ENV'];
		}
		# Otherwise, defer to this machine's environment file to return 
		# the environment (i.e. 'local' or 'production')
		else 
		{
			return require __DIR__.'/../environment.php';
		}
		
	});


Summary: Each machine that runs your could should be able to set what environment it wants your Laravel app to run in.

**Tip:** to easily **mimic different environments** on your local machine, just change the value in `environment.php`. 












### Defining environments
In `boostrap/start` define the hostname of your local server (the CL command `hostname` will tell you what this is).

To test and see what environment you're in you can run `echo App::environment();` in a practice Route.



### Turn off error details on production

As an example of an environment specific configuration, let's look at how you can turn off error reporting for your production environment. This is highly suggested because you don't want errors to be displayed to your live users.

In `app/config/production/app.php` add a the `debug` value to your array and set the value to be `false`:

```
<?php

return array(
	'url' => 'http://foobar.pagodabox.com',
	'debug' => false,
);
```


## Databases

## Create the Eloquent models
p36

## Build the database schema
Laravel migrations/schema builder

Navigate into your project directory and create your first migration:

	$ php artisan migrate:make add_images_table
	
Check `/app/database/migrations` for your new migration.

All migrations include `up()` and `down()` methods.
Tables and field names are written in `snake_case`.
Table names are plural.

Set up your up() and down() then run the migration

	$ php aritsan migrate
	
	
## Passing data to JavaScript

From: 
* <https://laracasts.com/lessons/pass-data-to-your-javascript>
* <https://github.com/laracasts/PHP-Vars-To-Js-Transformer>

Get this dependency: 

	$ composer require laracasts/utilities

When it asks for version...

	$ dev-master
	
	
To the end of the `providers` array in `app/config/app.php` add this:

	'Laracasts\Utilities\UtilitiesServiceProvider',

Now you can try this in your practice route:

	JavaScript::put(['foo' => 'bar'])

	return View::make('hello'); 
	
To test, open up your web console and type the variable name `foo`. It should give you back `bar`.

Note that as it stands now, this only works with the default view, `hello`. Let's change this to something like `footer`, which you can then include on all your views.

Generate a config file for this package:

	$ php artisan config:publish laracasts/utilities
	
This generates this file: `app/config/packages/laracasts/utilities/config.php`. 

Open that up and you'll see two configuration options.

Change `bind_js_vars_to_this_view` to `footer`.

You can change js_name space to the name of your app or leave it as `window`. If you do change it, you'll have to prefix your variable names... For example if you change the namespace to `myapp` to access your variables you'd say `myapp.foo`.

	<?php
	
	return [
	
	    /*
	    |--------------------------------------------------------------------------
	    | View to Bind JavaScript Vars To
	    |--------------------------------------------------------------------------
	    |
	    | Set this value to the name of the view (or partial) that
	    | you want to prepend the JavaScript variables to.
	    |
	    */
	    'bind_js_vars_to_this_view' => 'footer',
	
	    /*
	    |--------------------------------------------------------------------------
	    | JavaScript Namespace
	    |--------------------------------------------------------------------------
	    |
	    | By default, we'll add variables to the global window object.
	    | It's recommended that you change this to some namespace - anything.
	    | That way, from your JS, you may do something like `Laracasts.myVar`.
	    |
	    */
	    'js_namespace' => 'window'
	
	];

Now make sure you include the footer in your views where you want access to your JavaScript variables.

	@include('footer')
	
Again, test in the console by entering `foo`. You should get `bar` in return.
	
	
	
	
	


## Bower: Front-end package manager

Resources: 
	* <https://laracasts.com/lessons/save-time-with-bower>
	* <http://blog.teamtreehouse.com/getting-started-bower>
	* <http://code.tutsplus.com/tutorials/meet-bower-a-package-manager-for-the-web--net-27774>

Assumptions: You've already installed Node and have access to npm

Now, install Bower:

	$ npm install -g bower
	
Common Problems: [1](http://stackoverflow.com/questions/21616785/bower-installation-errors)

Test that bower is installed:

	$ bower
	
See what commands you have available to you with bower:

	$ bower help
	
Get help about a specific command, for example `list`

	$ bower help list

Search for plugins, for example jQuery:

	$ bower search jquery
	
FYI: Regular old jQuery should be all the way at the top.

You can also browse for packages ala <http://bower.io/search/>

Before you install anything, lets tell bower where to put stuff. In the root of your Laravel app create a file called `.bowerrc` and fill it with this JSON:

	{
	
		"directory": "public/components/"
		
	}
	
Now, bower will install everything in `public/components/`. The reason we're putting it in a dir called `componenets` instead of just `js` is because backages you'll be installing can have .css files, images, etc.&mdash; not just .js files.

Now create a `bower.json` file in the root of your app which is where you can list your dependencies. Set a value `name` to be the name of your app. We'll start with one dependency: jQuery. 

	{
	  "name": "Foobar",
	  "dependencies": {
	    "jquery": "~1.x"
	  }
	}

Now, whenever you run `bower install` it will grab all the dependencies you have listed in this file (just like when you do `composer install` and grab PHP dependencies)
	
You should now have jQuery installed in `/public/components/jquery`

In your master view, you can now link in jQuery in the head of the page:

	<script src='/components/jquery/dist/jquery.min.js' type='text/javascript'></script>


Tip: for future packages, if you want to skip the step of manually editing `bower.json` you can just run a command like this:

	$ bower install jquery -S

Make sure you include the -S flag (Save) so it will also update your `bower.json` file.

If you want to remove a package:

	$ bower uninstall jquery -S
	
Again, the -S flag here makes sure it not only deletes the jquery files but also updates your `bower.json` file.

At this point, you might want to make sure Git doesnt track your componenets by adding `/public/components/` to your `.gitignore` file. This is similar how we don't want Composer's `vendor/` directory to be tracked in Version Control, since the server (and any teammates) will run `composer install` and get the needed dependencies.

*However*, Pagoda doesn't currently support Node so we can't actually run Bower there. Given that, we're going to take things one step further and use a tool to concatenate and minify all our client-side assets together and then track those assets in Version Control. This way, the necessary client-side files will just travel with the app - rather than being managed independently per system.

To do this, keep reading to the next section...

## Gulp Taskrunner

Resources:
	* <https://laracasts.com/lessons/gulp-this>
	* <https://github.com/gulpjs/gulp>
	* <https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started>

Gulp is a Taskrunner (another popular Taskrunner you may have heard of is Grunt).

A taskrunner is a method of automatic tasks such as minifying CSS files, concatenating JS files, etc.

Install gulp globally:

	$ npm install -g gulp

Now create a new file called  `package.json` in the root of your app (This is Node's equivalent of Composer's `composer.json` file). 

Start off your `package.json` file as a blank slate:

	{
	
	}

Now install gulp as part of your app's depndencies:

	$ npm install gulp --save-dev

You should now see a folder called `node_modules/` in your app's route.

Your `package.json` will also be updated to look like this:

	{
	  "devDependencies": {
	    "gulp": "~3.6.0"
	  }
	}

This tells Node that your app depends on gulp.
	
Let's install a plugin: a tool to minify CSS:

	$ npm install gulp-minify-css --save-dev
	
Now let's set up some tasks.

Create a new file called `gulpfile.js` in the root of your app and fill it with this starting template:

	// Pull in modules
	var gulp      = require('gulp');
	var minifycss = require('gulp-minify-css');
	
	// Set up common paths in your app
	var paths = {
	  css: 'public/css/*.css',
	  images: ''
	};
	
	// Set up task for the css minification called 'css'
	gulp.task('css', function() {
		
		// Fetch source file
		// pipe it through to minifycss()
		// pipe it through to the distnation
		return gulp.src('public/css/*.css')
			.pipe(minifycss())
			.pipe(gulp.dest('public/css/min'));
		
	});
	
	// Specify what your default tasks are... 
	// i.e what should run when you run 'gulp' in CL
	// Our tasks here are 'css' and 'watch'
	gulp.task('default', ['css','watch']);
	
	
	// Set up watch task
	gulp.task('watch', function() {
	
		// Watch the css folder, and upon updates run the css task
		gulp.watch(paths.css, ['css']);
	
	});
	
Read through the comments to understand what that file is doing.

To run your tasks and start and watches just run gulp:	
	$ gulp
	
This should:

	1. Run the task 'css'
	2. Run the task 'watch', which will continue to run in CL

If you had any .css files already in `public/css/` there should now be a minified copy of them in `public/css/min/`. If you didn't have any files to start, create one...

In `public/css/example.css':

	body {
		color:red;
	}

Upon creating this file, and making any updates to it, it will re-generate itself as a minified version in `public/css/min`. 

Remember that gulp has to be running in CL in order for this watcher to keep working.


Tip: you can also run just individual tasks from gruntfile.js:

	$ gulp css


Common Problems:
* [Bus watch error on Mac Mavericks](http://stephentvedt.com/2013/11/16/grunt-js-watch-bus-error/)



[ ] Create a gulp task similar to what we're doing in jarapps? Runs off of a main config file? 
[ ] Q: What does the --save-dev flag mean?



# Notes / Resources
* [Query Builder](http://laravel.com/docs/queries)
* <http://laravel-recipes.com/>
* <http://cheats.jesse-obrien.ca/>



## Common problems

Blank white screen

	chmod -R o+w app/storage/

ref: http://stackoverflow.com/questions/20678360/laravel-blank-white-screen

	
## Project ideas
* Place holder images and text utility
* Password utility - xkycd style and onetimesecret combined together
* URL Shortener
* Task manager




