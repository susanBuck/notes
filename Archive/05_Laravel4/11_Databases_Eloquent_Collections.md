## Reference

* <http://laravel.com/docs/eloquent#collections>


## Collections
An Eloquent query returns an object of the [Collection](http://devdocs.io/laravel/api/4.2/illuminate/support/collection) class.

This object is a wrapper for an Array called **items** which contains all the data of your query.

<img src='http://making-the-internet.s3.amazonaws.com/laravel-collection@2x.png' class='' style='max-width:946px; width:100%' alt='Eloquent queries return Collections'>

Not only does the Collection object contain your data, it also contains a bunch of methods for working with the data.



## Collection Magic 
Collections come built in with some magical methods that lets them adapt to what you need them to do.

For example, if you treat a Collection like a string (e.g. you `echo` it), it will transform itself into a JSON string.

```php
$collection = Book::all();

# This will output a JSON string
echo $collection;	
```
	
This works because the Collection class contains the [__toString](http://php.net/manual/en/language.oop5.magic.php#object.tostring) magic method which is programmed to output a JSON string.

You can also treat a Collection like an array:

```php
$collection = Book::all();

# loop through the Collection and access just the data
foreach($collection as $book) {
	echo $book['title']."<br>";
}	
```

This works because the Collection class implements PHP's [IteratorAggregate](http://php.net/manual/en/class.iteratoraggregate.php) interface.
	
Or, if you prefer object notation...

```php
$collection = Book::all();

foreach($collection as $book) {
	echo $book->title."<br>";
}
```
	
Because of the above points, you can pass a Collection to a View and have that View iterate through the Collection as if it were a regular array.

If for some reason, you want just a &ldquo;pure&rdquo; array of the data in your Collection, use can use the [toArray()](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_toArray) method:

```php
$collection = Book::all();
var_dump($collection->toArray());
```

## Collection Methods

Here's a list of some of the methods built into the Collection object. 

Refer to the [Collection API docs for a full list](http://devdocs.io/laravel/api/4.2/illuminate/support/collection) and CodeBright's [Eloquent Collection](http://daylerees.com/codebright/eloquent-collections) section for more details and examples.



| Method   |      Usage      |
|----------|-------------|
| [`all()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_all) |  Get all of the items in the collection. |
| [`first()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_first) | Get the first item from the collection. |
| [`last()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_last) | Get the last item from the collection. |
| [`shift()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_shift) | Get and remove the first item from the collection. |
| [`pop()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_pop) | Get and remove the last item from the collection. |
| [`each()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_each) | Loop through each item in a collection. Can be used as an alternative to a regular `foreach`. | 
| [`map()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_map) | Loop through a collection, returning a new collection as a result. Good for copying and editing a collection.
| [`filter()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_filter) | Loop through a collection, returning true/false as you go. What is true stays, what is false gets removed.
| [`sort()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_sort) | Sort through each item with a callback.
| [`reverse()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_reverse) | Reverses a collection.
| [`isEmpty()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_isEmpty) | Determine if the collection is empty or not.
| [`toArray()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_toArray) | Get the collection of items as a plain array.
| [`toJson()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_toJson) | Get the collection of items as JSON.
| [`count()`](http://devdocs.io/laravel/api/4.2/illuminate/support/collection#method_count) | Count the number of items in the collection. |

Some of these method names may be familiar, as they also exist as query builder methods. So what's the difference? Read on...
	

## Query Responsibility

When building a web application, it's good practice minimize the number of queries you're making to the database, as excess database calls can slow down a site's load time.

One way you can optimize your application is to fetch data from an existing Collection, rather than making another round-trip query on the database. This comes in handy if, for example, you're dealing with a result set in which you want to suss out multiple things from that set: all the books, the first book, the last book, etc. Rather than doing a separate query for each of these needs, you can shift the responsibility over to the Collection and use the data you already fetched...

For example, imagine at the top of a script you call upon the `get()` fetch method to grab all the books for displaying on a table in your View:

```php
$books = Book::orderBy('id','descending')->get();
```
Within the View, you also want to draw attention to the the most recently added book to the collection.

To gather this info, you could run this query:

```php
$first = Book::orderBy('id','descending')->first();
```
	
This would work, but it'd run a new SQL query to find the first book. The better solution would to fetch the needed info from the *existing* Collection (stored in the `$books` variable).

```php
$first = $books->first();
```
	
In summary:

```php
# 2 queries:
$books = Book::orderBy('id','descending')->get(); # Query on the Database
$first_book = Book::orderBy('id','descending')->first(); # Query on the Database

# 1 query (better):
$books = Book::orderBy('id','descending')->get(); # Query on the Database
$first_book = $books->first(); # Query on the Collection
```


