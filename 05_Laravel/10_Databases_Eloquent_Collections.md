## Reference:

* <http://laravel.com/docs/eloquent#collections>

---

An Eloquent query returns an object of the [Collection](http://devdocs.io/laravel/api/4.2/illuminate/support/collection) class.

This object includes not only the data you queried for, but a bunch of methods for working with the data.

The data is stored as **items** in the Collection.





## Collection Magic 
Collections have some magic that lets them adapt to what you need them to do.

For example, if you try and `echo` a Collection, it will transform itself into a JSON string.

	$collection = Book::all();

	// This will output a JSON string
	echo $collection;	
	
This works because the Collection class contains the [__toString](http://php.net/manual/en/language.oop5.magic.php#object.tostring) magic method which outputs a JSON string.

Or you can loop through a Collection like an array:

	$collection = Book::all();

	// You can loop through the Collection and access just the data
	foreach($collection as $book) {
		echo $book['title']."<br>";
	}
	
This works because the Collection class implements PHP's [IteratorAggregate](http://php.net/manual/en/class.iteratoraggregate.php) interface.
	
Or, if you prefer object notation...

	$collection = Book::all();

	foreach($collection as $book) {
		echo $book->title."<br>";
	}
	
Because of the above points, you can pass a Collection to a View and have that View iterate through the Collection as if it were a regular array.

If for some reason, you want just a "pure" array, use can use the [toArray()](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_toArray) Collection method:

	$collection = Book::all();
	var_dump($collection->toArray());

## Collection Methods

Here's a list of some of the methods built into the Collection object. 

Refer to the [Collection API docs for a full list](http://devdocs.io/laravel/api/4.2/illuminate/support/collection) and CodeBright's [Eloquent Collection](http://daylerees.com/codebright/eloquent-collections) section for more details and examples.



| Method   |      Usage      |
|----------|-------------|
| `all()` |  Retrieve the internal array used by the Collection object. |
| `first()` | Retrieve the first element in the set. This will be the first element contained within the collections internal array. |
| `last()` | Opposite of `first()` |
| `shift()` | Just like `first()` but in addition to retrieving the first element, it'll remove it. |
| `pop()` | Just like `shift()` but takes from the end. |
| `each()` | Loop through a collection. Can be used as an alternative to a regular `foreach`. | 
| `map()` | Loop through a collection, returning a new collection as a result. Good for copying and editing a collection.
| `filter()` | Loop through a collection, returning true/false as you go. What is true stays, what is false gets removed.
| `sort()` | Sorts a collection.
| `reverse()` | Reverses a collection.
| `merge()` | Merge two collections.
| `isEmpty()` | Returns a boolean as to whether the given collection is empty or not.
| `toArray()` | Returns the internal array of the collection.
| `toJson()` | Returns a JSON string of the internal array of the collection.
| `count()` | Returns how many instances are in the Collection.

Some of these method names may be familiar, as they also exist as query builder methods. So what's the difference? Read on...
	

## Query Responsibility

When building a web application, it's good practice to try and minimize the number of queries you're making to the database, as excess database calls can slow down your page load speed.

One way you can optimize your app is to fetch data from an existing Collection, rather than making another round-trip query on the database.

For example, imagine at the top of a script you call upon the `all()` fetch method to grab all the books for displaying on a table in your View:

	$books = Books::all();
	
Within the View, you also want to display the first book that was added to the collection.

To gather this info, you could run this query:

	$first = Books::first();
	
This would work, but it'd run a new SQL query to find the first book. The better solution would to fetch the needed info from the *existing* Collection (stored in the `$books` variable).

	$first = $books->first();
	
In summary:

	# 2 queries:
	$books = Book::all(); 
	$first_book = Book::first();
	
	# 1 query:
	$books = Book::all();
	$first_book = $books->first();
	


