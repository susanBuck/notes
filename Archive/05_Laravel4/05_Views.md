## Reference 

* <http://daylerees.com/codebright/blade>
* <http://laravel.com/docs/responses>
* <http://laravel.com/docs/templates>

---

## Organizing Views / View Inheritance

<img src='http://making-the-internet.s3.amazonaws.com/laravel-view-inheritance@2x.png' class='' style='max-width:742px; width:100%' alt=''>

+ Laravel uses the [Blade templating language](http://laravel.com/docs/templates#blade-templating).
+ Views live in `/app/views/`.
+ Files end with the `.blade.php` extension.
+ Divide your Views into master templates and child views.
+ `@section('foobar') ... @stop` is used to define sections in your child views.
+ `@yield('foobar')` is in the master templates to output sections defined in the child views

Example of a master template:

```php
<!DOCTYPE html>
<html>
<head>

	<title>@yield('title', 'My Web Site')</title>
	
	<meta charset='utf-8'>
	<link rel='stylesheet' href='{{ asset('css/foobar.css') }}'>
	
	@yield('head')

</head>
<body>


	@yield('content')
	
	<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js' type='text/javascript'></script>
	
	@yield('footer')
	
</body>
</html>
```

Example of a view which extends this master template:

```php	
@extends('master')

@section('title')
	Hello World
@stop

@section('head')
	<link rel='stylesheet' href='/css/hello-world.css' type='text/css'>
@stop

@section('content')
	<h1>Welcome!</h1>
@stop

@section('footer')
	<script src="/js/hello-world.js"></script>
@stop
```



## Returning / Passing Data to Views

Use the `with` method to pass data to a view:

```php
Route('/profile/{user_id}', function($user_id) {

	$user = User::get($user_id);

	return View::make('profile')
		->with('user', $user);

});
```

Then, in the View, you have access to that data:

```php
Hello {{ $user['name'] }}!
```


	
## Blade

Output any PHP using double curly brackets

```php
<h1>Hello {{ $name! }}</h1>
```
	
If you're outputting data that was entered by a user, use triple curly brackets to escape any nefarious-XSS characters:

```php
<h1>Hello {{{ $name! }}}</h1>
```
	
You can use PHP control structures in Blade; just prefix with a `@`. No semi-colons or colons required.

For example, an *if statement*:

```php
@if(isset($name))
	<h1>Hello {{{ $name! }}}</h1>	
@endif
```

And a *foreach statement*:

```php	
@foreach($users as $key => $value) 
	{{ $key }} : {{ $value }}
@endforeach;	
```



## Assets

The `URL` method `asset()` can help generate URLs to static site assets such as images, CSS files, or JS files.

For example, loading CSS:

```php
<link rel="stylesheet" href="{{ URL::asset('styles/master.css') }}" type="text/css">
```
	
Loading an image:

```php
<img src=' {{ URL::asset('images/logo.png') }} ' alt='Company Logo'>
```
