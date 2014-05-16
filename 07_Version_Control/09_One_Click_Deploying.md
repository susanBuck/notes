Having to SSH into your server every time you want deploy changes can be a pain.

Here's how you can do this task via a 1-click-bookmark in your browser.

### Step 1: Deploy directory
On your live server, in the `public_html/` directory, create a new directory called `deploy/`. 

<small>(You don't have to do this via Version Control/Git; you can just use FTP; it's a small project we're going to set once and forget.)</small>

### Step 2: Create a shell script that will execute the deploy
In your deploy directory, create a file called `pull.sh` with the following contents. Change the path name to match the path to the directory/repository you want to pull from.

	#! /bin/bash

	# Debugging:
	# whoami
	# pwd
	
	# Repo
	cd /home/webstart/www/example1.com
	pwd
	git pull origin master
	
	echo '----------------------------------------------------'
	
	# Repeat the above code for as many repos as you want to deploy...
	# cd /home/webstart/www/example2.com
	# pwd
	# git pull origin master

The deploy.sh shell script needs to be executable so set the permissions to 755:

	chmod 755 pull.sh
	

### Step 3 Log file
Create a blank file called `log.txt` inside the deploy directory. This will keep a running log of all the times you run the 1-click-deploy.
	
### Step 4 Pull script
Also in the deploy directory, create another file called `pull.php` with the following contents:

	<?php
	# Show any errors
	error_reporting(-1);
	ini_set('display_errors', true);
	
	# Setup variables
	$output  = array();
	$webroot = $_SERVER['DOCUMENT_ROOT'];
	$log     = $webroot."/log.txt";
	
	# Execute the shell script
	exec($webroot."/deploy.sh 2>&1", $output);
	
	# Get previous log contents so we can prepend
	$log_contents = file_get_contents($log);
	
	# Cut after 10k lines
	$log_contents = substr($log_contents, 0, 10000);
	
	$str = "================ ".date('Y-m-d H:i:s')." ===============\n";
	
	# Loop through the output and put it together on a string
	foreach ($output as $line) {
		$str .= $line."\n";
	}
	$str .= "\n\n";
	
	# Append the output string to the log
	file_put_contents($log, $str.$log_contents);
	
	# Display the results (for when this page is run in the browser)
	echo '<pre>'.$str.'</pre>';

### Step 5 Test
When you visit `http://yourdomain.com/deploy/pull.php` you should see the results of a `git pull origin master` command.

Bookmark this page for quick access.

### Security note
Keep in mind we haven't done anything to lock down this process, which means if anyone finds your deploy link, they can run it. On a real-life site, you may want to [set an htaccess password](http://davidwalsh.name/password-protect-directory-using-htaccess) on the directory.
