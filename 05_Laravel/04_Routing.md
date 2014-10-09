## Reference 

* <http://daylerees.com/codebright/basic-routing>
* <http://laravel.com/docs/routing>

---

Routes are declared using the `Route` facade in `app/routes.php`

Among other things, `Route` gives you access to HTTP requests:

1. get
2. post
3. put
4. delete

Here's an example route for the *foobooks* app:

```php
Route::get('/books', function() {
    return 'Here are all the books...';
}); 
```

The **first parameter** is a URI String that will trigger this route; in this case that's `/books`. 

I.e. if a user goes to `http://localhost/books` it will trigger this route.

The **second parameter** can be a *Closure* or a *Controller action*. We'll get to Controllers later, so for now we're passing a Closure (aka Anonymous function).

Whatever response is returned from the second parameter will be displayed in the browser.

>> Anonymous functions, also known as closures, allow the creation of functions which have no specified name. They are most useful as the value of callback parameters, but they have many other uses. ([src](http://us2.php.net/manual/en/functions.anonymous.php))

<img src='http://making-the-internet.s3.amazonaws.com/laravel-route-breakdown@2x.png' class='' style='max-width:861px; width:100%' alt='Route breakdown'>


## Route Paramaters

You can make route URI's more flexible with route parameters. These parameters act as placeholders that will detect patterns.

For example:

```php
Route::get('/books/{category}', function($category) {
	    return 'Here are all the books in the category of '.$category;
}); 
```

## Post example

You can have two routes with the same URI that react to different http methods.

```php
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
```




## Set up a practice route

In `/app/routes.php` define a practice route:

```php
Route::get('/practice', function() {
	
	echo 'Hello World!';
			
});
```

Load this route ala `http://localhost/practice` and make sure you see *Hello World* on the screen.

For now on, whenever these notes say *"try this in your testing route"* we mean running the code in this route closure.

For example, if we say:

>> Run `echo App::environment();` in your practice route to see how you can get Laravel to tell you what environment you're on.

...we're expecting you to do this:

```php
Route::get('/practice', function() {
	echo App::environment();
});
```




## Artisan routes

Artisan is a PHP command line tool that ships with Laravel and provides many shortcuts and utilities for working with your app.

For our first example of what Artisan can do, have it tell you what routes are set up in your application:

```bash
$ php artisan routes
```

Note: The `php artisan` command must always be run from *within* your application.




## Digging Deeper: Facades and reading the API

Laravel makes frequent use of Facades:

>> Facades provide a "static" interface to classes that are available in the application's IoC container. Laravel ships with many facades, and you have probably been using them without even knowing it! Laravel "facades" serve as "static proxies" to underlying classes in the IoC container, providing the benefit of a terse, expressive syntax while maintaining more testability and flexibility than traditional static methods. -[src](http://laravel.com/docs/facades#facade-class-reference)

[List of facades and their underlying class](http://laravel.com/docs/facades#facade-class-reference). 

For example:
`Route` is a Facade for the `Router` class. Once you know that, it makes finding information in the API docs easier.

[API: Router](http://devdocs.io/laravel/api/4.2/illuminate/routing/router) >
[API: Router get](http://devdocs.io/laravel/api/4.2/illuminate/routing/router#method_get)

<img src='http://making-the-internet.s3.amazonaws.com/laravel-route-get@2x.png' class='' style='max-width:716px; width:100%' alt='Route get'> 


