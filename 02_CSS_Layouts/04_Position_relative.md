## Relative

The relative position property shift elements; It looks at where the element would be without any position properties, and then "shifts" it from that spot.

	<style>
		 #thirdImage {
			  position:relative;
			  top:-10px;
			  left:-10px;
		 }
	</style>
	
	<img src='http://placekitten.com/130/130'>
	<img src='http://placekitten.com/130/130'>
	<img src='http://placekitten.com/130/130' id='thirdImage'>


## Absolute's sidekick

	<style>
		 #wrapper {
			 border:1px solid black;
			 width:600px;
			 height:200px;
	
			 /* Setting just position relative with no 
			 top left bottom right values will let the element
			 sit just where it normally would, yet it will 
			 allow it to place nice with its absolute child */
			 position:relative;
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
