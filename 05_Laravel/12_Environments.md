## Cascading configurations

Configurations in Laravel **cascade**. This means that there are a default set of configurations which live in `/app/config/`, but you can overwrite them based on specific environments.

This overwriting is done by creating new directories for unique environments in `/app/config/`.

For example, if you open `/app/config/app.php` and you should see `debug` is set to `false`:

```php
'debug' => false,
```
	
This means that, by default, this Laravel app will have debugging disabled. It's the default because the file where it lives (`app.php`) is in the root of the `config/` folder.

However, you'll also notice there's another `app.php` inside `/config/local/`, and inside this file `debug` is set to `true`:

``php
'debug' => true,
```

This means that when you run your app in `local` mode, `debug` will be `true`, overwriting the default.

Note that not everything in `/app/config/app.php` is overwritten, just the specific values you wish to overwrite (right now, that's just `debug`).



## Indicating your environment

What environment you're running in is determined in `/bootstrap/start.php` via the `detectEnvironment` method:

```php
$env = $app->detectEnvironment(array(

	'local' => array('*'),

));
```

When we set up Laravel quite a few steps back, we edited this file and put in the wildcard asterisks (`*`) so that no matter where we ran the application (local computer, production server, etc.), it was running in *local* (aka *development*) mode with all debugging messages set to true. 

Rather than using the wildcard asterisks, you could specify the *hostname* of the machines where you're running your app.

```php
$env = $app->detectEnvironment(array(

    'local' => array('Jane-Doe-MacBook-Air.local'),
    'production' => array('ex-std-node292.prod.rhcloud.com'),

));
```

This code would make it so that when Laravel was run on Jane Doe's local machine (`Jane-Doe-MacBook-Air.local`) it would run under `local` environment settings, but when it was run on OpenShift (`ex-std-node292.prod.rhcloud.com`) it would run under `production` environment settings.

FYI: A machine's hostname can be found out by running the command `hostname` in command line.

The above is the method suggested in the Laravel Docs ([ref](http://laravel.com/docs/configuration#environment-configuration)) and it works okay if you're working on your application independently, but it will be a problem if you have teammates running your code because their machine name will be different than yours.

Given that, we're going to implement an alternative environment detection method ([ref](http://crynobone.com/posts/5/alternative-environment-detection-for-laravel-4)):





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

It's important that the environment file is ignored from version control, because it will be unique for each environment in which your'e running your code.

Next, in `/bootstrap/start.php` make your `$app->detectEnvironment` closure look like this:

```php
$env = $app->detectEnvironment(function() {
    
	# See if there's an environment.php file; if it does, get environment string from there
	if(file_exists(__DIR__.'/../environment.php')) {
		return require __DIR__.'/../environment.php';
	}
	# If not found, assume production
	else {
		return 'production';
	}
	
});
```

The above code checks to see if an `environment.php` file exists, and if it does, sets the environment to be whatever String is returned from that file.

If no `environment.php` file exists, Laravel will default to `production`.

Because `environment.php` is not in version control, it means your live server will not have an `environment.php` file so it will always default to `production`, which is good.

Alternatively, you could manually create an `environment.php` file on your live server and have it return `production`, or, if you ever get really stuck and need some debugging on the live server, *temporarily* have it return `local`.

As for teammates&mdash; each collaborator on your project should be instructed to create an `environment.php` file in their local application root *if* they want to be able to run the application in local mode (which they probably will). If they don't create this file, they'll be stuck in the default which is `production`.



## Test it out

Here are two debugging Routes that can help test your environment setup.

Find out what environment you're running in:

```php
Route::get('/get-environment',function() {
		
	echo "Environment: ".App::environment();
		
});
```
	
Tip: To mimic different environments on your local machine (or any machine), change the value in your local `environment.php` file.

Trigger an error to see how debugging is being handled:


```php
Route::get('/trigger-error',function() {
	
	# Class Foobar should not exist, so this should create an error
	$foo = new Foobar;

});
```
	
When running on a local environment, you should see a detailed Laravel stack trace.
When running on a production environment, you should see a generic error message.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-debugging-on-and-off@2x.png' class='' style='max-width:962px; width:100%' alt=''>





