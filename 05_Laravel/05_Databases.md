## Live, Local, Testing Database

`app/config/local`, `app/config/testing` and `app/config/local` should each have a database.php file that fills in the correct connection information


## Build the database schema
Laravel migrations/schema builder

Navigate into your project directory and create your first migration:

	$ php artisan migrate:make add_images_table
	
Check `/app/database/migrations` for your new migration.

All migrations include `up()` and `down()` methods.
Tables and field names are written in `snake_case`.
Table names are plural.

Set up your up() and down() then run the migration

	$ php aritsan migrate
	


## Seeding

	php artisan db:seed



## Models

Eloquent ORM

Define relationships in Model


### Query structure

	Model::constraint()
			->constraint();
		->fetch();
		
Constraints are optional but all queries must begin with a model and end with a fetch method.

Fetch methods can get a single model instance or a Collection of model instances.	

### Eager loading

	$submissions = 
				Submission::where('user_id', '=', Auth::user()->id)
				->with('user') # Eager Loading
				->get();


### Collection methods

Choosing whether to perform a query on a collection or on the database

Shifting query responsibilities to the collection