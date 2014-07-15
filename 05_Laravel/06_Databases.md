Reference:

+ <http://daylerees.com/codebright/database>
+ <http://laravel.com/docs/database>

---

Databases are an essential component of most web applications; having a database allows your app to have a "memory" over time.

Laravel makes it convenient to connect to a variety of database types:

+ MySQL
+ SQLite
+ PostgreSQL
+ SQL Server

Read more: [SQLite vs MySQL vs PostgreSQL: A Comparison Of Relational Database Management Systems](https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems)

What these databases have in common: **SQL**.





## SQL (Structured Query Language)
**SQL (Structured Query Language)** is a language designed for interacting with relational database management systems (RDBMS).

SQL is used to interact with your databases.

Here's an example of an SQL command to create a new table:

	CREATE TABLE books (
		    id INT AUTO_INCREMENT PRIMARY KEY,
		    title VARCHAR(255),
		    author VARCHAR(255),
		    published INT(4),
		    cover VARCHAR(255),
		    purchase_link VARCHAR(255)
		);

And here's an example of how you'd create a row in that resulting table:

	INSERT INTO books SET
			title = 'The Great Gatsby',
			author = 'F. Scott Fitzgerald',
			published = 1925,
			cover = 'http://img2.imagesbn.com/p/9780743273565_p0_v4_s114x166.JPG',
			purchase_link = 'http://www.barnesandnoble.com/w/the-great-gatsby-francis-scott-fitzgerald/1116668135?ean=9780743273565';

These statements can be run via command line using MySQL, or directly from your PHP scripts using [PHP's mysqli extension](http://php.net/manual/en/mysqli.quickstart.statements.php).

Here's an example of a PHP script that connects to a database and then does a query on said database:

	# Connect to the database
		$mysqli = new mysqli("localhost", "root", "root", "foobooks");
		if ($mysqli->connect_errno) {
	    	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
		}
		
		# Run a query
		$books = $mysqli->query("SELECT * FROM books");
		
		# Loop through results
		$books->data_seek(0);
		while ($book = $books->fetch_assoc()) {
	    	echo $book['title']." was written by ".$book['author']."<br>";
		} 

If you want to brush up on SQL basics, here's a good place to start:

* [SQL for Beginners Part 1](http://net.tutsplus.com/tutorials/databases/sql-for-beginners)
* [SQL for Beginners Part 2](http://net.tutsplus.com/tutorials/databases/sql-for-beginners-part-2/)
* [SQL for Beginners Part 3](http://net.tutsplus.com/tutorials/databases/sql-for-beginners-part-3/)


## Enter Laravel

Everything described thus far is what you'd do if you were interacting with a database without the tools Laravel provides.

Laravel is going to abstract all of this. This has several benefits:

+ Easily switch between databases
+ Manage different databases depending on your environment
+ Don't worry about SQL syntax and compatibility with different database types
+ Escapes incoming data to prevent SQL Injection attacks
	
<a href='http://xkcd.com/327/'><img src='http://imgs.xkcd.com/comics/exploits_of_a_mom.png'></a>


## Create your database

Before we can start digging into Laravel's database capabilities, we need to create a database to work with.

We'll do this via command line, so start by initiating mysql:

Windows:
	
	C:\MAMP\bin\mysql\bin\mysql.exe --host=localhost -uroot -proot

Mac: 

	/Applications/MAMP/Library/bin/mysql --host=localhost -uroot -proot
	
<small>Pro-tip: Add MAMP's path to mysql to your system's PATH so you don't have to run the full path every time.</small>

Once you're in mysql mode you should see a prompt that looks like this:

	mysql >
	
Let's start with a command to show your existing databases:

	mysql > SHOW DATABASES;
	
Make sure you end your statement with a semi-colon; this tells MySQL you're done so it can execute the line.

Now create a database:

	mysql > CREATE DATABASE foobooks;

Run the `SHOW DATABASES;` command again to confirm your new database has been added. 

Hit CTRL-C when you're done to exit mysql mode.



## Configuration

With your database created, you now need to give your Laravel app some basic configurations it'll need to connect to your database using the host name, database name, username and password.

This information can be found on your MAMP Start Page (http://localhost/MAMP) and should be as follows:

+ Host: `localhost`
+ User: `root`
+ Password: `root`

<img src='http://making-the-internet.s3.amazonaws.com/laravel-mamp-localhost@2x.png' class='' style='max-width:797px; width:100%' alt='MAMP Localhost settings'>

With this information gathered, open up your **local** database configuration in `/app/config/local/database.php` (make sure you're looking in the `local` directory within config).

For our examples we'll be using the MySQL database that comes with MAMP so find `mysql` in the `connections` array. 

Update the `database`, `username`, and `password` values:

	'mysql' => array(
				'driver'    => 'mysql',
				'host'      => 'localhost',
				'database'  => 'foobooks',
				'username'  => 'root',
				'password'  => 'root',
				'charset' => 'utf8',
				'collation' => 'utf8_unicode_ci',
				'prefix'    => '',
			),



## Test your connection

Here's some code to test that your database connection is working:

	Route::get('mysql-test', function() {

		$results = DB::select('SHOW DATABASES;');

		# If the "Pre" package is not installed, you should output using print_r instead
		return Pre::render($results);
		
	});

When you visit this route, it should output a list of all your databases, including the one you created in the previous step.


