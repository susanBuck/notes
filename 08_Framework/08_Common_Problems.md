If your problem isn't listed below, please provide sufficient code and screenshots when asking for assistance.

## You're setting up the framework / your first app and you're getting a require() error

Example:

	Fatal error: require() [function.require]: Failed opening required '/home/user/p2.yourdomain.com/../core/bootstrap.php' (include_path='.:/usr/local/lib/php:/usr/local/php5/lib/pear') in/home/username/p2.yourdomain.com/index.php on line 22

The error might be about `bootstrap.php` or `environment.php` or something else.

Generally this means there's something wrong with your file organization / installation.

Double check these things:

1) Is your document root pointing to the `p2.yourdomain.com` directory  ([MAMP Ex.](http://making-the-internet.s3.amazonaws.com/framework-set-local-path.png), [WAMP Ex.](http://making-the-internet.s3.amazonaws.com/framework-wamp-document-root.png))? Your application has to be running as the *root* directory in order for the file connections to work.

2) In your document root, are `core`, `environment.php` and your app all parallel to one another? Example:

	/root/
		/core/ 
		/environment.php
		/p2.yourdomain.com/

<small>Reminder, on MAMP the document root is typically `/Users/YourUsername/Sites/` and on WAMP it's typically `c:\wamp\www\`</small>

Revisit the [Install doc](http://mti.dwa15.com/Framework/Install) if you have any problems with the above.
	
## LOCAL: You're getting a 500 Internal Server Error
Make sure [rewrite_module](http://httpd.apache.org/docs/current/mod/mod_rewrite.html) is enabled. This is essential for the framework routing.

WAMP:
<img src='http://making-the-internet.s3.amazonaws.com/framework-wamp-rewrite-module.png'>

MAMP:
rewrite_module should be on by default, but if you're having problems, look for it in your Apache configuration file (`httpd.conf`):

	/Applications/MAMP/conf/apache/httpd.conf

## LIVE: You're getting a 500 Internal Server Error

This is typically a permissions issue; see the [Version Control Common Problems doc](/Version_Control/Common_problems) and find the section on permission issues.



## MAMP: You're not seeing PHP errors on the page
The framework, by default, will display errors on local. Sometimes, though, MAMP will not display the errors but instead dump them into the PHP `error_log` (fine, but not as convenient).

To turn on display errors in MAMP: 

Goto your MAMP start page: `http://localhost/MAMP/?language=English`

Click the tab up top for **phpinfo**

Find the path listed for <em>Loaded Configuration File</em>. Example:

	/Applications/MAMP/conf/php5.4.4/php.ini

Find the `php.ini` file in the specified location and make sure the following line is set to "On" and doesn't have a semi-colon commenting it out:

	display_errors = On

Restart your server after making this change.

