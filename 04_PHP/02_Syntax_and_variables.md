## PHPiggy Bank

<img src='http://thewc.co.s3.amazonaws.com/challenges/php-phpiggy-bank.png'>

Create a file callde **bank.php** and fill it with the following code, then load bank.php in your browser.

	<!DOCTYPE html>
	<html>
	<head>
		
		<title>PHPiggy Bank</title>
		
		<?php
	
		# Define 4 different variables, which will each represent how much a given coin is worth
		$penny_value   = .01;
		$nickle_value  = .05;
		$dime_value    = .10;
		$quarter_value = .25;
		
		# Define 4 more variables, which will each represent how many of each coin is in the bank
		$pennies  = 100;
		$nickles  = 25;
		$dimes    = 100;
		$quarters = 34;
		
		# Add up how much money is in the piggy bank
		$total = ($pennies * $penny_value) + ($nickles * $nickle_value) + ($dimes * $dime_value) + ($quarters * $quarter_value);
		
		?>
		
	</head>
		
	<body>
		
		<img alt='PHPiggy Bank Logo' src='http://thewc.co.s3.amazonaws.com/challenges/php-phpiggy-bank.png'>
		
		<p>
		 You have $<?php echo $total; ?> in your piggy bank.
		</p>
		
	</body>
	</html>


	
## PHP Syntax

* PHP code is written in a text file that is saved with a .php extension. 
* A .php file is like a super-powered .html file because it can process both HTML code and PHP code.
* PHP code is always surrounded by a start PHP tag and an end PHP tag. `<?php ?>`.
* Every command in PHP should end with a semi-colon.

## Variables

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


## Comments

[php.net Comments](http://us1.php.net/manual/en/language.basic-syntax.comments.php)

	// This is a single line comment
	
	/* This is a multi-line comment
	It can span
	Multiple lines
	*/
	
	// Coments can be used to leave notes to yourself, or disable lines of code
	// echo $results;

## View Source
