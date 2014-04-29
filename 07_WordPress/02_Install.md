## Summary

1. Download
2. Upload to server
3. Set up database
4. Configure


### 1-click installs vs. manual installs:
* Better troubleshoot when you run into problems.
* Understand how to install WP even on servers that don't have 1-click install features
* Better understand how to migrate WP installs if you ever have to
* Better understand how to dig into an existing WP install




## What you'll need
* Code editor (ex: [Sublime](http://www.sublimetext.com/))
* FTP software (ex: [CyberDuck](http://cyberduck.io/))
* LAMP Server with MySQL Database 




## Step 1: Download WP
Visit the WordPress download page to grab the latest version
<http://wordpress.org/download/>

The `.zip` version offered by the big blue button is fine. Ignore the `.tar.gz` option.

Once downloaded unzip the file and take a look at the contents.
Most, but not all, of the files and directories are prefixed with `wp-`





## Step 2: Upload WP

Open your FTP program and connect to your server:

<img src='http://making-the-internet.s3.amazonaws.com/wp-cyberduck-credentials.png'>

Next, you need to decide if you want to run WordPress from the root of your site (e.g. from `http://yourdomain.com` or from a subdirectory e.g. `http://yourdomain.com/blog`).

You should go root route if...

* you want WordPress to power your entire site
* you don't already have an existing site in place

You should go the subdirectory route if...

* you want to use WordPress on just a subsection of your site, for example, to power your blog
* you already have an existing site in place

If you're installing at the root, you want to upload the *contents* of the `wordpress` folder directly to the root of your host.

If you're installing in a subdirectory, you want to upload the *entire* `wordpress` folder and then rename it (if you want it to be called something other than "wordpress")




## Step 3: Set up Database

WordPress needs a database to store all your posts, pages, configuration info, plugin info, etc.

WordPress works with MySQL databases which can be setup on your web host via cPanel. 

Find your URL and credentials for cPanel at <http://thewc.co/hosting>.

Once in [cPanel](http://wcc-hosting.com:2083/) find the MySQL databases section:
<img src='http://making-the-internet.s3.amazonaws.com/wp-mysql-in-cpanel.png'>


### New database
Then, create a new database: 

<img src='http://making-the-internet.s3.amazonaws.com/wp-create-database.png'>

Note the full name of your database including the prefix. For example, ours is `el2054_wordpress`.

### New MySQL user
Next, create a new MySQL user:

<img src='http://making-the-internet.s3.amazonaws.com/wp-new-mysql-user.png'>

Note the name of your user, including the prefix. 
For example, ours is `el2054_wordpress`.


### Add MySQL user to database
Now add this new user to your new database:

<img src='http://making-the-internet.s3.amazonaws.com/wp-mysql-add-user.png'>

When it asks you what priveleges you want to grant this user, choose all:

<img src='http://making-the-internet.s3.amazonaws.com/wp-mysql-user-priveleges.png'>

And that's it - you should now see your new database with your new user:
<img src='http://making-the-internet.s3.amazonaws.com/wp-mysql-database-done.png'>



## Step 4: Configure

When you visit the URL to your wordpress install, for example `http://username.wcc-hosting.com/wordpress`, it will prompt you to create a wp-config file:

<img src='http://making-the-internet.s3.amazonaws.com/wp-config-setup.png'>

After you click *Create Configuration File* it will ask you for your database connection details which you created during the database setup steps:

<img src='http://making-the-internet.s3.amazonaws.com/wp-config-info.png'>

The next screen will prompt you to run the install, and once that's done WordPress will ask you to fill in information about your new site.



