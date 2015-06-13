## Reference

+ <http://daylerees.com/codebright/eloquent>
+ <http://laravel.com/docs/eloquent>

---

In terms of databases, here's the groundwork we've covered so far...

+ Created a MySQL database.
+ Configured Laravel so it could talk to the database.
+ Used Migrations and the Schema component to build a table in the database.

With all of this set up, it's now time to dig into working with the **data within the tables**.




## Laravel's Query Builder
At this point, if you're already somewhat comfortable with SQL you could hit the ground running using just [Laravel's query builder](http://laravel.com/docs/queries). 

The query builder is a Laravel component (accessed by the `DB` Facade) which makes it easy to create and run database queries. 

For example, here's how you would grab all the rows from the `books` table using the DB `get()` method:

```php
# Returns and object of books
$books = DB::table('books')->get();

foreach ($books as $book) {
    echo $book->title;
}
```

Another example, with some `where` filtering:

```php
$books = DB::table('books')->where('author', 'LIKE', '%Scott%')->get();

foreach($books as $book) {
    echo $book->title;
}
```

There are many methods within the query builder to help you build any query imaginable (check the above-linked docs for a full reference).

Or maybe you're a SQL wiz and you don't want any help from the query builder. In this case, you can still use the Query Builder, but run your own SQL statements.

```php
# Write your own SQL select statement
$sql = 'SELECT * FROM books WHERE author LIKE "%Scott%"';

# Escape your statement if you have any input coming from users to avoid SQL injection attacks
# In this example we don't, but it doesn't hurt to do it anyway
$sql = DB::raw($sql);

# Run your SQL query
$books = DB::select($sql);

# Output the results
echo Paste\Pre::render($books,'');
```

So these options exist... but they feel very procedural and lack the kind of structure and organization we're aiming for with Object Oriented Programming. There's got to be a better way...

**Enter: ORM (Object Relational Mapping).** 
 




## What is ORM?

ORM is the practice of mapping Objects within your application to rows in your database tables.

With this mapping, the **class parameters** of your Objects correspond to **fields in database tables**.

Here's a big picture view of this:

<img src='http://making-the-internet.s3.amazonaws.com/laravel-orm-books@2x.png' class='' style='max-width:1057px; width:100%' alt=''>

Note how for every public parameter of the class `Book`, there was a corresponding field in the table `books`. This one-to-one relationship allows for the so-called &ldquo;mapping&rdquo; of ORM.

Laravel's ORM system is called **Eloquent**.

With the big idea of ORM behind us, let's look at the nitty gritty of using it...



## Create an Eloquent model

An Eloquent model is a class that represents an entity of your application. For Foobooks, the most obvious entity to start with is the Book entity.

We already created the `books` table in a previous step, so we can dig right into building the corresponding Book model.

All of your applications's models should be saved in `/app/models/` so create a new file, `app/models/Book.php`, with this stub of code:

```php
class Book extends Eloquent {
	
}
```

__Convention over Configuration__

There are a few expectations Eloquent has in order to work:

+ Your model class should *extend* the `Eloquent` class; this will allow your class to inherit the magical functionality provided by Eloquent ORM.
+ Your model's class name should be the singular version of the corresponding table name, and it should be capitalized. Given this, our model class name is `Book` and our table name is `books`.
+ All tables must have an auto-incremental, unique primary key column named `id`. In other words, when building your Migrations make sure you have a `$table->increments('id')`. 

The latter two points can be configured if needed&mdash; for example, if you're working with an existing table which you don't have structural control over. If you're starting fresh, though, it's best to follow these conventions.

With this infrastructure in place, let's put Eloquent to work with some queries...




## CRUD - Creating
There's not much going on in our model class so far, but that's really all you need to get rolling. By just defining the model class and extending the `Eloquent` class, you can start taking advantage of the powers of Eloquent ORM.

Let's test this out. Create a practice route in your `routes.php` file:

```php
Route::get('/practice-creating', function() {

	# Instantiate a new Book model class
	$book = new Book();

	# Set 
	$book->title = 'The Great Gatsby';
	$book->author = 'F. Scott Fiztgerald';
	$book->published = 1925;
	$book->cover = 'http://img2.imagesbn.com/p/9780743273565_p0_v4_s114x166.JPG';
	$book->purchase_link = 'http://www.barnesandnoble.com/w/the-great-gatsby-francis-scott-fitzgerald/1116668135?ean=9780743273565';

	# This is where the Eloquent ORM magic happens
	$book->save();

	return 'A new book has been added! Check your database to see...';

});
```

Go ahead and hit this route (`http://localhost/practice-creating`), then check your database to confirm there's a new row in your `books` table.



## CRUD - Reading

With some rows in your table, you can retrieve data:

```php
Route::get('/practice-reading', function() {

    # The all() method will fetch all the rows from a Model/table
    $books = Book::all();

    # Make sure we have results before trying to print them...
    if($books->isEmpty() != TRUE) {
        
        # Typically we'd pass $books to a View, but for quick and dirty demonstration, let's just output here...
        foreach($books as $book) {
            echo $book->title.'<br>';
        }
    }
    else {
        return 'No books found';
    }

});
```
 
Same idea, but this time get one specific book:

```php
Route::get('/practice-reading-one-book', function() {

    $book = Book::where('author', 'LIKE', '%Scott%')->first();

    if($book) {
        return $book->title;
    }
    else {
        return 'Book not found.';
    }

});
```



## Query Structure

Before moving on to Updating and Deleting, let's take a closer look at how Eloquent queries are structured...

All queries are made up of *constraints* (optional) and a *fetch* method.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-eloquent-query-structure@2x.png' class='' style='max-width:1335px; width:100%' alt=''>

Eloquent queries return a Collection object, which is covered in more detail in the next note set.




## CRUD - Updating

```php
Route::get('/practice-updating', function() {
    
    # First get a book to update
    $book = Book::where('author', 'LIKE', '%Scott%')->first();
    
    # If we found the book, update it
    if($book) {

        # Give it a different title
        $book->title = 'The Really Great Gatsby';
   
        # Save the changes
        $book->save();
    
        return "Update complete; check the database to see if your update worked...";
    }
    else {
        return "Book not found, can't update.";
    }
    
});
```


## CRUD - Deleting

```php
Route::get('/practice-deleting', function() {

    # First get a book to delete
    $book = Book::where('author', 'LIKE', '%Scott%')->first();

    # If we found the book, delete it
    if($book) {
        
        # Goodbye!
        $book->delete();

        return "Deletion complete; check the database to see if it worked...";

    }
    else {
        return "Can't delete - Book not found.";
    }

});
```




## What else can you do with Eloquent?

The above CRUD demonstrations are just the tip of the iceberg of the kind of database interactions you'll need to accomplish within your applications.

For example, here's a sampling of the kind of database tasks you could end up doing with an application like Foobooks:

+ Show a user the last 5 books they added to their collection.
+ Retrieve all the books published after 1950.
+ Retrieve all the books in alphabetical order by title.
+ Retrieve all the books in descending order according to published date
+ Find any books by the author `Bell Hooks` and update the author name to be `bell hooks` (lowercase).
+ Remove any books by the author &ldquo;John Grisham&rdquo;.


Building the Eloquent queries to accomplish tasks like these is almost an art form, and like most art forms, you'll have to study and practice with it to get more fluent over time.

We're not going to comprehensively cover all the Eloquent query capabilities, because it's already well-documented in CodeBright and the Laravel documentation.

Be sure to study following pages:

+ <http://daylerees.com/codebright/eloquent-queries>
+ <http://daylerees.com/codebright/eloquent-collections>
+ <http://laravel.com/docs/eloquent>



## More...

While we spend a lot of time in this course deep in the workings of Laravel, it's important to understand that the paradigms we are working with are often universal across web programming software.

As an example of this, read about [Ruby On Rail's Active Records](http://guides.rubyonrails.org/active_record_basics.html) and note the similarities to Laravel's Eloquent ORM.






