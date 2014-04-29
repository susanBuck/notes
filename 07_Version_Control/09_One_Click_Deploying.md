Having to SSH into your server every time you want deploy changes is a pain.

Here's how you can do this task via a 1-click-bookmark in your browser.

### Step 1: Deploy directory
On your live server, in the public_html folder, create a directory called `deploy/`. 
<small>(You don't have to do this via Version Control/Git; you can just use FTP; it's a small project we're going to set once and forget.)</small>

### Step 2: Create a shell script that will execute the deploy
In your deploy directory, create a file called `pull.sh` with the following contents. 
Make sure you replace your-username and your-repo-name.

	#! /bin/bash

	# The following two lines would be replicated for any other repository you wanted to be included in this 1-click-deploy
	cd /home/your-username/www/your-repo-name
	git pull origin master


Make sure the permissions on this file are set to 755, by SSH'ing into your live server, navigating to your deploy directory, and running this command:

	chmod 755 pull.sh

### Step 3 Log file
Create a blank file called `log.txt` inside the deploy directory. This will keep a running log of all the times you run the 1-click-deploy.
	
### Step 4 Pull script
Also in the deploy directory, create another file called `pull.php` with the following contents:

	<?php
	
	// Show any errors
	ini_set('display_errors', true);
	
	// Initialize the output array
	$output = array();
	
	// Find out where we're running from
	$webroot = $_SERVER['DOCUMENT_ROOT'];
	
	// Execute the shell script
	exec("$webroot/deploy/pull.sh 2>&1", $output);
	
	// Set the log file
	$log = "$webroot/deploy/log.txt";
	
	// Get previous log contents so we can prepend
	$log_contents = file_get_contents($log);
	
	// cut after 10k lines
	$log_contents = substr($log_contents, 0, 10000);
	
	// Build the log record
	$str = "================ ".date('Y-m-d H:i:s')." ===============\n";
	
	foreach ($output as $line) {
		$str .= $line."\n";
	}
	
	$str .= "\n\n";
	
	// Write the log
	file_put_contents($log, $str.$log_contents);
	
	// Print the results
	echo '<pre>'.$str.'</pre>';

### Step 5 Test
When you visit http://yourdomain.com/deploy/pull.php you should see the results of a `git pull origin master` command.
Bookmark this page for quick access.

### Security note
Keep in mind we haven't done anything to "lock down" this process, which means if anyone finds your deploy link, they can run it. On a real-life site, you may want to [set an htaccess password](http://davidwalsh.name/password-protect-directory-using-htaccess) on the directory.
