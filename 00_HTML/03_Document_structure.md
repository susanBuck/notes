## Document structure

We've talked a lot about individual elements with specific tasks, but HTML plays in a bigger role in structuring the page as a whole.

For every HTML page you build, there's a basic template you'll follow:

	<!DOCTYPE html>
	<html>
	<head>
	
		<meta charset='utf-8'>
		
		<title>My Web Site</title>		

	</head>
	
	<body>
	
	  <!-- CONTENT TO BE DISPLAYED GOES HERE IN THE BODY -->
	 
	</body>
	
	</html>

Let's break this down...

### doctype
Doctype gives the browser information about the kind of HTML you're writing so it knows how to render it. There are many kind of doctypes, but here we're using the latest HTML5 doctype.

### Head
The head element of the page is where you specify behind the scenes information about your page, not anything that actually gets rendered on the page. 

In this template, we start off the head with the `<meta charset='utf-8'>` element followed by the `<title>` element.


### Body
The body is where content content of your page goes.

### Comments
The `<!-- -->` syntax is used for HTML comments.
Use them to organize your code, leave reminders for yourself, etc.




## View Source

In most browsers you can find the option to View Source by right clicking on the page.

[Safari instructions](http://webdesign.about.com/od/safari/a/view-source-safari.htm)




## Validator
[http://validator.w3.org/](http://validator.w3.org/)