## Reference
+ <http://laravel.com/docs/session>
+ <http://laravel.com/docs/security>
+ <http://machinesaredigging.com/2013/10/29/how-does-a-web-session-work/>
+ CodeBright: Authentication

---

## Sessions

The request lifecycle of a webpage is stateless. This means if you need to track information from one request to another, you have to store that information on the server using **Sessions** and/or on the user's browser using **Cookies**.

>> *A session is a little text payload with an associated browser cookie that will allow PHP and Laravel to remember your user between requests.* - CodeBright, Authentication

Example of said *little text payload*:
```
a:4:{s:6:"_token";s:40:"M4KdHqhUCn3y3gA2wN72ovHpJz6wgXLwORCWb45x";s:22:"PHPDEBUGBAR_STACK_DATA";a:0:{}s:5:"flash";a:2:{s:3:"old";a:0:{}s:3:"new";a:0:{}}s:9:"_sf2_meta";a:3:{s:1:"u";i:1406109856;s:1:"c";i:1406108609;s:1:"l";s:1:"0";}}
```

Where Sessions are stored depends on what Session driver your server is using. Here are the options (all supported by Laravel):

+ **file** - sessions will be stored in `/app/storage/sessions`.
+ **cookie** - sessions will be stored in secure, encrypted cookies.
+ **database** - session will be stored in database (by default in table `sessions`).
+ **memcached / redis** - sessions will be stored in one of these fast, cached based stores.
+ **array** - sessions will be stored in a simple PHP array and will not be persisted across requests; useful for Unit Testing.

By default, Laravel uses the `file` Session driver, but this can be changed in `app/config/session.php`.

When using the `file` Session driver, all sessions will be stored in `/app/storage/sessions/`.

If you're using the `file` driver, there's not really anything you have to configure out of the box. Given that, you can get right to work with building an authentication system.




## Users table

To keep track of users registered for your site, you'll need a `users` table in your database.

Within your project's directory, prompt artisan to create you a new migration to create this table:

	$ php artisan migrate:make create_users_table
	
Check `app/database/migrations` for the resulting migration.

In the `up()` function, create your table:

```php
Schema::create('users', function($table) {

	$table->increments('id');
	$table->string('email')->unique();
	$table->string('remember_token',100); 
	$table->string('password');
	$table->timestamps();
	
});
```

In the `down()` function, drop your table:

```php
Schema::drop('users');
```

Preview your migration:

	php artisan migrate --pretend
	
Look good? Run your migration to build the user's table:

	php artisan migrate
	



## User Model

Because working with users is such a common task, Laravel ships with a boilerplate User Model. 

Check it out in `/app/models/User.php`.



## Sign up

Create a View which has a form for users to sign up:
```html
<!-- /app/views/signup.blade.php -->
<h1>Sign up</h1>

{{ Form::open(array('url' => '/signup')) }}
			
	Email<br>
	{{ Form::text('email') }}<br><br>

	Password:<br>
	{{ Form::password('password') }}<br><br>
	
	{{ Form::submit('Submit') }}

{{ Form::close() }}
```

We're using the Form helper to generate the form tags which has a couple useful advantages:
+ The `Form::open()` method will automatically generate an encrypted token in a hidden field for CSRF (Cross Site Forgery Requests) checking. 
+ If we send the user back to this page because of a failed sign-up, the email field will automatically pre-fill with their last entry. For security reasons, this does not happen in the password field.

Create a **get** route to display the sign up form:
```php
// app/routes.php`:

Route::get('/signup',
	array(
		'before' => 'guest',
		function() {
	    	return View::make('signup');
		}
	)
);
```

The only thing new about the above code is the `'before' => 'guest'` filter which will prevent already-logged in users from accessing this route. The `guest` filter comes pre-baked into `/app/filters.php` and it will redirect users who are already logged in back to your application's homepage.

If you haven't already explored filters, you can read more here: [CodeBright: Filters](http://daylerees.com/codebright/filters).

Create a **post** route to process the sign up form:
```php
Route::post('/signup', 
	array(
		'before' => 'csrf', 
		function() {

			$user = new User;
			$user->email    = Input::get('email');
			$user->password = Hash::make(Input::get('password'));
			
			# Try to add the user 
			try {
				$user->save();
			}
			# Fail
			catch (Exception $e) {
				return Redirect::to('/signup')->with('flash_message', 'Sign up failed; please try again.')->withInput();
			}
			
			# Log the user in
			Auth::login($user);
			
			return Redirect::to('/list')->with('flash_message', 'Welcome to Foobooks!');
	
		}
	)
);
```

Notes:

+ The `before = csrf` filter ensures that the CSRF token in the submitted form is legit, screening against Cross Site Forgery Requests. This `csrf` filter comes pre-baked into the `/app/filters.php` file.
+ The `Hash::make()` method is used to hash the password; this is good because you never want to store plain-text passwords in your database.
+ We're using a [PHP try catch Exception](http://php.net/manual/en/language.exceptions.php) to handle failed login attempts.
+ If a login fails, the user is redirected back to the sign-up page with a flash_message (more on that below).
+ If the login passes, the user is logged in and then redirected to the `/list` route.



### Flash messages
In both the redirects above, we're passing along a value `flash_message`. 

A flash message is a technique used to display a message on a page for a single request lifecycle. For our authentication system, we'll use flash messages for the following purposes:

Let the user know if...
+ there was a problem with sign up
+ there was a problem with log in
+ sign up was succesful
+ log in was successful


A flash message is something you'll likely want to use on numerous pages through your application, so set up some code in your master template file to echo out the flash message if it exists:

```html
<body>

	@if(Session::get('flash_message'))
		<div class='flash-message'>{{ Session::get('flash_message') }}</div>
	@endif
	
	[... Rest of your page ...]
```

We added a class `flash-message` so we could style it via CSS to make it stand out. If you're familiar with Twitter Bootstrap, the [Alert component](http://getbootstrap.com/2.3.2/components.html#alerts) can be useful for styling flash messages.

In these examples we're creating the flash messages by passing data on our redirects with the `with()` method. You can also set flash data using `Session::flash()`:

```php
Session::flash('flash_message', 'Hello!');
```

Read more: 
+ [Laravel Docs: Flash Data](http://laravel.com/docs/session#flash-data).
+ [Flash message package to implement success, error or warning flash messages](https://github.com/laracasts/flash)



## Log in

Create a View which has a form for users to log in:

```html
<!-- /app/views/login.blade.php -->
<h1>Log in</h1>
	
{{ Form::open(array('url' => '/login')) }}
			
	Email<br>
	{{ Form::text('email') }}<br><br>

	Password:<br>
	{{ Form::password('password') }}<br><br>
	
	{{ Form::submit('Submit') }}

{{ Form::close() }}
```

Create a **get** route to display the log in form:

```php
Route::get('/login',
	array(
		'before' => 'guest',
		function() {
			return View::make('login');
		}
	)
);
```

All of the above is pretty similar to the sign up form.

Create a **post** route to process the login form:

```php
Route::post('/login', 
	array(
		'before' => 'csrf', 
		function() {
	
			$credentials = Input::only('email', 'password');
			
			if (Auth::attempt($credentials, $remember = true)) {
				return Redirect::intended('/')->with('flash_message', 'Welcome Back!');
			}
			else {
				return Redirect::to('/login')->with('flash_message', 'Log in failed; please try again.');
			}
			
			return Redirect::to('login');
		}
	)
);
```

Notes:
+ Logging in a user entails passing an array of credentials to the [`Auth::attempt()`](http://devdocs.io/laravel/api/4.2/illuminate/auth/guard#method_attempt) method. 
+ We're defaulting `remember` to be true so the user will be logged in indefinitely or until they log out. If we wanted to make it so that users were *not* remembered when they close their browser, we'd change this to `false` *and* update `'expire_on_close'` to be `true` in `/app/storage/session.php`.
+ You don't have to hash the password, Auth will take care of that for you.
+ Because `Auth::attempt()` returns a nice boolean value of whether a login was successful, we used an *if else* statement here instead of a *try catch*.
+ On success, `Redirect::intended('/')` will send the user back to the last page they were at before they were sent to the login page. If there is no previous page, it goes to the specified default (in this case that's the homepage via `/`).
+ FYI: Once a user is authenticated, you can pull out user info from the model like this `$email = Auth::user()->email;`


## Logout

Create a **get** route to handle logouts. 

```php
# /app/routes.php
Route::get('/logout', function() {
	
	# Log out
	Auth::logout();
	
	# Send them to the homepage
	return Redirect::to('/');
	
});
```

Notes:

+ No special forms needed here, just a simple call to `Auth::logout()`.
+ All a user has to do to logout is visit this route; given that it makes sense to display a *logout* link somewhere on your site that will send your user to this route.
+ Upon logging out, the user is redirected to the homepage.



## Logged In/Out Status

Somewhere on your site (perhaps in the master template so it's available on every page) you can use the `Auth::check()` method to determine if a user is logged in. 

If they are, you can display a link to the logout route.

If they are not, you can display links to sign up or log in.

```html
@if(Auth::check())
	<a href='/logout'>Log out {{ Auth::user()->email; }}</a>
@else 
	<a href='/signup'>Sign up</a> or <a href='/login'>Log in</a>
@endif
```





## Locking down routes

Now that you have login functionality, you can use it to secure pages that should only be available to logged in users.

For example, let's make the `list` route (the one that shows all the books) a page that can only be viewed by authenticated users.

To do this, add a `'before' => 'auth'` filter:

```php
# /app/routes.php
Route::get('/list/{format?}', 
	array(
		'before' => 'auth', 
		function($format = 'html') {
			# rest of your list code goes here...
		}
	)
);
```

The `auth` filter is one that comes baked into Laravel by default. Open `/app/filters.php` to explore its contents. In summary: when you apply this filter it checks to see if the user is a guest (i.e. not logged in) and if they are, it redirects them to your login page.


## More...

That's it for a basic authentication system. If you want to dig deeper, you can implement [password reminders and resets](http://laravel.com/docs/security#password-reminders-and-reset).

Also, if you'd like to understand more about *how* the above authentication system works, read: [Unpacking Sessions and Cookies](https://github.com/susanBuck/notes/blob/master/05_Laravel/999_Unpacking_Sessions_and_Cookies.md).




