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

First, let's have Artisan generate a new migration file for you:

	$ php artisan migrate:make create_books_table
	
The migration name (`create_books_table`) should reflect what you're doing.

Naming conventions:

+ Tables and field names are written in `snake_case`.
+ Table names are plural.

This command will generate a new file in `/app/database/migrations/`. 

Note the filename has a unique timestamp. This insures migrations are run in the same order in which they were created.

Open it up. Every migration has some boilerplate code with a `up()` and `down()` method. In the `up()` method you'll describe some change to the database (adding a new table, adding fields to a table, etc.), and in the `down()` method you'll reverse any changes made in the `up()` method.


## Design our table

Before writing any code in the `up()` method to build our table, we have to decide what fields our table will need, and what MySQL data type each field should be.

To do this, we looked at our existing `books.json` data and mapped the book parameters to the appropriate MySQL field type. 

<img src='http://making-the-internet.s3.amazonaws.com/laravel-books-table-design@2x.png' class='' style='max-width:983px; width:100%' alt=''>

To understand the MySQL data types we chose for each field, refer to this table:

### Text

| MySQL Data Type  	|  Description  	| Range | Example | Laravel
|---	|---	|
| `CHAR(size)`  	| *Fixed* length String. | 0-255 | US State | `$table->char('state', 2)`	|
| `VARCHAR(size)`  	|  *Variable* length String. |0-255| Email address | `$table->string('email')`
| `TEXT` | Variable length String; can store up to 2GB of text data. | 0 - 65535 | Blog post | `$table->text('post')`

### Numbers


| MySQL Data Type  	|  Description  	| Range | Example | Laravel
|---	|---	|
| `INT`  	| Whole number. | -2147­483648 to 214748­3647 | Page count | `$table->integer('page_count')`	|
| `FLOAT`  	|  A small decimal number. | 7 Digits | Scientific calculations | `$table->float('distance')`
| `DOUBLE`  	|  A large decimal number. | 15-16 Digits | Scientific calculations | `$table->double('distance')`
| `DECIMAL`  	|  A DOUBLE stored as a string, allowing for a fixed decimal point. | 28-29 Significant digits | Money, ex. bank balance | `$table->decimal('bank_balance')`


### Misc
| MySQL Data Type  	|  Description  	| Range | Example | Laravel
|---	|---	|
| `BOOLEAN`  	| Alias for TINYINT(1) | TINYINT(1) | Logged in | `$table->boolean('logged_in');`
| `BLOB` | Binary Large Object | 0 - 65535 | An image | `$table->binary('image')`

Reference: [Full list of MySQL Data Types](http://help.scibit.com/mascon/masconMySQL_Field_Types.html)

With the `books` table design in mind, it's time to write the Schema building code.


## up() - Build the table

Here's an example of a `up()` method to create the `books` table:

	public function up() {

		Schema::create('books', function($table) {

			// Increments method will make a Primary, Auto-Incrementing field. 
			// Most tables start off this way
			$table->increments('id');
			
			// This generates two columns: `created_at` and `updated_at` to 
			// keep track of changes to a row
			$table->timestamps();
			
			// The rest of our fields...
			$table->string('title');
			$table->string('author');
			$table->integer('published');
			$table->string('cover');
			$table->string('purchase_link');

		});
	}

Noe how the Laravel `Schema` component is used to create the `books` table. 

We've commented the `Schema` methods we're using, but be sure to read the [Schema Documentation](http://laravel.com/docs/schema) for full details.





## down() - Drop the table

The &ldquo;undo&rdquo; action for creating a new table is really simple&mdash; just drop the table:

	Schema::drop('books');


## Run your migrations

When you've completed writing the code for your migration, you'll use Artisan to run it:

	$ php artisan migrate

(FYI: The first time you do this it will create a `migrations` table which will be used to keep track of what migrations you've run.)

That should do the trick. Examine your new `books` table in phpMyAdmin or MySQL Command Line to make sure it matches the design you were aiming for.




## Altering tables

In the above example, we forgot the `published` field for our `books` table; let's add that now.

Any alterations to an existing table should be done in a new migration. 

Let's add a `published` field to the existing `books` table. Create a new migration:

	$ php artisan migrate:make add_published_to_books

Edit the resulting migration:

Up...

	Schema::table('books',function($table) {
			$table->integer('published');
	});
	
Down...

	Schema::table('books', function($table) {
		$table->dropColumn('published');
	}

Run it:

	$ php artisan migrate 
	
Note how Artisan only runs this latest migration. Any time you call `artisan migrate` it will only run migrations that have not already been run.

If you wanted to "go back to the beginning" and revert all migrations you could use this command:

	$ php artisan migrate:refresh

For a full list of Artisan commands (including migration related commands):

	$ php artisan list
	

