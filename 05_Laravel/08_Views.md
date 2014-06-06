Laravel uses the [Blade templating language](http://laravel.com/docs/templates#blade-templating).

Name files with a `.blade.php` extension.

Create a master template/layout file, for example `/app/views/master.blade.php`:

	<!DOCTYPE html>
	<html>
	<head>

		<title>@yield('title', 'My Web Site');</title>
		
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

Now, let's create a view that will *extend* (i.e. use) this layout.
	
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
	

## Organizing View files
