## Setup

### Viewport

Put in the `<head>` of your HTML; enables use of media queries for cross-device layouts.

	<meta name="viewport" content="width=device-width, initial-scale=1">

### Border Box
	
	*, *:before, *:after {
	  -moz-box-sizing: border-box;
	  -webkit-box-sizing: border-box;
	  box-sizing: border-box;
	}
		

## Media Queries

>> A media query consists of a media type and at least one expression that limits the style sheets' scope by using media features, such as width, height, and color. Media queries, added in CSS3, let the presentation of content be tailored to a specific range of output devices without having to change the content itself. - [MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries)

Example:

	@media (max-width: 640px) { 
		aside { 
			display:none; 
		} 
	}
	



## Practice

<img src='http://making-the-internet.s3.amazonaws.com/css-layouts-kitten-media-queries.png?@2x' class='' style='width:841px; height:503px' alt=''>

[Solution...](http://codepen.io/wcc/pen/aAwyb)


## REM expressions

	@media (max-width: 40rem) { 
		aside { 
			display:none; 
		}
	}

Pixel width / 16 = rem

Example: 640px = 40rem

[Px to Em Calculator](http://pxtoem.com)



## Tools

* [Responsive design bookmarklet](http://responsive.victorcoulon.fr/#)
* [Ish](http://bradfrostweb.com/demo/ish/)
* [Responsinator](http://www.responsinator.com/)
* [Ruler Guides](http://mark-rolich.github.io/RulersGuides.js)


## Grids

* [PureCSS Grids](http://purecss.io/grids/)

<img src='http://making-the-internet.s3.amazonaws.com/css-layouts-purecss-grid-demo.png?@2x' class='' style='width:862px; height:488px' alt=''>

[Solution...](http://codepen.io/wcc/pen/nKaAm)




## Readings

[Grid: A simple guide to responsive design](http://www.adamkaplan.me/grid/)


