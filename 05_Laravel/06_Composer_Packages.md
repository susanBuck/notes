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