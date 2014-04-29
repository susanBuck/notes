<? require_once($_SERVER['DOCUMENT_ROOT'].'/view-source/ok-to-show.php'); ?>
<!DOCTYPE html>

<html>

<head>

	<title>Name Reverser - Traditional POST</title>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

</head>


<body>

	<h1>Name Reverser - Traditional POST</h1>
	
	<form method='POST' action='process.php'>
	
		Enter your name:<br>
		<input type='text' name='first_name'>	
		
		<br><br>	
		<input type='submit' value='Reverse it!'>
	
	</form>
	
</body>

</html>