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