Reference:

+ <http://daylerees.com/codebright/database>
+ <http://laravel.com/docs/database>

---

## Create your database

The first step to configuring Laravel to talk to your database, is making sure it has a database to talk to.

We'll do this via MySQL in the command line.

MAMP has a MySQL executable you can intitiate with the following commands:

Windows:
	
	C:\MAMP\bin\mysql\bin\mysql.exe --host=localhost -uroot -proot

Mac: 

	/Applications/MAMP/Library/bin/mysql --host=localhost -uroot -proot
	
<small>Pro-tip: Add MAMP's path to mysql to your [system's PATH](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_PATH_Variable.md) so you don't have to run the full path every time.</small>

Once you're in mysql mode you should see a prompt that looks like this:

	mysql >
	
Let's start with a command to show your existing databases:

	mysql > SHOW DATABASES;
	
Make sure you end your statement with a semi-colon; this tells MySQL you're done so it can execute the line.

Now create a database:

	mysql > CREATE DATABASE foobooks;

Run the `SHOW DATABASES;` command again to confirm your new database has been added. 

Hit CTRL-C when you're done to exit MySQL.





## phpMyAdmin and other MySQL managers

In addition to examining your databases via command line, you can also use the web-based MySQL database manager, phpMyAdmin. This package comes with MAMP by default, and is a common tool on shared web servers.

Find the link to phpMyAdmin from your MAMP Start page under **Tools**.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-find-phpmyadmin@2x.png' class='' style='max-width:1033px; width:100%' alt=''>

For a stand-alone database manager, here are some suggestions:

+ Mac: [SequelPro](http://www.sequelpro.com/)
+ Windows: [HeidiSQL](http://www.heidisql.com/)





## Laravel Database Configuration

With your database created, you now need to give your Laravel app some basic configurations it'll need to connect to your database using the host name, database name, username and password.

This information can be found on your MAMP Start Page (`http://localhost/MAMP`) and should be set to the following defaults:

+ Host: `localhost`
+ User: `root`
+ Password: `root`

<img src='http://making-the-internet.s3.amazonaws.com/laravel-mamp-localhost@2x.png' class='' style='max-width:797px; width:100%' alt='MAMP Localhost settings'>

With this information gathered, open up your **local** database configuration in `/app/config/local/database.php`.

***Common Problem Alert:** There may be several `database.php` files on your `/app/config` folder. Starting out, there should be one at `/app/config/database.php` and one at `/app/config/local/database.php`. Because we're working in the **local** environment right now, make sure you're editing `/app/config/local/database.php`.*



For our examples we'll be using the MySQL database that comes with MAMP so find `mysql` in the `connections` array. 

Update the `database`, `username`, and `password` values:

```php
'mysql' => array(
	'driver'    => 'mysql',
	'host'      => 'localhost',
	'database'  => 'foobooks',
	'username'  => 'root',
	'password'  => 'root',
	'charset'   => 'utf8',
	'collation' => 'utf8_unicode_ci',
	'prefix'    => '',
),
```

If you open `/app/config/database.php` you'll see `mysql` is the default database connection Laravel will use, so there's nothing you need to change there.




## Test your connection

Here's a route you can throw in your `routes.php` file to test that the database connection is working:

```php
Route::get('mysql-test', function() {

	# Use the DB component to select all the databases
	$results = DB::select('SHOW DATABASES;');

	# If the "Pre" package is not installed, you should output using print_r instead
	return Pre::render($results);
	
});
```

When you visit this route (`http://localhost/mysql-test`), it should output a list of all your databases, including the one you created in the previous step.

With your database setup and your connection confirmed, you're ready to move on to **Migrations** in order to build your tables.


