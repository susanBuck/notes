## HTML Review
HTML is a markup language consisting of about 100 tags describing the structure of your page.

[HTML Element reference](https://developer.mozilla.org/en/HTML/Element)

	<!DOCTYPE html>
	
	<html>
	<head>
		<title>Practice</title>
	</head>
	<body>
	
	</body>
	
	</html>

But this is only half the picture; HTML alone is insufficient since all it does is describe the content of a page - this is a footer, this is a paragraph, this is a list, this is the body, etc.

The missing piece of the puzzle is CSS to add style.

## What is CSS?
CSS stands for Cascading Style Sheets. The acronym will make more sense later on, so let's break it down in plain English:

>> CSS is a way to describe how the content on your page should look.

## CSS and HTML
CSS gets integrated right into your existing HTML document in a few different ways.

The first way is to just add a style attribute.

For this example, let's try the `<div>` tag. Div stands for division, and it's just a simple, generic, block that groups together pieces of your page for syling purposes.

So, say I was using a `<div>` tag to surround some text that I wanted to be blue:

	<div style='color:blue'>
		Roses are red, this text is not.
	</div>

What if I wanted to also make it bold? I can add that right to the style list (just as long as I separate them with a semicolon).

	<div style='color:blue; font-weight:bold'>
		Roses are red, this text is not.
	</div>

color is called the **property** and blue is the **value**
font-weight is also a **property** and bold is the **value**

CSS is just made up of `property:value` pairs assigned to HTML tags.
These `property:value` pairs are called **declarations**.

I could really go style crazy on this paragraph if I wanted:

	<div style='color:blue; font-weight:bold; font-family:courier; border:1px; background-color:grey; margin:10px; padding:10px;'>
		Roses are red, this text is not.
	</div>

Styles are limitless.

To see what style tags you have at your disposal, here's a full reference from the [Mozilla Developer Network](https://developer.mozilla.org/en/CSS/CSS_Reference)

## Isolating Styles
Lets look at another way we can style our HTML with CSS. 

In the above method we were using the inline technique (we were writing it inline with the HTML), which works, but an even better way is to separate it from the HTML.

Internal CSS is placed in the <head> of your document.

Lets work from our basic HTML page template:

	<!DOCTYPE html>
	<head>
		<title>A Poem</title>
	</head>
	
	<body>
		<div>
	Roses are red, this text is not.
	 	</div>
	</body>
	</html>
	
	Now, inside the <head></head> tags add this bit of code:
	
	<style>
		div {
			color:blue;
			font-weight:bold;
		}
	</style>

Some things to note about the above:

* The CSS code is nested inside a `<style>` tag.
* All the styles associated with the `<div>` tag are nested inside of an open and closing curly bracket { }
* Like inline styles, each property:value pair is separated with a semicolon;
* For neatness sake, we put each property:value pair on its own line. 

## Unique styling
The above is great, but what if I didn't want all my div's to have that same style?
In addition to applying styles to every instance of an HTML tag, you can target just specific HTML tags by giving them a class name.

	<style>
		.profit {
			color:green;
			font-weight:bold;
		}
	
		.loss {
			color:red;
			font-weight:bold;
		}
	</style>

[the above goes in the head of your document, the below goes in the body]

	<div class='profit'>
		Your profit this month was +$12.00 dollars! :) 
	</div>
	
	<div class='loss'>
		Your loss this month was -$10.00 :(
	</div>

The period in front of the class name in the style block lets it know we're targeting an element by its class name.
We can use our class names repeatedly:

	<div class='profit'>
		Your profit in August was +$12.00 dollars! :)
	</div>
	
	<div class='profit'>
		Your profit in July was +$17.55 dollars! :)
	</div>
	
	<div class='profit'>
		Your profit in June was +$147.55 dollars! :)
	</div>

## External Styles
When we apply styles externally we take the styles completely out of the page and move them into their own file. That file then gets linked back to the pages we're working on.

With **external** style sheets, we can apply the same styles to multiple pages.

Imagine this scenario:
One day you decide your site made up of 20 different pages should have a green theme instead of a blue theme. Instead of having to edit every individual page making changes, you only have to change it in your one master style sheet.

To use an external style sheet you're going to take all of the CSS code out of your HTML and put in a separate file you name with a .css extension. Because it's in a .css document, no `<style>` tag is necessary, just jump right into the CSS (see right).

Then, in the head of your HTML page, you connect that stylesheet you just created:

	<link rel='stylesheet' type='text/css' href='styles.css'>


File: index.html

	<!DOCTYPE html>
	<head>
	
		<link rel='stylesheet' type='text/css' href='styles.css'>
	
	</head>
	
	<body>
	
	  <div class='profit'> 
	    Your profit this month was +$12.00 dollars! :) 
	  </div>
	
	  <div class='loss'> 
	    Your loss this month was -$10.00 :( 
	  </div>
	
	</body>


File: styles.css

	.profit {
		color:green;
		font-weight:bold;
	}
	
	.loss {
		color:red;
	}


## Summary

![CSS Summary](http://thewc.co/images/tasks/css_three_methods_summary.png)

## Exercise: Mini Zen

[CSS Zen Garden](http://www.csszengarden.com/)

In the spirit of the CSS Zen Garden, let's create our own little mini zen.
What we'd like you to do is take the following HTML and add your own style to it with CSS.

	<!DOCTYPE html>
	<html>
	<head>
	
		<title>My Mini Zen</title>
		
	</head>
	<body>
	
		<h1>My Mini Zen</h1>
		
		<p>This page is a demonstration of what can be accomplished visually through CSS-based design.</p>
		
		<h2>Zen Facts</h2>
		<ul>
			 <li>CSS Zen Garden was created in 2003</li>
			 <li>In 2005, a book version of the site was published</li>
			 <li>The site ceased active development in 2008</li>
		</ul>
	
	</body>

[Example...](http://codepen.io/codagogy/pen/nACoE)

### Rules of the Game

You must use these properties:

* font-family
* color
* background-color
* font-size
* line-height

You should aim to use at least three other properties of your choice (but you're welcome to use more).

You can use internal or external CSS.

You can edit the HTML only to add class / ids and add your internal or external CSS code.
 
Don't stress out about making your example a beautiful work of art; the main point right now is just to get some practice applying these styles.


