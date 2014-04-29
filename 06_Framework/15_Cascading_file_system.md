This framework uses a *cascading file system*. This system is similar to CSS (Cascading Style Sheets) where style properties can overwrite one another based on the hierarchy in which they're called.

This means that there are several aspects of your application that can be set on either A) The **app level** or B) the **core level**. The system always checks on the app level first, and if it doesn't find what it's looking for there, it will check the core level.

`configs.php` is a good example of the cascading file system at work. In the last section, you edited your app level config file, but if you look in `/core/configs/config.php` you'll also see a series of configs, all which can be overwritten at the app level.

For example, the following line in core config says that if `TIME_FORMAT` is not already defined it should be `F j, Y g:ia`

	if(!defined('TIME_FORMAT')) define('TIME_FORMAT', 'F j, Y g:ia');  

If you wanted to overwrite this, for example, to make the default time format be `Y-m-d` you could set this in your app level config:

	define('TIME_FORMAT', 'Y-m-d');  

**Be sure to check core config for a full list of configurations you may wish to override.**

## Cascading Controllers and Libraries
In addition to configs, Controllers and Libraries also cascade.

This means if you request a controller called `foobar` (`http://localhost/foobar`), the framework would first check for `/app/controllers/c_foobar.php` and then, if it didn't find it there, `/core/controllers/c_foobar.php`.

The same can be said for libraries. If you call a library `Foobar` it would look first for `/app/libraries/Foobar.php` and then, if it didn't find it there, `/core/libraries/Foobar.php`.

## Shared / Vendors

Occasionally you may wish to include an external PHP class in your projects that you've found online. It's also possible that you may want this same class accessible to more than one app you're working on.

To make this possible, create a `/shared/vendors/` directory parallel to core and your apps. Within this vendors directory, place your class within its own directory:

	root/
		core/
		environment.php
		p1.yourdomain.com
		p2.yourdomain.com
		shared/vendors/ClassName/ClassName.php	
		
Important: the directory and class name must match in order for autoloading to work.

## (FYI) How does the cascading file system work?

The cascading file system is powered by the File class (`/core/libraries/File.php`) which specifies all the levels (app, core, shared) the the framework should check when looking for configs, controllers or libraries.

Auto-loading Libraries, specifically, is powered by the `autoloader()` method within File.

And what triggers `autoloader()`? This brings us back to `bootstrap.php`, specifically this line which delegates PHP auto loading to File's autoload() method:
	
	spl_autoload_register(array('File', 'autoloader'));
