<? require_once($_SERVER['DOCUMENT_ROOT'].'/view-source/ok-to-show.php'); ?>
<!DOCTYPE html>
<html>
<head>

	<?php
	# Include our database helper
	require_once("db.php");
		
	# Build a query to get a history of the Raffle
	$sql = "SELECT * FROM susan_contestants";
	
	# Run the query...store the results in $history, which we'll print down in the body
	$history = select_rows($sql);
	
	# Only do the following if we have $_POST variables. i.e, if the form has been submitted
	if($_POST) {
	
		# Prevent SQL Injection attacks
		$_POST = sanitize($_POST);
	
		# Pick and print a winning number 
			$how_many_contestants = count($_POST);
			$winning_number 	  = rand(1,$how_many_contestants);
			
		# Loop through contestants, seeing if any won
		# $input_name will be the name of the input field such as "contestant1" or "contestant2"
		# $value will be whatever was typed into that field
			foreach($_POST as $input_name => $value) {
					
				# Generate a random number
					$random_number = rand(1,$how_many_contestants);
					
				# See if their generated random  number mathches the winning number
				
					# First, we use this test to make sure the field was actually filled in and is not blank
					if($value != "") {
						if($random_number == $winning_number) {
							$results = 1;
							
							# $value is the name that was typed in.
							$contestants[$value] = "Winner";
						}
						else {
							$results = 0;
							$contestants[$value] = "Loser";			
						}	
						
						# Save the results in the database
						
						# Build the query
						$sql = "INSERT INTO susan_contestants (first_name, winner) VALUES ('".$value."', '".$results."')";

						# Run the query
						query($sql);
					
					}
				
			} 
	} 
	?>
	
</head>


<body>
	
	<!-- Our form to accept new contestants -->
		<form method='POST' action='raffle_v3.php'>
			Enter the contestants<br>
			<input type='text' name='contestant1'><br>
			<input type='text' name='contestant2'><br>
			<input type='text' name='contestant3'><br>
			<input type='text' name='contestant4'><br>
			
			<input type='submit' value='Pick a winner!'><br>
		</form>	
	
	
	<!-- Print the results only if we have $_POST. i.e. if the form was submitted -->
		<?php if($_POST): ?>
		
			The winning number is <?=$winning_number?>!<br><br>
				
			<?php foreach($contestants as $index => $value): ?>
				<?=$index?> is a <?=$value?><br>
			<?php endforeach; ?>
	
		<?php endif; ?>
		
	<h2>History</h2>
	<?php foreach($history as $key => $value): ?>

		<?=$value['first_name']?> was a 
		
		<?php if($value['results'] == 1): ?>
			Winner
		<?php else: ?>
			Loser
		<?php endif; ?>
		
		<br>
	
	<?php endforeach; ?>	
	
</body>

</html>