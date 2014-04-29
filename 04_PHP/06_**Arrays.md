## Key values
[php.net Arrays](http://php.net/manual/en/language.types.array.php)

<img src='http://making-the-internet.s3.amazonaws.com/php-arrays.png'>

Variables are useful for storing single bits of information, but sometimes you need to store multiple bits of information together; enter arrays.

Arrays organize information using **keys** and **values**

Let's look at how we can create and use an array. 

Starting now, we're going to be working towards building a simple __Raffle App__, so for our example, let's create an array of contestants that will play our game.

logic.php:

	<?php
	$contestants["Sam"]   = "loser";
	$contestants["Eliot"] = "loser";
	$contestants["Liz"]   = "winner";
	$contestants["Max"]   = "loser";
	?>


In this example, the name of our array is `$contestants`

The __keys__ are Sam, Eliot, Liz and Max. You can think of keys as an index, or position holder in an array.

The __values__ are loser,loser,winner and loser...respectively. 

At this point, we've hard-coded our value, but we'll work towards making those values randomly generated later.


## Retrieving values

### Print one value from the array:

	Liz is a <?=$contestants['liz']?>
	
### Print all the values from an array:		

Here's we'll call upon the [foreach](http://www.php.net/manual/en/control-structures.foreach.php) construct, which is a loop designed to work specifically with arrays.

In the `<body>` of demo.php:

	<h1>Contestants</h1>
	
	<?php 
	foreach($contestants as $key => $value) {
		echo $key." is a ".$value."!<br>";
	}
	?>		
		
This loop will work it's way through the `$contestants` array, one value at a time. Each iteration through, the `$key` and `$value` variables will represent where we're at in the array.

For example, the first time `$key` will be `"Sam"` and `$value` will be `"loser"`
The second time, `$key` will be `"Eliot"` and `$value` will be `"loser"`
...So on until we reach the end of the loop.

### Quick and dirty array printing
If you need to quickly see the contents of an array, you can use the [print_r()](http://www.php.net/manual/en/function.print-r.php) function.

	<pre>
		<?php print_r($contestants); ?>
	</pre>
	
Wrapping the call in the `<pre>` tag just makes it display nicer (try it with and without to see the difference). 

Even with the `<pre>` tag, this is still just a trick you only want to use for development purposes/debugging. 

## Writing arrays

So far our arrays were written using the **square bracket syntax**. Alternatively, arrays can be created using the [array()](http://us1.php.net/manual/en/function.array.php) function:

	$contestants = Array(
		'Sam'   => 'loser', 
		'Eliot' => 'loser', 
		'Liz'   => 'winner', 
		'Max'   => 'loser'
		);
		
### Integer keys
So far, our arrays keys have been strings. Often times, you'll see integer keys. Here's an example using square bracket notation:	
	
	$shopping_list[0] = 'Apples';
	$shopping_list[1] = 'Oranges';
	$shopping_list[2] = 'Milk';

And the same example, this time using the array() function:

	$shopping_list = Array(
		0 => 'Apples',
		1 => 'Oranges',
		2 => 'Milk',
		);

When using numeric keys that start at 0 and count up, specifying the key is optional:

	$shopping_list = Array('Apples','Oranges','Milk');
	
By default, Apples is at key position 0, Oranges at 1, Milk at 2.

### Multi-dimensional arrays
You can have arrays within arrays, for example:

	$shopping_lists['supermarket']    = Array('Apples','Oranges','Milk');
	$shopping_lists['hardware_store'] = Array('Hammer','Nails','Paint');
	$shopping_lists['pharmacy']       = Array('Bandaids','Tylenol');

That could also be written like this

	$shopping_lists = Array(
		'supermarket'    => Array('Apples','Oranges','Milk'),
		'hardware_store' => Array('Hammer','Nails','Paint'),
		'pharmacy'       => Array('Bandaids','Tylenol'),
		);





	
## Array functions
PHP includes many functions that will help you when working with Arrays.

For example...

* If you wanted to find out how many values were in an array, there's [count()](http://www.php.net/manual/en/function.count.php).
* If you wanted to order an array, there's [sort()](http://www.php.net/manual/en/function.sort.php) (plus several other [sorting methods](http://www.php.net/manual/en/array.sorting.php)).
* If you wanted to merge two arrays together, there's [array_merge()](http://www.php.net/manual/en/function.array-merge.php).

Etc...

[See the full list of Array Functions at php.net](http://php.net/manual/en/ref.array.php)






## Exercise
The `foreach` is perfect for looping through arrays, but you could also write a plain `for` loop to do the same thing. What would this code look like?

Hint: You'll want to check out the [count()](http://www.php.net/manual/en/function.count.php) method.
