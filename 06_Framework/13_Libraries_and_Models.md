This framework comes with several libraries (i.e. classes) which you'll find in `/core/libraries/`:

Class | Static or Inst. | Purpose 
------------ | ------------ | ------------ | 
DB_Test | Instantiated | Demonstration of Unit Testing
DB | Static | Manages connections and interactions with databases
Debug | Static | Pretty-printing debugging; includes a wrapper for [krumo.sourceforge.net](http://krumo.sourceforge.net)
Email | Static | Easy SMTP, HTML email sending. Wrapper for [PHPMailer](https://code.google.com/a/apache-extras.org/p/phpmailer/)
File  | Static |File and path utilities; assists with autoloading, Routing and Views.
Form  | Instantiated | HTML Form generation
Geolocate | Static | IP Lookup and geolocation ala [geoplugin.net](http://geoplugin.net)
Image | Instantiated |Various image manipulation utilities
Log | Instantiated | Write logs to the server
Router | Static | Maps URLs to controllers and methods
Time | Static | Time utilities such as display, time ago, etc.
Upload | Static | Facilitates uploading files to your server
User | Instantiated | User Model covering login, logout, authentication, etc.
Utils | Static | Mixed bag utiliites
View | Static | Create Views; variables can be assigned with the View object and referenced locally within views

You can skim through the library files to get a better sense of what their jobs entail and how they can be used.

## Auto-loading libraries
In pick-up PHP when you want to use a function or method in another PHP file like these libraries, you would have to include that PHP file in your script like so:

	require_once(DOC_ROOT."/core/libraries/DB.php");

If you've ever worked this way, you know it can be a hassle because you have to keep track of what methods your application is calling and make sure the necessary classes are loaded. You also have to make sure you aren't unncessarily loading classes which would be a performance drag.

With a framework, life is improved with a technique called [autoloading](http://php.net/manual/en/language.oop5.autoload.php). With autoloading, when you call on a particlar class, it will automatically load the necessary class file (and if the file was already loaded, it won't do it again).

This means, in any controller or view, you can just call upon one of the libraries and it will work. To tes this out, in `c_index.php:index()`, call upon the Time library: 


	public function index() {
	
		# Get and print the current timestamp
		echo Time::now();
	
	}

Note: You'll learn more about how autoloading is set up in this framework in the upcoming doc, *Cascading file system*.


## Static vs. Instantiated Classes

There are two ways you can call a method from a class:

### 1) Static
If a method in a library contains the word `static` in front of it, it means you can call that method statically (i.e. you don't have to instantiate an object of that class in order to use it.)

To statically call a method, you use the name of the class followed by [double colons](http://www.php.net/manual/en/language.oop5.paamayim-nekudotayim.php), followed by the method name (plus any parameters if needed).

You saw this in action in the last example:

	echo Time::now();

You also saw this in the *Routing Controllers Methods* section when the `init()` method of the Router class was called:

	Router::init();

If you opened Router.php and looked at the `init()` method you could see it was declared as `public static`, which allows it to be called statically:

	public static function init() {
	
			// find URI
			$uri = self::uri();
									
			// remove query string from URI
			if (($query = strpos($uri, '?')) !== FALSE) {
			
			[... etc. ...]
	}
	

### 2) Instantiated
If methods aren't labeled as static, it means you need to instantiate an Object of that Class in order to use it.

Example:

	# Instantiate User obj
		$userObj = new User();
				
	# Authenticate
		$userObj->authenticate();


### Why the difference?
Static methods are good &ldquo;once off&rdquo; methods. Utils.php is a great example of a lot of once off methods where you need to perform some isolated action, where the methods and data aren't necessarily related. 

Instantiated methods are useful when you have a well defined Object, such as the case with User. Part of the usefulness comes from the fact that each Object will have it&apos;s own set of properties. If you were using User statically, you'd have to pass in those properties each time, but when you create an Object the properties are stored.


## Creating your own libraries
As you start working, you will find that just as the framework benefits from shared classes, so will your application.

You can create your own application specific libraries by following these rules:

* Store all application specific libraries in your application's library folder `/app/libraries/` (create this directory if it doesn't already exist).
* The class name should match its file name (ex: The `Image` class is in the `Image.php` file).
* Capitalize class names.

Example: If you were building an education application, you might have a need for a Quiz Class, so you'd create something like this:

`/app/libraries/Quiz.php`:

	class Quiz {
		
		public function __construct() {
		
		}
		
		public function get_question() {
					
		}
		
		public function get_hint() {
		
		}
		
		public function check_answers() {
					
		}
	
	}

## Models
You can also use library classes as Models to manage data. Models make up the M of the MVC (Model View Controller) structure.

Often, Model classes in web-based MVC frameworks are a representation of a database table. Attributes are the table columns, and methods are operations that can be done with the table data. The Model, in essence, tells you what methods are available&mdash; what can you do to the data in the database. 

If you look in the core libraries, you'll see a User lib that can act as a Model for any User data related interactions. 

In the following notes, we'll actually be recreating the work of the User lib directly in the Controllers as we build our Sign up, Log in and Log out features. In short, we'll be doing some work that is already baked into the framework for you. The reason we're doing this is because the experience of building user functionality is a classic way to learn about database interactions, encryptions, forms, and many other topics we need to cover.

When all is said and done, you may wish to use the User lib in place of the commands you'll be creating in your user Controller. 

There's a saying in MVC development: &ldquo;*fat models, skinny controllers*.&rdquo; The idea here is that the majority of your business logic should be outsourced to a Model, while Controllers are in charge of orchestrating the data between the Model and View.

<!-- http://mathayi.wordpress.com/2009/01/19/mvc-architecture-in-php-development/ -->
