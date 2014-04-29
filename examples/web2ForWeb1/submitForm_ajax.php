<!-- OKTOSHOW -->
<?
/*-------------------------------------------------------------------------------------------------
Connect to database
-------------------------------------------------------------------------------------------------*/
	$hostname  = "classdemos.db.2080440.hostedresource.com";
	$username  = "classdemos";
	$password  = "Temp123";    
	
	mysql_connect($hostname,$username,$password);
	mysql_select_db("classdemos");


/*-------------------------------------------------------------------------------------------------
Grab variables that were sent in with the ajax call
-------------------------------------------------------------------------------------------------*/
	$firstName = $_POST['firstName'];
	$comment   = $_POST['comment'];


/*-------------------------------------------------------------------------------------------------
send email
-------------------------------------------------------------------------------------------------*/
	$to      = "you@you.com";
	$subject = "Website Form Results";
	$body    = $firstName." says:".$comment;
	# Commented out so not to flood inbox when testing.
	//mail($to,$subject,$body);


/*-------------------------------------------------------------------------------------------------
Save information to the databse
-------------------------------------------------------------------------------------------------*/
	$sql    = "INSERT INTO `web2ForWeb1` (firstName,comment) VALUES ('$firstName','$comment')";
	$result = mysql_query($sql) or die(mysql_error());



/*-------------------------------------------------------------------------------------------------
Print
-------------------------------------------------------------------------------------------------*/
	echo "Hello $firstName!";
?>