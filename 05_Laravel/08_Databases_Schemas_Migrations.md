Reference:

+ <http://laravel.com/docs/schema>
+ <http://laravel.com/docs/migrations>
+ <http://daylerees.com/codebright/schema>
+ <http://daylerees.com/codebright/migrations>
+ <http://laravel.com/docs/artisan>

---

<img src='http://making-the-internet.s3.amazonaws.com/laravel-migration-summary@2x.png' class='' style='max-width:903px; width:100%' alt=''>

With your app's database created and your connection to that database confirmed, it's time to build your tables.

Rather than building tables with raw SQL queries, or using a MySQL GUI like phpMyAdmin, we'll use **Laravel Migrations**.

Migrations are PHP scripts that describe alterations to your database - whether it be adding tables, dropping tables, adding new columns to tables, etc.

The benefit of working with your database this way is your migrations scripts can be saved in version control.

Laravel's command line utility, Artisan, will help you take care of migration tasks.




## Generate a new migration

First, let's have Artisan generate a new migration file:

	$ php artisan migrate:make create_books_table

The migration name (`create_books_table`) should reflect what you're doing. In this example we're creating a table called `books`.

Naming conventions:

+ Tables and field names are written in `snake_case`.
+ Table names are plural.

The `migrate:make` command will generate a new file in `/app/database/migrations/` and the filename will look something like this: `2014_07_17_022948_create_books_table.php`.

Note the generated filename is prefixed with a unique timestamp. This insures migrations are run in the same order in which they were created.

Open up your newly generated migration, and you should see something like this:

```lang-php
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

<img src='http://making-the-internet.s3.amazonaws.com/laravel-books-table-design@2x.png' class='' style='max-width:983px; width:100%' alt=''>

To understand the MySQL data types we chose for each field, refer to this table:

### Text

| MySQL Data Type | Description | Range | Example | Laravel Equivalent
|---	|---	|--- |--- |---
| `CHAR(size)` | *Fixed* length String. | 0-255 | US State | `char('state', 2)` |
| `VARCHAR(size)` | *Variable* length String. |0-255| Email address | `string('email')`
| `TEXT` | Variable length String; can store up to 2GB of text data. | 0 - 65535 | Blog post | `text('post')`

### Numbers


| MySQL Data Type |  Description  | Range | Example | Laravel Equivalent
|---	|---	|---	|---	|---
| `INT` | Whole number. | -2147­483648 to 214748­3647 | Page count | `integer('page_count')` |
| `FLOAT` | A small decimal number. | 7 Digits | Scientific calculations | `float('distance')`
| `DOUBLE` | A large decimal number. | 15-16 Digits | Scientific calculations |`double('distance')`
| `DECIMAL` | A DOUBLE stored as a string, allowing for a fixed decimal point. | 28-29 Significant digits | Money | `decimal('bank_balance')`


### Misc
| MySQL Data Type | Description | Range | Example | Laravel Equivalent
|---	|---	|--- |--- |---
| `BOOLEAN` | Alias for TINYINT(1) | TINYINT(1) | Logged in | `boolean('logged_in');`
| `BLOB` | Binary Large Object | 0 - 65535 | An image | `binary('image')`

Reference: [Full list of MySQL Data Types](http://help.scibit.com/mascon/masconMySQL_Field_Types.html)

With the `books` table design in mind, it's time to write the Schema building code.


## up() - Build the table

Here's an example of a `up()` method to create the `books` table:

```php
public function up() {

	Schema::create('books', function($table) {

		// Increments method will make a Primary, Auto-Incrementing field.
		// Most tables start off this way
		$table->increments('id');

		// This generates two columns: `created_at` and `updated_at` to
		// keep track of changes to a row
		$table->timestamps();

		// The rest of the fields...
		$table->string('title');
		$table->string('author');
		$table->integer('published');
		$table->string('cover');
		$table->string('purchase_link');

		// FYI: We're skipping the 'tags' field for now; more on that later.

	});
}
```

Noe how the Laravel `Schema` component is used to create the `books` table.

We've commented the `Schema` methods we're using, but be sure to read the [Schema Documentation](http://laravel.com/docs/schema) for full details.





## down() - Drop the table

The &ldquo;undo&rdquo; action for creating a new table is really simple&mdash; just drop the table:

```php
Schema::drop('books');
```




## Run your migrations

When you've completed writing the code for your migration, you'll use Artisan to run it:

	$ php artisan migrate

(FYI: The first time you do this it will create a `migrations` table which will be used to keep track of what migrations you've run.)

That should do the trick. Examine your new `books` table in phpMyAdmin or MySQL Command Line to make sure it matches the design you were aiming for.




## Altering tables


Any alterations to an existing table should be done in a new migration. 

For example, let's imagine you wanted to add a `page_count` field to the books table. Start with a new migration:

	$ php artisan migrate:make `add_page_count_field_to_books_table`

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

Note how Artisan only runs this latest migration. Any time you call `artisan migrate` it will only run migrations that have not already been run.

If you wanted to "go back to the beginning" and revert all migrations you could use this command:

```bash
$ php artisan migrate:refresh
```

For a full list of Artisan commands (including migration related commands):

```bash
$ php artisan list
```


## Your first migrations

Getting your migration code right the first time can be challenging, especially if you're starting a new project with a whole bunch of new tables.

When starting with a brand new app, it's okay to bend the rules a little and rebuild and rerun an existing migration to get your table right.

For example, in the case above when we forgot the `published` field, rather than creating a new migration, it would have been nice to add the field to the original migration that created the table.

Then, we could have run `php artisan migrate:refresh` to reset and re-run all migrations.

At this point, this procedure is acceptable because you're the only one running your migrations since the project hasn't been shared with anyone.

It's only once your project has been shared with teammates/other servers that you want to make sure even granular changes are put in new migrations rather than added to existing ones. If you do the latter, you run the risk that those using your codebase won't re-run the existing migration and as a result their database schemas will get out of sync.
