## Laravel DebugBar

<https://packagist.org/packages/barryvdh/laravel-debugbar>

Add the appropriate require statement to your `composer.json` and run `composer update`

Add `'Barryvdh\Debugbar\ServiceProvider',` to the ServiceProvider array in `app/config/app.php`

Full instructions here: <https://github.com/barryvdh/laravel-debugbar>


## Migration drop with foreign key

```php
public function down() {

	Schema::table('books', function($table) {
		$table->dropForeign('books_author_id_foreign'); # table_fields_foreign
	});

	# Alternative: Here's the above but done with SQL:
	//DB::statement('ALTER TABLE `books` DROP FOREIGN KEY `books_author_id_foreign`');


	Schema::drop('books');
}
```

## Database Seeding

See `/app/database/seeds/`

Run with `php artisan db:seed`

[Read more..](http://culttt.com/2013/12/16/seeding-laravel-4-database/)





## Model Events: Deleting an entity in a many_to_many relationship

Scenario: *When deleting a Tag, you also want to delete any entries in the book_tag pivot table.*

One way to do this is via an [Eloquent Model Event](http://laravel.com/docs/eloquent#model-events)

Example in `TagController@destroy`





## Searching across multiple tables. 

Scenario: *You want to search for a term looking for a match in Books, Authors or Tags*

Example in `Book` model, `seach()` method.

Done using [whereHas](http://devdocs.io/laravel/api/4.2/illuminate/database/eloquent/builder#method_whereHas)





## Mass assignment 

Done with `fill()`.

Example in `BookController.php`, `postEdit()` method.

```php
$book->fill(Input::all());
$book->save();
```

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




