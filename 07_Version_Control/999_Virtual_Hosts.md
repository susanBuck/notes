Within your local system, you'll eventually want to work on many different apps, sometimes even at the same time. Given this, it can be a drag to have to reconfigure your Document Root for http://localhost every time you want to switch between apps.

In the following notes we'll set up Virtual Hosts for individual apps so that you can have local URLs specific to each app you're working on.

For example, if you had a site called `http://foobar.com`, you could set it up so your local version was accessible via `http://foobar.loc`.

We'll use an app called `foobar.com` in the following examples.


## 1. Tell Apache to use the virtual hosts file

First, locate `httpd.conf`, your MAMP Apache configuration file.

* Mac: `/Applications/MAMP/conf/apache/httpd.conf`
* Windows: `c:\MAMP\conf\apache\httpd.conf`

In the `httpd.conf` file, make sure the line including `httpd-vhosts.conf` is *not* commented out by removing the pound sign from the start of the `Include` (if there is one):

Mac:

	# Virtual hosts
	Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf

Windows:
	
	# Virtual hosts
	Include conf/extra/httpd-vhosts.conf


## 2. Create a new host

Next, open your computer's hosts file. This file can be used to route domains to an IP address of your choice. 

* Mac: `/private/etc/hosts`
* Windows: `c:/Windows/System32/drivers/etc/hosts`

(Note, there's no extension on this file.)

The hosts file is protected, so you'll need to open it with administrator privileges. 

On the Mac, you can use the `sudo` command and nano to get this done:

	$ sudo nano /private/etc/hosts

On Windows, if you're using *Cmder* it should be running as Administrator by default, so you should be able open up the file in Notepad:

	$ notepad c:/Windows/System32/drivers/etc/hosts

Read [*Editing text files in Command Line*](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_Editing_text_files_in_CL.md) if you need a refresher on editing files from the command line.

At the bottom of your hosts file, add a new host:

	127.0.0.1 foobar.loc
	
This is telling your computer that whenever you access `http://foobar.loc` from your computer, it should map to the ip address `127.0.0.1` (the IP address of your local server).
	

## 3. Virtual Host entry

Next, tell your local server how to handle requests to `http://foobar.loc` via a Virtual Host entry. Open your `httpd-vhosts.conf` file.

* Mac: `/Applications/MAMP/conf/apache/extra/httpd-vhosts.conf`
* Windows: `c:\MAMP\bin\apache\conf\extra\httpd-vhosts.conf`

At the bottom of this file you'll see two example virtual host blocks, one for `dummy-host.example.com` and another for `dummy-host2.example.com`. Delete these.

<img src='http://making-the-internet.s3.amazonaws.com/vc-vhost-examples@2x.png' class='' style='max-width:728px; width:75%' alt=''>

Now, add your own virtual host block:

	<VirtualHost *:80>
		ServerName foobar.loc
		DocumentRoot /Users/Documents/Sites/foobar.com
		<Directory /Users/Documents/Sites/foobar.com>
			Options Indexes FollowSymLinks MultiViews
			AllowOverride All
			Order allow,deny
			allow from all
		</Directory>
	</VirtualHost>
	

Be sure to change the following:

1. `ServerName` (use `.loc` or `.dev` to distinguish it from the live TLD)
2. `DocumentRoot` (point it to the app directory in your document root)
3. `Directory` (same as `DocumentRoot`)

Note, the above assumes you're running on Port 80 (`*:80`). If you're running your local Apache on a different port, make that edit.

This is what your `httpd-vhosts.conf` file should look like when you're done:

<img src='http://making-the-internet.s3.amazonaws.com/vc-vhosts-done@2x.png' class='' style='max-width:726px; width:75%' alt=''>

**Restart your local server** and test out your local URL. 

Make sure you explicitly type in `http://foobar.loc` with `http://` at the beginning. If you don't, your browser may just try and do a web search for `foobar.loc` because it does not recognize `.loc` as a domain extension. 

### Summary (to be repeated every time you want to add a new app):
+ Add a new local URL in your computer's `host` file.
+ Add a new `<VirtualHost>` record block in MAMP/Apache's `httpd-vhosts.conf` file.

Note how it's only Steps 2 and 3 above that need to be repeated for any new apps. Step 1 is a one time deal to get virtual hosts working.


### Tips
* Make shortcuts to `httpd-vhosts.conf` and `hosts` for quick access in the future.
* [MAMP Pro ($59)](http://www.mamp.info/en/mamp-pro/) offers a point and click interface to quickly edit hosts, in addition to [other features](http://www.mamp.info/en/mamp-pro/features/matrix.html).
* If you run into any problems, check your Apache error log.



