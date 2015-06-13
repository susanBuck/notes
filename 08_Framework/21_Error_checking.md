When we talk about error checking and reporting, we're referring to assessing the information users provide, making sure it's valid and giving them feedback if it's not. 

Ideally, most error checking starts on the client side via JavaScript&mdash; this way problems can be identified and fixed without the time it takes to make a round trip to the server. A good way to manage client side error checking is via a jQuery plugin ([example](https://github.com/posabsolute/jQuery-Validation-Engine)).

Hack-savy users can manipulate applications via JavaScript, though, so sensitive data should always be doubly validated on the server side. 

Because we're not focussing on JavaScript in this doc, let's look at error reporting on the server side.

As our login method stands now, if a user enters an invalid username / password combination it dumps them back to the login page without any indication that something went wrong. This is a great way to frustrate the heck out of a user.

Here's how we last left the login method in `c_users.php`:

	public function p_login() {
		
		# [...irrelevant code redacted...]
				
		# Login failed
		if(!$token) {
			Router::redirect("/users/login");
		}
		# Login passed
		else {
			setcookie("token", $token, strtotime('+2 weeks'), '/');
			Router::redirect("/");
		}
	}


We want to alter this, so that when you send the user back to the login page, you're including some indicator there was a problem, allowing an error message to be displayed.

You can do this via a parameter tacked tack on to `/users/login`:

	public function p_login() {
		
		# [...irrelevant code redacted...]
				
		# Login failed
		if(!$token) {
			# Note the addition of the parameter "error"
			Router::redirect("/users/login/error"); 
		}
		# Login passed
		else {
			setcookie("token", $token, strtotime('+2 weeks'), '/');
			Router::redirect("/");
		}
	
	}
	

Now edit the login controller to accept that parameter and pass it to the View:

	public function login($error = NULL) {
		
		# Set up the view
		$this->template->content = View::instance("v_users_login");
		
		# Pass data to the view
		$this->template->content->error = $error;
		
		# Render the view
		echo $this->template;
		
	}
	
The reason we default $error to be `NULL` is so PHP won't throw any warnings if `$error` is blank (which it might be if there are no errors).
	
Finally, look for the error in the View and display a message if it exists:

	<form method='POST' action='/users/p_login'>
	
		Email<br>
		<input type='text' name='email'>	
		<br><br>
		
		Password<br>
		<input type='password' name='password'>
		<br><br>
		
		<?php if(isset($error)): ?>
			<div class='error'>
				Login failed. Please double check your email and password.
			</div>
			<br>
		<?php endif; ?>
	
		<input type='submit' value='Log in'>

	</form>

Results:
<img src='http://making-the-internet.s3.amazonaws.com/framework-login-error.png'>

Note: In our example we threw in a little extra CSS styling to make the error stand out with red text.

## Challenge
The above solution does not indicate whether the problem is with the email address, the password, or both. How could you adapt this solution so it's more specific?