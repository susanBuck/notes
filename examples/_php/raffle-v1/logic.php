<? require_once($_SERVER['DOCUMENT_ROOT'].'/view-source/ok-to-show.php'); ?>
<?php
	# Who are our contestants? 
		$contestants["Ethel"] = "";
		$contestants["Leroy"] = "";
		$contestants["Sam"]   = "";
		$contestants["Sandy"] = "";
			
	# Pick a winning number based on how many contestants we have
		$how_many_contestants = count($contestants);
		$winning_number 	  = rand(1,$how_many_contestants);
		
	# Loop through contestants, seeing if any won 
		foreach($contestants as $key => $value) {
			
			# Generate a random number for this contestant
			$random_number = rand(1,$how_many_contestants);
			
			# See if their generated random number mathches the winning number and store the results in the $contestants array
			if($random_number == $winning_number) {
				$contestants[$key] = "Winner!";
			}
			else {
				$contestants[$key] = "Loser :(";			
			}		
		}
	?>