<!-- OKTOSHOW --><a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>

<?

# Variables - load the form information
	$firstName = $_GET["firstName"];
	$lastName  = $_GET["lastName"];
	$comments  = $_GET["comments"];
	$colors    = $_GET["colors"];
	$subscribe = $_GET["subscribe"];
	$yesOrNo   = $_GET["yesOrNo"];

# Process the information: send it via email
	$email   = "susan@photojojo.com";
	$subject = "Form results";
	
	$body    = "First Name:".$firstName."\r";
	$body   .= "Last name:".$lastName."\r";
	$body   .= "Comments:".$comments."\r";
	$body   .= "Colors:".$colors."\r";
	$body   .= "Subscribe:".$subscribe."\r";
	$body   .= "Yes or no:".$yesOrNo."\r";
	
	mail($email,$subject,$body);

	
# Print the results	
	echo "<h1>Your form results:</h1>";
	echo "<b>First Name:</b> ".$firstName."<br/>";
	echo "<b>Last Name:</b> ".$lastName."<br/>";
	echo "<b>Comments:</b> ".$comments."<br/>";
	echo "<b>Colors:</b> ".$colors."<br/>";
	echo "<b>Subscribe:</b> ".$subscribe."<br/>";
	echo "<b>Yes Or No:</b> ".$yesOrNo."<br/>";
	echo "Thank you for submitting this information!<br/><br/>";
	echo "<a href='index.html'>Return</a>";

?>

