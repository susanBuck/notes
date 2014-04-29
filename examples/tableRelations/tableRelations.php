<!-- OKTOSHOW -->
<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>
<br/><br/><br/>

<style type='text/css'>

	.username {
		background-color:green;
		width:150px;}
		
	.profile_Box {
		border:1px solid black;
		position:absolute;
		top:150px;
		left:350px;
		background-color:white;
		display:none;
	}
</style>

<script type="text/javascript">

function activeMember(truth, username)
	{
		if(truth) {
			document.getElementById(username + "_box").style.backgroundColor = "green";
		}
		else if(!truth) {
			document.getElementById(username + "_box").style.backgroundColor = "red";
		}
	}

</script>


<?
require_once($_SERVER['DOCUMENT_ROOT']."/classes/code/includes/db_classdemos.php");

// Loop through all the users
$sql = "SELECT * FROM bookClub_users";
$result =  mysql_query($sql) or die(mysql_error());
while ($row = mysql_fetch_array($result)) {
	
	// Load variables
	$fname  	= $row['fname'];
	$email  		= $row['email'];
	$userId 	= $row['id'];
	$description = $row['description'];

	// Print the user's name
	echo "<div class='username' id='" . $userId . "_box' onclick = 'activeMember(0, $userId)'>".$fname."</div><br>\n";
	
	//Create a div
	
	echo "<div class='profile_Box' id='" . $userId . "profile_box'>".$description."</div><br>\n";

	
}

