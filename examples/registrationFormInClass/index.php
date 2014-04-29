<!-- OKTOSHOW -->
<html>

<head>

	<title>Registration</title>

	<!-- INCLUDES -->
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/mootools/1.3.0/mootools-yui-compressed.js"></script>
		<script type="text/javascript" src="registration_functions.js"></script>
	
		<link type="text/css" rel="stylesheet" href="registration_styles.css">
		
		<?
		require_once($_SERVER['DOCUMENT_ROOT']."/classes/code/includes/db_classdemos.php");
		?>
	


</head>

<body>

<?

# Has the form been submitted?
if($_POST) {

	# Load variables
	$fname       = $_POST['fname'];
	$email       = $_POST['email'];
	$password    = $_POST['password'];
	$description = $_POST['description'];
	$updates     = $_POST['updates'];
	
	# Check if this firstName is available
	$sql = "SELECT fname FROM `bookClub_users` WHERE fname = '$fname'";
	$row = mysql_fetch_array(mysql_query($sql));

	$firstNameFound = $row['fname'];
	
	# Fail
	if($firstNameFound == $fname) {
		echo "fail";
		
		// Show form
		$displayForm = "block";
	}
	# Pass
	else {
		echo "Success!";
		
		// Hide form
		$displayForm = "none";
		
		$sql    = "INSERT INTO `bookClub_users` (fname, email, password, description, updates) VALUES ('$fname','$email','$password','$description','$updates')";
		$result = mysql_query($sql) or die(mysql_error()."<br>".$sql);
	}

}

?>

<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>

<form id='myForm' style='display:<?=$displayForm?>' method='post'>

	Name: <input name='fname' type='text'><br/><br/>
	
	Email: <input onBlur='checkEmail()' style='position:absolute; z-index:2;' id='email' name='email' type='text'>
	<div id='email_check' style='position:absolute; top:52px; left:194px; z-index:1' class='checkMark'>&#10003;</div>
	
	<br/><br/>
	<span class='error' id='email_error'>Error</span><br/>
	
	Password: <input id='password' name='password' type='password'><br/>
	Password again: <input id='passwordAgain' name='passwordAgain' type='password' onBlur='checkPassword()'>
	<span class='error' id='password_error'>Error</span><br/>
	
	
	Description<br/>
	<textarea onKeyPress='checkDescription()' id='description'>
	</textarea>
	<span class='error' id='description_error'>Limit your entry to 200 characters</span><br/>
	Chars: <span id='charCount'></span>
	
	<br/><br/>Do you want updates?<br/>
	<input type='radio' name='updates' value='1'>yes<br/>
	<input type='radio' name='updates' value='0'>no
	<br/>
	<input type='submit'>

</form>

</body>