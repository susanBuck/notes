## Margin:auto trick

	<style>
		#wrapper {
			 border:2px solid purple;
			 background-color:lightgrey;
			 width:400px;
			 height:500px;
		
			 /* This is the magic line that will make this box always centered */
			 margin:auto;
		
			 margin-top:10px;
		}
	</style>
	<div id='wrapper'></div>

* Only works on block elements
* Only does horizontal centering, not vertical.
* For vertical centering use [this technique](http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/).
* In the wild: [Carbonmade](http://carbonmade.com/), [StackOverflow](http://stackoverflow.com)
* Common width is 960px wide
* You can substitute percentages for pixels for more flexibility




## Exercise

Classic centered container:

<img width=150 src='http://making-the-internet.s3.amazonaws.com/css-layouts-classic-centered-kitteh.png'>

[Enlarge...](http://making-the-internet.s3.amazonaws.com/css-layouts-classic-centered-kitteh.png)

* Path for background texture: <http://making-the-internet.s3.amazonaws.com/css-layouts-paper-texture.png>
* Path for kitten: <http://placekitten.com/910/400>
* Get the code for the rounded edge from <http://css3please.com>
* Get the filler text from <http://catipsum.com>
* You can create the columns with floats or with absolute positioning. What are the pros/cons of each?