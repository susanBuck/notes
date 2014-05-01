Variables are used to store information so that it can easily be retrieved and manipulated.

Examples of different variable types:

* Strings <small>(always surrounded in quotes)</small>
* Ints
* Floats
* Booleans

What are some examples of each?

<small>Unlike numerous other programming languages, PHP is <em>loosely typed</em>, which means when you're declaring a variable you don't have to specify the type.</small>

## Syntax for variables in PHP

In PHP the name of a variable is always preceded by a dollar sign `$`.
	
	<?php
	$favorite_color = 'red';
	?>
	
Variable names should start with a letter or underscore, followed by any number of letters, numbers, or underscores.

## Displaying variables

Long form:

	<?php echo $favorite_color;?>

Shortcut: 

	<?=$favorite_color?>

Note we omitted the final semi-colon in the shortcut version; this is okay to do right before a closing `?>`


## Math with variables

Numeric variables (floats or ints), can be calculated together.

logic.php:

	<?php
	$quarter = .25;
	$dime    = .10;
	$nickel  = .05;
        
	$calculate_total = ($quarter * 3) + ($dime * 4) + ($nickle * 1);
	?>

In the `<body>` of demo.php :

	I have this much money: <?=$calculate_total?>


