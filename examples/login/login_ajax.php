<!-- OKTOSHOW -->

<?
# Connect to the database
require_once($_SERVER['DOCUMENT_ROOT']."/classes/code/includes/db_classdemos.php");

# Variables passed in
$email    = $_POST['email'];
$password = $_POST['password']; # Comes in as hashed already

# Blank slate
$login = true;
$msg   = "";

	
# Look for this user in the database
	$sql    =  "SELECT * FROM `bookClub_users` WHERE email = '$email'";
	$result =  mysql_query($sql);
	
	while ($row = mysql_fetch_array($result)) {
		$foundEmail 	     = $row['email'];
		$foundPassword   = $row['password'];
		$foundUserId 	 = $row['id'];
		$cookie          = $row['cookie'];
	}
	
	# Couldn't find this email in the database - fail
	if($foundEmail == ""){
		$login = false;
		$msg   = "That email was not found";
	}
	# Found the email, but the password they entered doesn't match the one in the db - fail
	else if($foundPassword != $password) { # Password was already hashed from javascript
		$login = false;
		$msg   = "That password is incorrect";
	}
	
	# Pass! Forward to cookie setting page
	if($login == true) {
		$msg    = "Logging in...";
				
		# This iframe will set our cookie then redirect to the add page
		?>
		<iframe src="login_iframe.php?cookie=<?=$cookie?>" style="display:none"></iframe>
		<?
 	}
 	
 	echo $msg;