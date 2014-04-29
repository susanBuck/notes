## Start
Create a blank document (ex: `test.html`) in your code editor, and load it in the browser.

## What is HTML?

* **H**yper**T**ext **M**arkup **L**anguage
* Put together and maintained by the [W3 Consortium](http://www.w3.org/)
* Looking towards HTML5
* The role of CSS
* Elements
* HTML consists of **elements** that give the browser instructions on how a page is structured
* Elements are made up of **tags**, ex: `<header>`, `<p>`

## Non-void Elements
Some elements surround content. When they do, they have a start tag and an end tag.
Here the [emphasis element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em) surrounds text to indicate emphasis.

	Registration forms are due <em>August 9th</em>.

The forward slash in the second tag indicates it's the **end tag**.

## Void Elements
Other elements don't surround content, they live all by themselves.
Here the [break element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br) is used on its own to add new lines:

	First, I'll go to the store<br>
	Then, I'll go to the movies<br>
	Finally, I'll take a nap<br>
	
## White Space
HTML ignores all spaces (past 1) and breaks
If you want to add blank spaces you have to specify with an [HTML entity](http://www.w3schools.com/tags/ref_entities.asp): `&nbsp;`

List of HTML entities: <http://nice-entity.com>

If you want line breaks you have to use elements such as `<br>`, `<div>` or `<p>`


## Tag teamwork
Some tags work together with other tags
An `<ul>` ([unordered list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)) tag teams up with `<li>` ([list item](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li)) tags

	Some of my favorite things about Philadelphia (in no particular order)

	<ul>
	  <li>The Phillies</li>
	  <li>Great restaurants</li>
	  <li>Wissahickon Park</li>
	  <li>All those great potholes</li>
	</ul>

Or the `<ol>` (ordered list)

	My favorite things about Philadelphia, in order from most to least

	<ol>
	  <li>The Phillies</li>
	  <li>Great restaurants</li>
	  <li>Wissahickon Park</li>
	  <li>All those great potholes</li>
	</ol>


## Nesting
In these two examples we see tags can be nested inside each other, applying multiple tags at once. 
When nesting tags they need to be opened and closed in the same order.

Good! 

	<p>
		<em>
			Reports due today.
		</em>
	</p>

Uh oh:

	<p>
		<em>
			Reports due today.
		</p>
	</em>

HTML code can get messy quick, so note how elements that are nested inside of one another are tabbed over. 
This helps create hierarchy in your code so it's easier to scan.



## Tag Reference

* [MDN Element reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element?redirectlocale=en-US&redirectslug=HTML%2FElement)
* Elements to avoid
* Obsolete / deprecated elements
* Elements new for HTML5
* Semantic elements



## Attributes
Some start tags have **attributes** to describe information about that element.

Example, the `<a>` element ([anchors](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) i.e., links) has the `href` attribute which dictates where a link should go.


~~~~
<a href='http://wikipedia.org'>The Free Encyclopedia</a>
~~~~

`target` might specify a link should open in a new tab

~~~~
<a href='http://wikipedia.org' target='_blank'>vThe Free Encyclopedia</a>
~~~~

Images have a `src` attribute to specify the image's location

~~~~
<img src='http://placekitten.com/200/200'>
~~~~

The `alt` attribute is required for non-decorative images:

~~~~
<img src='http://placekitten.com/200/200' alt='Adorable kitten'>
~~~~


## Linked Image Challenge

How could you use nesting to combine `<a>` and `<img>` to make a linked image?



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

## Practice
Render a poem (any poem will do) in a complete HTML page. Incorporate some of the elements we've covered so far (images, links, lists, etc.) as well as some we didn't cover that you found in the docs.

