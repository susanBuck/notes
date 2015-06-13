Reference:

+ <http://daylerees.com/codebright/database>
+ <http://laravel.com/docs/4.2/database#configuration>

---

## Starting assumption

+ You've already created a database, per the instructions in the [Databases Primer note set](https://github.com/susanBuck/notes/blob/master/05_Laravel/07_Databases_Primer.md). Our example database name is `foobooks`.
+ MAMP or XAMPP is open and your MySQL database server is running.



## Laravel Database Configuration

To connect to your local MySQL server and database, Laravel needs your MySQL host name, username, and password as well as the name of the database you want to connect to.

The default configs for Mac MAMP are:
+ Host: `localhost`
+ User: `root`
+ Password: `root`

The default configs for Windows XAMPP are:
+ Host: `localhost`
+ User: `root`
+ Password: (blank, no password)

With this information gathered, open up your **local** database configuration in `/app/config/local/database.php`.

**Common Problem Alert:** There may be several `database.php` files on your `/app/config` folder. Starting out, there should be one at `/app/config/database.php` and one at `/app/config/local/database.php`. Because we're working in the **local** environment right now, make sure you're editing `/app/config/local/database.php`.

For our examples we'll be using the MySQL database that comes with MAMP so find `mysql` in the `connections` array. 

Update the `database`, `username`, and `password` values. The following is an example configuration for XAMPP&mdash; to adjust it for MAMP, make the password `root`.

```php
'mysql' => array(
	'driver'    => 'mysql',
	'host'      => 'localhost',
	'database'  => 'foobooks',
	'username'  => 'root',
	'password'  => '',
	'charset'   => 'utf8',
	'collation' => 'utf8_unicode_ci',
	'prefix'    => '',
),
```

Tip: If you're running MySQL on a port other than `3306` you can specify that in the above array.

If you open `/app/config/database.php` you'll see `mysql` is the default database connection Laravel will use, so there's nothing you need to change there.




## Test your connection

Here's a route you can throw in your `routes.php` file to test that the database connection is working:

```php
Route::get('mysql-test', function() {

	# Print environment
	echo 'Environment: '.App::environment().'<br>';

	# Use the DB component to select all the databases
	$results = DB::select('SHOW DATABASES;');

	# If the "Pre" package is not installed, you should output using print_r instead
	echo Pre::render($results);
	
});
```

When you visit this route (`http://localhost/mysql-test`), it should output a list of all your databases, including the one you created in the previous step.

With your database setup and your connection confirmed, you're ready to move on to **Migrations** in order to build your tables.


