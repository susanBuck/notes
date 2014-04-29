## Alternative syntax

[php.net Alternative syntax](http://us1.php.net/manual/en/control-structures.alternative-syntax.php)

Compare and contrast the following code:

Version A)

	<h1>Contestants</h1> 
	<?php 
	foreach($contestants as $key => $value) {
		echo $key." is a ".$value."!<br>";
	}
	?>	

Version B)

	<h1>Contestants</h1> 
	<?php foreach($contestants as $key => $value): ?>
		<?=$key?> is a <?=$value?>
	<?php endforeach; ?>

Note the differences:

* Version B replaces the *opening* curly brace with a colon
* Version replaces the *closing* curly brace with a `endforeach;`

This syntax is sometimes preferred when writing PHP in your display page, because it makes it easier to find the end of the foreach loop amongst a lot of HTML code.

Note, also, how we open and close the php tags a lot, really isolating the PHP pieces from the HTML pieces. This comes in handy when you have a lot more HTML tags.

To compare and contrast, look at these two lines:

HTML is dominant, with PHP injected

	<div class='person-name'><?=$key?></div> is a <em class='results'><?=$value?></div>

PHP is dominant, with HTML injected

	<?php
	echo "<div class='person-name'>".$key." is a <em class='results'>".$value."</div>";
	?>

In terms of working in your display page, the first option is more readable and tag-like.

The same substitutions can also be made with *if statements* and other similar control structures.

For example, here's a HTML form wrapped in a if statement:

	<?php if($new_user): ?>
	
		<h2>Welcome New User!</h2>
		<form>
			<label for='first_name'>First Name<br>
			<input type='text' name='first_name' id='first_name'>
			
			<label for='email'>Email<br>
			<input type='text' name='email' id='email'>
			
			<input type='submit'>
		</form>
		
	<?php endif; ?>

**Note: This alternative structure is only recommended for your display PHP pages, *not* your logic PHP pages. In the display pages, HTML should reign; in the logic page, PHP should reign.**
	