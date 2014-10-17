## Fixed
* Specify exactly where in the browser window you want an element to land
* Set with offset properties (top, left, bottom, right)
* Positions in relation to the browser window
* Takes the element out of the normal flow of the page
* Ignore scrolling
* Good for sticky menus
* In the wild: [Fat Man Collective](http://web.archive.org/web/20130122060307/http://fat-man-collective.com/hello.php) or [Girl with a Camera](http://girlwithacamera.co.uk/)

## Example 1

	<style>   
		.simpleBox {
		    width:100px;
			height:100px;
			background-color:lightblue;
			position:fixed;
			top:0px; 
			left:100px;
		}
	</style>
	
	<div class='simpleBox'></div>
	
## Example 2
<http://codepen.io/wcc/pen/Deahi>






## Practice: Fixed menu

Let's pull this together into our first layout strategy. This will give you practice with both the fixed property and be a good refresher for some of the CSS Basics techniques.

### Goal:

<img width=150 src='http://making-the-internet.s3.amazonaws.com/css-layouts-fixed-daily-kitteh.png'>

[Enlarge...](http://making-the-internet.s3.amazonaws.com/css-layouts-fixed-daily-kitteh.png?cachebust=1)

### Specs:

* The menu should be fixed on the top left
* Path for background texture: <http://making-the-internet.s3.amazonaws.com/css-layouts-paper-texture.png>
* Path for kitten: <http://practice-pixels.s3.amazonaws.com/kitten_250x250.jpg>
* Get the code for the rounded edge from <http://css3please.com>
* Get the filler text from <http://catipsum.com>
* (Bonus) The menu links should use anchors to jump to the different stories on the page








