/*-------------------------------------------------------------------------------------------------
Color picker
-------------------------------------------------------------------------------------------------*/
$('.colors').click(function() {

	// Figure out which color we should use
	var chosen_color = $(this).css('background-color');

	// Change the background color of the canvas
	$('#canvas').css('background-color', chosen_color);
	
	// Also change the texture choices
	$('.textures').css('background-color', chosen_color);

});	


/*-------------------------------------------------------------------------------------------------
Texture picker
-------------------------------------------------------------------------------------------------*/
$('.textures').click(function() {

	// Figure out which image we should use
	var chosen_texture = $(this).css('background-image');
	
	// Change the background image of the canvas
	$('#canvas').css('background-image', chosen_texture);

});	


/*-------------------------------------------------------------------------------------------------
Message
-------------------------------------------------------------------------------------------------*/
$('.messages').click(function() {

	 // Which radio button was clicked?
	 // (Note here how we're storing a whole element in a variable... cool, huh?)
	 var radio_button = $(this);

	 // What is the label next to (i.e. after) that radio 
	 var label = radio_button.next();

	 // Now that we know the label, grab the text inside of it (That's our message!)
	 var message = label.html();
		
	$('#message-output').html(message);
	
});


/*-------------------------------------------------------------------------------------------------
Recipient
-------------------------------------------------------------------------------------------------*/
$('#recipient').keyup(function() {

	// Figure out what the user typed in
	var recipient = $(this).val();
	
	// Inject the recipient into the output div on the card
	$('#recipient-output').html(recipient);
	
	// How long was the recipient?
	var length = recipient.length;
	
	// If it was 14 characters, that's the max, so inject an error message
	if(length == 14) {
		$('#recipient-error').html("Max characters: 14");
	}
	// Otherwise, we're all good, clear the error message
	else {
		$('#recipient-error').html("");
	}
	
	// Note: The "maxlength" attribute on the HTML element will prevent the user from entering more than 14 characters
	// <input type='text' id='recipient' maxlength="14"> 
	
});

	
/*-------------------------------------------------------------------------------------------------
Stickers
Note here we use the .on() method instead of just .click()
This is because we want this listener to also apply to the Google Image Stickers which are
added *after* the page loads. In order to do this, on has to be used, and we have to delegate the
listening for .stickers to the #controls div.
-------------------------------------------------------------------------------------------------*/	
$('#controls').on('click', '.stickers', function() {

	// Clone the sticker that was clicked
	var new_sticker = $(this).clone();
	
	// A class so we can position stickers on the
	new_sticker.addClass('stickers_on_card');
	
	// Inject the new image into the canvas
	$('#canvas').prepend(new_sticker);
	
	// Make that puppy draggable
	new_sticker.draggable({containment: '#canvas', opacity:.35});
		
});


/*-------------------------------------------------------------------------------------------------
Sticker search with Ajax!
https://developers.google.com/image-search/v1/jsondevguide#using_json
http://api.jquery.com/jQuery.getJSON/
-------------------------------------------------------------------------------------------------*/
$('#sticker-search-btn').click(function() {

	// First, clear out the results div in case we've already done a search
	// FYI- The results div is where the new stickers go...so if we've done this search before, it wouldn't be empty
	$('#sticker-search-results').html('');

	// What search term did the user enter?
	var search_term = $('#sticker-search').val();
		
	// This is the URL for Google Image Search that we'll make the Ajax call to
	var google_url = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&imgsz=medium&q=' + search_term + '&callback=?';	
		
	// getJSON is a Ajax method provided to us by jQuery
	// It's going to make a call to the url we built above, and let us work with the results that Google sends back
	// Everthing in the function below is what will occur when getJSON is done and sends us the results back from Google
	$.getJSON(google_url, function(data){
	
		// This line will basically parse the data we get back from Google into a nice array we can work with
	    var images = data.responseData.results;
	
		// Only attempt to do the following if we had images...I.e there was more than 0 images
	    if(images.length > 0){
			
			// .each() is a jQuery method that lets us loop through a set of data. 
			// So here our data set is images
			// Essentially we're unpacking our images we got back from Google
	        $.each(images, function(key, image) {
	        
	        	// Create a new image element
	        	var new_image_element = "<img class='stickers circular' src='" + image.url + "'>";
	        	
	        	// Now put the new image in our results div
	            $('#sticker-search-results').prepend(new_image_element);
	
	        });
	    }	   
	});			
});
	
	
/*-------------------------------------------------------------------------------------------------
Start over
-------------------------------------------------------------------------------------------------*/
$('#refresh-btn').click(function() {
	
	// Reset color and texture
	$('#canvas').css('background-color', 'white');
	$('#canvas').css('background-image', '');
	
	// Clear message and recipient divs
	$('#message-output').html("");
	$('#recipient-output').html("");
		
	// Remove any stickers
	$('.stickers_on_card').remove();

});


/*-------------------------------------------------------------------------------------------------
Print
-------------------------------------------------------------------------------------------------*/
$('#print-btn').click(function() {
	
	// Goal: Open the card in a new tab
   
    // Take the existing card on the page (in the #canvas div) and clone it for the new tab
    var canvas_clone = $('#canvas').clone();
        
    /* 
    Next, we need to get the HTML code of the card element
    We can't just say canvas.html() because that will get us the stuff *inside* the #canvas:
    
    	<div id="message-output"></div>
		<div id="recipient-output"></div>
		
	Think of a turkey sandwich. The above gets us just the inside of the sandwich, the turkey... But we need the bread too.
		
    I.e., this is what we want:
    
   		<div id="canvas" style="background-image: url(images/texture-cloth.png);">
			<div id="message-output"></div>
			<div id="recipient-output"></div>
		</div> 
    
    To accomplish this we'll use a new method .prop (short for property) and request the "outerHTML" property of the canvas.
    In JavaScript land, "outerHTML" is both the bread and the meat of an element. 
    (Don't let it confuse you, the name outerHTML sounds kinda like it would just be the bread...it's not...it's the whole sammie).
    */
    var canvas = canvas_clone.prop('outerHTML'); // Give us the whole canvas, i.e the bread and the meat, i.e the complete card from our clone
    	    
    // Now that we have the entire canvas let's focus on creating our new tab
    
    // For the new tab, we need to basically construct all the pieces we need for any HTML page starting with a start <html> tag.
    var new_tab_contents  = '<html>';
    
    // (Note the += symbol is used to add content onto an existing variable, so basically we're just adding onto our new_tab_contents variable one line at a time)
    new_tab_contents += '<head>';
    new_tab_contents += '<link rel="stylesheet" href="css/main.css" type="text/css">'; // Don't forget your CSS so the card looks good in the new tab!
    new_tab_contents += '<link rel="stylesheet" href="css/features.css" type="text/css">';
    new_tab_contents += '</head>';
    new_tab_contents += '<body>'; 
    new_tab_contents += canvas; // Here's where we add the card to our HTML for the new tab
    new_tab_contents += '</body></html>';
    
	// Ok, our card is ready to go, we just need to work on opening the tab
    
    // Here's how we tell JavaScript to create a new tab (tabs are controlled by the "window" object).
    var new_tab =  window.open();

	// Now within that tab, we want to open access to the document so we can make changes
    new_tab.document.open();
    
    // Here's the change we'll make: we'll write our card (i.e., new_tab_contents) to the document of the tab
    new_tab.document.write(new_tab_contents);
    
    // Then close the tab. This isn't actually closing the tab, it's just closing JS's ability to talk to it.
    // It's kind of like when you're talking to a walkie-talkie and you say "over and out" to communicate you're done talking
    new_tab.document.close();
    		
});


