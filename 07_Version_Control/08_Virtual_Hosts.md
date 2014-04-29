Within your local system, you'll eventually want to work on many different apps, sometimes even at the same time. Given this, it can be a drag to have to reconfigure your Document Root for localhost every time you want to switch between apps.

In the following notes we'll set up Virtual Hosts for individual apps so that you can have local URLS specific to local apps.

For example, if you had a site called `http://javabeans.com`, you could set it up so your local version was accessible via `http://javabeans.loc`.

We'll use `javabeans` in the following examples, so **be sure to change it to match your actual app**.

## Virtual hosts on Mac/MAMP
First, open `/Applications/MAMP/conf/apache/httpd.conf` and make sure the line including httpd-vhosts.conf is *not* commented out.

Before:

	# Virtual hosts
	#Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf

After:
	
	# Virtual hosts
	Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf

Next, in terminal, open your hosts file: `/private/etc/hosts`. Read [*Editing text files in Command Line*](/Version_Control/Editing_text_files_in_CL) if you need help making edits to this file.

At the bottom of this file add a new host:

	127.0.0.1 javabeans.loc
	
This is telling your Mac that whenever you enter `http://p2.yourdomain.loc` it should map to the given IP address (that of your local server).
	
Next, you need to tell your local server how to handle this request via a Virtual Host entry.

At the bottom of `/Applications/MAMP/conf/apache/extra/httpd-vhosts.conf` add these lines:

	<VirtualHost *:80>
		ServerName javabeans.loc
		DocumentRoot /Users/YourUsername/Sites/javabeans.com
		<Directory /Users/YourUsername/Sites/javabeans.com/>
			Options Indexes FollowSymLinks MultiViews
			AllowOverride All
			Order allow,deny
			allow from all
		</Directory>
	</VirtualHost>
	

Be sure to change the following:

1. Server name (use .loc)
2. DocumentRoot (change to whatever your local directory name is for your app)
3. Directory (change to whatever your local directory name is for your app)

Note, the above assumes you're running on port 80. If you're running on something else, make that edit.

Restart WAMP and test out your local URL. 

### Summary (to be repeated every time you want to add a new app):
1. Add a new local URL in `/private/etc/hosts`
2. Add a new VirtualHost record in `/Applications/MAMP/conf/apache/extra/httpd-vhosts.conf`

### Tips
* Make shortcuts to `httpd-vhosts.conf` and `hosts` for quick access in the future.
* [MAMP Pro ($59)](http://www.mamp.info/en/mamp-pro/) offers a point and click interface to quickly edit hosts, in addition to [other features](http://www.mamp.info/en/mamp-pro/features/matrix.html).
* If you run into any problems, check your Apache error log.



## Virtual hosts on Windows/WAMP

[Open httpd.conf](http://making-the-internet.s3.amazonaws.com/vc-open-httpd-conf.png) and look for the section labeled *Virtual Hosts*. There you'll see an include for `httpd-vhosts.conf` which is commented out. Remove the # at the start of the line to uncomment it.

Before:

	# Virtual hosts
	# Include conf/extra/httpd-vhosts.conf":

After:

	# Virtual hosts
	Include conf/extra/httpd-vhosts.conf":

Next, open your hosts file located here:

	c:/Windows/System32/drivers/etc/hosts

And added the following line to the end:

	127.0.0.1 javabeans.loc
	
That says that the url `javabeans.loc` should point to the server `127.0.0.1` (your localhost)

Next, open your virtual hosts file:

	c:/wamp/bin/apache/ApacheX.X.X/conf/extra/httpd.vhosts.conf

And add this to the bottom:

	<VirtualHost *:80>
		ServerName javabeans.loc
		DocumentRoot c:/wamp/www/javabeans.com
		<Directory c:/wamp/www/javabeans.com/>
			Options Indexes FollowSymLinks MultiViews
			AllowOverride All
			Order allow,deny
			allow from all
		</Directory>
	</VirtualHost>

This is instructions for what localhost needs to do when a request comes in for `javabeans.loc`.

<small>If you're running Windows Vista, when you attempt to save the above changes, you may be told you don't have permissions. Read [*Editing text files in Command Line*](/Version_Control/Editing_text_files_in_CL) to get around this.
</small>

Restart WAMP and test out your new local URL. If you run into any problems, check your Apache error log.

### Summary (to be repeated every time you want to add a new app):
1. Add a new local URL in `c:/Windows/System32/drivers/etc/hosts`
2. Add a new VirtualHost record in `c:/wamp/bin/apache/ApacheX.X.X/conf/extra/httpd.vhosts.conf`

### Tips:
* Make shortcuts to `httpd.vhosts.conf` and `hosts` for quick access in the future.
* If you run into any problems, check your Apache error log.
* [HostsMan](http://www.abelhadigital.com/hostsman) is a free little app that makes it easier to manage your hosts file.