The *pick-up* approach to PHP typically involves creating specific .php files responsible for different parts of your application. For example, if you wanted to display a user's profile, you might have a file called `profile.php` that was in charge of those features. 

With a framework, it doesn't work that way. Instead, your application is divided into logical pieces, each with its own role and area of focus. 

The way these pieces work together all starts with a concept called <strong>Routing</strong>.

Routing takes a given url such as `http://yourdomain.com/users/profile` and figures out which part of your application needs to run. 

Toss out the old idea of urls digging into directories on your server. With a framework, we think of urls more as commands that run specific portions of our application.

Take the following URL for example:

<img src='http://making-the-internet.s3.amazonaws.com/framework-controller-method-on-url.png'>
<br>

The first paramater of the url, `users`, is telling the application which **controller** to use and the second part `profile` is telling which **method** to use.

To understand what controllers and methods are - first imagine your application is a large company. The most efficient way to run this company is to divide it into logical departments (controllers), each in charge of related tasks (methods).

So in our little start of an application, the first department we have is a Users department. This department, or controller, is in charge of all tasks related to users, including signups, logins, logouts or displaying a profile. Each of these tasks is a method in the User's controller.

If you dig into your application folder, you'll see a controllers folder, with two controller files to get you started.


	/root/
		/core/
		/environment.php
		/myapp.com/
		/controllers/
			/c_base.php
			/c_index.php
			
The convention of this framework requires each controller file to be prefixed with `"c_"`. The purpose of this is so that when you have multiple files open in your code editor at once, you'll be able to easily spot the controllers.

Let's start building your users controller:

Create a new file `/p2.yourdomain.com/controllers/c_users.php` with the following code:

	<?php
	class users_controller extends base_controller {
	
		public function __construct() {
			parent::__construct();
			echo "users_controller construct called<br><br>";
		} 
		
		public function index() {
			echo "This is the index page";
		}
		
		public function signup() {
			echo "This is the signup page";
		}
		
		public function login() {
			echo "This is the login page";
		}
		
		public function logout() {
			echo "This is the logout page";
		}
		
		public function profile($user_name = NULL) {
			
			if($user_name == NULL) {
				echo "No user specified";
			}
			else {
				echo "This is the profile for ".$user_name;
			}
		}
			
	} # end of the class


Some things to point out here:

* Controllers are [Classes](http://www.php.net/manual/en/language.oop5.basic.php)
* You must append `_controller` to the name of your controller class in order for Routing to work.
* This class `users_controller` extends `base_controller`. That means it can use anything inside `base_controller`. This is called [inheritance](http://www.php.net/manual/en/language.oop5.inheritance.php).
* All our methods have the [visibility](http://www.php.net/manual/en/language.oop5.visibility.php) keyword of *public* which means it can be accessed anywhere, both within the class and externally.
* The `__construct()` method is a [magic method](http://www.php.net/manual/en/language.oop5.magic.php). By default, it gets called every time this Class is called, no matter what method you're calling.

Many of the above points dig into Objected Oriented Programming concepts which we'll dig into in the next section. For now, bear with us.

With your Users controller built, let's trigger some of the User methods.

Examples:

* `http://localhost/users/signup`
* `http://localhost/users/logout`

<img src='http://making-the-internet.s3.amazonaws.com/framework-signup-logout.png'>

These controller/methods are not doing anything fancy yet, but this routing is the backbone for how applications are built.

Now try this url: `http://localhost/users/profile/joe`

<img src='http://making-the-internet.s3.amazonaws.com/framework-profile-joe.png'>

With this one, we've added a paramater option to our url, *joe*. Any URL paramater that comes after your controller/method can be sent to the method as a parameter, assuming that method is prepared to receive it, which the profile method is:

	<?php
	public function profile($user_name) {
		echo "This is the profile for ".$user_name;
	}


<img src='http://making-the-internet.s3.amazonaws.com/framework-params.png'>

## (FYI) How is this working?
If you're curious how all this magical routing is working, the key lies in the `.htacess` file that came with your sample app. An [htaccess file](http://en.wikipedia.org/wiki/Htaccess) is a directory configuration file which can do several different tasks, but mostly it acts kind of like a traffic cop to your site, redirecting traffic according to your instructions.

This is the key line in your app's htacess file that allows Routing to happen:
	
	# Rewrite all other URLs to index.php/URL
	RewriteRule .* index.php/$0 [PT,L]

This line says that any traffic to the site should be routed via `index.php`.

If you were to open your apps `index.php` file, you'd see this line (among others):

	# Match requested uri to any routes and instantiate controller
    Router::init();
    
That line is calling upon the Router class to do all the work of discerining the controller, method and any parameters. To learn more about this investigate `/core/libraries/Router.php`.

Summary:
<img src='http://making-the-internet.s3.amazonaws.com/framework-routing-wireframe.png'>

## Special Routing

### Index route
Given what we've just learned about routing, what is going on when we hit `http://localhost` without specifying a controller or method?

In this case, there's a special route already defined in `/p2.yourdomain.com/index.php`

	<?php
	# Routing
	Router::$routes = array(
		'/' => '/index',     # default controller when "/" is requested
	);


This says if the user accesses `/` direct them to the `c_index.php` controller. 

So essentially when we hit `http://localhost` the system actually reads it as `http://localhost/index`.

Note that if we don't specify a method, it will look for an `index()` method by default.

Yes, that's kind of confusing: we're calling the *index method* in the *index controller*. The reason we've called the controller index as well is because it's serving as the main index of the site; the default landing page. 


### Create your own special routes
Setting special routes in index.php essentially allows you to write short-cut URLs. 

For example, imagine you built an application to manage your personal portfolio. You had a controller called `c_portfolio.php` and inside of it a method called `view()`. The paramater it expected was the id of the the portfolio piece that is being requested.

`c_portfolio.php`:

	<?php
	class portfolio_controller extends base_controller {
		public function view($project_id) {			
			# Code here to grab the project from the database using the $project_id
		} 
	}
	?>

With this setup, to access a portfolio piece, the url might look like this, where 34 is the hypothetical id of a portfolio piece called *Digital Turbine* (or whatever):

	http://localhost/portfolio/view/34	
	
This is great, but imagine suddenly this project has gained a lot of media attention and several publications are wanting to link to the project. You could send out the above URL, or you could create a custom, shortened URL for that project specifically. 

This would be set up with a custom route in index.php:
	
	<?php
	# Routing
    Router::$routes = array(
    	'/' => '/index',
    	'/digital-turbine' => '/portfolio/view/34',
    );


Now, both `http://localhost/portfolio/view/34` and `http://localhost/digital-turbine` go to the same place.	

You can have multiple special routes - they just get added on to the `$routes` array.





