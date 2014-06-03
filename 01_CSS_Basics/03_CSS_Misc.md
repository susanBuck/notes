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

All of these quirky little rules are outlined in the [reference](https://developer.mozilla.org/en/CSS/CSS_Reference) for each style you're working with, so don't worry about memorizing every little detail.




## Links
HTML Selectors might also have pseudo-classes. Links are a good example of this as they use the following pseudo-classes for their four different states: link, visited, hover, active.

This is how you can add pseudo-classes to style the `<a>` element:

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



