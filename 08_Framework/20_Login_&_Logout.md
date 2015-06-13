## Logging in
Now that you've created a user, we need to move on to building the functionality of having them logged in.

First, create your `login` method in `/p2.yourdomain.com/controllers/c_users.php` that will display the login page:

	public function login() {
	
		# Setup view
			$this->template->content = View::instance('v_users_login');
			$this->template->title   = "Login";
			
		# Render template
			echo $this->template;
		
	}

Followed by your login view in `/p2.yourdomain.com/views/v_users_login.php`:

	<form method='POST' action='/users/p_login'>
	
		Email<br>
		<input type='text' name='email'>
		
		<br><br>
		
		Password<br>
		<input type='password' name='password'>
	
		<br><br>
		
		<input type='submit' value='Log in'>
	
	</form>

You should now see a simple login form at `http://localhost/users/login`.

Now, lets program the `p_login` method:
	
	public function p_login() {
		
		# Sanitize the user entered data to prevent any funny-business (re: SQL Injection Attacks)
		$_POST = DB::instance(DB_NAME)->sanitize($_POST);
		
		# Hash submitted password so we can compare it against one in the db
		$_POST['password'] = sha1(PASSWORD_SALT.$_POST['password']);
		
		# Search the db for this email and password
		# Retrieve the token if it's available
		$q = "SELECT token 
			FROM users 
			WHERE email = '".$_POST['email']."' 
			AND password = '".$_POST['password']."'";
		
		$token = DB::instance(DB_NAME)->select_field($q);
			
		# If we didn't find a matching token in the database, it means login failed
		if(!$token) {
				
			# Send them back to the login page
			Router::redirect("/users/login/");
			
		# But if we did, login succeeded! 
		} else {
				
			/* 
			Store this token in a cookie using setcookie()
			Important Note: *Nothing* else can echo to the page before setcookie is called
			Not even one single white space.
			param 1 = name of the cookie
			param 2 = the value of the cookie
			param 3 = when to expire
			param 4 = the path of the cooke (a single forward slash sets it for the entire domain)
			*/
			setcookie("token", $token, strtotime('+1 year'), '/');
			
			# Send them to the main page - or whever you want them to go
			Router::redirect("/");
						
		}
	
	}

That's a lot of code at once, so read through each comment to see what each piece is doing.

* We verify whether a user should be logged in by whether we have a matching email and password in the database.
* If they pass the latter test, store the token in a cookie in their browser using [setcookie()](http://php.net/manual/en/function.setcookie.php). It's essential nothing echo is echo'd to the page before setcookie is called; if you do you'll get an error about *headers already being sent*.
* That cookie is the key to the application, telling us if this user has been authorized and is logged in.
* If the user had a succesful login, send them to the application homepage. If they failed, we send them back to the login page.



## Authenticating
Throughout your application you're going to want to authenticate your user to see if they're logged in. You'll do this for two reasons:

* When needed, to keep them out of the *members only* areas of your site.
* To have access to the data related to that user (first_name, email, etc.).

Authentication is already baked into the sample application that came with the framework, so let's look at how it works. 

Open up your base controller at `/app/controllers/c_base.php`

If you'll remember from several sections ago, all our controllers extends the base controller, which means by doing authentication here, it will be available throughout your application.

	class base_controller {
		
		public $user;
		public $userObj;
		public $template;
		public $email_template;
	
		public function __construct() {
		
			# Instantiate a User object
				$this->userObj = new User();
				
			# Authenticate / load user
				$this->user = $this->userObj->authenticate();					
			# Set up templates
				$this->template 	  = View::instance('_v_template');
				$this->email_template = View::instance('_v_email');			
									
			# Set a global variable called $user which is accessible to all the views
			# Set it to be $this->user
				$this->template->set_global('user', $this->user);
							
		}
		
	} 

Breakdown:

**New user Object**

	$this->userObj = new User();
	
Instantiate a object from the User Class so we can have access to all its methods:


**Authenticate**

	$this->user = $this->userObj->authenticate();	
Call the authenticate method and store the results in `$this->user`. If this line is succesful at authenticating the user, then `$this->user` will be loaded with all data we have about that user from the Users table. If it fails, it will be blank and that will be our cue that the user is not logged in:


**Globalize user**

	$this->template->set_global('user', $this->user);
	
This makes it so the data in `$this->user` is easily accessible from View files, which will come in handy since our View files will often be catered towards a specific user's data.

## Debugging strategies
Your best strategy for debugging problems is having your PHP talk back to you.

For example, if you're debugging problems related to your user, you can have your app dump the contents of the user object:

	echo '<pre>';
	print_r($this->user);
	echo '</pre>';

Example results:

	stdClass Object
	(
	    [user_id] => 12
	    [created] => 1381729658
	    [modified] => 1381729658
	    [token] => bc0158115b6ff46fd534ffb5cf18b1f759884f19
	    [password] => a3c2482db033d067b694bc7c72a61dfe6778c525
	    [last_login] => 0
	    [timezone] => 
	    [first_name] => Sam
	    [last_name] => Seaborn
	    [email] => seaborn@whitehouse.giv
	    [avatar] => /core/images/placeholder.png
	    [avatar_small] => /core/images/placeholder_200_200.png
	    [avatar_medium] => /core/images/placeholder_600_400.png
	)


Similarly, you can also see what cookies your app has set by printing the superglobal $_COOKIE:

	echo '<pre>';
	print_r($_COOKIE)
	echo '</pre>';
	
Example results:

	Array
	(
	    [PHPSESSID] => 2fc910afa60158358f4e7b9dc30a6195
	    [SQLiteManager_currentLangue] => 2
	    [token] => bc0158115b6ff46fd534ffb5cf18b1f759884f19
	)


Cookies can also be viewed from browser specfic tools.

For example, in Chrome, if you bring up the Web Inspector (*View: Developer: Developer Tools*), you can find cookies via the Resources tab:

<img src='http://making-the-internet.s3.amazonaws.com/framework-cookies-inspector.png'>

For other browsers, if you're unsure how to locate cookies, Google will help you out (&ldquo;*How to view cookies in [browser name*]&rdquo;).

There are also browser specific plugins that allow you to not only view cookies, but also edit them (useful for testing), such as [Chrome Cookies](https://chrome.google.com/webstore/detail/cookies/iphcomljdfghbkdcfndaijbokpgddeno). Search your browser's web store for &ldquo;*Cookies*&rdquo; to see what options it has available.

## Testing out authentication
With this work done, let's try it out; replace the entire contents of `v_index_index.php` with the following line:

	<h1>Welcome to <?=APP_NAME?><?php if($user) echo ', '.$user->first_name; ?></h1>

This says: If `$user` exists (i.e. a user is logged in), echo their first name. Note how `$first_name` is accessed from the `$user` object we created and globalized in the base controller above.

If a user is logged in the exptected results are something like this (depending on your app name and username):

	Welcome to Flutter, Sam

Otherwise it should just say:

	Welcome to Flutter

Now let's use authentication to restrict access to pages if a user is not logged in. We'll test this out in `/users/profile`:

`/p2.yourdomain.com/controllers/c_users.php `

	public function profile() {
	
		# If user is blank, they're not logged in; redirect them to the login page
		if(!$this->user) {
			Router::redirect('/users/login');
		}
		
		# If they weren't redirected away, continue:
		
		# Setup view
		$this->template->content = View::instance('v_users_profile');
		$this->template->title   = "Profile of".$this->user->first_name;
			
		# Render template
		echo $this->template;
	}


Change `/p2.yourdomain.com/views/v_users_profile.php` from:

	<?php if(isset($user_name)): ?>
		<h1>This is the profile for <?=$user_name?></h1>
	<?php else: ?>
		<h1>No user has been specified</h1>
	<?php endif; ?>

To:

	<h1>This is the profile of <?=$user->first_name?></h1>

We no longer have to check if user_name is set, because they shouldn't even be able to see this page if they're not logged in.

Before you can really test this work out, you have to have the ability to log out...


## Logging out

Update your logout function in `/p2.yourdomain.com/controllers/c_users.php` to:

	public function logout() {
		
		# Generate and save a new token for next login
		$new_token = sha1(TOKEN_SALT.$this->user->email.Utils::generate_random_string());
		
		# Create the data array we'll use with the update method
		# In this case, we're only updating one field, so our array only has one entry
		$data = Array("token" => $new_token);
		
		# Do the update
		DB::instance(DB_NAME)->update("users", $data, "WHERE token = '".$this->user->token."'");
		
		# Delete their token cookie by setting it to a date in the past - effectively logging them out
		setcookie("token", "", strtotime('-1 year'), '/');
		
		# Send them back to the main index.
		Router::redirect("/");
	
	}
	
In this method, the first thing we do is generate and store a new token that they will use *next time* they log in. Refreshing token codes provides an extra level of security.

Then, we delete their existing token cookie. There's no `removecookie()` method; instead you use `setcookie()` and set the expiration date to a time in the past. Remember, nothing should echo out before `setcookie()`.

Finally, when done, redirect the user to the main index.

Test this out by hitting `http://localhost/users/logout`. It should redirect you to the main index, which should no longer display your name.
