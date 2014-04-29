<!DOCTYPE html>
<head>
	<title>Home Remodel Calculator</title>
	<link rel="stylesheet" href="styles.css" type="text/css">
</head>

<body>

	<h1>Home Remodel Calculator</h1>
	
	Your budget: $<input type='text' name='budget'><br><br>
	
	Rooms<br>
	<select name='rooms'>
		<option value='1'>1 Rooms</option>
		<option value='2'>2 Rooms</option>
		<option value='3'>3 Rooms</option>
		<option value='4'>4 Rooms</option>
	</select>
	
	<br><br>
	
	Service (Labor Only)<br> 
	<input type='checkbox' name='service' value='300'>Paint<br>
	<input type='checkbox' name='service' value='350'>Molding<br>
	<input type='checkbox' name='service' value='600'>Flooring<br>
	<input type='checkbox' name='service' value='100'>Fixtures<br>
	<input type='checkbox' name='service' value='500'>Windows<br>
		
	<br><br>
	
	Total: $<span id='total'>0.00</span> <br><br>
	
	<div id='budget_results'></div>
	
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	
	<script>
	
		// For every service
			// Multiply the cost of that service times the # of rooms
			// Add up the running total	
	
		// Listeners
		$('input').keyup(calculate);
		$('select,input[type=checkbox]').change(calculate);
	
		// Calculation function
		function calculate() {
			
			// Data
				// How many rooms?
				var rooms     = $('select[name=rooms]').val();
				
				// What services are checked?
				var services  = $('input[type=checkbox]:checked');
				
				// What's the budget?
				var budget    = $('input[name=budget]').val();
				
				// Tabla rasa
				var total     = 0;
			
			// Loop through each checkbox
			services.each(function() {			
				total += parseInt($(this).val()) * rooms;
	  		});
	
	  		// Budget calculations
	  		if(budget != '') {
				if(total > budget) {
					var over_or_under     = 'over';
					var budget_difference = total - budget;
				}
				else {
					var over_or_under     = 'under';
					var budget_difference = budget - total;
				}
				
				$('#budget_results').html("You are " + over_or_under + " budget by $" + budget_difference);
			}
			
			$('#total').html(total);
			
		}
	
	
	</script>

<body>