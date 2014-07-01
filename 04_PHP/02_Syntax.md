## PHPiggy Bank

Create a file called **bank.php** and fill it with the following code, then load bank.php in your browser.

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
* PHP code is always surrounded by a start PHP tag `<?php` and an end PHP tag `?>`.
* Every command in PHP should end with a semi-colon.






## Comments

[php.net Comments](http://us1.php.net/manual/en/language.basic-syntax.comments.php)

	<?php
	// This is a single line comment
	
	/* This is a multi-line comment
	It can span
	Multiple lines
	*/
	
	// Coments can be used to leave notes to yourself, or disable lines of code
	// echo $results;

## View Source
