Resources:
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
	
	
	
	
	
