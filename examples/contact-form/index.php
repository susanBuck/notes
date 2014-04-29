<!DOCTYPE html>

<head>

	<title></title>

	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
	
	<script type="text/javascript" src="/storage/code/includes/js/jquery.form.js"></script>
	
	
	<style type='text/css'>
	
	
	
	</style>

	<script type='text/javascript'>
		
		$(document).ready(function() {
		
			$('#contact-form').ajaxForm(function(data) { 
            	$('#results').html(data);
            }); 
					
		});
		
	</script>


</head>


<body>

	Note, the <a href='/storage/code/includes/js/jquery.form.js'>jquery.form.js</a> plugin is necessary for this to work.
	
	<br><br>
	
	<a href='/source/storage/code/contact-form/process.php'>View Source of process.php</a>
	
	<br><br>
	
	<form id='contact-form' action='process.php' method='post'>
		
		Name<br>
		<input type='text' name='name'>
		<br><br>
		
		Email<br>
		<input type='text' name='email'>
		<br><br>
		
		Message<br>
		<textarea name='message'></textarea>
		<br><br>
		
		<input type='submit' value='Submit'>
	
		<div id='results'></div>
	
	</form>

	
</body>

</html>