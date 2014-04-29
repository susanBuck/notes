Controllers are the logic portion of your application; they orchestrate the interactions between your users and your system.

After all this processing, you typically want to render some results for the user in the browser - this is called the **View**. 

Views are only concerned with displaying the page so while they will be using PHP variables and some basic PHP constructs throughout, their primary focus is HTML and CSS.

If we look back at our users controller, we see our methods are using the `echo` command to display information to the page from our Controller. 

	public function profile($user_name = NULL) {
		
        if($user_name == NULL) {
            echo "No user specified";
        }
        else {
            echo "This is the profile for ".$user_name;
        }
    }

This is a quick and dirty way to print results to the page, and we'll use it occasionally when developing, but it's not good practice for finished code since it's breaking the aim of separating our display from our logic.

To display results correctly, you want to delegate the display work to a View.

Let's set this up for the profile method.

First, create a new file in `/app/views/` called `v_users_profile.php` with the following code:

	<?php if(isset($user_name)): ?>
		<h1>This is the profile for <?=$user_name?></h1>
	<?php else: ?>
		<h1>No user specified</h1>
	<?php endif; ?>
	
Some things to note here:

* We're using the [PHP alternative syntax](/PHP/Alternative_syntax) since the View files are focussed more on HTML code than PHP code.
* [isset()](http://php.net/manual/en/function.isset.php) is a built in PHP function that returns true if a variable is set, false if it is not.

With that view created, let's set up the `profile()` method to load it:


	public function profile($user_name = NULL) {
			
		# Create a new View instance
		# Do *not* include .php with the view name
		$view = View::instance('v_users_profile');
	
		# Pass information to the view instance
		$view->user_name = $user_name;
				
		# Render View
		echo $view;
				
	}

Here's what's going on:

**Create the View instance**

	$view = View::instance('v_users_profile');

In order to load `v_users_profile.php` we're calling upon the View library, specifically the `instance()` method. It's important you do not include `.php` when using the `View::instance()` method be it automatically adds it when locating the View file.

**Pass the View data**

	$view->user_name = $user_name;

To pass information from the controller to the view use the object operator (single arrow) `->` which is used to access methods and properties of an object. In this case, we're creating a new property on the spot called `user_name` and setting it to be whatever `$user_name` paramater was passed in (if any). 

If you're curious how this works, check out the magic method [__set()](http://www.php.net/manual/en/language.oop5.overloading.php#object.set) inside `/core/Views.php`. `__set()` is an example of [overloading](http://www.php.net/manual/en/language.oop5.overloading.php#object.set) which allows you to dynamically create properties and methods. 

Alternatively, you could also pass the View data like this: 

	$view->set('user_name', $user_name);

**Print the view**

	echo $view;

Finally, to make the View actually display, it has to be echo'd out (this is the only time it's acceptable to actually echo out something in a Controller in finished code).


## Master Templates

In the above example, we got some HTML to print to the page, but it was pretty sparse. There was no doctype, no head, no body, no place for loading CSS or JavaScript, ex. 

We could have added all those pieces to `v_users_profile.php` but we'd have to repeat all that information for every single view our app needed, going against the principles of DRY programming.

Enter: Master Templates. 

What we're going to do is create a main view we'll call the master template, and all other views will be fragments which get loaded in the master template.

If you look at your `/app/views/` directory, you'll see you already have a master template which came with sample app called `_v_template.php` (master templates are distinguished by a leading underscore, forcing them to alphabetize to the top of file browsers).

Opening _v_template.php you should see the following:

	<!DOCTYPE html>
	<html>
	<head>
		<title><?php if(isset($title)) echo $title; ?></title>
	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
						
		<!-- Controller Specific JS/CSS -->
		<?php if(isset($client_files_head)) echo $client_files_head; ?>
		
	</head>
	
	<body>	
	
		<?php if(isset($content)) echo $content; ?>
	
		<?php if(isset($client_files_body)) echo $client_files_body; ?>
	</body>
	</html>

You can edit this template as you see fit, but first, let's look at how it's used.

To begin, we need to take a look at the base Controller, `c_base.php` which also comes baked into your sample app. The base controller is where you'll put code you want to be executed by all other controllers. 

For example, once your system has the ability to log in users, you don't want to repeat yourself in every Controller, checking to see if a user is logged in. Instead, you can do this action in the base Controller.

[Inheritance](http://www.php.net/manual/en/language.oop5.inheritance.php) is used to ensure your controllers have access to the base controller. Specifically, this is done with the *extends* keyword. For example, when we set up the Users controller a few sections ago, it looked like this:

	
	class users_controller extends base_controller {

	    public function __construct() {
	    	# Call the base constructor
	        parent::__construct();
	    }
	[etc…]

Knowing all this, we want to define our master templates in the base Controller's construct, so it's used by all the controllers.

The following code exists in `c_base.php __construct()`:

	# Set up templates
	$this->template 	   = View::instance('_v_template');
	$this->email_template = View::instance('_v_email');		
As a refresher, $this is a built in variable that points to the current object. By using an object variable in this way, it means we can access `$this->template` in any of our child controllers which extend base.

Given that, let's update our profile method to use this master template:

	public function profile($user_name = NULL) {
			
		/*
		If you look at _v_template you'll see it prints a $content variable in the <body>
		Knowing that, let's pass our v_users_profile.php view fragment to $content so 
		it's printed in the <body>
		*/
		$this->template->content = View::instance('v_users_profile');
		
		# $title is another variable used in _v_template to set the <title> of the page
		$this->template->title = "Profile";
	
		# Pass information to the view fragment
		$this->template->content->user_name = $user_name;
				
		# Render View
		echo $this-template;
				
	}


Here's a visual summary of how View fragments are incorporated into View templates:
<img src='http://making-the-internet.s3.amazonaws.com/framework-master-template.png'>



## Including JS/CSS in views
One last step for Views: including client-side files (CSS and JavaScript).

First off, note that all CSS and JS files related to your app should be stored in the CSS and JS directories in your app directory: 
 
<img src='http://making-the-internet.s3.amazonaws.com/framework-css-js-folders.png'>

Now, looking at `_v_template.php` you can already see where a spot is setup for these client-side files both in the head and the body (`$client_files_head` and `$client_files_body`).

Given that, your job is to specify what client files needed to be loaded. 

You could manually pass `<link>` (CSS) and `<script>` (JS) elements to the client_files variables like so:

	$this->template->client_files_head = '<link rel="stylesheet" href="/css/profile.css" type="text/css">';
	$this->template->client_files_head .= '<script type="text/javascript" src="/js/profile.js"></script>';

Alternatively, there's a helper method in the Utils library called `load_client_files()` which accepts an `array` of CSS or JavaScript paths and generates the link/script elements for you:

	public function profile($user_name = NULL) {
			
		# Setup view
		$this->template->content = View::instance('v_users_profile');
	
		# Set page title
		$this->template->title = "Profile";
	
		# Create an array of 1 or many client files to be included in the head
		$client_files_head = Array(
			'/css/widgets.css'
			'/css/profile.css'
			);
			
		# Use load_client_files to generate the links from the above array
	    $this->template->client_files_head = Utils::load_client_files($client_files_head);  
	
		# Create an array of 1 or many client files to be included before the closing </body> tag
		$client_files_body = Array(
			'/js/widgets.min.js',
			'/js/profile.min.js'
			);
			
		# Use load_client_files to generate the links from the above array
	    $this->template->client_files_body = Utils::load_client_files($client_files_body);  
	
		# Pass information to the view fragment
		$this->template->content->user_name = $user_name;
				
		# Render View
		echo $this->template;
				
	}

### Load order
It's common to load CSS files in the head of the page (so styles are available as the content loads) and to load JS files at the very end of the page before the closing body tag (so content loading isn't slowed down by loading JS). 

That being said, there might be instances where you have to load JS in the head, in which case you could add it to the `$client_files_head` Array.

## Common JS/CSS

In the previous examples, we were loading hypothetical CSS and JS files that were specific to profile. It's likely though, that you may have CSS and JS that needs to be loaded on every page of your app such as a master StyleSheet or jQuery.

In this case, you can just hard code the includes into your `_v_template.php` file rather than invoking it from the controllers each time.
	
	<!DOCTYPE html>
	<html>
	<head>
		<title><?php if(isset($title)) echo $title; ?></title>
	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
		<!-- Common CSS/JSS -->
		<link rel="stylesheet" href="/css/app.css" type="text/css">
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
						
		<!-- Controller Specific CSS/JS -->
		<?php if(isset($client_files_head)) echo $client_files_head; ?>
		
	</head>
	
	[etc...]

## A note on file paths	
In all of the above examples, our CSS and JS includes were always set with **absolute paths**. 

Absolute paths always start with a forward slash and dictate where an asset is by starting at the root of the directory and moving forward. 

This is in contrast to **relative paths**, which dictate where an asset is according to which directory you're in.

It's lke the difference between giving someone an exact address (&ldquo;*The Bank is located at 145 Main St.*&rdquo;) or an address relative to where you are (&ldquo;*Go down three blocks, make a left, and the Bank will be on the corner*&rdquo;). 

An absolute address is always the same, no matter where you are, but a relative address changes depending on where you are.

In simple websites that don't use routing, relative paths are fine because the URLs you use to access pages describe the directory structure of the site.

For example, in a simple site without routing if I go to the URL `http://domain.com/users/profile` the browser access a directory called `profile` which is in a directory called `users`. 

Because of this, if you specify a relative path such as `../../images/logo.png` the browser will back up two directories (out of `users` and `profile`) and then look for a images directory.

However, with our routing system, if we go to `http://domain.com/users/profile` there's no actual `users/profile/` directory. 

Technically, the path of the pages we access are all running from the `index.php` file in the root. Given that, `../../images/logo.png` would not work.

The solution to this is to always use absolute paths, so you can tell the browser exactly where an asset is located.

Instead of...

	../../images/logo.png
	
Use...

	/images/logo.png
	

	

## View within a View

Sometimes it can be handy to load Views within Views. For example, imagine you had a sign up form you wanted to be in multiple places on your site, but you didn't want to repeat yourself everywhere you wanted it.

Instead, you could put that sign up form in a little View fragment called, for example, `v_signup.php`. Then, you could pass that View to the main View:

	# Setup view		$this->template->content = View::instance('v_posts_index');		# View within a view		
		$this->template->content->signup = View::instance('v_signup');					# Render template		echo $this->template;
		
Then, in `v_posts_index.php` you'd print the sign up form just by printing the `$signup` variable:

	<?=$signup?>
	
