// This flag will help us know if we need to clear the display div
var reset_next = false;

$('button').click(function() {

	// What button was just clicked?
	var value = $(this).html();
	
	// If they clicked equal, time to do the equation...
	if(value == "=") {
	
		// Evaluate everything in the display div, coming up with a total
		var total = eval( $('#display').html() );
		
		// Inject the total back in the display div
		$('#display').html(total);
		
		// Set a flag, so the next time we know to reset the display div
		reset_next = true;
	}
	// Otherwise, they clicked a number or +/-
	else {
		// If the last time around we set this flag to be true, then we need to clear the display div
		if(reset_next) {
			$('#display').html(value);
			reset_next = false;
		}
		// Just append the number or +/- to the display div
		else {
			$('#display').append(value);
		}
		
	}
	
});
