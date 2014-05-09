Whenever you allow users to input information on your site, you're opening yourself up to certain vulnerabilities, because you can't always trust the input they're sending you is benign.

Therefor, you need to *sanitize* any input from users before outputting it to the page; this can be done with PHP's [`htmlspecialchars()` function](http://us1.php.net/htmlspecialchars).


	<?php foreach($contestants as $key => $value) { ?>
			<?php echo htmlspecialchars($key, ENT_QUOTES, 'UTF-8'); ?> is a <?php echo $value; ?><br>
	<?php } ?>

This helps prevent against a problem called __XSS (Cross Site Scripting)__ which happens when nefarious users put code into your forms. The job of `htmlspecialchars()` is to strip this code out to prevent it from running and causing any harm. 

You can think of `htmlspecialchars()` as a security guard which is in charge of screening your data before displaying it.