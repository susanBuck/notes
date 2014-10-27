## Intro

Databases are an essential component of most web applications; having a database allows your app to have &ldquo;memory&rdquo; over time by storing data that is easily retrieved, sorted, and altered.

Databases consist of **tables**. For example, you might have a table to keep track of all your books or users.

Each table is like a spreadsheet, with **fields** (aka **columns**) describing your data (e.g. username, email, first name, last name) and **rows** which hold that data.

Laravel makes it convenient to connect to a variety of database types:

+ MySQL
+ SQLite
+ PostgreSQL
+ SQL Server

([Here's a great article on the differences between these database types](https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems))

In this course, we'll be using the MySQL database.


## Your local database

In addition to providing you with an Apache server, MAMP and XAMPP also provide you with MySQL database functionality.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-mysql-in-mamp-and-xampp@2x.png' class='' style='max-width:920px; width:100%' alt=''>

There are a few ways you can interact with your MySQL database:

1. Via MySQL command line
2. Via a database manager such as phpMyAdmin
3. Via your application code

In this note set we're going to give a sample of all of the above.





### phpMyAdmin

phpMyAdmin is a web-based MySQL database manager that comes with MAMP and XAMPP by default. It's also common tool on shared web servers, and can be installed on virtual private or dedicated servers.

To visit phpMyAdmin on MAMP or XAMPP go to **<http://localhost/phpmyadmin>**.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-phpmyadmin@2x.png' class='' style='max-width:1089px; width:100%' alt='phpMyAdmin Screenshot'>

Alternatively, you can also download a stand-alone database app; here are some suggestions:

+ Mac: [SequelPro](http://www.sequelpro.com/)
+ Windows: [HeidiSQL](http://www.heidisql.com/)




## New database

In phpMyAdmin, find the *Database* tab and create a new database. We'll call ours `foobooks`.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-phpmyadmin-create-new-database@2x.png' class='' style='max-width:862px; width:100%' alt=''>

After you create your database, select it from the list of databases on the left so you can begin interacting with that database.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-phpmyadmin-select-foobooks@2x.png' class='' style='max-width:1724px; width:100%' alt=''>




## New table

Our first table will be called `books` and it should be designed to accomodate the data we've been using in the `books.json` file.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-books-table-design@2x.png' class='' style='max-width:783px; width:100%' alt=''>

To understand the **MySQL data types** chosen for each field, [refer to this table](https://github.com/susanBuck/notes/blob/master/05_Laravel/08_Databases_MySQL_Data_Types.md).

In phpMyAdmin, this is what the books table design looks like:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-phpmyadmin-design-books-table@2x.png' class='' style='max-width:1352px; width:100%' alt=''>

Note how the first field, `id` was set to be the **Primary Index** (aka **Primary Key**) and **AI (Auto Increment)** was checked. This is important. Every table should start with an `id` field that has these characteristics.

Setting the `id` field as the Primary key will come into play when you form relationships between tables and also when you create indexes to optimize queries. 

Setting the `id` field to auto-increment will make MySQL generate a new, unique id for every row that gets entered into this table.




## Hello SQL

MySQL, SQLite, PostgreSQL, and SQL Server all rely on **SQL (Structured Query Language)**, a languaged designed for interacting with **Relational Database Management Systems (RDBMS)**.

The actions we've done thus far in phpMyAdmin could have actually be completed with SQL commands, run either via MySQL Command Line, or via the *SQL* tab in phpMyAdmin.

Essentially phpMyAdmin is a visual abstraction for SQL commands, giving you lots of forms and widgets to enter info which the program then converts to SQL commands to run against your database.

For example, when you created the database `foobooks`, phpMyAdmin built and ran this SQL command:

```sql
CREATE DATABASE foobooks;
```
 
The SQL equivalent of clicking on `foobooks` from the left menu would be this SQL command:

```sql
USE foobooks;
````

And when you created the table, the SQL command was this:

```sql
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    published INT(4),
    cover VARCHAR(255),
    purchase_link VARCHAR(255)
);
```




## New rows

To create a new row in the `book` table, i.e. add your first book, you could do it via the *Insert* tab in phpMyAdmin:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-phpmyadmin-insert-new-book@2x.png' class='' style='max-width:1076px; width:100%' alt=''>

Or you could run the following SQL command:

```sql
INSERT INTO books SET
	title = 'The Great Gatsby',
	author = 'F. Scott Fitzgerald',
	published = 1925,
	cover = 'http://img2.imagesbn.com/p/9780743273565_p0_v4_s114x166.JPG',
	purchase_link = 'http://www.barnesandnoble.com/w/the-great-gatsby-francis-scott-fitzgerald/1116668135?ean=9780743273565';
```	

<img src='http://making-the-internet.s3.amazonaws.com/laravel-phpmyadmin-insert-new-book-with-sql@2x.png' class='' style='max-width:1090px; width:100%' alt=''>


## Reading data

In the above examples we created a table, and took a look at some creation techniques. Now lets look at some read techniques.

Here's an SQL command that would fetch all the rows in the `books` table:

```sql
SELECT * FROM books
```

<img src='http://making-the-internet.s3.amazonaws.com/laravel-phpmyadmin-select-all-books@2x.png' class='' style='max-width:1089px; width:100%' alt=''>

Here's an SQL command that would fetch all the rows from the `books` table where the author name included the word &ldquo;Scott&rdquo;:

```sql
SELECT * FROM books WHERE author LIKE '%Scott%'
```

Once again, alternatively you could have achieved the same results by exploring the *Search* tab in phpMyAdmin.

The above SQL commands are pretty human readable, so you should get the gist of what they're doing, but take a moment to skim over this [SQL Cheat Sheet](http://www.sql.su/) to see the variety of commands that SQL has.








## Executing SQL from your applications

The above methods of interacting with your database all come from the perspective of you, the developer.

Obviously, though, you'll want to begin writing code and building features in your application that let it tap into your database.
		
In PHP, one way you can tap into a MySQL database using the [mysqli extension](http://php.net/manual/en/mysqli.quickstart.statements.php).

Here's an example of a simple PHP script that connects to a database (`foobooks`) and then runs a SQL query against a table in this database (`SELECT * FROM books`):

```php
# Step 1) Connect to the database
$mysqli = new mysqli("localhost", "root", "root", "foobooks");
if ($mysqli->connect_errno) {
 	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

# Step 2) Run a query
$books = $mysqli->query("SELECT * FROM books");

# Step 3) Loop through results
$books->data_seek(0);
while ($book = $books->fetch_assoc()) {
 	echo $book['title']." was written by ".$book['author']."<br>";
} 
```





## Enter Laravel...

Everything described thus far is roughly what you'd do if you were interacting with a database without the utilities Laravel provides. 

However, because database interaction is such an essential aspect of application development, Laravel gives us plenty of tools to make the job easier.

Here's just some of the examples of the benefits Laravel provides for database interaction:

+ Easily switch between databases.
+ Manage different databases depending on your environment.
+ Don't worry about SQL syntax and compatibility with different database types.
+ Automatically protects against [SQL Injection Attacks](http://imgs.xkcd.com/comics/exploits_of_a_mom.png).
+ Object mapping - the ability to easily connect the Objects of your application to rows in a table.
	
From this point forward we're going to look at database interaction from the perspective of Laravel which is going to abstract a lot of the SQL-related work we did above. Despite this, it's still useful to have a foundational SQL understanding so you better understand what Laravel is doing beneath the surface.

Check out the following tutorials to learn more about SQL:

* [SQL for Beginners Part 1](http://code.tutsplus.com/tutorials/sql-for-beginners--net-8200)
* [SQL for Beginners Part 2](http://code.tutsplus.com/tutorials/sql-for-beginners-part-2--net-8274)
* [SQL for Beginners Part 3](http://code.tutsplus.com/articles/sql-for-beginners-part-3-database-relationships--net-8561)


### Tip: Via MySQL Command Line 

If you want to bypass phpMyAdmin, you can interact directly with MySQL from the command line using MySQL's executable.

Launch MySQL from Mac MAMP:

```
$ /Applications/MAMP/Library/bin/mysql --host=localhost -uroot -proot
```

... and from Windows XAMPP:
	
```bash
$ C:\xampp\mysql\bin\mysql.exe --user=root --password=
```

<small>Pro-tip: Add the path to mysql to your [system's PATH](https://github.com/susanBuck/notes/blob/master/07_SysAdmin/999_PATH_Variable.md) so you don't have to run the full path every time.</small>

Once you're in mysql mode you should see a prompt that looks like this:

```bash
mysql >
```
	
At this prompt, you can type any SQL command. For example, here's a command to show all the databases on your system:

```bash
mysql > SHOW DATABASES;
```
	
Make sure you end your statement with a semi-colon; this tells MySQL you're done so it can execute the line.

Hit CTRL-C when you're done to exit MySQL.





