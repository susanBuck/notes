<!-- OKTOSHOW -->

<?
# Connect to the database
require_once($_SERVER['DOCUMENT_ROOT']."/classes/code/includes/db_classdemos.php");	

# What action do we need to complete?
$action = $_POST['action'];




/*-------------------------------------------------------------------------------------------------
addUser
-------------------------------------------------------------------------------------------------*/
if($action == "addUser") {

	# Grab the variables that were passed to this script in the ajax call
	$fname    = strtolower($_POST['fname']);
	$email    = strtolower($_POST['email']);
	$password = strtolower($_POST['password']);
	
	# Look in the database for this username. Don't add repeats!
	$sql       = "SELECT * FROM `bookClub_users` WHERE fname = '$fname'";
	$result    = mysql_query($sql);
	$row       = mysql_fetch_array($result);
	$count     = mysql_num_rows($result); 
	
	# If we did find the username, it will get loaded in this variable
	$fnameInDb = $row['fname'];
	
	# User is in database - ERROR
	if($fnameInDb != "") {
		echo "<span style='color:red'>This username already exists, try again!</span>";
	}
	# User is NOT in database - PASS
	else {
		
		# Add this user to the database
			$sql    = "INSERT INTO `bookClub_users` (fname,email,password) VALUES ('$fname','$email','$password')";
			$result = mysql_query($sql) or die(mysql_error());
		
		# Generate them a unique cookie and update their entry in the db with it
			$newId  = mysql_insert_id(); 
			$cookie = sha1("classdemocookie".$newId);
			$sql	= "UPDATE `bookClub_users` SET cookie = '$cookie' WHERE id = $newId";
			$result = mysql_query($sql) or die($sql);
		
		# Confirm they were added
			echo "<span style='color:green'>Successfully added</span>";	
			
	}
} # End addUser action




/*-------------------------------------------------------------------------------------------------
deleteUser()
-------------------------------------------------------------------------------------------------*/
else if($action == "deleteUser") {
	
	# Grab the variables that were passed to this script in the ajax call
	$fname = $_POST['fname'];
	
	# Delete user from the database	
	$sql    = "DELETE FROM bookClub_users WHERE fname = '$fname'";
	$result = mysql_query($sql) or die(mysql_error());
	
	# Print results
	echo "<br/>Delete User";
}

?>