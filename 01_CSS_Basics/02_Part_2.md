<!-- https://docs.google.com/a/susanbuck.net/document/d/1xx1_8sEHrPHr20pDHWa8XdS9yzLvKDp5ZaL-UusB7jk/edit -->

## Recap
* Three methods of applying styles + the pros and cons of each
* Three methods of selecting elements (what are they and what is their syntax)




## Quirky syntax
Most values for a style declaration are pretty simple:

	color:red;

But some are more complex:

	background-image:url('http://placekitten.com/200/200');

Some work together to create a specific effect:

	background-image:url('http://placekitten.com/200/200');
	background-repeat:no-repeat;
	background-position:center;

Some values can include multiple bits of information:

	border:3px solid green;

All of these quirky little rules are outlined in the reference for each style you're working with, so don't worry about memorizing every little detail.




## Links
HTML Selectors might also have what are called CSS pseudo-classes. Links are a good example of this as they use the following pseudo-classes for their four different states: link, visited, hover, active.

This is how you can add pseudo-classes to style the `<a>` selector:

	a:link {
		color:#000000;
	 	text-decoration:none;
	}    
	a:visited {
		color:#00FF00; /* FYI: You can only set color for the visited pseudo-class */
	}
	a:hover {
		color:#FF00FF;
	}
	a:active {
		color:#0000FF;
	}

Tip about styling your link states: if you don't style them in the order shown above, you may get some unexpected results.

You can remember the order with this handy acronym: **LoVe HAte (Link, Visited, Hover, Active)**.




## Colors
CSS has a selection of named colors you can use:

	color:red;
	color:blue;
	color:yellow;
	
So on...(full list here: <http://www.147colors.com/grid/>)

But if you want full control of your color, using variations of shades, you'll need to find its hexadecimal value which is a 6 character code specifying that color.

<http://colorpicker.com> is a really simple tool that lets you figure out the hex value for the color you want.

	color:#800E2A;
	
Chrome/Firefox plugin: <http://www.colorzilla.com/>

Upload an image to get the color: <http://imagecolorpicker.com/>
	
## Fonts
Web safe fonts examples: Arial, Helvetica, Verdana, Georgia, etc. ([full list](http://www.ampsoft.net/webdesign-l/WindowsMacFonts.html))

Fancier fonts

* [Typekit](http://typekit.com) (paid) 
* [Google Web Fonts](http://www.google.com/fonts) (free) 

Font stacks

	<style>
		  .profits {
			  font-family: Garamond, Georgia, Serif;
		 }
	</style>





## Web Inspectors
* How to open
* Selecting via the elements window vs. with the magnify glass
* Crossed out styles are ones that have been overwritten
* Computed styles
* None of the changes are permanent





## Exercise

Recreate the following page:

<img src='http://making-the-internet.s3.amazonaws.com/css-basics-exercise.png?2x' width='500' style='border:1px solid black'>

### Specifications:

* Use an external style sheet.
* Background pattern image: <http://misc001.s3.amazonaws.com/cross-cross-pattern.png>
* You don't have match the exact width, height, font sizes or shades of color; just try to get as close as you can.
* Think about using the element for the job. For example, if you have a large heading, an h1 tag would be more spot-on than a generic div tag.
* This exercise is designed to get you digging through the [CSS reference list](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference); you'll want to look into some properties we haven't covered yet such as margin, padding and styling links.

<small>Solution: <http://codepen.io/wcc/pen/uwLsq></small>
