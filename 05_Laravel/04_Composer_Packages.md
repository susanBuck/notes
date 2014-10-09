## Add new packages

Packages can be found from [Packagist](https://packagist.org/). 

Let's practice with a helpful debugging package called *Pre* which will allow you to pretty print arrays, objects, etc.

Visit the Packagist page for *Pre*: <https://packagist.org/packages/paste/pre>

Note the require line it gives you: `"paste/pre": "dev-master"`

In `/composer.json` add this line:

```php
"require": {
		"laravel/framework": "4.1.*",
		"paste/pre": "dev-master"
},
```

Within your project directory, run this command to verify your JSON is valid:

```bash
$ composer validate
```
	
Within your project directory, run this command to install the dependency and update the `composer.lock` file:

```bash
$ composer update
```
	
This will add the following directory: `/vendor/paste/pre/`

Learn more about any of the above Composer commands here: <https://getcomposer.org/doc/>


## Tips

* Use `composer update` on your development environment(s) so it grabs the versions according to your `composer.json` file and updates your `composer.lock` file.
* Use `composer install` on your production environment(s) so it grabs the versions according to your `composer.lock` file (i.e. mirror the versions exactly as they are on the development environment).



## Usage

### Method 1) Include the namespace in each call

```php
Route::get('/practice', function() {
	
	$fruit = Array('Apples', 'Oranges', 'Pears');
	
	echo Paste\Pre::render($fruit,'Fruit');
	
});
```

### Method 2) Specify the namespace ahead of time

```php
use Paste\Pre;

Route::get('/practice', function() {
	
	$fruit = Array('Apples', 'Oranges', 'Pears');
	
	echo Pre::render($fruit,'Fruit');
	
});
```
	

### Method 3) Add an alias so no namespace is required

In `/app/config/app.php` add Pre to the `aliases` array:

```php
'aliases' => array(

	'App'             => 'Illuminate\Support\Facades\App',
	'Artisan'         => 'Illuminate\Support\Facades\Artisan',
	[...]
	'Pre'			  => 'Paste\Pre',

),
```

Now you can just call Pre with no namespace:

```php
Route::get('/practice', function() {
	
	$fruit = Array('Apples', 'Oranges', 'Pears');
	
	echo Pre::render($fruit,'Fruit');
	
});
```

