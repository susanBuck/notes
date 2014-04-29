<? require_once($_SERVER['DOCUMENT_ROOT'].'/view-source/ok-to-show.php'); ?>
<!DOCTYPE html>
<html>
<head>

</head>
<body>

	<label for='name'>Enter your name:</label><br>
	<input type='text' id='name'>
	<br><br>
	
	<input type='button' id='process-btn' value='Reverse!'>

	<div id='results'></div>
			
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.form.js"></script>
	
	<script>
	
		$('#process-btn').click(function() {
				
			$.ajax({
				type: 'POST',
				url: 'process.php',
				beforeSend: function() {
					// Display a loading message while waiting for the ajax call to complete
					$('#results').html("Loading...");
				},
				success: function(response) { 
		              	// Load the results we get back from process.php into the results div
					$('#results').html(response);
				},
				data: {
					name: $('#name').val(),
				},
			}); // end ajax setup
				
		}); // end process-btn wiring
			
	</script>
	
</body>
</html>
