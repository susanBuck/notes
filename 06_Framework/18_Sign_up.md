With your local database setup, and a working knowledge on how to interact with it, we can begin building your app's user functionality.

Let's create a simple sign up form which will be accessed by your users from `http://localhost/users/signup`

First, you'll need a View. We know the Controller is `users` and the method is `signup` so our view file will be named `v_users_signup.php`

`/app/views/v_users_signup.php`

	<form method='POST' action='/users/p_signup'>
	
		First Name<br>
		<input type='text' name='first_name'>
		<br><br>
		
		Last Name<br>
		<input type='text' name='last_name'>
		<br><br>
	
		Email<br>
		<input type='text' name='email'>
		<br><br>
		
		Password<br>
		<input type='password' name='password'>
		<br><br>
		
		<input type='submit' value='Sign up'>
	
	</form>

The `action` attribute specifies that this form will submit to `http://localhost/users/p_signup`.

Convention suggests you underscore methods that are in charge of processing POST information from a form with `p_` so they're easy to identify.

Given all that, here's the controller `/app/controllers/c_users.php` with a method to display the signup form, and a method to process the signup form.

	class users_controller extends base_controller {
	
		public function __construct() {
			parent::__construct();
		} 
		
		public function signup() {
			
			# Setup view
				$this->template->content = View::instance('v_users_signup');
				$this->template->title   = "Sign Up";
				
			# Render template
				echo $this->template;
			
		}
		
		public function p_signup() {
			
			# Dump out the results of POST to see what the form submitted
       		echo '<pre>';
        	print_r($_POST);
        	echo '</pre>';			
		}
			
	} # eoc
	
What you should have so far when you visit and submit Sign up:

<img src='http://making-the-internet.s3.amazonaws.com/framework-signup-first-submission.png'>

Note how the keys in the array match the name attribute that was set for each text input.


## Processing the Sign up
Right now the method `p_signup()` is just dumping the data to the page; let's take this a step further by processing that data into the database. 

As we saw in the last section, and is documented in the DB library, `insert()` requires two parameters :

* `$table`: The table you're inserting into
* `$data`: An associative array of data to enter, where the key is the DB field name.

Because we made sure the name attributes on the text fields matched exactly what they are in the database, `$_POST` array can be passed directly to the `insert()` method as the data parameter. 

	public function p_signup() {
			
		# Dump out the results of POST to see what the form submitted
		// print_r($_POST);
			
		# Insert this user into the database
		$user_id = DB::instance(DB_NAME)->insert('users', $_POST);
		
		# For now, just confirm they've signed up - 
		# You should eventually make a proper View for this
		echo 'You\'re signed up';
			
	}</cm>

With just one line of code we took the entire contents of a form and added it to the database, effectively *signing up* a user.

[englarge](http://making-the-internet.s3.amazonaws.com/framework-signup-insert-flow.png)
<img src='http://making-the-internet.s3.amazonaws.com/framework-signup-insert-flow.png'>

This is good, but there's work to do for the created, modified, token, password, last_login and timezone fields:

<img src='http://making-the-internet.s3.amazonaws.com/framework-signup-work-to-do.png'>

The fields created and modified are straightforward&mdash; we just want to store the current Unix timestamp. You could have called upon the built in PHP date function [time()](http://php.net/manual/en/function.time.php) to get the timestamp, but we used the Time library with the method `now()`. This method will allow you to easily mimick different times should your application ever call for it.

Append the created and modified values onto the $_POST array:

	public function p_signup() {
				
		# More data we want stored with the user
		$_POST['created']  = Time::now();
		$_POST['modified'] = Time::now();
			
		# Insert this user into the database
		$user_id = DB::instance(DB_NAME)->insert('users', $_POST);
	
		# For now, just confirm they've signed up - 
		# You should eventually make a proper View for this
		echo 'You\'re signed up';
				
	}
	



## Encrypting password & login token
The next task is to deal with the password, which right now is being stored in plain text form:
<img src='http://making-the-internet.s3.amazonaws.com/framework-plain-text-passwords.png'>

If you had a table full of users and your database ever got compromised, you'd be in big trouble&mdash; for a number of reasons&mdash; but primarly because you were exposing all of our user's passwords. 

To solve this problem, you want to encrypt passwords, creating a *hashed* version that's stored in the database. 

You'll do this by taking what the user entered via `$_POST`, editing the value, and then putting it back so it's ready to go into the database.

You'll also want to create an encrypted token, which will eventually be used with browser cookies to indicate if a user is logged in. You can think of a token as a wrist band which grants access to a restricted/paid event.

Here's a way to encrypt the password and token:

	public function p_signup() {
		
		# More data we want stored with the user
		$_POST['created']  = Time::now();
		$_POST['modified'] = Time::now();
		
		# Encrypt the password	
		$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);			
		
		# Create an encrypted token via their email address and a random string
		$_POST['token'] = sha1(TOKEN_SALT.$_POST['email'].Utils::generate_random_string());	
		
		# Insert this user into the database 
		$user_id = DB::instance(DB_NAME)->insert("users", $_POST);
		
		# For now, just confirm they've signed up - 
		# You should eventually make a proper View for this
		echo 'You\'re signed up';
		
	}

This uses the built in PHP function `sha1()` ([ref](http://php.net/manual/en/function.sha1.php)) which does the encrypting using the *US Secure Hash Algorithm 1*.

Note that we didn't hash just the password, but concatenated in the `PASSWORD_SALT` constant. The token was also created using a salt (`TOKEN_SALT`), plus the user's email, plus a random string.

[Salts](http://www.php.net/manual/en/faq.passwords.php#faq.passwords.salt) are extra characters added to passwords and other secure data when they're encrypted, making them more difficult to crack. You can use this [Salt generator](http://www.sethcardoza.com/tools/random-password-generator/) to come up with a unique password and token salt for your app; it's suggested you choose the *40 character long Letters, Numbers and Symbols* option.

You should also uncomment the `PASSWORD_SALT` and `TOKEN_SALT` constants in your app config (`/app/configs/config.php`) and fill them in with the salts you generate:

	define('PASSWORD_SALT', 'somereallylongstringoflettersnumbersandsymbols');
	define('TOKEN_SALT', 'somedifferentlongstringoflettersnumbersandsymbols');

When you enter a new user with this updated code, the password and token look much more secure:
<img src='http://making-the-internet.s3.amazonaws.com/framework-hashed-token-and-password.png'>

## Summary
* Controller methods that handle POST data are prefixed with `p_`
* $_POST arrays received from HTML forms can be easily entered into a table using DB `insert()`
* Passwords and other secure data should be encrypted with random strings called Salts.

