
<!DOCTYPE html>

<head>

	<title>MathME</title>
	
	<?
	// If they're passing in a saved file...
	if($_GET['saved'] != "") {
			
		# Setup the file handler
			$file_name    = "saved/".$_GET['saved'].".txt";
			$file_handler = fopen($file_name, 'c+') or die("error opening file");
			$file_size    = filesize($file_name);

		# Read the contents of the file… down below we'll inject the $canvas variable in the canvas div
			$canvas = fread($file_handler, $file_size);	
	}
	?>
	
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
	<style type='text/css'>
		/* The asterisks is a wildcard character, saying apply this style to everything */
		
		/* Kill the default margin that the browser always gives our page */
		body {
			margin:30px 0px 0px 0px;
			background: #000000;
		}
		
		/* This contains all our content, making sure it's centered on the page */
		
		
		
		#wrapper {
			position:relative;
			margin:0px auto;
			width: 750px;
			height: 775px;
			/* background-color: #000000;*/
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-o-user-select: none;
			user-select: none;
	
		}
		
		#canvas {
			position: relative;
			margin: 0px; auto;
			width:700px;
			padding: 10px 10px 40px 10px;
			min-height: 600px;
			max-height: 600px;
			z-index:10;
			background-color: #FFFFFF;
			display: inline-block;
			overflow: hidden;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-o-user-select: none;
			user-select: none;
			vertical-align:bottom;
		}
		#stack {
			position:absolute;
			bottom: 10px;
			left:100px;
			font-size: 20px;
			min-width: 460px;
			max-width: 700px;
			min-height: 30px;
			max-height:30px;
			z-index: 0;
			vertical-align: bottom;
			/*background-color: gray;*/
		}
		
		
		dobj{
			display: inline-block;
			position: absolute;
			white-space: nowrap;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-o-user-select: none;
			user-select: none;
		
		}
	
		.draggable {
			display: inline-block;
			z-index: 40;
			/*max-height:40px;*/
		}
		
		#toolbar{
			position: relative;
			margin: 15px 80px;
			/*border: 1px solid red;*/
			text-align: center;
			display: inline-block;
		}
		
		#save-results {
			color:white;
			height:30px;
		}
		
		#url {
			width:400px;
		}
		
	</style>

	<script type='text/javascript'>
	
		function changeRed(clicked) {
			$('dobj').css("border", 'none');
			$(clicked).css("border", '1px dashed red');
		}
	
		/*************************************|
		|****|---------------------------|****|
		|****|-DOCUMENT.READY() FUNCTION-|****|
		|****|---------------------------|****| 
		|*************************************/
		$(document).ready(function() {
				
			 /*
			|---------------------------|
			|-GLOBAL VARIABLES FOR FxNS-|
			|---------------------------| 
			 */
			var currentSelected;
			var emptyPlace =0;
			var count = 0;
			var mathContentDiv = new Array();	
			
				
			// MAKE ELEMENTS INSIDE OF CANVAS DRAGGABLE	via array loop.	
				/*function setUp() {
					for (var i =0; i < mathContentDiv.length; i++){
						var temp = "#"+ mathContentDiv[i];
						// console.log(temp);
						$(temp).draggable({ containment:'#canvas'} );
					}
				}*/
		
		
		
		
			/* Initialize all DraggableObjects to be draggable.	*/
			$( init );	
			function init() {
				$('dobj').draggable({containment:'#canvas'} );
			}
				
				
				
		   /*
			|---------------------------|
			|-LISTENER GENERATOR BUTTON-|
			|---------------------------| 
			 */
			$('#generate-button').click( function() {  
				turnOff();
				var divName = "div"+emptyPlace;
				var divString;
				
				if (count == 0 || count % 4 == 0) {
					divString = "<dobj " + "id='" + divName +"' "  + "class='draggable' ><img src='eraser.png'> [ </dobj>";
					count++;
				}
				else if (count ==1|| count % 4 == 1) { 
					divString ="<dobj " + "id='" +divName +"' "+ "class='draggable'><img src='pointer.png'></dobj>";
					count++;
				}
				else if (count ==2|| count % 4 == 2) {
				divString ="<dobj " + "id='" +divName +"' "+ "class='draggable'>A = { < A , w > | A is Turing Machine && w is a string }</dobj>";
				count++;
				}
				
				else if (count ==3|| count % 4 == 3){
					divString ="<dobj " + "id='" +divName +"' " + "class='draggable'>a^2 + b^2 = c^2  </dobj>";
					count++;
				}
				//console.log(divString);
				$("#stack").append(divString);
				//$("#stack").wrap(divName);
				divName = "#"+divName;
				mathContentDiv[emptyPlace] = divName;
				emptyPlace++;
				currentSelected = divName;
				
				init();
				//console.log("CURRENT SELECTED:  " + divName);
				changeRed(divName);
				//setUp();
				//init(); //Start traversing array to make the elements draggable	
			});
			
	
	
	
		/*
		|--------------------------|
		|---SELECT DIV ON CLICK----|
		|--------------------------| 
		*/
			$('.canvas-click').click( function() { 	
				turnOff();
				$(".draggable").click( function(e) {
					e.stopPropagation();
					changeRed(this);	
					var divName = '#' + $(this).attr('id'); // returns "myDiv".
					currentSelected = divName;
					//console.log("Child - RED" + divName);
					});
				});
			
			/* Helper Method to turn off all borders */
			function turnOff() {
				$('dobj').css("border", 'none');
				currentSelected = null;
				//console.log("in Turn OFF: " + currentSelected);
			}
		
	
		/*
		|---------------------------|
		|--DESELECT CANVAS BUTTON---|
		|---------------------------| 
		*/
			$('#deselect-button').click( function() { 
				turnOff();
			});
			
		/*
		
		/*
		|-----------------------------------|
		|---REMOVE SELECTED CANVAS BUTTON---|
		|-----------------------------------| 
		*/
			$('#remove-selected-button').click( function() { 
				//console.log(currentSelected);
				mathContentDiv = jQuery.removeFromArray(currentSelected, mathContentDiv);
				$(currentSelected).remove();
				turnOff();
				var i =0;
				/*while (mathContentDiv[i] != null){
					console.log(i + ": " +mathContentDiv[i]);
					i++;
				}*/
				
			});
		
		/*	
		|---------------------------|
		|-INCREASE FONT SIZE BUTTON-|
		|---------------------------| 
		*/
			$('#plus-size-button').click( function() { 
				//console.log(currentSelected);
				if(currentSelected != null){
					var currentSize = $(currentSelected).css('font-size');
					var finalNum = parseFloat(currentSize, 10);
					//var stringEnding = currentSize.slice(-2);		
					//console.log(currentSize);
					//console.log(finalNum);
					//console.log("px");
					finalNum++;
					if (finalNum > 40){
						finalNum = 40;
					}
					var newSize =  finalNum + "px";
					//console.log(newSize);
					$(currentSelected).css('font-size', newSize);
					currentSize = $(currentSelected).css('font-size');
					//console.log(currentSize);
				}
			});
				
		/*
		|---------------------------|
		|-DECREASE FONT SIZE BUTTON-|
		|---------------------------| 
		*/
			$('#minus-size-button').click( function() { 
				//console.log(currentSelected);
				if (currentSelected != null){
					var currentSize = $(currentSelected).css('font-size');
					var finalNum = parseFloat(currentSize, 10);
					//var stringEnding = currentSize.slice(-2);		
					//console.log(currentSize);
					//console.log(finalNum);
					finalNum--;
					if (finalNum < 14){
						finalNum = 14;
					}
					var newSize =  finalNum++ +"px";
					//console.log(newSize);
					$(currentSelected).css('font-size', newSize);
					currentSize = $(currentSelected).css('font-size');
					//console.log(currentSize);
				}
				
			});
								
		/*
		|---------------------------|
		|-----RESET CANVAS BUTTON---|
		|---------------------------| 
		*/
			$('#reset-button').click( function() { 
				turnOff();
				for (var i = 0; i<mathContentDiv.length; i++) {
					//console.log(mathContentDiv[i]);
					mathContentDiv[i] = null;
					//console.log(mathContentDiv[i]);
			}
				emptyPlace = 0;
				count = 0;	
			/*	console.log(currentSelected);
				console.log(count);
				console.log(emptyPlace);
			*/
				$("dobj").remove("");
				 mathContentDiv = new Array();
			});
				
			
		$('#save-button').click( function() {
					
			$.ajax({
				url: 'save.php',
				data: { 
					canvas: $('#canvas').html(), 		
					},
				success: function(data) { 
					$('#save-results').html(data);
				}
			});
	
		});
			
				
		/*
		|--------------------------------|
		|---REMOVE FROM ARRAY FUNCTION---|
		|--------------------------------| 
		*/
		jQuery.removeFromArray = function(value, arr) {
   			 return jQuery.grep(arr, function(elem, index) {
        		return elem !== value;
   			 });
		};
			
			
		/********************************|
		|****|----------------------|****|
		|****|-END DOCUMENT.READY()-|****|
		|****|----------------------|****| 
		|********************************/
		}); 
		
	</script>
</head>


<body>
		
		<div id='wrapper'>
			<div id='canvas' class='canvas-click'><div id='stack' ><?=$canvas?><b>Stack:</b></u></div></div> <!--End CANVAS-->	
			<div id="toolbar">
				<input type='button' id='generate-button' value='Generate'>
				<input type='button' id='deselect-button' value='Deselect'>
				<input type='button' id='remove-selected-button' value='Remove Selected'>
				<input type='button' id='plus-size-button' value='Increase Size'>
				<input type='button' id='minus-size-button' value='Decrease Size'>	
				<input type='button' id='save-button' value='Save'>	
				<input type='button' id='reset-button' value='Reset Canvas'>
				<br><br>
				<!-- The results of our ajax call save will go here -->
				<div id='save-results'></div>
				
			</div>
		</div><!--End WRAPPER-->
</body>

</html>
