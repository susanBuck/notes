Reference:

+ <http://laravel.com/docs/schema>
+ <http://laravel.com/docs/migrations>
+ <http://daylerees.com/codebright/schema>
+ <http://daylerees.com/codebright/migrations>
+ <http://laravel.com/docs/artisan>
	
---

With your app's database created and your connection to that database confirmed, it's time to build your tables.

Rather than building tables with raw SQL queries, or using a MySQL GUI like phpMyAdmin, we'll use **Laravel Migrations**.

Migrations are PHP scripts that describe alterations to your database - whether it be adding tables, dropping tables, adding new columns to tables, etc.

The benefit of working with your database this way is your migrations scripts can be saved in version control.

Laravel's command line utility, Artisan, will help you take care of migration tasks.

First, let's create a new migration:

	$ php artisan migrate:make create_books
	
The migration name (`create_books`) should reflect what you're doing.

Naming conventions:

+ Tables and field names are written in `snake_case`.
+ Table names are plural.

This command will generate a new file in `/app/database/migrations/`. 

Note it has a unique timestamp. This insures migrations are run in the same order in which they were created.

Open it up. Every migration has some boilerplate code with a `up()` and `down()` method. Whatever goes up must come down.


Up....

	Schema::create('books', function($table) {

		$table->increments('id');
		$table->timestamps();
		$table->string('title');
		$table->string('author');
		$table->string('cover');
		$table->string('purchase_link');

	});

Down....

	Schema::drop('books');

Run your migrations:

	$ php artisan migrate

The first time you do this it will create a `migrations` table.

Revert all migrations and then run again:

	$ php artisan migrate:refresh

Rollback one migration at a time:

	$ php artisan migrate:rollback

Rollback all migrations:	

	$ php artisan migrate:reset

For a full list of artisan commands:

	$ php artisan list


## Altering tables

Any alterations to an existing table should be done in a new migration. 

Let's add a `published` field to the existing `books` table. Create a new migration:

	$ php artisan migrate:make add_published_to_books

Edit the resulting migration:

Up...

	Schema::table('books',function($table) {
			$table->integer('published');
	});
	
Down...

	$table->dropColumn('published');

Run it:

	$ php artisan migrate 
	
Note how it only runs the migration that hasn't been run.

