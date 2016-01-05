Primer: [Ajax 101 (Not framework specific)](https://github.com/susanBuck/notes/blob/master/03_JavaScript/06_Ajax.md)

JavaScript powers the interaction that happens on your site after your pages have been loaded. In learning Laravel our focus has been on the server end of things, but let's look at two important examples of how your server code can interact with your client code (i.e. JavaScript).

The first example will show how to make an Ajax call to fetch data after a page has been loaded.

The second example will look at how to pass data from Laravel/the server to JavaScript on an initial page load.





## Ajax

Ajax is short for *Asynchronous JavaScript XML* and it's a technique for passing data back and forth between the browser and server, after a page has already been loaded in the browser.

Getting your Laravel application to work with Ajax is not that different from Ajax in any other framework. The process can be summarized by these three steps:

1. JavaScript triggers an Ajax call to one of your routes.
2. Your route responds with data (in the form of JSON or even a HTML View).
3. JavaScript receives the response and injects it into the page.

For an example, we're going to build a dedicated search feature into *Foobooks* that's powered by Ajax.

To start, we'll need two new routes:
```php
Route::get('/book/search', 'BookController@getSearch');   # Display the search
Route::post('/book/search', 'BookController@postSearch'); # Process the search
```

The GET `/book/search` route is straightforward&mdash; it displays a View with the inputs for performing the search:

```php
public function getSearch() {
	return View::make('book_search');	
}
```

In the `book_search.blade.php` View, we built a text input for the query and two buttons. 

```php
@section('content')

	<h1>Search (with Ajax!)</h1>

	<label for='query'>Search:</label>
	<input type='text' id='query' name='query' value='novel'><br><br>

	{{ Form::token() }}
	
	<button id='search-json'>Search and get JSON back</button><br><br>
	<button id='search-html'>Search and get HTML back</button>
	
	<div id='results'></div>

@stop
```

There's no need for a `<form>` tag here because we're not actually submitting the form as we traditionally would. Instead, we'll write JavaScript to work with the inputs. 

Despite not needing a full `<form>` though, we still need to include the CSRF prevention token.

At the bottom of `book_search.blade.php` we added a new Blade section:

```php
@section('/body')
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="/js/search.js"></script>
@stop
```

Note that this section `/body` is yielded in the the master layout right before the closing `</body>` tag. This is generally the ideal spot for JavaScript code.

In the above `/body` section code, we included two JavaScript files: jQuery and a `search.js` file that will house our JavaScript code.

Here's the contents of `/public/js/search.js`:

```js
// Demo 1) Getting JSON data as a result and letting JS decide where to put the data on the page
$('#search-json').click(function() {
	$.ajax({
		type: 'POST',
		url: '/book/search',
		success: function(response) { 
			
			// Clear the results from the last query
			$('#results').html('');
			
			// Parse through the response
			$.each(response, function( index, value ) {
				var author = response[index]['author']['name'];
				var title  = response[index]['title'];
				$('#results').append(title + ' by ' + author + '<br><br>');
			});
		
		},
		data: {
			format: 'json',
		    query: $('input[name=query]').val(),
		    _token: $('input[name=_token]').val(),
		},
	}); 
});


// Demo 2) Getting HTML/A View as a result and just throwing it in to the response div
$('#search-html').click(function() {
	$.ajax({
		type: 'POST',
		url: '/book/search',
		success: function(response) { 
			$('#results').html(response);
		},
		data: {
			format: 'html',
		    query: $('input[name=query]').val(),
		    _token: $('input[name=_token]').val(),
		},
	}); 
});
```

What you see above is some standard JavaScript/jQuery code for making an Ajax call. Covering in full detail what this code is doing is beyond the scope of this document&mdash; if these technologies are new to you you'll have to skim over the code for the general idea.

Here's the gist:

We've got two buttons on our page, one with the id `#search-json` and one with the id `#search-html`. 

Each button has been wired to trigger an ajax call via POST to the url `/book/search/`; as part of that call it passes two pieces of data:

1. `format` (`json` or `html`)
2. `query` (whatever the user typed into the input)
3. `_token` (the hidden CSRF token field)

This is where Laravel steps in because your `/book/search` route should be programmed to receive this POST call and return the appropriate results.

That looks like this:

```php
# /app/controllers/BookController.php

/**
* Demonstration of Ajax
* http://localhost/book/search
*/
public function postSearch() {
	
	if(Request::ajax()) {
	
		$query  = Input::get('query');
		
		# We're demoing two possible return formats: JSON or HTML
		$format = Input::get('format');

		# Do the actual query
        $books  = Book::search($query);
        
        # If the request is for JSON, just send the books back as JSON
        if($format == 'json') {
	        return Response::json($books);
        }
        # Otherwise, loop through the results building the HTML View we'll return
        elseif($format == 'html') {
        
	        $results = '';	        
			foreach($books as $book) {
				# Created a "stub" of a view called book_search_result.php; all it is is a stub of code to display a book
				# For each book, we'll add a new stub to the results
				$results .= View::make('book_search_result')->with('book', $book)->render();   
			}
        
			# Return the HTML/View to JavaScript...
			return $results;
		}
	}
}
```

As you can see, if there's a POST call to `/book/search` a search against the given query will be run and the results will be returned either as a JSON string or a HTML View (depending on what was requested).

Once the route has returned this data, the ball is back in the hands of JavaScript... Scroll back up to the JavaScript code and read what happens in the code that follows the `success: function(response) {` line. What you'll see is JavaScript accepting the response and doing one of two things:

1. In the case of JSON it parses the results and injects it into the page
2. In the case of HTML it just takes the results as given and injects it into the page

Note that the HTML version is using a &ldquo;view stub&rdquo; `book_search_result.php` to generate each book:

The content of that stub might look like this:

```php
<section>
	<img class='cover' src='{{ $book['cover'] }}'>
	
	<h2>{{ $book['title'] }}</h2>
	
	<p>			
	{{ $book['author']->name }} {{ $book['published'] }}
	</p>

	<p>
		@foreach($book['tags'] as $tag) 
			{{ $tag->name }}
		@endforeach
	</p>
	
	<a href='{{ $book['cover'] }}'>Purchase this book...</a>
	<br>
	<a href='/book/edit/{{ $book->id }}'>Edit</a>
</section>
```



## Passing data to JavaScript

Reference: <https://github.com/laracasts/PHP-Vars-To-Js-Transformer>

In the Ajax example, data was passed between the server *after* the page load using Ajax. But how can Laravel pass information and data to JavaScript on the initial page load?

Perhaps more importantly, why might you want to do this?

Here's a scenario:
You're building an online store and you want to offer a 20% off discount to new users (i.e. users who have signed up in the last 7 days). You don't want the discount to be offered until after they've been browsing the site for at least 15 minutes. In short, the discount should act as an enticement for the hesitant shopper.

To build this functionality, you'll want to trigger a JavaScript function to start a counter on page load. After 15 minutes, JavaScript should display a banner on the page giving them a 20% off coupon code.

In order for JavaScript to know to do this, it has to know that it's dealing with a user that has signed up in the last 7 days. This is information that is stored in the database and thus not readily available to the client/JavaScript without assistance on the server.

Given this, we need some way to pass information from the server to JavaScript. Fortunately, there's a package that can help make this process super simple...

### Setup

We're going to utilize [Jeffery Way's `laracasts/utilities` package](https://packagist.org/packages/laracasts/utilities):

>> *Often, you'll find yourself in situations, where you want to pass some server-side string/array/collection/whatever to your JavaScript. Traditionally, this can be a bit of a pain&emdash; especially as your app grows.*

>> *This package simplifies the process drastically. -Jeffery*

Update your `composer.json` file to include this dependency:

```php
"laracasts/utilities": "~1.0"
```

Run `composer update` to download the dependency.
	
Then, at the end of the `providers` array in `app/config/app.php` add this:

```php
'Laracasts\Utilities\UtilitiesServiceProvider',
```

Next, generate a config file for this package:

```bash
$ php artisan config:publish laracasts/utilities
```
	
This generates the file `app/config/packages/laracasts/utilities/config.php`. 

Open this file up and you'll see two configuration options.

The first configuration, `bind_js_vars_to_this_view`, specifies which view the JavaScript variables should be binded to. Binding to your master template is a good idea because then the variables will be available to any view that extends the master template.

Given that, we changed the default view from `hello` to `_master` (the name of our master template):

```php
<?php
# app/config/packages/laracasts/utilities/config.php
return [

    /*
    |--------------------------------------------------------------------------
    | View to Bind JavaScript Vars To
    |--------------------------------------------------------------------------
    |
    | Set this value to the name of the view (or partial) that
    | you want to prepend the JavaScript variables to.
    |
    */
    'bind_js_vars_to_this_view' => '_master',

[...]
````	
	   
### Usage

With the package set up, you can start passing variables from routes/actions to JavaScript using this syntax:

```php
JavaScript::put(['foo' => 'bar'])
```

As an example, here's a Controller action that will bind two JS variables (`foo` and `email`):

```php
public function jsVars() {
	
	# Bind a variable called 'foo'
	JavaScript::put(['foo' => 'bar']);
	
	# Bind a variable called 'email'
	JavaScript::put(['email' => Auth::user()->email]);
	
	return View::make('demo_jsVars');
	
}
```

And here's the View which uses the variables...

```php
@extends('_master')

@section('title')
	Demo of binding JS variables to a view
@stop

@section('content')

	<button id='ex1'>Get the 'foo' var</button>
	<button id='ex2'>Get the 'email' var</button>

@stop

@section('/body')
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	
	<script>
		$('#ex1').click(function() {
			alert('The value of `foo` is ' + foo);
		});
		
		$('#ex2').click(function() {
			alert('The value of `email` is ' + email);
		});
	</script>
@stop
```


	

	
