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

**Before proceeding, if you still have a `books` table from the Databases Primer note set, go ahead and delete that table since we'll be creating it using Migrations.**


## Generate a new migration

First, let's have Artisan generate a new migration file:

```bash
$ php artisan migrate:make create_books_table
```

The migration name (`create_books_table`) should reflect what you're doing. In this example we're creating a table called `books`.

Naming conventions:

+ Tables and field names are written in `snake_case`.
+ Table names are plural.

The `migrate:make` command will generate a new file in `/app/database/migrations/` and the filename will look something like this: `2014_07_17_022948_create_books_table.php`.

Note the generated filename is prefixed with a unique timestamp. This ensures migrations are run in the same order in which they were created.

Open up your newly generated migration, and you should see something like this:

```php
<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBooksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {

	}
}
```

Every generated migration has this boilerplate code with a `up()` and `down()` method.

In the `up()` method you'll describe some change to the database (adding a new table, adding fields to a table, etc.), and in the `down()` method you'll reverse any changes made in the `up()` method.




## Design the books table

Before writing any code in the `up()` method, we have to decide what fields the table will need, and what MySQL data type each field in the table should be.

To do this, we looked at the existing `books.json` data and mapped the book parameters to the appropriate MySQL field type.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-books-table-design@2x.png' class='' style='max-width:783px; width:100%' alt=''>

To understand the MySQL data types we chose for each field, [refer to this table](https://github.com/susanBuck/notes/blob/master/05_Laravel/08_Databases_MySQL_Data_Types.md).

With the `books` table design in mind, it's time to write the Schema building code.





## up() - Build the table

Here's an example of a `up()` method to create the `books` table:

```php
public function up() {

	Schema::create('books', function($table) {

		# Increments method will make a Primary, Auto-Incrementing field.
		# Most tables start off this way
		$table->increments('id');

		# This generates two columns: `created_at` and `updated_at` to
		# keep track of changes to a row
		$table->timestamps();

		# The rest of the fields...
		$table->string('title');
		$table->string('author');
		$table->integer('published');
		$table->string('cover');
		$table->string('purchase_link');

		# FYI: We're skipping the 'tags' field for now; more on that later.

	});
}
```

Note how the Laravel `Schema` component is used to create the `books` table.

We've commented the `Schema` methods we're using, but be sure to read the [Schema Documentation](http://laravel.com/docs/schema) for full details.




## down() - Drop the table

The &ldquo;undo&rdquo; action for creating a new table is really simple&mdash; just drop the table:

```php
Schema::drop('books');
```




## Run your migrations

When you've completed writing the code for your migration, you'll use Artisan to run it:

```bash
$ php artisan migrate
```

FYI: The first time you do this it will create a `migrations` table which will be used to keep track of what migrations you've run.

That should do the trick. Examine your new `books` table in phpMyAdmin or MySQL Command Line to make sure it matches the design you were aiming for.




## Recap

<img src='http://making-the-internet.s3.amazonaws.com/laravel-migration-summary@2x.png' class='' style='max-width:1041px; width:100%' alt=''>

For a full list of Artisan commands (including migration related commands):

```bash
$ php artisan list
```



## Altering tables

Any alterations to an existing table should be done in a new migration. 

For example, let's imagine you wanted to add a `page_count` field to the books table. Start with a new migration:

```bash
$ php artisan migrate:make add_page_count_field_to_books_table
```

Edit the resulting migration:

Up...

```php
Schema::table('books',function($table) {
		$table->integer('page_count');
});
```

Down...

```php
Schema::table('books', function($table) {
	$table->dropColumn('page_count');
}
```

Run it:

```bash
$ php artisan migrate
```

Note how Artisan only runs this latest migration. 
Any time you call `artisan migrate` it will only run migrations that have not already been run.



## Refresh

The artisan command to reset and re-run all migrations looks like this:

```bash
$ php artisan migrate:refresh
```


## Starting over / Your first migrations

Getting your migration code right the first time can be challenging, especially if you're starting a new project with a whole bunch of new tables. When starting with a brand new app, it's okay to bend the rules and rebuild and rerun an existing migration to get your tables right.

For example, in the case above when we forgot the `published` field, rather than creating a new migration, it would have been nice to add the field to the original migration that created the table. Then, you could run `php artisan migrate:refresh` to reset and re-run all migrations. 

`migrate:refresh` is great, but it assumes all your `down()` functions are written perfectly, and it also assumes you haven't had any migrations abort part-way through because of some issue. These assumptions aren't always correct, especially when you're first writing migrations and building a lot of tables. 

Given this, if you ever want to do a for-real &ldquo;start over&rdquo; you should manually delete *all* your tables (including the `migrations` table) using phpMyAdmin or some database tool. This will ensure you can run your migration with an absolute fresh start.

At this point, this work-around is acceptable because you're the only one running your migrations since the project hasn't been shared with anyone. It's only once your project has been shared with teammates/other servers that you obviously can't just start over, and you'll want to make sure even granular changes done a migration at a time. 
