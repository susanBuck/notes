


## Cascading configurations

All of the configuration files for a Laravel app are stored in the `/app/config/` directory.

Configurations in Laravel **cascade**. This means you can have a default set of variables that can be overwritten in specific environments. 

This overwriting is done by creating new directories for unique environments in `/app/config/`. Within these directories, you can then replicate the environment files found in `/app/config` and make the changes you need for that specific environment.

For example: in `app/config/app.php` there's a environment variable `debug` which is set to `false` by default.

```php
'debug' => false,
```

You can create multiple versions of `app.php` stored in different directories, with different settings.

Consider the following example:

1. `/app/config/local/app.php` We set `debug` to true
2. `/app/config/production/app.php` We set `debug` to false
3. `/app/config/app.php` We set `debug` to false


In this example, if you were running in the `local` environment (1), debug would be true. 

But if you were running in the `production` environment (2), debug would be false.

Finally, if you were running in any other environment, or you didn't have an `app.php` in any environment subdirectory (3), `debug` would be false (the default).

You can create new directories for as many different environments that you want. By default, Laravel comes with `local`, `packages` and `testing`. 

Note that not everything in the array within `/app/config/app.php` is overwritten in `/app/config/local/app.php`, just the specific values you wish to overwrite.



## Indicating your environment

What environment you're running in is determined in `/bootstrap/start.php` via the `detectEnvironment` method:

```php
$env = $app->detectEnvironment(array(

	'local' => array('*'),

));
```

When we set up Laravel quite a few steps back, we edited this file and put in the wildcard asterisks (`*`) so that no matter where we ran the application (local server, production server, etc.), it was running in *local* mode with all debugging messages enabled. 

Rather than using the wildcard asterisks, you could specify the *hostname* of the machines where you're running your app.


```php
$env = $app->detectEnvironment(array(

    'local' => array('Jane-Doe-MacBook-Air.local'),
    'production' => array('ex-std-node292.prod.rhcloud.com'),

));
```

This code would make it so that when Laravel was run on Jane Doe's local machine (`Jane-Doe-MacBook-Air.local`) it would run under `local` environment settings, but when it was run on OpenShift (`ex-std-node292.prod.rhcloud.com`) it would run under `production` environment settings.

FYI: A machine's hostname can be found out by running the command `$ hostname` in command line.

The above is the method suggested in the Laravel Docs ([ref](http://laravel.com/docs/configuration#environment-configuration)) and it works okay if you're working on your application independently, but it will be a problem if you have teammates running your code because their machine name will be different than yours.

Given that, we're going to implement an alternative environment detection method ([inspired by this blog post](http://crynobone.com/posts/5/alternative-environment-detection-for-laravel-4))...




## Environment settings with Environment.php

On your local server, at the root of your project create a new file called `/environment.php` and fill it with this code:

```php
<?php
/*
|--------------------------------------------------------------------------
| Set your environment for this machine 
|--------------------------------------------------------------------------
|
| This file is included from boostrap/start.php detectEnvironment
|
| This file should be in .gitignore because it's unique to each machine
| that may need to run this app. Make sure any team members on your team
| manually create this file on their own system.
|
*/

return 'local';
```

Note that all this file does is returns a string; in this instance it's returning the string `local`.

After you create this file, open your `.gitignore` file (you should find it in the root of your project) and add `environment.php` to the end of the list:

```
/bootstrap/compiled.php
/vendor
composer.phar
composer.lock
.env.*.php
.env.php
.DS_Store
Thumbs.db
environment.php
```

It's important that `environment.php` is ignored from Version Control, because it will be unique for each server in which you're running your code. If you let Git track changes to `environment.php` it would sync the file across your servers, which would defeat the purpose.

Next, in `/bootstrap/start.php` make your `$app->detectEnvironment` closure look like this:

```php
$env = $app->detectEnvironment(function() {
    
	# See if there's an environment.php file...
	# If it exists, get environment string from there
	if(file_exists(__DIR__.'/../environment.php')) {
		return require __DIR__.'/../environment.php';
	}
	# If not found, assume production
	else {
		return 'production';
	}
	
});
```

The above code checks to see if an `environment.php` file exists, and if it does, sets the environment to be whatever string is returned from that file.

If no `environment.php` file exists, Laravel will default to `production`, which is a safe default to assume.

This means your live server will default to `production`, *unless* you create an `environment.php` file manually on the server to change it. This could come in handy in certain debugging situations, but generally you want your live server to run in the `production` environment.

As for teammates&mdash; each collaborator on your project should be instructed to create an `environment.php` file in their local application root *if* they want to be able to run the application in a mode other than `production` (which they probably will). If they don't create this file, they'll be stuck in the default which is `production`.



## Test it out

Here are two debugging Routes that can help test your environment setup.

### Find out what environment you're running in:

```php
Route::get('/get-environment',function() {
		
	echo "Environment: ".App::environment();
		
});
```
	
Tip: To mimic different environments on your local machine (or any machine), change the returned value in your local `environment.php` file to be something else (e.g `local`, or `production`, or `testing`).

### Trigger an error to see how debugging is being handled:


```php
Route::get('/trigger-error',function() {
	
	# Class Foobar should not exist, so this should create an error
	$foo = new Foobar;

});
```
	
When running on a local environment, you should see a detailed Laravel stack trace.
When running on a production environment, you should see a generic error message.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-debugging-on-and-off@2x.png' class='' style='max-width:962px; width:100%' alt=''>





