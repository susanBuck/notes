<!-- OKTOSHOW --><a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>



<?
/* 

This is what it looks like in the .htaccess file:

# CLASS DEMO

	# one query string example
	rewriterule ^bookclub/([^/\.]+)/$ "/classes/inclass/exercises/htaccessAndUrlRewrites/index.php?fname=$1" [L,NC]
	
	# two query string example
	rewriterule ^bookclub/([^/\.]+)/([^/\.]+)/$ "/classes/inclass/exercises/htaccessAndUrlRewrites/index.php?fname=$1&profile=$2" [L,NC]
*/

?>

<h1>User Profile</h1>

<?
require_once($_SERVER['DOCUMENT_ROOT']."/classes/code/includes/db_classdemos.php");

# What user are we looking for?	
	$fname    = $_GET['fname'];
	$profile  = $_GET['profile'];

# Query for that user
	$sql    = "SELECT * FROM bookClub_users WHERE fname = '$fname'";
	$row    = mysql_fetch_array(mysql_query($sql));

	# Did we find them?
	$foundFname = $row['fname'];

# If we found a user with this first name...
if($foundFname != "") {

	# Grab profile variables about this user
		$email       = $row['email'];
		$description = $row['description'];

	# Say hello
		echo "Hello $foundFname!<br/><br/>";
	
	# Only show profile information if the url included the query string ?profile=profile
	if($profile == "profile") {
		echo "Email: $email<br/><br/>";	
		echo "Description: $description<br/><br/>";
	}

}
# Not found
else {
	echo "User $fname not found";
}
	

?>