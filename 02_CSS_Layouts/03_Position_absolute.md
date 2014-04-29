## Absolute

* Positions elements relative to their parent element
* If there is no parent element, then it positions according to the browser
* Uses the offset properties (top, left, bottom, right)
* Only works if the parent element has a position property set (fixed, absolute, relative will work...static will not)
* An absolutely positioned element is taken out of the normal flow of the page

Example:

	<style>
	    #wrapper {
			 border:1px solid black;
			 width:600px;
			 height:200px;
			 position:fixed;
			 top:50px;
			 left:50px;
		 }
		 
		 #simpleBox {
			 background-color:lightblue;
			 width:50px;
			 height:50px;
			 position:absolute;
			 top:25px;
			 left:50px;
		 }
	</style>
	    
	<div id='wrapper'>
		<div id='simpleBox'></div>
	</div>
