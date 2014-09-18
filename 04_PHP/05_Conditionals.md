HTML code is fairly &ldquo;brainless&rdquo; what you type is what you get. With PHP, however, you can write code that allows your program to &ldquo;think&rdquo; using [control structures](http://us1.php.net/manual/en/language.control-structures.php) like the [if construct](http://us1.php.net/manual/en/control-structures.if.php).

To demonstrate, we want to add a feature to the PHPiggy Bank which will report back to the user whether they've met a savings goal, depending on how much money they have.

If your user has met their goal, then it should display this image:

<img src='http://making-the-internet.s3.amazonaws.com/php-goal-met.png' alt='Goal met'>

	<img src='http://making-the-internet.s3.amazonaws.com/php-goal-met.png' alt='Goal met'>
	

If they haven't met their goal, then it should display this image:

<img src='http://making-the-internet.s3.amazonaws.com/php-goal-not-met.png' alt='Goal not met'>

```html
<img src='http://making-the-internet.s3.amazonaws.com/php-goal-not-met.png' alt='Goal not met'>
```	

## Procedure

Define a variable `$goal` and set it to be `50`.

Write an *if statement* which will set a a variable called `$image` to be either `php-goal-met.png` or `php-goal-not-met.png`.

In the display page, use this PHP image variable to display an image on the page: 

```html
<img src='http://making-the-internet.s3.amazonaws.com/<?php echo $image?>' alt='Goal Status'>
```



## Beyond either/or

<img src='http://making-the-internet.s3.amazonaws.com/php-goal-almost-met.png' alt='Almost met'>

```html
<img src='http://making-the-internet.s3.amazonaws.com/php-goal-almost-met.png' alt='Almost met'>
```
	
* If the total is less than $30, the goal is not met.
* If the total is greater than $30 AND less than $50, they're almost there.
* If the total is greater than $50, the goal is met.