## Reference

+ <http://laravel.com/docs/controllers>
+ <http://daylerees.com/codebright/controllers>
+ <http://culttt.com/2013/07/01/setting-up-your-first-laravel-4-controller/>

## What are Controllers?

+ Controllers make up the **C** of the **MVC** structure; they take care of all the logic of your application, acting as the glue between the request, the Model and the resulting View (or data).

+ For tiny applications it's convenient to throw all your logic into closures in your routes. As things grow, however, this becomes messy and hard to test.

+ Controllers offer a way to organize your routing logic.



## Structure 

+ Put controller files `/app/controllers/`. This directory is classmap file loaded in `composer.json`, so anything you put here will be readily available.

+ You can call the class whatever you want, but it's a convention to suffix it with `Controller` (ex: `BookController`).

+ Your controller class should extend Laravel's `BaseController`, which also exists in `/app/controllers/`. This is where you can put common logic shared by all your controllers.

+ Within your Controller class you'll have public methods which represent the **actions** of your Controller.

+ A `__construct()` method can be used to house logic that needs to happen before any of the other actions in the Controller.

+ One naming convention for your actions is to prefix with the HTTP verb (ex, `getSignup()` and `postSignup()`).


```php
<?php

class UserController extends BaseController {
	
	
	public function __construct() {
		# Put anything here that should happen before any of the other actions
	}
	
	# This is an action...
	public function getSignup() {
		
		
	}
	
	# This is an action...
	public function postSignup() {
		
		
	}
	
	# This is an action...
	public function getLogin() {
		
		
	}
	
	# This is an action...
	public function postLogin() {
		
		
	}
		
}
```

Here's how you point a route to a controller:

```php
Route::get('/login', 'UserController@getLogin');
```

Note how the controller (`UserController`) and the action (`getLogin`) is separated with an `@` sign.

If you want to include filters in your controller routes, you'd write them like this:

```php
Route::get('/login', 
	array(
		'before' => 'guest', 
		'uses' => 'UserController@getLogin'
		)
);
```

Alternatively, you can set up filters in the Controller's `__construct()` method...

```php
class UserController extends BaseController {

	public function __construct() {
		$this->beforeFilter('guest', 
			array('only' => array('getLogin')));	
    } 

	[...]
}
```

This can be useful if, for example, you want all routes submitted via POST to have the `csrf` before filter...

```php
class UserController extends BaseController {

	public function __construct() {
		$this->beforeFilter('csrf', array('on' => 'post'));
	}
	
	[...]
}
```

Or maybe you just want all actions in a Controller to require authentication:

```php
class UserController extends BaseController {

	public function __construct() {
		$this->beforeFilter('auth');
	}
	
	[...]
}
```
	


## Implicit routing

Using the `Route::controller` method, it's possible to define a single route that will handle every action in a controller.

```php
Route::controller('user', 'UserController');
```

Then, your Controller would look like this:

```php
class UserController extends BaseController {

	# GET: http://localhost/user
	public function getIndex() {
		
	}
	
	# GET: http://localhost/user/signup
	public function getSignup() {
	
	}
	
	# POST: http://localhost/user/signup
	public function postSignup {
	
	}
	
	# GET: http://localhost/user/login
	public function getLogin() {
	
	}
	
	# POST: http://localhost/user/login
	public function postLogin() {
	
	}
	
	# ANY: http://localhost/user/logout
	public function anyLogout() {
	
	}
	
	# GET: http://localhost/user/generate-new-password
	public function getGenerateNewPassword() {
	
	}
	
}
```

Notes:

+ Each action is prefixed with the HTTP verb (`get,` `post` or `any`). In our first Controller example this was a suggested convention, but for implicit routing, it's required.

+ Each action is written in camelCase, which is also required.

+ For actions with multiple words, dash-syntax on the URL will be translated to camelCase in the action (look at `getGenerateNewPassword` above for an example of this).


## Resource Controllers / REST

**REpresentational State Transfer (REST)** is a software design pattern commonly used by web applications.

There are lots of fancy explanations for REST, but really it comes down to this: 

Every application has certain *things* that you'll want to perform CRUD operations on. For example, in Foobooks, one of our
*things* is a Tag. Within our application we'll want to *Create tags*, *Update tags*, *Read tags* and *Delete tags*.

REST is a **convention for formatting the URLs** that will perform these operations.

### REST Expectations:

+ Your application will have a standard set of URLs to perform basic CRUD operations on a **Resource** (i.e. a *thing*).

+ A Resource is some entity of your application, for example a User or a Tag. 

+ Every Resource has a unique ID.


### REST Example 
For an example, let's build a RESTful interface for a Tag resource in the Foobooks application.

To start, you can have Artisan generate your Tag controller for you:

```bash
php artisan controller:make TagController
```

If you open the resulting `TagController.php` you should see the following 7 methods:

+ `index()`
+ `create()`
+ `store()`
+ `show($id)`
+ `edit($id)`
+ `update($id)`
+ `destroy($id)`

Every RESTful controller should have these 7 methods to manage your basic CRUD operations.

According to REST conventions, your Routes would be defined like this:

```php
Route::get('/tag', 'TagController@index');
Route::get('/tag/create', 'TagController@create');
Route::post('/tag', 'TagController@store');
Route::get('/tag/{tag_id}', 'TagController@show');
Route::get('/tag/{tag_id}/edit', 'TagController@edit');
Route::put('/tag/{tag_id}', 'TagController@update');
Route::delete('/tag/{tag_id}', 'TagController@destroy');
```

[You can see a table of these routes in the Laravel docs](http://laravel.com/docs/controllers#resource-controllers)

Note how some of the URI's are the same; this is okay because they use different HTTP requests.

You could explicitly define all of your REST routes like above, *or* you can do it all in one shot with Route's `resource()` method:

```php
Route::resource('tag', 'TagController');
```

### HTTP methods other than GET and POST

HTML Forms only support GET and POST methods by default, but Laravel works around this by &ldquo;spoofing&rdquo; the `PUT` and `DELETE` methods. This is done by injecting a hidden field `_method` with your forms.

For example, this Form with the method `put`....

```php
{{ Form::model($tag, ['method' => 'put', 'action' => ['TagController@update', $tag->id]]) }}
			
	{{ Form::text('name') }}
	
	{{ Form::submit('Update') }}
	
{{ Form::close() }}
```

Will include this hidden field...

```html
<input name="_method" type="hidden" value="PUT">
```

### Destroy
Accessing the destroy action is a little funny, because in most cases you just want to link to it. You can't force a link to process via a method other than HTTP's GET.

```html
<!-- This will only ever use the GET method; how do we get it to use the DELETE method? -->
<a href='/tag/{{ $tag->id }}'>Delete</a>
```

To get around this, you'll have to create a mini-form with the DELETE method. Inside the form, you can embed a link that will submit the form (shown here with inline JS for simplicty):

```php
{{ Form::open(['method' => 'DELETE', 'action' => ['TagController@destroy', $tag->id]]) }}
	<a href='javascript:void(0)' onClick='parentNode.submit();return false;'>Delete</a>
{{ Form::close() }}
```

