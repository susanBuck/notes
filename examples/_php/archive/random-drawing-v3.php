<? require_once($_SERVER['DOCUMENT_ROOT'].'/ok-to-show.php'); ?>
<!DOCTYPE html>

<head>

	<?
	require_once("DB.php");
	
	# When debugging, we can print_r the $_POST. Now, it's commented out because we don't need it.
	//print_r($_POST);
	
	# Only do the following if we have $_POST variables. i.e, if the form has been submitted
	if($_POST) {
	
		# Pick and print a winning number 
			$how_many_contestants = count($_POST);
			$winning_number 	  = rand(1,$how_many_contestants);
			
		# Loop through contestants, seeing if any won
		# $index will be the name of the input field such as "conestant1" or "contestant2"
		# $value will be whatever was typed into that field - so in this case, a name
			foreach($_POST as $index => $value) {
					
				# Generate a random number
					$random_number = rand(1,$how_many_contestants);
					
				# See if their generated random  number mathches the winning number
				
					# First, we use this test to make sure the field was actually filled in and is not blank
					if($value != "") {
						if($random_number == $winning_number) {
							# Note how we're storing our results in an array called $contestants. Again, $value is the name that was typed in.
							$contestants[$value] = "Winner";
							$winner = 1;							
						}
						else {
							$contestants[$value] = "Loser";			
							$winner = 0;
						}	
						
					 	
						# Create an array called data with the info we'll insert into the database. 
						# Note how the index names match up with our field names in the database
						$data['first_name'] = $value;
						$data['winner']     = $winner;
						
						# The DB method "insert" requires two bits of information
						# 1. The table you're inserting to
						# 2. An array of data to insert
						DB::instance()->insert('susan_contestants', $data);
					 	
					 	
					 	
					}					
			} 
	} 
	?>
	
</head>


<body>
	
	<!-- Our form to accept new contestants -->
		<form method='POST' action='random-drawing-v3.php'>
			Enter 5 contestants<br>
			<input type='text' name='contestant1'><br>
			<input type='text' name='contestant2'><br>
			<input type='text' name='contestant3'><br>
			<input type='text' name='contestant4'><br>
			
			<input type='submit' value='Pick a winner!'><br>
		</form>	
	
	
	<!-- Print the results only if we have $_POST. i.e. if the form was submitted -->
		<? if($_POST) { ?>
		
			The winning number is <?=$winning_number?>!<br><br>
				
			<? foreach($contestants as $index => $value) { ?>
				<?=$index?> is a <?=$value?><br>
			<? } ?>
	
		<? } ?>	
	
</body>

</html>