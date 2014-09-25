## for loops
[php.net: Control structors - for loops](http://php.net/manual/en/control-structures.for.php)

In addition to making decisions with __If...Else__ statements, you can also get your code to do things repeatedly via a loop.

There are different kinds of loops, but let's start with the __for loop__. 

To work with the *for loop*, let's imagine we were going to create a web-based version of the child's game *Memory* and we needed our page to display numerous uniform boxes on the page:

<img src='http://thewc.co.s3.amazonaws.com/challenges/php-memory-game.png'>

## Step 1) File Setup

	/memory/
		index.php
		logic.php
	

## Step 2) Hard-coded boxes

In the `<head>` of `index.php`:

```html
<style>
	/* We'll use this class to style the boxes..Gold, 50x50px */
	.box {
		 width:50px;
		 height:50px;
		 float:left;
		 margin:4px;
		 padding:5px;
		 background-color:Gold;
	}
</style>
```

In the `<body>` of `index.php`:

```html
<div class='box'>1</div>
<div class='box'>2</div>
```


## Step 3) Lots of boxes

In `logic.php`:

```php
<?php 
$boxes = "";
for($i = 0; $i < 10; $i++) {
    $boxes = $boxes."<div class='box'>".$i."</div>";
}
```

In the `<body>` of `index.php` (in place of the hard-coded boxes from the previous step):

```php
<?php echo $boxes; ?>
```

How would you edit the above to get 100 boxes? 1000 boxes?


## Syntax breakdown

[php.net for control structure](http://us3.php.net/manual/en/control-structures.for.php)

<img src='http://making-the-internet.s3.amazonaws.com/php-for-loop-breakdown@2x.png' class='' style='max-width:815px; width:100%' alt=''>




## Challenge
 
Adapt the one of the loops above to make each box have a random size.

PHP can help you generate random numbers using the [rand()](http://php.net/manual/en/function.rand.php) function.

