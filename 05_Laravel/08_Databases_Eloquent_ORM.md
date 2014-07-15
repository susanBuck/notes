**This doc is Under Construction and will be completed before presented in lecture.**


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