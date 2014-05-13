Basics of Blade templating language

Making a view

Passing data to the view

Setting the `<title>`



	
	@extends('master')
	
	@section('head')
	
	@stop
	
	@section('content')
	
		Foobar
	
	@stop
