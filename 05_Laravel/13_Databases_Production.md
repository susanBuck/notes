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
	1. host
	2. username
	3. password
3. Plug these credentials into your production `database.php` configuration file.
4. Push changes to your live server and confirm the connection works.
5. Run database migrations on live server database.

In the following procedures we'll walk through these steps on **PagodaBox**, **OpenShift** and **Digital Ocean**.



## PagodaBox

Add a new **MySQL Database** to your PagodaBox application:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-pagoda-new-mysql-database@2x.png' class='' style='max-width:1250px; width:100%' alt=''>

Once your database has been created, click it on your application dashboard, then look for the *Show Credentials* link. Make note of these credentials.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-pagoda-mysql-credentials@2x.png' class='' style='max-width:677px; width:100%' alt=''>

With your credentials on hand, it's time to plug them in.

Locally, open (or create if it doesn't exist) `/app/config/production/database.php`.

The array that this file returns need to include an index `connections` that includes an array of `mysql` credentials like the code that follows. Update `database` and `username` to match the `Root User` and `Root Password` PagodaBox gave you in the above step.

```php
<?php

return array(

	'connections' => array(

		'mysql' => array(
			'driver'    => 'mysql',
			'host'      => 'hostname-goes-here',
			'database'  => 'database-name-goes-here',
			'username'  => 'username-goes-here',
			'password'  => 'password-goes-here',
		),

	),

);
```

__Migrations:__
To set up migrations on PagodaBox, open the `Boxfile` located in the root of your project. If you'll recall from when you first set up deployment to PagodaBox, the `Boxfile` is a PagodaBox-specific configuration file.

At the end of the Boxfile, in the section under `after_deploy:` add the `php artisan migrate` command.

```
after_deploy:
	- "rm -f app/storage/cache/*"
	- "rm -f app/storage/views/*"
	- "php artisan migrate"
```

This will run your database migrations on PagodaBox after each deployment. This is necessary because PagodaBox does not allow SSH access to manually run this command yourself.

Save, add, commit and push your changes to Pagoda. Pay attention to the output Pagoda gives you as it re-deploys because there may be valuable debugging info if a problem occurs.

__Test it:__
Visit the debug route described at the top of this doc. If you see the green bar telling you your connection is confirmed, you're good to go and you can scroll down to the end of this doc for details on loading data. If you see a red bar, you've got some debugging to do.








## OpenShift

Add a new **MySQL Cartridge** on your OpenShift application:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-openshift-mysql@2x.png' class='' style='max-width:1346px; width:100%' alt=''>

Make note of the MySQL `Root User` and `Root Password` credentials it gives you (these values can also be retrieved at any time from your application's dashboard).

Next, you need to locate the host name your OpenShift MySQL database uses. This can be found by SSH'ing into your OpenShift server and running the `export` command, which will print out a list of environment variables.

```bash
$ export
```

The value you're looking for is the IP address listed to the right of `OPENSHIFT_MYSQL_DB_HOST`.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-openshift-export-environment-variables@2x.png' class='' style='max-width:1039px; width:100%' alt=''>

With your credentials gathered, it's time to plug them in.

Locally, open (or create if it doesn't exist) `/app/config/production/database.php`.

The array that this file returns need to include an index `connections` that includes an array of `mysql` credentials like the code that follows. 

Update `host`, `database`, `username` and `password` to be the values you gathered in the above steps.

```php
<?php

return array(

	'connections' => array(

		'mysql' => array(
			'driver'    => 'mysql',
			'host'      => 'hostname-goes-here',
			'database'  => 'database-name-goes-here',
			'username'  => 'username-goes-here',
			'password'  => 'password-goes-here',
		),

	),

);
```

Save, add and commit your changes then push them to your OpenShift remote. 

When the push is complete, SSH into OpenShift and have Composer re-build your `vendors/` folder:

```bash
$ composer install
```

When that's done (it takes a while), have artisan migrate your database structure:

```bash
$ php artisan migrate
```


__Test it:__
Visit the debug route described at the top of this doc. If you see the green bar telling you your connection is confirmed, you're good to go and you can scroll down to the end of this doc for details on loading data. If you see a red bar, you've got some debugging to do.





## DigitalOcean

SSH into your DigitalOcean Droplet.

Note the MySQL password displayed in the output (aka [*motd*](http://en.wikipedia.org/wiki/Motd_(Unix)) you see when you first SSH in. Record this value, you'll need it in a second.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-digital-ocean-mysql-password@2x.png' class='' style='max-width:961px; width:100%' alt=''>

Once SSH'd in, get into MySQL:

```bash
$ mysql -u root -p
```

When it asks for your password, use the MySQL password you just grabbed from the motd output.

Run the `SHOW DATABSES;` command to see what databases exist on your server (there should be 3 default ones):

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

Create the database for your application using the `CREATE DATABASE {db-name}` command:

```bash
mysql> CREATE DATABASE foobooks;
Query OK, 1 row affected (0.00 sec)
```

__Fill in MySQL config:__ Locally, open (or create if it doesn't exist) `/app/config/production/database.php`.

The array that this file returns need to include an index `connections` that includes an array of `mysql` credentials like the code that follows. 

+ Change `host` to be `localhost`.
+ Change `database` to be whatever you named your database when you created it above.
+ Change `username` to be `root`.
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

Save, add and commit your changes then push them to Github. 

Follow whatever procedure you have set up to deploy your changes to DigitalOcean (for most students this involves running `git pull` from your project directory on DigitalOcean).


__Migrations:__ In your SSH session with DigitalOcean, have artisan run your migrations to build your table structure. Make sure you run this from your project directory.

```bash
$ cd /var/www/html/foobooks/
$ php artisan migrate
```


__Test it:__
Visit the debug route described at the top of this doc. If you see the green bar telling you your connection is confirmed, you're good to go and you can scroll down to the end of this doc for details on loading data. If you see a red bar, you've got some debugging to do.




## Loading Data
At this point your database should be working on your production server just as it is locally. The only difference may be that your local database has data while your production database won't.

There are three ways you may add data:
+ If you've built input forms, you can fill them in and add data as a regular user would.
+ If you had a test route that added some dummy data (as we've done in lecture) you can load that route prompting data to get entered.
+ If you've set up database seeding, you can run the `php artisan db:seed` command.






