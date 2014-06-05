## Set up a practice route

In `/app/routes.php` define a practice route:

```
Route::get('/practice', function() {
	
	echo 'Hello World!';
			
});

```

Load this route ala http://foobar.dev/practice and make sure you see *Hello World* on the screen.

For now on, whenever we say *"try this in your testing route"* we mean running the code in this route closure.

For example, if we say:

>> Run `echo App::environment();` in your practice route to see how you can get Laravel to tell you what environment you're on.

...we're expecting you to do this:

```
Route::get('/practice', function() {
		
	echo App::environment();
				
});
```




	php artisan routes

Named route:

	Redirect::route('login')
	
	
Route::post('/login', array
	(
	'as' => 'login',
	function() {
	
		$credentials = Input::only('username','password');
		if(Auth::attempt($credentials)) {
			return Redirect::intended('/');
		}
		
		return Redirect::route('login')
	            ->with('foo','bar');
	
	}
	));
	
## Passing data

Sessions, Flash messages, Input