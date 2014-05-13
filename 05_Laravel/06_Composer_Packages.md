## Add new packages

Packages can be found from [Packagist](https://packagist.org/). 

Let's practice with a helpful debugging package called Pre which will allow you to pretty print arrays, objects, etc.

Visit the Packagist page for Pre: <https://packagist.org/packages/paste/pre>

Note the require line it gives you: `"paste/pre": "dev-master"`

In `/composer.json` add this line, ex:

	"require": {
			"laravel/framework": "4.1.*",
			"paste/pre": "dev-master"
	},

Run this to verify your json is okay:

	$ composer validate
	
Install the new dependency

	$ composer install

Update composer.lock file:

	$ composer update
	
This will add the following directory: `/vendor/paste/pre/`

## Usage

### Method 1) Include the namespace in each call

	Route::get('/practice', function() {
		
		$fruit = Array('Apples', 'Oranges', 'Pears');
		
		echo Paste\Pre::render($fruit,'Fruit');
		
	});

### Method 2) Specify the namespace ahead of time

	use Paste\Pre;
	
	Route::get('/practice', function() {
		
		$fruit = Array('Apples', 'Oranges', 'Pears');
		
		echo Pre::render($fruit,'Fruit');
		
	});
	

### Method 3) Add an alias so no namespace is required

In `/app/config/app.php` add Pre to the `aliases` array:

	'aliases' => array(

		'App'             => 'Illuminate\Support\Facades\App',
		'Artisan'         => 'Illuminate\Support\Facades\Artisan',
		[...]
		'Pre'			  => 'Paste\Pre',

	),

Now you can just call Pre with no namespace:

	Route::get('/practice', function() {
		
		$fruit = Array('Apples', 'Oranges', 'Pears');
		
		echo Pre::render($fruit,'Fruit');
		
	});


