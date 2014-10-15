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

To use your newly installed vendor, you should look at the specific instructions for that vendor.

If we look at the instructions for Pre, [found on its README page](https://github.com/paste/Pre.php) it indicates that Pre's methods are called statically, using the `Class::method()` syntax:

```php
<?php
// Using shortcut r() method with label
echo Pre::r($data, 'Debug Label');

// Using regular render() method, no label
echo Pre::render($data);
```

For our examples, we'll try out the latter approach using `render()`.

In order to use the Pre class, though, we need to specify the namespace for this class. This can be done in three different ways...

### Option 1) Include the namespace in each call

For this first option, we'll simply specify the namespace before we use the class. 

```php
Route::get('/practice', function() {
	
	$fruit = Array('Apples', 'Oranges', 'Pears');
	
	# Here we explicitly include the namespace in our call to the `Pre` class and the `render()` method.
	echo Paste\Pre::render($fruit,'Fruit');
	
});
```

This method is straightforward, but would require you to specify the namespace *every* time you wanted to use this class. If it's a frequently used class, this can get a little tedious.

### Option 2) Specify the namespace ahead of time

Using the `use` keyword, we can specify what namespace should be used for any code coming after this line...

```php

# Specify the namespace via the `use` keyword
use Paste\Pre;

Route::get('/practice', function() {
	
	$fruit = Array('Apples', 'Oranges', 'Pears');
	
	# No namespace required since it was specified above
	echo Pre::render($fruit,'Fruit');
	
});
```

If we added more routes to this example, each one could use the `Pre::render()` class/method without having to indicate the namespace.
	

### Option 3) Add an alias so no namespace is required

Finally, if you anticipate using a class frequently throughout your application, you can create a global alias for it.

This is done in `/app/config/app.php` in the array called `aliases`.

Here's an example of how you'd update the `aliases` array to add Pre:

```php
'aliases' => array(

	'App'             => 'Illuminate\Support\Facades\App',
	'Artisan'         => 'Illuminate\Support\Facades\Artisan',
	[...]
	'Pre'			  => 'Paste\Pre',

),
```

The *key* is the alias name you want to use (`Pre`) and the *value* is the full path to the class, including the namespace (`Paste\Pre`)

Once you've set up this alias, you can call the Pre class with no namespace and without having to utilize the `use` keyword.

```php
Route::get('/practice', function() {
	
	$fruit = Array('Apples', 'Oranges', 'Pears');
	
	echo Pre::render($fruit,'Fruit');
	
});
```

## Which option is best?
Which method you want to use is up to you, but here's a general guideline:

+ Using a Class just once? Use Option 1.
+ Using a Class multiple times in a single file? Use Option 2.
+ Using a Class multiple times throughout your application? Use Option 3.

## Understanding the structure of packages

*Preface: If you're new to Object Oriented programming, some of the terms used below may be confusing (classes, objects, methods, instantiating, static, etc.). You can read [this note set](https://github.com/susanBuck/notes/blob/master/05_Laravel/999_OOP_Summary.md) for a quick run down and insight into some of these OOP-related terms.*

Most packages are written using Object Oriented code and therefor, within each package you'll find one or more class(es).

For example...

+ The [Pre](https://packagist.org/packages/paste/pre) package has a class called `Pre` (<a href='https://github.com/paste/Pre.php/blob/master/src/Paste/Pre.php'>Pre.php</a>). Inside this class, we see several *static* methods.
+ The [xi-randomstring](https://packagist.org/packages/xi/randomstring) package has a class called `RandomStringGenerator` (<a href='https://github.com/xi-project/xi-randomstring/blob/master/library/Xi/RandomString/RandomStringGenerator.php'>RandomStringGenerator.php</a>). 
+ The [LoremIpsum](https://packagist.org/packages/badcow/lorem-ipsum) package has a class called `Generator` (<a href='https://github.com/samuelwilliams/LoremIpsum/blob/master/lib/Badcow/LoremIpsum/Generator.php'>Generator.php</a>).

Looking at a package's class(es) can help you better get insight into how to use that package, especially if the documentation is sparse.

For example, the *xi-randomstring* package provides absolutely no documentation in its [README.md file](https://github.com/xi-project/xi-randomstring). Not super helpful.

However, if we dig into it's contents and examine the `RandomStringGenerator` class ([RandomStringGenerator.php](https://github.com/xi-project/xi-randomstring/blob/master/library/Xi/RandomString/RandomStringGenerator.php)), we can gleam insight into how to use this package because it's a relatively simple class:

```php
<?php

/**
 * This file is part of the Xi Filelib package.
 *
 * For copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Xi\RandomString;

/**
 * Random string generator
 */
class RandomStringGenerator
{
    /**
     * @var string Character list
     */
    private $charlist;

    /**
     * @param string $charlist
     */
    public function __construct($charlist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?")
    {
        $this->charlist = $charlist;
    }

    /**
     * Generates a random string of defined length
     *
     * @param $length
     * @return string
     */
    public function generate($length)
    {
        $i = 0;
        $random = "";
        while ($i < $length) {
            $random .= $this->charlist{mt_rand(0, (strlen($this->charlist) - 1))};
            $i++;
        }
        return $random;
    }

}
```

First, we see it does *not* have static methods like Pre does, so this means we have to instantiate the class as an object in order to use it. Secondly, we see that it has one method, `generate($length)`, which looks pretty straightforward: give it a length and it'll return a random string.

Given this information, we could build an example that looks like this:

```php
# Instantiate a new RandomStringGenerator Object
$string_generator = new Xi\RandomString\RandomStringGenerator();

# Use the generate() method on this object
echo $string_generator->generate(10);
```

Note how in this example, the package name (`RandomString`) did not match the class name (`RandomStringGenerator`). In an ideal world, you'd be clued into this via the packages documentation, but lacking that, you can dig into the files yourself and see what names you should be using.

Continuing on with this example, now lets create an alias for the `RandomStringGenerator` class. 
First, we'll update the `aliases` array in `/app/config/app.php`: 

```php
'aliases' => array(

	'App'             => 'Illuminate\Support\Facades\App',
	'Artisan'         => 'Illuminate\Support\Facades\Artisan',
	[...]
	'Pre'			  => 'Paste\Pre',
	'RndStr'	      => 'Xi\RandomString\RandomStringGenerator',
),
```

The *key* is the alias we came up with, `RndStr`.

The *value* is the full namespace, followed by the class name.

Now, we can update our example to use this alias:

```php
# Instantiate a new RandomStringGenerator Object
$string_generator = new RndStr();

# Use the generate() method on this object
echo $string_generator->generate(10);
```

