CSRF, or Cross-site request forgery, is a type of web application vulnerability where the victim unintentionally runs a script in their browser that takes advantage of their logged in session to a particular site.

For example, imagine you set up a controller/method in your micro-blog, so that when users go to `http://yourdomain.com/users/delete` it will delete their account.

You've implemented proper JavaScript checking that confirms with the user they wish to delete their account before ever triggering the /users/delete method. 

However, a hacker has dug through your source code to find this URL and wishes to trick your users into deleting their accounts. 

To accomplish this, they could present the victim with an image (in a forum post, in a email, etc.) with the delete URL set as the image src, which would execute `http://yourdomain.com/users/delete`:

	<img src='http://yourdomain.com/users/delete'>

Alternatively, they could trick you into clicking on a link leading directly to the delete page:

	<a href='http://yourdomain.com/users/delete'>Free stuff!</a>

For another scary example, consider the following URL:

	http://bank.com/withdraw?account=Victim&amount=1000000&for=Hacker
	
## Prevention: CSRF tokens

To prevent CSRF attacks you want to verify that the origin of requests on your site are coming from within your site, and also send a unique token with every form. The token should be stored in a PHP session so that upon submission, your code can check that the token submitted with the form verifies the token stored in the session. This prevents hackers from mimicking your forms on their sites.

As a demonstration of this, let's implement a PHP token class called NoCSRF: <https://github.com/BKcore/NoCSRF>

Create the following directories parallel to your applications: `/shared/vendors/NoCSRF/` and place a file called `NoCSRF.php` in that directory. Within that file, place the code found here: <https://raw.github.com/BKcore/NoCSRF/master/nocsrf.php>

The resulting structure should look like this:

	/root/
		/p1.dwa15-practice.biz
		/p2.dwa15-practice.biz
		/p3.dwa15-practice.biz
		/p4.dwa15-practice.biz
		/core/
		/shared/
			/vendors/
				/NoCSRF/
					/NoCSRF.php

We're using a shared directory here so that all applications can have access to this new class. In order for autoloading to work, the class has to be placed in a directory of the same name.

Now, let's put this class to work within the the *Add Post* functionality of the micro-blog.

First, in `c_posts.php:add()` add a line to generate a CSRF token that gets passed to the view:

```php
/*-------------------------------------------------------------------------------------------------
Display a new post form
-------------------------------------------------------------------------------------------------*/
public function add() {
	
	$this->template->content = View::instance("v_posts_add");
	
	$client_files_body = Array(
		'/js/jquery.form.js',
		'/js/posts_add.js'
	);
	
	$this->template->client_files_body = Utils::load_client_files($client_files_body);
		
	# Generate a new CSRF session token, and pass it to the View
	$this->template->content->token = NoCSRF::generate('token');

	echo $this->template;
	
}	
```

Then, in the *Add Post* Wiew, include the token as a hidden field in the form:

	<form method='post'>
	
		<input type='hidden' name='token' value='<?=$token?>'>
	
		<textarea name='content'></textarea>
	
		<br><br>
		
		<input type='Submit' value='Add new post'>
	
	</form>
	
	<div id='results'></div>

	
Finally, in `c_posts.php:p_add()`, verify that the form submission has the correct token:

```php
/*-------------------------------------------------------------------------------------------------
Process new posts
-------------------------------------------------------------------------------------------------*/
public function p_add() {

	/*
	@param String $key The session and $origin key where to find the token.
	@param Mixed $origin The object/associative array to retreive the token data from (usually $_POST).
	@param Boolean $throwException (Facultative) TRUE to throw exception on check fail, FALSE or default to return false.
	@param Integer $timespan (Facultative) Makes the token expire after $timespan seconds. (null = never)
	@param Boolean $multiple (Facultative) Makes the token reusable and not one-time. (Useful for ajax-heavy requests).

	@return Boolean Returns FALSE if a CSRF attack is detected, TRUE otherwise.
	*/
	$csrf_pass = NoCSRF::check('token', $_POST, false, 60*10, true );
	
	echo $csrf_pass;
	
	# CSRF Failed
	if(!$csrf_pass) {
		# How you want to handle the error is up to you; here we're just passing back a generic error message
		die("Error adding new post");
	}
	
	unset($_POST['token']);
	
	$_POST['user_id']  = $this->user->user_id;
	$_POST['created']  = Time::now();
	$_POST['modified'] = Time::now();
	
	DB::instance(DB_NAME)->insert('posts',$_POST);
	
	$view = new View('v_posts_p_add');
	
	$view->created = Time::display(Time::now());
	
	echo $view;
			
}
```

Test your *Add Post* functionality to make sure it works. To mimick/test a failed CSRF check, temporarily rename the hidden field where you're storing the token.
		
## Reference

* [Wikipedia: Cross Site Request Forgery](http://en.wikipedia.org/wiki/Cross-site_request_forgery)
* [OWASP: Cross Site Request Forgery](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29)