## Databases

## Create the Eloquent models
p36

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
	
