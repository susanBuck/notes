$(document).ready(function() {
		
	/*-------------------------------------------------------------------------------------------------
	Listener for the input where users specifies number of guests
	-------------------------------------------------------------------------------------------------*/
	$('#guest-count-input').keyup(function() {
	
		// Turn off all the boxes - fresh slate
			for(var i = 1; i <= 5; i++) {
				$('#guest-' + i).css('display','none');
			}
			
		// Figure out what number was typed in
			var number = $('#guest-count-input').val();
		
		// Check and made sure they entered a valid number
		if((number < 1 || number > 5) && number != "") {

			// Inject the error message into the #error div
			$('#error').html("Enter a number between 1 and 5");
			
			// Display the #error div
			$('#error').css('display','block');
		}
		else {	
			// Turn off the errors
			$('#error').css('display','none');
					
			// Turn on the boxes
			for(var i = 1; i <= number; i++) {
				$('#guest-' + i).css('display','block');
			}
		}
	
	});			
		
		
	/*-------------------------------------------------------------------------------------------------
	Listner for the Generate button. When click it fills the invitation on the right	
	-------------------------------------------------------------------------------------------------*/	
	$('#generate-button').click(function() {
	
		// This variable will hold all our guest names
		var guests = "";
		
		// Loop through all the guest inputs
		for(var i = 1; i <= 5; i++) {
			
			// Grab what was typed in for this guest
			var guest = $('#guest-' + i).val();
			
			// If it's not blank, add it to our guests variable
			if(guest != "") {
				guests +=  guest + ", ";
			}
		}
	
		// Finally, inject the content into the invitaion on the right
		$('#guest-list').html(guests);
	
	});

			
}); // End document ready
