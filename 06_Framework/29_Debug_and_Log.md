## Debugging
PHP has a handful of built in functions for dumping data onto your screen when you're writing and debugging code such as `print_r()` and `var_dump()`.

We use these functions when we need to see what data we're working with. For example, say we just received this `$_POST` array from a form that had multi-dimensions and we want to dissect the contents.

	<?php
	$_POST = Array(
			"user_1" => Array(
				"first_name" => "Judy",
				"last_name"  => "Grimes",
				"email" 	 => "judy@gmail.com"
				),
			"user_2" => Array(
				"first_name" => "Nick",
				"last_name"  => "Burns",
				"email" 	 => "nick@gmail.com"
				),
			"user_1" => Array(
				"first_name" => "Matt",
				"last_name"  => "Foley",
				"email" 	 => "matt@gmail.com"
				)
			);

To do that, we could echo it to the page via `print_r()`:

	print_r($_POST);

The results give us the info we need, but it's messy; it's only slightly more legible via "View Source":

<img src='http://content.screencast.com/users/susanBuck/folders/Jing/media/819ff357-3ac0-4a54-8a13-66e9377320e0/00003048.png'><br>

Trying to deciper the contents of strings, arrays and objects is something you're going to do *a lot*. Given this, the framework provides a better way via the Debug library and a method called `dump` which utilizes a pretty-printing class called <a target='_blank' href='http://krumo.kaloyan.info/'>Krumo</a>.

	echo Debug::dump($_POST,"Contents of POST");
	
The results are easier to read, and each layer of the array can be expanded or collapsed by clicking:
<img src='http://content.screencast.com/users/susanBuck/folders/Jing/media/08339a5b-23f5-4850-a3c0-e813412b553b/00003050.png'>

If your code editor supports code snippets / macros, we suggest making one just for this one debug line because you'll use it a lot.

Note that `Debug::dump` will not display anything if the server is in production mode (i.e. `IN_PRODUCTION` is set to true in your `environment.php`). This prevents debugging messages from showing up on your live server if you forget to delete them from your code.

For more details, explore `/core/libraries/Debug.php`


## Logging
Logging is the process of writing to a text file to record some action or data from your server.

Here are a couple examples where you might utilize logging:

### Record details of a process that is being regularly and automatically run
<a target="_blank" href='http://docs.cpanel.net/twiki/bin/view/AllDocumentation/CpanelDocs/CronJobs'>Cron Jobs</a> are a server tool we use to automatically run certain parts of your application.

Say you're building a forum and every Sunday at midnight you want it to automatically send your users a digest of the posts that were made that past week. You build a controller/method that will take care of this task, and you schedule it via Cron.

When doing something like this, you may want to log the results of this application to see what posts get sent, who the digests are sent to, and to occasionally check up on the process to make sure it's still working smoothly.

### Record debugging information when it's not easy to display it directly on the screen
If you're working on a feature that involves Ajax and sending data via specially formatted strings such as JSON, adding any debugging info to your results could gum up the works. To avoid this, you can instead send the debugging info to a log file.

## How it works
To utilize logging, first make sure your application has a folder called `logs/` and its permissions are set to writable.

Next, here's a code sample of how to use the Log library:

	# Instantiate the log class - setting the location where you want the logs to go
	$log = Log::instance(APP_PATH.'logs/');
		
	# Sample log message
	$log->logInfo('Emailed Nick Burns [nick@gmail.com] 5 new posts');
	$log->logInfo('Emailed Matt Foley [matt@gmail.com] 3 new posts');


Check your logs/ folder for the results.

For more details, explore `/core/libraries/Log.php`