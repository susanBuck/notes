## Reference
* <http://laravel.com/docs/configuration#environment-configuration>
* <https://laracasts.com/lessons/environments-and-configuration>

## Cascading

Configurations in Laravel **cascade**. This means that there are a default set of configurations which live in `app/config`, but you can overwrite them based on specific environments.

This is done by creating new directories for each environment in `app/config`.


## Development environment
Start by creating a directory called `development` and in this directory create a file called `app.php` with the following array:

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
	'debug' => true,
	
);
````

Make sure the URL matches however your access your app locally, for example `http://localhost` or `http://foobar.dev`

Now, whenever you're in *development* mode, these settings will overwrite the default settings in `app/config/app.php`. 

Note that not everything in `app/config/app.php` is overwritten, just the values you wish to overwrite (right now, that's just `url` and `debug`).


## Production environment

Duplicate the above steps to set up a production environment.

1. Create a new folder called `production` inside `app/config`
2. Within this new folder, create a new file called `app.php`
3. Within this new file, copy the above array but set `url` to be your site's live URL, and set `debug` to be `false` (you don't want debugging information to display on your live site)



## How does Laravel know which environment you're working from?

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
		else if(file_exists(__DIR__.'/../environment.php')) 
		{
			return require __DIR__.'/../environment.php';
		}
		else {
			dd('Missing LARAVEL_ENV or environment.php file');
		}
		
	});



Summary: Each machine that runs your code should be able to set what environment it wants your Laravel app to run in.

**Tip:** to easily **mimic different environments** on your local machine, just change the value in `environment.php`. 




## Which environment?

To test and see what environment you're in you can run `echo App::environment();` in a practice Route.


