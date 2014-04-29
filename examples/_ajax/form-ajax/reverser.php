<? require_once($_SERVER['DOCUMENT_ROOT'].'/view-source/ok-to-show.php'); ?>
<!DOCTYPE html>
<html>
<head>

</head>
<body>

	<form>
		<label for='name'>Enter your name:</label><br>
		<input type='text' name='name'><br><br>
		<input type='submit' value='Reverse It!'>		
	</form>
	
	<div id='results'></div>
			
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript" src="jquery.form.js"></script>
	
	<script>
			
		// First, set up the options for the ajax submission	
		var options = { 
			type: 'post',
			url: 'process.php',
			success: function(response) { 
			    // Load the results recieved from process.php into the results div
				$('#results').html(response);	    
			} 
		}; 
	
		// Then attach the ajax form plugin to this form so that when it's submitted, 
		// it will be submitted via ajax	
		$('form').ajaxForm(options);
				
	</script>
	
</body>
</html>
