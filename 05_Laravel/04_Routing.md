## Reference 

* <http://daylerees.com/codebright/basic-routing>
* <http://laravel.com/docs/routing>

---

Routes are declared using the `Route` class in `app/routes.php`

There are four different methods you can call, which correspond to the 4 different types of HTTP requests:

1. get
2. post
3. put
4. delete
5. any (ok this is #5, but it's a catch-all)

Here's an example route for the foobooks app:

	Route::get('/books', function() {
	    return 'Here are all the books...';
	}); 

The **first parameter** specifies what URL will trigger this route; in this case that's `/books`. I.e if the user goes to `http://localhost/books` it will trigger this route.

The **second parameter** is a function which will specify what the app should do when this route is triggered.

In this example, we're passing a closure (aka *anonymous* function).




## Route Paramaters
You can expand on this example by making the URL more flexible with route parameters. These parameters act as placeholders that will detect patterns.

For example:

	Route::get('/books/{category}', function($category) {
		    return 'Here are all the books in the category of '.$category;
	}); 
	

## Post example

	Route::get('/new', function() {
		
		$view  = '<form method="POST">';
		$view .= 'Title: <input type="text" name="title">';
		$view .= '<input type="submit">';
		$view .= '</form>';
		return $view;
		
	});

	Route::post('/new', function() {
		
		$input =  Input::all();
		print_r($input);
		
	});


## Set up a practice route

In `/app/routes.php` define a practice route:

	Route::get('/practice', function() {
		
		echo 'Hello World!';
				
	});

Load this route ala `http://foobar.dev/practice` and make sure you see *Hello World* on the screen.

For now on, whenever these notes say *"try this in your testing route"* we mean running the code in this route closure.

For example, if we say:

>> Run `echo App::environment();` in your practice route to see how you can get Laravel to tell you what environment you're on.

...we're expecting you to do this:

	Route::get('/practice', function() {
		echo App::environment();
	});




## Artisan routes

Artisan is a PHP command line tool that ships with Laravel and provides many shortcuts and utilities for working with your app.

For our first example of what Artisan can do, have it tell you what routes are set up in your application:

	$ php artisan routes

Note: The artisan command must always be run from *within* your application.

