With the local database setup lets dig deeper into MySQL, SQL and databases in general.

[MySQL](http://en.wikipedia.org/wiki/MySQL) (pronounced My Sequel or sometimes My S-Q-L) is &ldquo;*the world's most widely used open-source [relational database management system (RDBMS)](http://en.wikipedia.org/wiki/Relational_database_management_system) that runs as a server providing multi-user access to a number of databases.*&rdquo; 

Examples of sites using MySQL include Joomla, WordPress, Wikipedia, Facebook, Flickr and Twitter.

SQL (Structured Query Language) is a language used to communicate with databases and, not surprisingly, it's used with MySQL.

Here are some examples of basic SQL commands:

	# CREATE
	INSERT INTO users SET first_name = 'Sam', last_name = 'Seaborn'

	# READ (i.e SELECT) with some filtering
	SELECT * FROM users ORDER BY first_name ASC LIMIT 1

	# UPDATE 
	UPDATE users SET email = 'seaborn@whitehouse.gov' WHERE id = 83853

	# DELETE 
	DELETE FROM users WHERE id = 83853

When testing and debugging, you can run SQL queries like this directly in phpMyAdmin via the SQL tab:

<img src='http://making-the-internet.s3.amazonaws.com/framework-insert-via-sql-tab.png'>


## Connecting
The above two methods of interacting with your database are great for testing and developing, but clearly you need to build a way for your user to interact with the database (i.e. signing up, entering posts, etc.)

In order to to do this, you'll first need to create a connection between your app and the database. This connection is going to be created using [PHP's MySQL Improved Extension (mysqli)](http://php.net/manual/en/book.mysqli.php) which is used throughout the DB Library.

The connection via mysqli is handled by the DB constructor:

	# Private constructor to enforce singleton access
	private function __construct($db = NULL) {

		# Connect to database using credentials supplied by environment.php		
		$this->connection =	new mysqli(DB_HOST, DB_USER, DB_PASS);
		
		# If there are problems connecting...
		# Show full message on local, email message and die gracefully on live
		if(mysqli_connect_errno()) {
			if (IN_PRODUCTION) {
	
					# Email app owner
					$subject = "SQL Error";
					$body    = "<h2>SQL Error</h2>";
					$body   .= mysqli_connect_error();
					$body   .= "<h2>Query History</h2>";
									
					foreach($this->query_history as $k => $v) {
						$body .= $k." = ".$v."<br>";
					}
					
					Utils::alert_admin($subject, $body);
					
					# Show a nice cryptic error
				    die("<h2>There's been an error processing your request (#DB49)</h2>");
			
				} else {				
			 		die("SQL Error: ".mysqli_connect_error());
				}
		} 
	
		# Use utf8 character encoding
		$this->connection->set_charset("utf8");

	}

In this constructor, a new mysql connection is created and stored in the class property `$this->connection` so it can be used by all the methods in the class. If there is a problem connecting when on the live server (`IN_PRODUCTION`), the app will quietly fail for the user but will send an email to the app admin. On the local server, the error will just display on the page for easy debugging.

The DB library is a static class using a [singleton design pattern](http://en.wikipedia.org/wiki/Singleton_pattern) which prevents your app from creating redundant connections. The singleton pattern is enforced via the `instance()` method which is called statically.

That means all your database calls will look something like this:

	DB::instance(DB_NAME)->method();
	
If you'll recall, the DB_NAME constant is set in environment.php.

## DB Methods
The foundational method in the DB library is the `query()` method which is used to run SQL queries. Let's try it out. In a practice controller/method, set up the following code:

	# Our SQL command
	$q = "INSERT INTO users SET 
		first_name = 'Sam', 
		last_name = 'Seaborn',
		email = 'seaborn@whitehouse.gov'";
	
	# Run the command
	echo DB::instance(DB_NAME)->query($q);

After you run the above, you should see a new row in your User's table.

Let's update that row:

	# Our SQL command
	$q = "UPDATE users
		SET email = 'samseaborn@whitehouse.gov'
		WHERE email = 'seaborn@whitehouse.gov'
	
	# Run the command
	echo DB::instance(DB_NAME)->query($q);

Finally, let's delete that row:

	# Our SQL command
	$q = "DELETE FROM users
		WHERE email = 'seaborn@whitehouse.gov'""
	
	# Run the command
	echo DB::instance(DB_NAME)->query($q);

Here are some resources to familiarize yourself with writing SQL commands:

* [SQL Cheat Sheet](http://cse.unl.edu/~sscott/ShowFiles/SQL/CheatSheet/SQLCheatSheet.html)
* [SQL for Beginners Part 1](http://net.tutsplus.com/tutorials/databases/sql-for-beginners)
* [SQL for Beginners Part 2](http://net.tutsplus.com/tutorials/databases/sql-for-beginners-part-2/)
* [SQL for Beginners Part 3](http://net.tutsplus.com/tutorials/databases/sql-for-beginners-part-3/)

The above tutorials work with MySQL via the Command Line:

* MAMP Users: [MySQL CL Instructions](http://documentation.mamp.info/en/mamp/how-tos/using-mysql-command-line)
* WAMP Users: [MySQL Console](framework-mysql-console.png)


## Query Builders
While it's important to understand how to write SQL queries &ldquo;by hand&rdquo; there are  methods in DB that help you with constructing SQL queries.

For example, the above insert….

	# Our SQL command
	$q = "INSERT INTO users SET 
		first_name = 'Sam', 
		last_name = 'Seaborn',
		email = 'seaborn@whitehouse.gov'";
	
	# Run the command
	echo DB::instance(DB_NAME)->query($q);

Can be accomplished using the `insert()` method:

	$data = Array(
		'first_name' => 'Sam', 
		'last_name' = 'Seaborn', 
		'email' => 'seaborn@whitehouse.gov');

	/*
	Insert requires 2 params
	1) The table to insert to
	2) An array of data to enter where key = field name and value = field data
	
	The insert method returns the id of the row that was created
	*/
	$user_id = DB::instance(DB_NAME)->insert('users', $data);
	
	echo 'Inserted a new row; resulting id:'.$user_id;
	
	
	
One of the benefits of using this insert method is it will sanitize your data, which brings us to…

## SQL Injection Attacks
Anytime you're accepting input from a user and running that input against your database, you want to guard against  [SQL injection attacks](http://en.wikipedia.org/wiki/SQL_injection), where malicious users try to enter query strings in your web forms in an attempt to delete data, steal data, log in as other users, etc.

<img src='http://content.screencast.com/users/susanBuck/folders/Jing/media/8e230b5a-9d3d-4201-9678-c2cabe65c784/00002929.png'><br>
<small><http://xkcd.com/327/></small>

The key to protecting your system against these kind of attacks is to *sanitize* your data from any potentially harmful strings that could interfere with your query. 

Creation related methods from the DB library will automatically sanitize your data by running it through [mysql's real_escape_string method](http://php.net/manual/en/mysqli.real-escape-string.php).

Read related methods, however, often accept SQL statements as params and thus can't cleanly be sanitized in the method. In these cases, you have use the DB `sanitize()` method on any user entered variables *before* running it against the database. The `sanitize()` method is a wrapper for `(real_escape_string)` with the extra benefit in that it will work on strings, arrays or multi-dimensional arrays.

Example:

	# Prevent SQL injection attacks by sanitizing the data the user entered in the form
	$_POST = DB::instance(DB_NAME)->sanitize($_POST);

	# Now, build the query using the sanitized data
	$q = "SELECT token
		FROM users
		WHERE email = '".$_POST['email']."'
		AND password = '".$_POST['password']."'
		";
		
	$token = DB::instance(DB_NAME)->select_field($q);
 
Each method in the DB library comments notes whether the data needs to be sanitized or not, but for your reference, here's a breakdown of which ones do and don't:
 
<table>

	<tr>
		<td>Create Methods<br>Automatically sanitized</td>
		<td>Read Methods<br> Needs to be sanitized</td>
	<tr>

		<td>
			insert_row<br>
			insert_rows<br>
			update_row<br>
			update_rows<br>
			update_or_insert_row<br>
			update_or_insert_rows<br>
		</td>
		
		<td>
			select_field<br>
			select_row<br>
			select_rows<br>
			select_object<br>
			select_kv<br>
			select_array<br>
			delete<br>
		</td>
	</tr>
</table>



