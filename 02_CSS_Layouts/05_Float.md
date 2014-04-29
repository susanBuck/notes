## Float
Takes an element out of the normal flow of the page and moves it as far left or right as possible.

The value options for float include `left`, `right`, or `none` (when you want to turn off floating).

~~~~
	<style>
		 div {
			  width:100px;
			  height:100px;
		 }
		 
		 #lucy {
			  background-color:OrangeRed;
			  float:left;
		 }
		 
		 #ricky {
			  background-color:black;
			  float:right;
		 }
	</style>
	
	<div id='lucy'></div>
	<div id='ricky'></div>
~~~~
What happens when you introduce a wrapper to the above example?








## Text wrapping with float

	<style>
		 img {
			  float:left;
			  padding-right:10px; /* Add a little breathing room between the text and image */
		 }
	
		 #wrapper {
			  width:500px;
		 }
	</style>
	
	<div id='wrapper'>
		 <img src='http://placekitten.com/100/100'>
		 "Therefore it was decided to start upon their journey the next morning, and the Woodman sharpened his axe on a green grindstone and had all his joints properly oiled. The Scarecrow stuffed himself with fresh straw and Dorothy put new paint on his eyes that he might see better. The green girl, who was very kind to them, filled Dorothy's basket with good things to eat, and fastened a little bell around Toto's neck with a green ribbon. They went to bed quite early and slept soundly until daylight, when they were awakened by the crowing of a green cock that lived in the back yard of the Palace, and the cackling of a hen that had laid a green egg."
	</div>
	
	


## Practice

Using floats, create a side by side list of pros and cons:

<img src='http://making-the-internet.s3.amazonaws.com/css-layouts-pro-con-float.png'>

How could you create the same design with position absolute and/or position relative?