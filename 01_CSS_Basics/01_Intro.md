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

But this is only half the picture; HTML alone is insufficient since all it does is describe the content of a page &mdash; this is a footer, this is a paragraph, this is a list, this is the body, etc.

The missing piece of the puzzle is CSS to add style.




## What is CSS?
CSS stands for **Cascading Style Sheets**. The acronym will make more sense later on, so let's break it down in plain English: *CSS is a way to describe how the content on your page should look.*




## Inline CSS
CSS gets integrated into your existing HTML document in a few different ways.

The first way is to add a style attribute to your HTML elements.

For example:

	<p style='color:blue'>
		Roses are red, this text is not.
	</p>

And another:

	<div style='color:blue; font-weight:bold'>
		Roses are red, this text is not.
	</div>

In these examples, `color` is called the **property** and `blue` is the **value**.

`font-weight` is also a **property** and `bold` is the **value**.

CSS is made up of `property:value` pairs called **declarations**.
Each declaration is separated by a semicolon.

You can add an unlimited amount of declarations:

	<div style='color:blue; font-weight:bold; font-family:courier; border:1px; background-color:grey; margin:10px; padding:10px;'>
		Roses are red, this text is not.
	</div>

To see what style tags you have at your disposal, here's a full reference from the [Mozilla Developer Network](https://developer.mozilla.org/en/CSS/CSS_Reference)



## Internal CSS
 
In the above method we were using *inline* CSS (we were writing it inline with the HTML), which works, but an even better way is to separate your CSS from the HTML.

Internal CSS is placed in the `<head>` of your HTML document.

	<!DOCTYPE html>
	<head>
		<title>A Poem</title>
		
		<style>
			p {
				color:blue;
				font-weight:bold;
			}
		</style>
	</head>
	
	<body>
		<p>
			Roses are red, this text is not.
	 	</p>
	</body>
	
	</html>
	
Some things to note about the above:

* The CSS code is nested inside a `<style>` tag.
* All the style declarations associated with the `<p>` elements are nested inside of an open and closing curly bracket `{` `}`
* Here we're using a **type selector** because we're selecting all elements of the type `p`. 
* Like inline styles, each *property:value* pair is separated with a semicolon `;`
* For neatness sake, each *property:value pair* is on its own line. 




## Class selectors
The above is great, but what if you didn't want all the paragraphs to have that same style?

In addition to applying styles to every instance of an HTML tag, you can select just specific HTML tags by giving them a class name.

In the head of your HTML document:

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

In the body of your HTML document:

	<p class='profit'>
		Your profit this month was +$12.00 dollars.
	</p>
	
	<p class='loss'>
		Your loss this month was -$10.00.
	</p>

The period in front of the class name specifies that you're selecting an element by its class name.

You can use class names repeatedly:

	<p class='profit'>
		Your profit in August was +$12.00 dollars.
	</p>
	
	<p class='profit'>
		Your profit in July was +$17.55 dollars.
	</p>
	
	<p class='profit'>
		Your profit in June was +$147.55 dollars.
	</p>

A *class* selector is just one of 7 different CSS selectors. Check out [CSS Vocabulary](http://pumpula.net/p/apps/css-vocabulary/) for examples of other selectors.




## External Styles

The third method of styling involes moving all your style definitions into their own file, which then gets linked back to the HTML document.

With **external** style sheets, you can apply the same styles to multiple pages.

Imagine this scenario:
One day you decide your site made up of 20 different pages should have a green theme instead of a blue theme. Instead of having to edit every individual page making changes, you only have to change it in your one master style sheet.

To use an external style sheet you're going to take all of the CSS code out of your HTML and put in a separate file you name with a `.css` extension. Because your CSS code is in a `.css` document, no `<style>` tag is necessary, just jump right into the CSS.

Then, in the head of your HTML page, you connect that stylesheet you just created:

	<link rel='stylesheet' type='text/css' href='styles.css'>


Your HTML document should look like this:

	<!DOCTYPE html>
	<head>
	
		<link rel='stylesheet' type='text/css' href='styles.css'>
	
	</head>
	
	<body>
	
	  <p class='profit'> 
	    Your profit this month was +$12.00 dollars! :) 
	  </p>
	
	  <p class='loss'> 
	    Your loss this month was -$10.00 :( 
	  </p>
	
	</body>


Your CSS document/style sheet should look like this:

	.profit {
		color:green;
		font-weight:bold;
	}
	
	.loss {
		color:red;
	}


## Summary

![CSS Summary](http://thewc.co/images/tasks/css_three_methods_summary.png)



