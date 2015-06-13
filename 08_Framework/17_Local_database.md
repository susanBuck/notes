To move forward with constructing your microblog, you're going to need a database to store your app's data (users, posts, etc.).

Just like your code base, you'll want to maintain a local copy of a database for development and a live copy for production. Let's start with the local.

We'll create, edit and maintain databases via a tool called **phpMyAdmin**[^1] which comes installed by default with MAMP/WAMP and most LAMP based web hosts.

You should be able to access phpMyAdmin on your local server via `http://localhost/phpMyAdmin` for MAMP users and `http://localhost/phpMyAdmin` for WAMP users (the difference is in the capitalization of phpMyAdmin).

You can also find a link to phpMyAdmin from the MAMP start page or the WAMP menu:

<img src='http://making-the-internet.s3.amazonaws.com/framework-phpmyadmin-links.png'>

If phpMyAdmin prompts you for login, here are the default settings:

MAMP:

	username: root
	password: root
	
WAMP:

	username: root
	password: (blank)	
	
From phpMyAdmin, find the *Database* tab and create a new database called `p2_yourdomain_com` (as always, replace with your actual app name). Your database names should match the name of your applications, but some servers won't allow periods in database names. Because of this, the convention of this framework calls for periods to be replaced with underscores.

When creating this new database, set the collation[^2] to `utf8_general_ci`.

<img src='http://making-the-internet.s3.amazonaws.com/framework-new-database.png'>


Now that you know the name of your database, you should set it in your config:
`/app/config/config.php/`

	# Default database name for this app
	define('DB_NAME', "p2_yourdomain_com");

[^1]: phpMyAdmin is a good tool to start with simply because it's so ubiquitous, but as you work more with databases you may appreciate a standalone application such as [SequelPro](http://www.sequelpro.com) or [HeidiSQL](http://heidisql.com).

[^2]: Collation determines the order (i.e alphabetic) to use when sorting character sets. A character set is a collection of symbols (letters, numbers, punctuation, and special characters), when used together, represent meaningful words in a language. 



## Connecting to the local database
Now let's tell the application how to connect to this database you just created. 

Open up your local `environment.php` file and look for this bit of code:

	# Toggle this based on whether you want to connect to your local DB or your live DB
	define('REMOTE_DB', FALSE);
	
	if (REMOTE_DB) {
		define('DB_HOST', '');
		define('DB_USER', '');
		define('DB_PASS', '');
	
	} else {
		define('DB_HOST', 'localhost');
		define('DB_USER', 'root');
		define('DB_PASS', 'root');	
	}

For the local database connection, we're concerned with the code in the *else* block. Given that, make sure `REMOTE_DB` is set to `FALSE`. 

For most everyone, the **database host name** (`DB_HOST`) on your local environments should be `localhost`, and the default **database user** (`DB_USER`) is typically `root`.

You can confirm this from phpMyAdmin:

<img src='http://making-the-internet.s3.amazonaws.com/framework-localhost.png'>

For MAMP users the **defaut password** is typically `root` and for WAMP users it's blank.



## Tables
Within your database in phpMyAdmin, find the option to create a new table. Your first table will be called `users` (table names should be plural and lowercase) and it will contain 10 columns:

Num | Name | Type | Length | Extras
--- | ---- | ---- | ----   | ----
1 | user_id | INT | | Primary AI
2 |created | INT | |  |
3 | modified | INT | | |
4 | token | VARCHAR | 255 | | 
5 | password | VARCHAR | 255 | |
6 | last_login | INT | | |
7 | timezone | VARCHAR | 255 | |
8 | first_name | VARCHAR | 255 | | 
9 | last_name | VARCHAR | 255 || 
10 | email | VARCHAR | 255 | | 

<img src='http://making-the-internet.s3.amazonaws.com/framework-users-table.png'>

Lets go through this field by field:
<hr>
**user_id:** Every row should start off with a unique, primary key.

Convention says to name your primary key field the singular version of your table name, with _id appended. In this case, *users* becomes *user_id*

The type we're choosing is *INT* because this field will always be a whole number.

Check off `A_I` (Auto Increment) which means every time you add a new row in this table, this field will automatically be incremented. This prevent's the creation of duplicate primary keys.
<hr>
**created:** This field will hold a whole number Unix timestamp recording when the user was created; given that, set the Type to *INT*. 

Later, in the [Time doc](/Framework/Time), we'll cover why we're using INT here and not one of the other more obvious types such as DATETIME.
<hr>
**modified:** Every time you update a user row, you can track when that modification happened. Just like created, set the Type to *INT*.
<hr>
**token:** Token is going to store a hashed string used for login purposes; it will be a mixture of letters and characters, so we'll use *VARCHAR* as its type. *VARCHAR* requires you specify a default *Length/Value*, so set it to the max which is 255 characters. 

*VARCHAR* is good for short strings of text, but if you needed to store more characters, say a entire blog post, you would want to use the type *TEXT*.
<hr>
**password:** This will store a hashed version of the user's password, and should be set up the same way token was.
<hr>
**last_login:** This will store a timestamp value of the last time the user logged in. Given it's a timestamp, set it to *INT*.
<hr>
**timezone:** It'll be important to record your user's timezone so you can display date/times in the correct timezone. This field can be set to *VARCHAR*

<hr>
**first_name, last_name, email:** The remaining 3 fields will also do well with the *VARCHAR* type.
<hr>

Reference: <a href='http://help.scibit.com/mascon/masconMySQL_Field_Types.html'>MySQL field types</a>
