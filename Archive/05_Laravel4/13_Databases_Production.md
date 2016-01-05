## Debugging Info

Before starting, you may want to create a practice route that will output some debugging information about your application's environment and database connection.


```php
# /app/routes.php
Route::get('/debug', function() {
	
	echo '<pre>';
		
	echo '<h1>environment.php</h1>';
	$path   = base_path().'/environment.php';
	
	try {
		$contents = 'Contents: '.File::getRequire($path);
		$exists = 'Yes';
	}
	catch (Exception $e) {
		$exists = 'No. Defaulting to `production`';
		$contents = '';
	}
	
	echo "Checking for: ".$path.'<br>';
	echo 'Exists: '.$exists.'<br>';
	echo $contents;
	echo '<br>';
	
	echo '<h1>Environment</h1>';
	echo App::environment().'</h1>';
	
	echo '<h1>Debugging?</h1>';
	if(Config::get('app.debug')) echo "Yes"; else echo "No";

	echo '<h1>Database Config</h1>';
	print_r(Config::get('database.connections.mysql'));
	
	echo '<h1>Test Database Connection</h1>';
	try {
		$results = DB::select('SHOW DATABASES;');
		echo '<strong style="background-color:green; padding:5px;">Connection confirmed</strong>';
		echo "<br><br>Your Databases:<br><br>";
		print_r($results);
	} 
	catch (Exception $e) {
		echo '<strong style="background-color:crimson; padding:5px;">Caught exception: ', $e->getMessage(), "</strong>\n";
	}
	
	echo '</pre>';
	
});
```

If you get stuck in the following steps, visit this route in your browser to make sure you're working in the correct environment using the correct database settings.

The output will look something like this:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-debug@2x.png' class='' style='max-width:810px; width:100%' alt=''>

**Remember to delete this route when you're done debugging.**

__Debug in Production:__ You may also want to open `/app/config/production/app.php` and allow debug to be true. We'll be working in the production environment in the upcoming steps, and while you're first getting your databases set up it will be useful to have debugging on. You can toggle this back to false when done.

```php
<?php
# app/config/production/app.php
return array(

	'debug' => true,

);
```



## Summary

The procedure for setting up your live server database will look something like this:

1. Create a new MySQL database.
2. Locate the following MySQL credentials:
	1. `host`
	2. `username`
	3. `password`
3. Plug these credentials into your production `database.php` configuration file.
4. Push changes to your live server and confirm the connection works.
5. Run database migrations on live server database.




## Database setup on DigitalOcean

SSH into your DigitalOcean Droplet.

Note the MySQL password displayed in the output (aka [*motd*](http://en.wikipedia.org/wiki/Motd_(Unix)) you see when you first SSH in. Record this value, you'll need it in a second.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-digital-ocean-mysql-password@2x.png' class='' style='max-width:961px; width:100%' alt=''>

Once SSH'd in, get into MySQL:

```bash
$ mysql -u root -p
```

When it asks for your password, use the MySQL password you just grabbed from the motd output.

Run the `SHOW DATABSES;` command to see what databases exist on your server (there should be 3 default ones). Don't forget that every SQL Command has to end with a semi-colon.

```bash
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
3 rows in set (0.00 sec)
```

Create the database for your application using the `CREATE DATABASE <db-name>` command:

```bash
mysql> CREATE DATABASE foobooks;
Query OK, 1 row affected (0.00 sec)
```

You can run `SHOW DATABSES;` again to confirm the new database exists.

Run `exit;` to get out of MySQL mode.





## Fill in MySQL config

Locally, open `/app/config/production/database.php`. 

If this file not yet exist (the directory `production` and/or the file `database.php`) go ahead and create it.

The array that this file returns needs to include an index `connections` that contains an array of `mysql` credentials like the code that follows. 

+ Change `host` to be `localhost`.
+ Change `database` to be whatever you named your database when you created it above.
+ Leave `username` as `root`.
+ Change `password` to be the same MySQL password you used above.

```php
<?php

return array(

	'connections' => array(

		'mysql' => array(
			'driver'    => 'mysql',
			'host'      => 'localhost',
			'database'  => 'database-name-goes-here',
			'username'  => 'root',
			'password'  => 'mysql-password-goes-here',
		),

	),

);
```

Save, add, commit, and push your local changes to Github. 

Then, deploy your changes to DigitalOcean (i.e. while SSH'd into your project directory on DigitalOcean, run `git pull`).

Example:

```bash
$ cd /var/www/html/foobooks/
$ git pull
```

__A note on storing passwords in Github__

In the above steps you just checked a password into a Public repository, making it publicly available for the world to see. This is usually a *big* no-no. Do not ever do this on a real world site! 

Most likely, on a real world site you'd have your code in a Private repository making it less of an issue. Or, you might set up database and other sensitive credentials in `.env` files that are completely ignored (i.e. left out) from your Github repository for extra security.

In a learning environment like this though, it's okay for the following reasons:

+ By default, remote MySQL connections are disabled on your server. This means connections to your database have to come from within your server. Therefor, even if someone found your MySQL database password in your public repository, they'd still have to have access to your server to do anything with it.
+ You shouldn't have anything important in your class project databases, so the pedagogical benefits outweigh the risks.

If you do have sensitive data you wish to lock down, check out the `.env` files mentioned above, or consider switching to a Private repository.



# Run Migrations

While SSH'd into your project directory on DigitalOcean, have Artisan run your migrations to build your table structure. 

Example:

```bash
$ cd /var/www/html/foobooks/
$ php artisan migrate
```

What it'll look like:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-run-migration-on-production@2x.png' class='' style='max-width:649px; width:100%' alt=''>


## Test it

Visit the debug route described at the top of this doc. If you see the green bar telling you your connection is confirmed, you're good to go and you can scroll down to the end of this doc for details on loading data. If you see a red bar, you've got some debugging to do.


<img src='http://making-the-internet.s3.amazonaws.com/laravel-debug-on-digitalocean@2x.png' class='' style='max-width:605px; width:100%' alt='Debug test on production'>


## Loading Data
At this point your database should be working on your production server just as it is locally. The only difference may be that your local database has data while your production database won't.

There are three ways you may add data:
+ If you've built input forms, you can fill them in and add data as a regular user would.
+ If you had a test route that added some dummy data you can load that route prompting data to get entered.
+ If you've set up database seeding, you can run the `php artisan db:seed` command.



## Tips

__phpMyAdmin__

You shouldn't *need* to run phpMyAdmin on your production server, but if you'd like the option to do so, here's a blog post from DigitalOcean on [How To Install and Secure phpMyAdmin](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-12-04).

__mysql_secure_installation__

When you SSH into DigitalOcean, you may have noticed a message prompting you to run the command `mysql_secure_installation`:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-encouraged-to-run-mysql-secure@2x.png' class='' style='max-width:1017px; width:100%' alt=''>

You're not instructed to do this in the instructions above for the sake of simplicty. However, on real world applications, you'll want to follow this step for your production applications.

Once you run the command, you'll just be prompted to make some setting changes that will make your MySQL more secure.

[See the process here...](http://making-the-internet.s3.amazonaws.com/laravel-mysql-secure-installation@2x.png)

[You can read more about mysql_secure_installation here...](http://dev.mysql.com/doc/refman/5.0/en/mysql-secure-installation.html)




