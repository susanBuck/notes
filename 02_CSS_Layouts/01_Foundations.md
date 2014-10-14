## CSS Basics Recap
CSS styles are made up of `property:value;` pairs called **declarations**. Ex: `color:red;`

CSS is used with HTML via three techniques:

### Inline

	<div style='color:red;'>

### Internal 
In your document between the head tags: 

	<head>
		<style>
		
		div { 
			color:red;
		}
		
		</style>
	</head>

### External

	<link rel='stylesheet' type='text/css' href='styles.css'>

## Selecting elements

Select by element:

	div { 
		color:red;
	}
	
Select by class:

	.profits { 
		color:green;
	}
	
Select by ID:

	#footer {
		color:green;
	}



	
## Why layouts are tricky

<img src='http://making-the-internet.s3.amazonaws.com/css-layouts-sketch.png'>

Basic styling: colors, fonts, borders...easy

Layouts: more complex

These are the properties used layouts:

* position (static, absolute, relative or fixed)
* top, left, bottom, right
* margin
* padding
* float (left, right)
* clear (left, right or both)

[CSS Cheat Sheet](http://thewc.co.s3.amazonaws.com/challenges/css-layouts-cheat-sheet.png)


## Containers

What would the code for this layout look like?

<img src='http://thewc.co.s3.amazonaws.com/challenges/css-layouts-wireframe.png'>

([Final code...](http://gist.github.com/susanBuck/6315301/raw/531b9055083d2a3ae177cc1fe97c55ba0ba31718/containers-and-nesting-elements-example.html))


* Parent-child relationships
* Everything is a box
* Neat code
* HTML5 

	* [`<header>`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)
	* [`<nav>`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
	* [`<section>`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/section)
	* [`<footer>`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer)
	* [`<aside>`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside)

* Resources for HTML5 section elements
	* [MDN Sections and Outlines](http://developer.mozilla.org/en-US/docs/Web/HTML/Sections_and_Outlines_of_an_HTML5_document?redirectlocale=en-US&redirectslug=HTML%2FSections_and_Outlines_of_an_HTML5_document): 
	* [HTML5 Element Flowchart](http://html5doctor.com/downloads/h5d-sectioning-flowchart.pdf)

Note: IE8 and below does not support these HTML5 section elements. To address this, simply paste this code in the head of your page:

	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

[More details...](http://net.tutsplus.com/tutorials/html-css-techniques/html5-and-css3-without-guilt/)




## Block elements

Examples:
`<p>`, `<div>`, `<form>`, `<header>`, `<nav>`, `<section>`, `<aside>`, `<ul>`, `<li>`, `<h1>`

Rules:

* Block elements stretch out, width-wise. They'll take up as much space is available unless you set a specific width
* Unless you specify a height, a block element will be as tall as the content inside of it (with the exception of floated or positioned content&mdash; more on that later)
* Block elements always start on a new line, thus they stack one on top of each other
* Block elements can have margins and padding




## Inline elements

Examples:
`<a>`, `<span>`, `<strong>`, `<em>`, `<i>`, `<cite>`, `<mark>`

Rules:

* Inline elements flow with text; they're kind of like the highlighter marker of HTML
* Inline elements can have content to the left and right (as opposed to block elements that always live on their own line)
* Inline elements ignores top and and bottom margin settings, but will use left and right margin settings
* Inline elements can have padding
* Inline elements ignore width and height settings



## Box sizing

<http://css-tricks.com/international-box-sizing-awareness-day/>

	*, *:before, *:after {
	  -webkit-box-sizing: border-box; 
	  -moz-box-sizing: border-box; 
	  box-sizing: border-box;
	}


## position: static

* Neutral, no-position position property; it abides by what we call the normal flow of the page.
* Normal flow of the page = word processor style layout
* Default position if you don't specify a position
* Don't see static used often, but useful if you ever need to &ldquo;reset&rdquo; a position back to the default

