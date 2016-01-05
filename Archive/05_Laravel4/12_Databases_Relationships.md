## Reference:

+ <http://daylerees.com/codebright/eloquent-relationships>
+ <http://laravel.com/docs/eloquent#relationships>
+ <http://laravel.com/docs/schema#foreign-keys>




## Summary

__Build__
1. Sketch out the necessary tables and their relationships.
3. Define the relationships in the structure of the tables (using FKs).
2. Define the relationships in the Models.

__Use__
4. Utilize the relationships when adding data.
5. Utilize the relationships when querying for data.




## Database Relationships

A web application often contains multiple database tables, and those tables often relate to one another in some way. 

For example, imagine the `Foobooks` example expanded to include a `authors`, and `tags` table, in addition to the original `books` table.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-foobooks-final-db-schema@2x.png' class='' style='max-width:1264px; width:100%' alt=''>

Foobooks implements two relationship types:

__[One to Many](http://laravel.com/docs/eloquent#one-to-many)__

+ Author *has many* Books
+ Inverse: Books *belongs to* Author

__[Many to Many](http://laravel.com/docs/eloquent#many-to-many)__

+ Tags *belongs to many* Books
+ Books *belongs to many* Tags

The relationships between tables are created using **foreign keys** (FK).

For example, the `books` table has a foreign key field `author_id` which connects it to the `authors` table. 

*Many to Many* relationships require an additional table, called a **pivot table** to keep track of the connections.



## Pivot Tables

+ A pivot table links two tables together using foreign keys.
+ Also known as: &ldquo;lookup table&rdquo;, &ldquo;join table&rdquo;. 
+ A primary key is not needed on a pivot table.
+ Naming: Use the singular version of the name of the two tables you're joining, separated with an underscore, in alphabetical order. Ex: If you're joining the `books` table with the `tags` table, the resulting pivot table name would be `book_tag`.




## Identifying Relationships in Table Structure

When building your migrations, there are two things you'll need to know (in addition to what you already know about schemas) to set up your relationships:

__First:__ If a column is going to be a FK that connects to an auto-incrementing column on another table (common), it must be `unsigned` (positive).

```php
$table->integer('author_id')->unsigned();
```

__Second:__ Here's the syntax for defining a FK:

```php
$table->foreign('author_id')->references('id')->on('authors'); 
```

[Here's the migration for all of the Foobooks tables](https://gist.github.com/susanBuck/992b1323f6cc0f68427d).




## Identifying Relationships in Models

Relationships amongst tables need to be defined in their corresponding Models via relationship methods.

For example, the Author class should have a method called `book()` which returns the Eloquent relationship [hasMany](http://devdocs.io/laravel/api/4.2/illuminate/database/eloquent/model#method_hasMany):

```php
class Author extends Eloquent { 

	public function book() {
		# Author has many Books
		# Define a one-to-many relationship.
		return $this->hasMany('Book');
	}
}
```
   	
On the flip side, the Book class should have a method called `author()` which returns the Eloquent relationship [belongsTo](http://devdocs.io/laravel/api/4.2/illuminate/database/eloquent/model#method_belongsTo):

```php
class Book extends Eloquent { 

	public function author() {
		# Book belongs to Author
		# Define an inverse one-to-many relationship.
		return $this->belongsTo('Author');
	}
}
```
	
The Tag model should indicate that a tag [belongsToMany](http://devdocs.io/laravel/api/4.2/illuminate/database/eloquent/model#method_belongsToMany) books:

```php
class Tag extends Eloquent { 
	
	public function books() {
		# Tags belong to many Books
		return $this->belongsToMany('Book');
	}
    
}
```
	
Likewise, the Book model should indicate that a tag belongsToMany book [belongsToMany](http://devdocs.io/laravel/api/4.2/illuminate/database/eloquent/model#method_belongsToMany) tags:

```php
class Book extends Eloquent { 
	
	public function author() {
		# Book belongs to Author
    	return $this->belongsTo('Author');
	}
    
	public function tags() {
   		# Books belong to many Tags 	
		return $this->belongsToMany('Tag');
	}
    
}
```







## Recap so far
So far we have:

1. Identified the necessary tables and their relationships.
2. Defined the relationships in the structure of the tables (using FKs).
3. Defined the relationships in the Models.


Now, we can start implementing these relationships in the application and its data...


## Associate an author with a book

Every book should be associated with an author...

For example, you could create a new author:

```php
$author = new Author;
$author->name = 'F. Scott Fiztgerald';
$author->birth_date = '1896-09-24';
$author->save();
```
	
And then you could create a new book, associating it with the author:

```php
$book = new Book;
$book->title = 'The Great Gatsby';
$book->published = 1925;
$book->cover = 'http://img2.imagesbn.com/p/9780743273565_p0_v4_s114x166.JPG';
$book->purchase_link = 'http://www.barnesandnoble.com/w/the-great-gatsby-francis-scott-fitzgerald/1116668135?ean=9780743273565';
$book->author()->associate($author); # <--- Associate the author with this book
$book->save();
```
	
Note how the `associate()` method is called *before* the `save()` method. This is because `associate` is setting the `author_id` field on the books row; that setting should happen before the row is created.

Another way to look at the `associate()` method is that it's doing this:

```php
$book->author_id = $author->id;
```


## Attach a tag to a book

Assuming you've created a tag...

```php
$tag = new Tag;
$tag->name = 'novel';
$tag->save();
```
	
You can now create a book and attach a tag to it:

```php
$book = new Book;
$book->title = 'The Great Gatsby';
$book->published = 1925;
$book->cover = 'http://img2.imagesbn.com/p/9780743273565_p0_v4_s114x166.JPG';
$book->purchase_link = 'http://www.barnesandnoble.com/w/the-great-gatsby-francis-scott-fitzgerald/1116668135?ean=9780743273565';
$book->author()->associate($fitzgerald); 
$book->save();
$book->tags()->attach($tag); # <-----
```

Unlike `associate()`, `attach()` needs to happen *after* the `save()` method. This is because it's creating a new row in the `book_tag` pivot table and it needs a `book_id` to do so. The `book_id` won't exist until after the book as been added.





## Querying with relationships

Once your Models have been programmed with relationships, it's easy join data amongst multiple tables using [dynamic properties](http://laravel.com/docs/eloquent#dynamic-properties).

>> Eloquent allows you to access your relations via *dynamic properties*. Eloquent will automatically load the relationship for you, and is even smart enough to know whether to call the get (for one-to-many relationships) or first (for one-to-one relationships) method. It will then be accessible via a dynamic property by the same name as the relation.

For example, you can fetch a book and have access to its author info...

```php
# Get the first book as an example
$book = Book::first();
		
# Get the author from this book using the "author" dynamic property
# "author" corresponds to the the relationship method defined in the Book model
$author = $book->author; 
	
# Print results
echo $book->title." was written by ".$author->name;
```

Or its tags...
```php
# Get the first book
$book = Book::first();
	
# Get the tags from this book using the "tags" dynamic property
# The name "tags" corresponds to the the relationship method defined in the Book model
$tags = $book->tags; 
	
foreach($tags as $tag) {
	echo $tag->name."<br>";
}
```


### Eager Loading

If you're querying for all books, you may want to join in the related author data with that query. This can be done via the [with()](http://devdocs.io/laravel/api/4.2/illuminate/database/eloquent/model#method_with) method and is referred to as **eager loading**:

```php
# Eager load the authors with the books
$books = Book::with('author')->get(); 

foreach($books as $book) {
	echo $book->author->name.' wrote '.$book->title.'<br>';
}
```
	
Same idea, but with tags:

```php
# Eager load the tags with the books
$books = Book::with('tags')->get(); 

foreach($books as $book) {
	
	echo $book->title."<br>";
	foreach($book->tags as $tag) {
		echo $tag->name.", ";
	}
	
	echo "<br><br>";
	
}
```

Or maybe you want the author *and* tags:

```php
# Eager load tags and authors with the books
$books = Book::with('tags','author')->get(); 

foreach($books as $book) {
	
	echo $book->title.' by '.$book->author->name.'<br>';
	foreach($book->tags as $tag) {
		echo $tag->name.", ";
		}
	
	echo "<br><br>";
	
}
```


## Tips:

__Tip 1__
If you receive an error like this:

	General error: 1005 Can't create table 'database-name.#sql-13993_88' 
	(errno: 150) (SQL: alter table `books` add constraint books_author_id_foreign foreign key 
	(`author_id`) references `authors` (`id`))`                                                                      

There may be two possible causes:

__Cause 1)__ When building relationships, it's important that you create tables in a logical order. For example: if the table `books` will have a FK connecting it to `authors`, then the `authors` table should exist before attempting to create that FK.


__Cause 2)__ When creating a column that will contain a FK relating it to another table, make sure that column is unsigned. Example:

	# Important! FK has to be unsigned because the PK it will reference is auto-incrementing
	$table->integer('author_id')->unsigned(); 
	

__Tip 2__

As you're playing around with table relationships, you'll likely generate a lot of junk data you'll want to quickly clean out. Wiping the data from tables becomes tricky, though, once you add foreign keys, because your database will want to prevent you from deleting data that is potentially connected to other existing data.

To get around this, you can disable foreign key checks.

Here's a quick and dirty route to clear a bunch of tables, which you can adapt to match your own tables:

```php
Route::get('/truncate', function() {
	
	# Clear the tables to a blank slate
	DB::statement('SET FOREIGN_KEY_CHECKS=0'); # Disable FK constraints so that all rows can be deleted, even if there's an associated FK
	DB::statement('TRUNCATE books');
	DB::statement('TRUNCATE authors');
	DB::statement('TRUNCATE tags');
	DB::statement('TRUNCATE book_tag');
}
```
	
Obviously, **you'll want to make sure this route is removed from your codebase before launching your live site**; you don't want anyone to accidentally stumble on this route and wipe out your data.