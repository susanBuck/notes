## User input

Server side code allows you to accept user input and cater your page according to that input.
 
To demonstrate this we're going to make our Raffle App more dynamic by allowing the users to enter contestants, instead of having the contestants hard coded in.





## HTML Forms
First step: build a form to gather the contestant names:

In the `<body>` of index.php:

```html
<form method='POST' action='index.php'>
	Enter 5 contestants<br>
	<input type='text' name='contestant1'><br>
	<input type='text' name='contestant2'><br>
	<input type='text' name='contestant3'><br>
	<input type='text' name='contestant4'><br>
	<input type='text' name='contestant5'><br>
	<input type='submit' value='Pick a winner!'><br>
</form>
```

The method attribute for forms can be either [POST](http://php.net/manual/en/reserved.variables.post.php) or [GET](http://www.php.net/manual/en/reserved.variables.get.php) which are two different ways to pass information over your server. 

* GET data is passed via the URL with a *Query String*. Ex: `http://domain.com/form.php?first_name=joe&last_name=smith`
* Because of the above point GET data is not suggested for sensitive data, but is suggested if you need to link to the results. For example, if you're processing a form that filters a search result, it'd be useful to be able to bookmark that link.
* GET is limited to 2083 characters (give or take, depends on the browser) whereas POST is only limited by server configuration. Given that, if you're submitting a large amount of data (for example, a blog post), POST is recommended.
* If your form submission is modifying some state of data, use POST. For example, if you're submitting a form to sign-up on a site, that creates a new row in the database. You would not want to pass this information via the URL (GET), because the user could refresh the page which would attempt to add the user again.

[Comprehensive breakdown of the differences between POST/GET](http://www.diffen.com/difference/Get_vs_Post)

The __action__ attribute specifies what page will process the form when the user submits it. In this example, the *action* is `index.php`, which means when this form is submitted, it will submit to itself.

Reload your page in the browser and make sure your form is okay. You can fill it out and submit it, but you won't see anything interesting happen yet because we've yet to write any PHP code to handle the form we're submitting.




## POST
[php.net $_POST](http://php.net/manual/en/reserved.variables.post.php)

To handle the form we're going to use the PHP *superglobal* called `$_POST` which, as the name implies, goes with the method POST.

`$_POST` is an array that stores all the information from a submitted form. 

To check out how $_POST works, set up some code that will print it to the page.

In the `<body>` of demo.php:

```php
<pre>
	<?php print_r($_POST); ?>
</pre>
```

Then, fill in some names to your form and hit submit; you should see the contestants of `$_POST` dumped on the screen.

```php
	Array
	(
	   [contestant1] => Susan
	   [contestant2] => Joe
	   [contestant3] => Frank
	   [contestant4] => Bob
	   [contestant5] => Anne
	)
```

Note how the index (`contestant1`, `contestant2`, etc.) corresponds to the `name` attribute used on the inputs:

```php
<input type='text' name='contestant1'><br>
```

So far so good. At this point you should have a $_POST array full of contestant's names.

For the next exercise, you'll work on using this information to display your results.
<hr>

<em>Looking ahead: Whenever you allow users to input information on your site, you're opening yourself up to certain vulnerabilities and you'll want to sanitize entered data. We'll discuss this more later.</em>
