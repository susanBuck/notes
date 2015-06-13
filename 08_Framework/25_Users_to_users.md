## Many to Many: Users to Users
The next database relationship, *Many to Many*, will help build the follow feature of the micro-blog. The idea behind this feature is that users should only see posts from other users that they're following. 

In order to manage this, we'll need to create a third table called `users_users`. This will be a **join table** because it will keep track of the relationships between users. 

When naming your join tables, you take the name of the two tables you're joining and separate them with an underscore. You can read the underscore as &ldquo;*to*&rdquo;… so `users_users` reads as &ldquo;*users to users*&rdquo;.

What you're creating is technically a **self-referential many-to-many** relationship because you're connecting users to users. 

<img src='http://making-the-internet.s3.amazonaws.com/framework-users-to-users.png'>

<small>FYI: An example of *non*-self-referential many-to-many situation is if you had an online store with numerous *orders* that connected to numerous *products*; with that you'd have a join table called *orders_products* or &ldquo;*orders to products*&rdquo;.</small>

 


## Join table
<img src='http://making-the-internet.s3.amazonaws.com/framework-users-users-table.png?cachebust=oct23'>

After you create the table, make `user_id` the foreign key which connects to the `users` table. Like last time, the constraint should cascade:

<img src='http://making-the-internet.s3.amazonaws.com/framework-users-users-fk.png'>

Here's the SQL for the above creation:

	CREATE TABLE `users_users` (
	  `user_user_id` int(11) NOT NULL AUTO_INCREMENT,
	  `created` int(11) NOT NULL,
	  `user_id` int(11) NOT NULL COMMENT 'follower',
	  `user_id_followed` int(11) NOT NULL COMMENT 'followed',
	  PRIMARY KEY (`user_user_id`),
	  KEY `user_id` (`user_id`),
	  FOREIGN KEY (`user_id`) REFERENCES users(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;
	
	ALTER TABLE `users_users` ADD CONSTRAINT `users_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;


Notes:

* We're still following the plural to singular naming convention for the primary key. `users_users` = `user_user_id`.
* `user_id` represents the logged in user who is initiating the relationship; i.e the *follower*.
* `user_id_followed` is the user that is being followed.
* A `modified` field is not needed this time because these rows will only ever be inserted or deleted, never modified.

## Follow interface
Next, let's create an interface for users to manage their follows. Here's a summary of one way to go about this feature:

**Controller:**

1. Get a list of all users.
2. Get a list of everyone the current logged-in user is following.


**View:**

1. Loop through the list of all users; for each user…
	a. If logged-in user is *not* following them, show a link to follow. This link should lead to a new method called *follow* that creates a connection (i.e, a row in `users_users`).
	b. If logged-in user is following them, show a link to unfollow. This link should lead to a new method called *unfollow* that kills the connection.

The View will look like something like this:
<img style='border:1px solid #999' src='http://making-the-internet.s3.amazonaws.com/framework-follow-users.png'>

It becomes a little fuzzy whether this functionality should be built in the *users* controller or the *posts* controller. On one hand, it's displaying a list of users, but on the other it's providing a setting related to which posts are seen.

Given we'd like to keep the users controller specific to managing users (log in, sign up, profile, etc.), let's put it in the posts controller.


`/controllers/c_posts.php`

	public function users() {
	
		# Set up the View
		$this->template->content = View::instance("v_posts_users");
		$this->template->title   = "Users";
		
		# Build the query to get all the users
		$q = "SELECT *
			FROM users";
			
		# Execute the query to get all the users. 
		# Store the result array in the variable $users
		$users = DB::instance(DB_NAME)->select_rows($q);
		
		# Build the query to figure out what connections does this user already have? 
		# I.e. who are they following
		$q = "SELECT * 
			FROM users_users
			WHERE user_id = ".$this->user->user_id;
			
		# Execute this query with the select_array method
		# select_array will return our results in an array and use the "users_id_followed" field as the index.
		# This will come in handy when we get to the view
		# Store our results (an array) in the variable $connections
		$connections = DB::instance(DB_NAME)->select_array($q, 'user_id_followed');
				
		# Pass data (users and connections) to the view
		$this->template->content->users       = $users;
		$this->template->content->connections = $connections;
	
		# Render the view
		echo $this->template;
	}


`/views/v_posts_users.php`

	<?php foreach($users as $user): ?>
	
		<!-- Print this user's name -->
		<?=$user['first_name']?> <?=$user['last_name']?>
		
		<!-- If there exists a connection with this user, show a unfollow link -->
		<?php if(isset($connections[$user['user_id']])): ?>
			<a href='/posts/unfollow/<?=$user['user_id']?>'>Unfollow</a>
		
		<!-- Otherwise, show the follow link -->
		<?php else: ?>
			<a href='/posts/follow/<?=$user['user_id']?>'>Follow</a>
		<?php endif; ?>
	
		<br><br>
	
	<?php endforeach; ?>

Again, the above code should result in something like this:
<img style='border:1px solid #999' src='http://making-the-internet.s3.amazonaws.com/framework-follow-users.png'>


Last part you need is the `follow` and `unfollow` methods. Both methods should accept one parameter, `$user_id_followed`; i.e. who should be followed or unfollowed.

`/controllers/c_posts.php`

	public function follow($user_id_followed) {
			
		# Prepare the data array to be inserted
		$data = Array(
			"created" => Time::now(),
			"user_id" => $this->user->user_id,
			"user_id_followed" => $user_id_followed
			);
		
		# Do the insert
		DB::instance(DB_NAME)->insert('users_users', $data);
	
		# Send them back
		Router::redirect("/posts/users");
	
	}
	
	public function unfollow($user_id_followed) {
	
		# Delete this connection
		$where_condition = 'WHERE user_id = '.$this->user->user_id.' AND user_id_followed = '.$user_id_followed;
		DB::instance(DB_NAME)->delete('users_users', $where_condition);
		
		# Send them back
		Router::redirect("/posts/users");
	
	}


Test your work so far. You should see the follow/unfollow links toggle as you click on them, and your `users_users` table should reflect the changes.

<img src='http://making-the-internet.s3.amazonaws.com/framework-sam-follow-donna.png'>


## Post stream
Now that you can create connections for users, let's improve the post stream from the last section, so that it only shows posts that the logged in user is following. 

To do this, we're going to put together a relatively complex query that joins three different tables together.

SQL Joins can be summarized into the following types:

* **INNER JOIN:** Return rows when there is at least one match in both tables.
* **LEFT JOIN:** Return all rows from the left table, even if there are no matches in the right table.
* **RIGHT JOIN:** Return all rows from the right table, even if there are no matches in the left table.
* **FULL JOIN:** Return rows when there is a match in one of the tables.

To learn more about JOINs, check out the following resources:

* [Visual explanation of SQL Joins](http://www.codinghorror.com/blog/2007/10/a-visual-explanation-of-sql-joins.html) 
* [NetTuts: SQL for Beginners Part 3: Database Relationships](http://net.tutsplus.com/tutorials/databases/sql-for-beginners-part-3-database-relationships/)
* [w3Schools Joins](http://www.w3schools.com/sql/sql_join.asp)

For our current purposes, we'll use *INNER JOINs*, which allows us to query multiple tables, filtering down to where they overlap.

<img src='http://making-the-internet.s3.amazonaws.com/framework-join-venn.png'>

Before we begin building the query, let's assume the following scenario:

* Sam is the logged in user. 
* We want just the posts from users Sam is following.
* Sam is following one other user, Donna.
* Donna has two posts.
* Sam is user_id 1, Donna is user_id 2.

With that being said, here's the final query that returns all the posts from people Sam is following:

	SELECT 
	    posts.content,
	    posts.created,
	    posts.user_id AS post_user_id,
	    users_users.user_id AS follower_id,
	    users.first_name,
	    users.last_name
	FROM posts
	INNER JOIN users_users 
		ON posts.user_id = users_users.user_id_followed
	INNER JOIN users 
		ON posts.user_id = users.user_id
	WHERE users_users.user_id = 1


Results:
<img src='http://making-the-internet.s3.amazonaws.com/framework-big-query-0.png'>

This is more complex than any of the queries we've built so far, especially because we're querying amongst three tables at once (`posts`, `users_users`, `users`). Let's break it down step by step:

First, in plain english, this is what we're going for: 
<blockquote>Grab all the posts that were created by users Sam is following. Also, grab some basic info about the post author.</blockquote>

---

### Step 1 Get all posts
We'll start with this…Get all the posts:

	SELECT *
	FROM posts
	
<img src='http://making-the-internet.s3.amazonaws.com/framework-big-query-1.png?cachebust=oct24'>





---

### Step 2 Join in the users_users table

To start narrowing these results down we'll want to join in the `users_users` so we can filter based on follower relationship.


	SELECT *
	FROM posts
	INNER JOIN users_users 
		ON posts.user_id = users_users.user_id_followed

	
<img src='http://making-the-internet.s3.amazonaws.com/framework-big-query-2.png?cachebust=oct24'>

At this point, it's normal to see repeat posts. This will happen if you have a user who is being followed by multiple users. We'll narrow this down in Step 4.


---

### Step 3 Alias and reduce what we're selecting
These two tables share some column names such as `created` and `user_id` resulting in ambigous results. In other words, if we were to print `user_id` how would we know if we were getting it from the `posts` table or the `users_users` table?	
To help clarify things, rather than grabbing all the columns with a wildcard select (`*`), let's grab just the fields we need. We'll also use a [*SQL Alias*](http://www.w3schools.com/sql/sql_alias.asp) via the keyword `AS` to rename those ambiguous columns (just in our search results, not permanently).

Not only will this clarify the results, it will also make our search quicker since it has to grab less data.

	SELECT 
	    posts.content,
	    posts.created,
	    posts.user_id AS post_user_id,
	    users_users.user_id AS follower_id
	FROM posts
	INNER JOIN users_users 
		ON posts.user_id = users_users.user_id_followed
	
Note how we were able to specify what table we wanted columns from by prefixing the table name followed by a period (ex: `posts.content`).
	
Now, our query returns just 4 columns and `user_id` from the posts table has been renamed to `post_user_id`, while `user_id` from the `users_users` table has been renamed to `follower_id`. No more ambiguous names.
	
<img src='http://making-the-internet.s3.amazonaws.com/framework-big-query-3.png?cachebust=oct24'>





---

### Step 4 Narrow down to just people Sam is following
Let's continue to narrow the search down to *just the people Sam is following*, by adding a WHERE clause for the `users_users` table.



	SELECT 
	    posts.content,
	    posts.created,
	    posts.user_id AS post_user_id,
	    users_users.user_id AS follower_id
	FROM posts
	INNER JOIN users_users 
		ON posts.user_id = users_users.user_id_followed
	WHERE users_users.user_id = 1

<small>(Note that in this example we're hard coding in Sam's `user_id` as 1 for test purposes; in the controller it would actually say `$this->user->user_id` to dynamically insert the user_id of whoever was logged in.)
</small>	

<img src='http://making-the-internet.s3.amazonaws.com/framework-big-query-4.png?cachebust=oct24'>






---

### Step 5 Join in users table to get post author info

Finally! We've got just the rows we need.

For the final step, we want to join in the users table so we have basic info about who authored the post (first name, last name etc.):

	SELECT 
	    posts.content,
	    posts.created,
	    posts.user_id AS post_user_id,
	    users_users.user_id AS follower_id,
	    users.first_name,
	    users.last_name
	FROM posts
	INNER JOIN users_users 
		ON posts.user_id = users_users.user_id_followed
	INNER JOIN users 
		ON posts.user_id = users.user_id
	WHERE users_users.user_id = 1
	
<img src='http://making-the-internet.s3.amazonaws.com/framework-big-query-5.png?cachebust=oct24'>





Plug the query into your index method and try it out. Don't forget to replace any hard coded user id's with `$this->user->user_id`.

`/controllers/c_posts.php:`

	public function index() {
		
		# Set up the View
		$this->template->content = View::instance('v_posts_index');
		$this->template->title   = "All Posts";
		
		# Query
		$q = 'SELECT 
			    posts.content,
			    posts.created,
			    posts.user_id AS post_user_id,
			    users_users.user_id AS follower_id,
			    users.first_name,
			    users.last_name
			FROM posts
			INNER JOIN users_users 
				ON posts.user_id = users_users.user_id_followed
			INNER JOIN users 
				ON posts.user_id = users.user_id
			WHERE users_users.user_id = '.$this->user->user_id;
							
		# Run the query, store the results in the variable $posts
		$posts = DB::instance(DB_NAME)->select_rows($q);
		
		# Pass data to the View
		$this->template->content->posts = $posts;
		
		# Render the View
		echo $this->template;
	
	}


Results:
<img style='border:1px solid #999' src='http://making-the-internet.s3.amazonaws.com/framework-post-stream-final.png'>

Play around with the above by changing who your logged-in user is following and refreshing the results.
