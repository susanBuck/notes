<!-- OKTOSHOW -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="Template example" />

	<title>Registration Form Exercise</title>
	
	<!-- INCLUDES -->
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/mootools/1.3.0/mootools-yui-compressed.js"></script>
		<script type="text/javascript" src="functions.js"></script>
		
		<link type="text/css" rel="stylesheet" href="styles.css">
	
		<?
		require_once($_SERVER['DOCUMENT_ROOT']."/classes/code/includes/db_classdemos.php");		
		?>	
	
		
</head> 

<?
$allowcur = 'true';

# If the form has been submitted
if($_POST) {
	 
	# Grab variables from form
	$fname = $_POST['fname'];
	
	# Query the db for this name
	$sql         = "SELECT * FROM `bookClub_users` WHERE fname = '$fname'";
	$row         = mysql_fetch_array(mysql_query($sql));
	$fnameLocated = $row['fname'];	
	
	# Fail - we found that name
	if($fnameLocated == $fname) {
		$formDisplay    = "block";
		$successDisplay = "none";
		$onBodyLoadError = "errorName()";
	}
	# Pass
	else {
		$formDisplay    = "none";
		$successDisplay = "block";
	}
}
# Default display settings if the form has not been submitted
else {
	$formDisplay    = "block";
	$successDisplay = "none";
}
?>

<body onLoad='<?=$onBodyLoadError?>'>

<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>

<div id='header'>Book Club</div>

<div class='container'>


<!-- SUCCESS BOX -->
	<div style='font-size:20px; color:green; display:<?=$successDisplay?>'>
		Success!
	</div>


<!-- REGISTRATION FORM -->
	<div style='display:<?=$formDisplay?>'>
		<form method='POST' onSubmit='return checkForErrors()'>
		
			<table>
				<tr>
					<td>Name:</td>
					<td>
						<input id='fname' type='text' name='fname'/>
						<div id='error_name' class='error'>This username is already taken</div>
					</td>
				</tr>
				
				<tr>
					<td>Email:</td>
					<td><input id='email' type='text' name='email' onBlur='checkEmail()'>
					<div id='email_error' class='error'>Uh oh: Invalid email</div>
					</td>
				</tr>
				
				<tr>
					<td>Password: </td>
					<td><input id='password' type='password' name='password'>
					</td>
				</tr>
				
				<tr>
					<td>Confirm password:</td>
					<td><input id='passwordAgain' type='password' name='passwordAgain' onBlur='checkPassword()'>
					<div id='password_error' class='error'>Uh oh: Passwords don't match</div>
					</td>
				</tr>
				
				<tr>
					<td colspan=2>
						Tell us about yourself<br/>
						<textarea id='description' onKeyUp='checkDescription()'></textarea><br/>
						
						<!-- Chars left -->
						<div id='charCountLabel'>Chars left:<input id='charCount' type='text'></div>
						
						<br/><br/>
						<input id='submitButton' type='submit' value='Submit!'>
					
					</td>
				</tr>
			
			</table>
		
		</form>
		
		<div class='error' id='generic_error'>Please fill in all fields and correct all errors.</div>
		
	</div>

</div>	




</body>
</html>