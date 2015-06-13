Error logs can often provide valuable clues when you've hit a dead end. Given that, let's cover where to find error logs before we dig in deeper.

## Local server logs
On your local servers you'll likely find logs in the following locations:

MAMP users:

	/Applications/MAMP/logs/

WAMP users:

	c:\wamp\logs\
	
There are three different error logs we're interested in:

* `php_error.log` PHP related errors.
* `apache_error.log` Server related errors.
* `mysql_error_log.err` MySQL (Database) related errors.


## Live server logs
As for your live server, where you'll find your logs will depend on your server configuration.

To have PHP tell you where the PHP error log is, put the following command at the top of any php file:

	<?php
	phpinfo();
	?>

Then, look for the row `error_log` to see the location.

Often, on shared servers, the location will just be `error_log` rather than a path:

<img src='http://making-the-internet.s3.amazonaws.com/framework-error-log-php-info.png'>

If that's the case, it means that a new file called `error_log` will be generated in whichever directory the error occurs.

As for the Apache log, on a shared server this is typically not made available to users.





