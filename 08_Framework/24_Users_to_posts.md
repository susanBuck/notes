## Database relationships
As your application grows in complexity, so will the number of tables you need to organize your data.

Some tables will act independently of one another, but more often than not, they need to work together.The different ways tables work with one another is described in terms of *relationships*, for example:

* One to Many relationships
* Many to Many relationships
* One to One relationship

The following sections will take you through some examples of these relationships as they relate to the micro-blog.

Suggested Reading:
[Nettuts+ SQL for Beginners Part 3 Database Relationships](http://net.tutsplus.com/tutorials/databases/sql-for-beginners-part-3-database-relationships/)



## One to Many: Users to Posts
The next table needed for the micro-blog is one to manage posts. The `posts` table is an example of a **One to Many relationship** because for *each user* there will be *many posts*.

<img src='http://making-the-internet.s3.amazonaws.com/framework-one-to-many.png'>

Create your `posts` table, starting with these 5 fields:

<img src='http://making-the-internet.s3.amazonaws.com/framework-posts-table.png'>

The `user_id` field will allow the `posts` table to easily connect to the `users` table; this is referred to as a **Foreign Key** ([more info](http://www.sitepoint.com/mysql-foreign-keys-quicker-database-development/)).

Note how the `user_id` was also set to have an **Index**. It's common to set indexes on fields you will be querying with frequently, because indexes allow MySQL to find data it's looking for quicker. Indexes are also necessary on fields you want to set up as Foreign Keys.

Once the `posts` table is created choose *Relation view* to set up the Foreign Key:

<img src='http://making-the-internet.s3.amazonaws.com/framework-set-foreign-key-on-posts.png'>

The foreign key [*referential action*](http://en.wikipedia.org/wiki/Foreign_key#Referential_actions) we're specifying for update and deletes is *CASCADE*. This means that if `user_id` in `users` is updated, so will the matching `user_id` in `posts`. Furthermore, if a row in `users` is deleted, so will any corresponding rows in `posts`. I.e. If you delete a user, it will automatically delete all their posts.

Here's that same table, including the foreign key relationship, created with an SQL statement:

	CREATE TABLE `posts` (
	`post_id` int(11) NOT NULL AUTO_INCREMENT,
	`created` int(11) NOT NULL,
	`modified` int(11) NOT NULL,
	`user_id` int(11) NOT NULL,
	`content` text NOT NULL,
	PRIMARY KEY (`post_id`),
	KEY `user_id` (`user_id`),
	FOREIGN KEY (`user_id`) REFERENCES users(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

	

## Adding posts

Next, let's create a controller with some methods and views to add posts to this new table.

`/app/controllers/c_posts.php` (new file)
	
	class posts_controller extends base_controller {
	
		public function __construct() {
			parent::__construct();
			
			# Make sure user is logged in if they want to use anything in this controller
			if(!$this->user) {
				die("Members only. <a href='/users/login'>Login</a>");
			}
		}
		
		public function add() {
		
			# Setup view
			$this->template->content = View::instance('v_posts_add');
			$this->template->title   = "New Post";
				
			# Render template
			echo $this->template;
		
		}
		
		public function p_add() {
				
			# Associate this post with this user
			$_POST['user_id']  = $this->user->user_id;
			
			# Unix timestamp of when this post was created / modified
			$_POST['created']  = Time::now();
			$_POST['modified'] = Time::now();
			
			# Insert
			# Note we didn't have to sanitize any of the $_POST data because we're using the insert method which does it for us
			DB::instance(DB_NAME)->insert('posts', $_POST);
			
			# Quick and dirty feedback
			echo "Your post has been added. <a href='/posts/add'>Add another</a>";
		
		}
	}


`/app/views/v_posts_add.php` (new file)

	<form method='POST' action='/posts/p_add'>

		<label for='content'>New Post:</label><br>
		<textarea name='content' id='content'></textarea>
	
		<br><br>
		<input type='submit' value='New post'>

	</form>	

With that built, you should go to http://localhost/posts/add and add a few test posts. 

<img style='border:1px solid #999' src='http://making-the-internet.s3.amazonaws.com/framework-new-post.png'>

## Querying for posts
Now that you have a posts table with some example data, lets look at retrieving that info.

First, run this query in phpMyAdmin:


	SELECT *
	FROM posts
	
<img src='http://making-the-internet.s3.amazonaws.com/framework-select-all-posts.png'>

This selects all the post data, but let's make the results more useful by *joining* in the user data associated with each post:

	SELECT *
	FROM posts
	INNER JOIN users 
		ON posts.user_id = users.user_id

[view full size](http://making-the-internet.s3.amazonaws.com/framework-posts-users-join.png)
<img src='http://making-the-internet.s3.amazonaws.com/framework-posts-users-join.png'>

This result has both the data for the post *and* the user who authored the post. 

There's one slight problem with this result: because both the posts and users table have a `created` and `modified` field, the results are ambiguous returning `created` and `modified` twice. (Technically `user_id` is also ambiguous, but because the value is the same, it doesn't matter as much).

When used in your code, this field overlap may create unexpected results such as trying to show the creation date for a post, but instead seeing the creation date for the user.

To correct this, you can get more specific in your select. Instead of grabbing everything (`*`), specify exactly which fields you want, from which table:

	SELECT 
		posts .* , 
		users.first_name, 
		users.last_name
	FROM posts
	INNER JOIN users 
		ON posts.user_id = users.user_id

Now there's no ambiguity amongst the results:
<img src='http://making-the-internet.s3.amazonaws.com/framework-more-specific-select.png?cachebust=oct24'>

With your query in mind, time to put it to work in your code…

## Posts Index

Create an `index()` method for your posts controller:

`/controllers/c_posts.php`

	public function index() {
	
		# Set up the View
		$this->template->content = View::instance('v_posts_index');
		$this->template->title   = "Posts";
		
		# Build the query
		$q = "SELECT 
				posts .* , 
				users.first_name, 
				users.last_name
			FROM posts
			INNER JOIN users 
				ON posts.user_id = users.user_id";
		
		# Run the query
		$posts = DB::instance(DB_NAME)->select_rows($q);
		
		# Pass data to the View
		$this->template->content->posts = $posts;
		
		# Render the View
		echo $this->template;
		
	}

View `/views/v_posts_index.php`:


	<?php foreach($posts as $post): ?>
	
	<article>
		
		<h1><?=$post['first_name']?> <?=$post['last_name']?> posted:</h1>
		
		<p><?=$post['content']?></p>
		
		<time datetime="<?=Time::display($post['created'],'Y-m-d G:i')?>">
			<?=Time::display($post['created'])?>
		</time>
		
	</article>
	
	<?php endforeach; ?>

When you run `http://localhost/posts` you should see the test posts you created, including the author and when it was created:

<img style='border:1px solid #999' src='http://making-the-internet.s3.amazonaws.com/framework-view-posts.png'>


## Practice data
Before moving forward, it will be helpful to seed some data into your application. You'll want a handful of users and those users will want to have a handful of posts each.

You can create this data manually by following this routine:

1. Sign up a new user
2. Log in as that user
3. Create a handful of sample posts for that user
4. Log out that user
5. Go to step 1 and repeat

## Update your live database
In the previous two sections you locally added two new tables (`posts` and `users_to_users`). Make sure you update your live database to reflect these changes. You can manually create the tables or use the Export method described in a [few sections ago](/Framework/Live_database).



