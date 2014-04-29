## for loops
[php.net Control structors - for loops](http://php.net/manual/en/control-structures.for.php)

<img src='http://making-the-internet.s3.amazonaws.com/php-memory-game.jpg' class='float-right' style='width:200px'>

In addition to making decisions with __If...Else__ statements, you can also get your code to do things repeatedly via a loop.

There are different kinds of loops, but let's start with the __for__ loop. 

Imagine you were creating a digital version of the Memory Game and needed your application to print out a lot of uniform boxes on the page:

<div class='clear'></div>

logic.php:


	<?php
	$boxes = "";
	for($i = 0; $i < 10; $i++) {
	    $boxes = $boxes."<div class='box'>".$i."</div>";
	}
	?>

In the `<head>` of demo.php
	
	<style>
		/* We'll use this class to style the boxes..Red, 50x50px */
		.box {
			width:50px;
			height:50px;
			float:left;
			margin:4px;
			background-color:red;
		}		
	</style>

In the `<body>` of demo.php:

	<?=$boxes?>

Results:
<img src='http://making-the-internet.s3.amazonaws.com/php-loop-boxes.png'>

<br>
Let's breakdown how the for loop works...

### 1. Where to start
<img src='http://making-the-internet.s3.amazonaws.com/php-loop-start.png'>
This first expression (`$i = 0`) is executed at the start of the loop.
The variable `$i` acts as the cursor as we move through the loop; i is short for <em>iterator</em>. 
You can name your cursor variable anything you want, but `$i` is something you'll see used a lot.

### 2. Go until...
<img src='http://making-the-internet.s3.amazonaws.com/php-loop-until.png'>
The second expression (`$i < 10`) is executed at the <em>start</em> of every iteration through the loop, and it's
a test to determine whether the loop should proceed.
If `$i` is still less than 10, the loop will proceed. Otherwise, the loop is done.

### 3. How to proceed each time...
<img src='http://making-the-internet.s3.amazonaws.com/php-loop-proceed.png'>
The third expression (`$i++`) is executed at the <em>end</em> of every iteration through the loop.
`++` is an [incrementing operator](http://www.php.net/manual/en/language.operators.increment.php) that means "<em>add 1</em>". Each time we loop through, we add 1 to `$i`.


### Summary
<img src='http://making-the-internet.s3.amazonaws.com/php-loop-pieces.png'>

[Visual run through the loop...](http://making-the-internet.s3.amazonaws.com/php-loops.png)





## while loops
[php.net While loops](http://www.php.net/manual/en/control-structures.while.php)
Another loop type is the <em>while</em> loop.
We could get the same results of the <em>for</em> loop above using a <em>while</em> loop like this:

	$boxes = "";
	$i = 0;
	while($i < 10) {
		$boxes = $boxes."<div class='box'>".$i."</div>";
		$i++;
	}








## Practice 
Adapt the one of the loops above to make each box have a random size.
PHP can help you generate random numbers using the [rand()](http://php.net/manual/en/function.rand.php) function.

