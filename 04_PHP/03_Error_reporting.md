[php.net error reporting](http://www.php.net/manual/en/function.error-reporting.php)

## File-level configuration
Add the following code to the *very top* of your display page (before the doctype).

	<?php
	error_reporting(E_ALL);       # Report Errors, Warnings, and Notices
	ini_set('display_errors', 1); # Display errors on page (instead of a log file)
	?>
	
If you've added the above code and you're not getting any error feedback (i.e. you run your script and you just see a blank white screen),
it means you have a syntax error in the file that is preventing the file (including the error reporting code) from being interpreted at all ([source](http://stackoverflow.com/questions/16933606/error-reportinge-all-does-not-produce-error)). 

Either track down the syntax issue, or if you really get stuck you can enable error reporting on a server-level...

## Server-level configuration

At the top of your page add the `phpinfo();` function to get a list of your current server configurations. 

	<?php
	phpinfo();
	?>

From the resulting table, we're interested in the following:

* The location of your `php.ini` file, for example `C:\MAMP\conf\php5.7.5\php.ini`.
* What your `display_errors` configuration is set to.
* What your `error_reporting` configuration is set to.

To adjust these settings, track down the `php.ini` file and change `display_errors` to be `on` and `error_reporting` to be `E_ALL`.

To make these changes take effect, restart your server. 


## Error Levels

* **Notices**: *You probably shouldn't be doing what you're doing, but I'll let you do it anyway.*
* **Warnings**: *You are doing something wrong and it is very likely to cause errors in the future, so please fix it.*
* **Error**: *You are something so wrong the script will terminate.*

On a development / local server it's suggested you have all levels of errors reported.

On a production / live server it's considered best practices to surpress all errors.