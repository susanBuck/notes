## Migration drop with foreign key

See the `Drop()` method in `2014_07_22_064551_create_tables.php` migration



## Database Seeding

See `/app/database/DatabaseSeeder.php`

Run with `php artisan db:seed`

[Read more..](http://culttt.com/2013/12/16/seeding-laravel-4-database/)





## Deleting an entity in a many_to_many relationship

Scenario: *When deleting a Tag, you also want to delete any entries in the book_tag pivot table.*

One way to do this is via an [Eloquent Model Event](http://laravel.com/docs/eloquent#model-events)

Example in `TagController@destroy`





## Searching across multiple tables. 

Scenario: *You want to search for a term looking for a match in Books, Authors or Tags*

Example in `BookController@getIndex`

Done using [whereHas](http://devdocs.io/laravel/api/4.2/illuminate/database/eloquent/builder#method_whereHas)





## Mass assignment 

Done with `fill()`.

Example in `BookController@postEdit`

When using mass assignment, set `$guarded` in your Model to specify what fields should not be mass assigned:

```php
protected $guarded = array('id', 'created_at', 'updated_at');
```








## Model binding

Easy way to fill in a form.

Example in `tag_edit.blade.php`

When building forms you can pre-fill fields by passing the known value as the second param to your input:

```php
{{ Form::open(['method' => 'put', 'action' => ['TagController@update', $tag->id]]) }}
		
	{{ Form::text('name', $tag->name) }}
	
	{{ Form::submit('Update') }}
	
{{ Form::close() }}
```

If you have a bunch of fields, this gets tedious. An alternative is to bind the form to a Model. Instead of using `Form::open()` use `Form::model()`:

```php
{{ Form::model($tag, ['method' => 'put', 'action' => ['TagController@update', $tag->id]]) }}
		
	{{ Form::text('name') }}
	
	{{ Form::submit('Update') }}
	
{{ Form::close() }}
```

