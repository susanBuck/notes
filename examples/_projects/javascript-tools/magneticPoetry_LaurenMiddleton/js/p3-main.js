$(document).ready(function() {
	
	//generate words
	generateNouns(nouns);
	generateVerbs(verbs);
	generateAdj(adj);
	generateHelpers(helpers);
	generatePunctuation(punctuation);
	
	
	/*sets accordion hover*/
	$(".accordion-btn").hover(function() {
		$(this).addClass("accordion-btn-hover");
	}, function() {
		$(this).removeClass("accordion-btn-hover");
	});
	
	/*sets accordion btn click*/
	$(".accordion-btn").click(function() {
		//remove all word elements in canvas that still have class temp
		$(".temp").remove();
		
		//set all btns back to default
		$(".accordion-btn").removeClass("accordion-btn-clicked accordion-btn-hover").addClass("accordion-btn-default");
		//set clicked class
		$(this).removeClass("accordion-btn-default accordion-btn-hover").addClass("accordion-btn-clicked");
		
		//find and store id of the clicked btn
		var id = $(this).attr("id");
		//store id of clicked button's content div
		var content = "#" + id + "-content";
		
		//only show accordion pane on click if it isn't already open
		if(!($(content).css("display") == "none")) {
			return;
		}
		else {
			//hide open content div
			$(".accordion-content").hide("blind", 1000);
			//show the content div that corresponds to the clicked btn
			$("#" + id + "-content").show("blind", 1000);
		}
	});
	
	/*sets dragging on accordion words*/
	$(".draggable").draggable( {
		containment: "#container",
		helper: 'clone',
		start: function(event, ui){
			//remove all word elements in canvas that still have class temp
			$(".temp").remove();
			//add class temp to current clone
			$(ui.helper).addClass('temp');
		},
		stop: function(event, ui) {
			//place and append the cloned word
			$(ui.helper).clone(true).removeClass('draggable').addClass('placed').appendTo('#canvas');
			/*sets dragging on words placed on canvas*/
			$(".placed").draggable( {
				containment: "#canvas",
				cursor: "move",
				start: function() {
					//remove all word elements in canvas that still have class temp
					$(".temp").remove();
					//make placed + dragged word trashable
					$(this).addClass("trashable");
				},
				stop: function() {
					$(this).removeClass("trashable");
				},
				opacity: 0.35,
			});
		},
		revert: "invalid",
		opacity: 0.35,
	});
	
	/*sets dropping on canvas*/
	$("#canvas").droppable( {
		accept: ".word",
		//activeClass: "ui-state-hover",
     	//hoverClass: "ui-state-active",
		drop: function() {
			//replace class temp with drop for dropped word
			$(".temp").addClass("dropped").removeClass("temp");
			//alert("dropped!");
		},
		tolerance: "fit",
	});
	
	/*sets dropping on trash*/
	$("#trash").droppable( {
		accept: ".trashable",
		//activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
		drop: function() {
			//remove all word elements in canvas that still have class temp
			$(".temp").remove();
			//remove element dropped on trash
			$(".trashable").remove();
		},
		tolerance: "pointer",
	});
	
	/*sets clear btn*/
	/*removes all placed elements on click*/
	$("#clear-btn").click(function() {
		$(".placed").remove();
	});
	
	/*sets print button*/
	//code modified from Card Generator
	$("#print-btn").click(function() {
		//remove all word elements in canvas that still have class temp
		$(".temp").remove();
    	
    	// set up blank window            
        var print_window =  window.open('','_blank','');
        
        //hide the trash element
        $("#trash").hide();         
        
        //grab the canvas contents
        var content = $('#canvas').html(); 
        
        //build html for blank window
        var html = '<html>';
        html += '<head>';
        //html += '<link rel="stylesheet" href="p3-styles.css" type="text/css">';
        html += '</head>';
        html += '<body>';
        html += content;
        html += '</body>';
        html += '</html>';     
        
        //write the html to the new window
        print_window.document.write(html);
        
        //show the trash element again
        $("#trash").show();           
    });

}); //end document ready