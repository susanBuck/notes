## Session management

In `app/config/session.php` change the `driver` to `database`

In `app/config/database.php` set the `default` database to be `mysql`

	'default' => 'mysql',

Create a table to store the session information:

	$ php artisan session:table

This creates a migration that will create the session table in the database.

Run the generated migration:

	$ php artisan migrate


## User model

Within your project's directory run the following Artisan command for a User model.

	$ php artisan migrate:make create_user_table
	
Check `app/database/migrations` for the resulting migration.

In the `up()` function, create your table.

In the `down()` function, drop your table.

First, preview your migration:

	php artisan migrate --pretend
	
Look good? Run your migration

	php artisan migrate
	

## Create user form

`/app/views/user_create.blade.php`:

	<form action='{{ url('user') }}' method='post'>
		
		First Name:<br>
		<input type='text' name='first_name' placeholder='First Name'>	
		
		<br><br>
		
		Last Name:<br>
		<input type='text' name='last_name' placeholder='Last Name'>	
		
		<br><br>
		
		Email<br>
		<input type='text' name='email' placeholder='Email'>
		
		<br><br>
		
		Password:<br>
		<input type='password' name='password' placeholder='Password'>		
		
		<br><br>
		
		<input type='submit' value='Create'>
	
	</form>
	
`app/routes.php`:

	Route::get('/user', function() 
	{
		return View::make('user_create');
	});
	

## Login


Pass  with('fail_message')

Fail  

	Redirect::back()->with('flash_message', 'Invalid credentials')->withInput;




## On success

	Auth::user->email();

## Logout

	Auth::logout();
	return Redirect::to('/');
	
## Lockdown

	before auth
	
	filters.php for defaults
	



## Seeding with test users

http://culttt.com/2013/12/16/seeding-laravel-4-database/

	php artisan db:seed


## Todo

[ ] remember_token
[ ] Duplicate User
[ ] CSR
[ ] Seed data
[ ] Route resource sessions   SessionsController.php

No username, just password


/app/views/sessions/create.blade.php

View::make('sessions.create')


@if(Session::get('flash_message'))


