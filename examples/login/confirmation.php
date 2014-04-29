<title>Confirmation</title>

<?

$userCookie = $_COOKIE['classdemosUser'];

require_once($_SERVER['DOCUMENT_ROOT']."/classes/code/includes/db_classdemos.php");

# Fetch the user by their cookie
$sql    = "SELECT * FROM bookClub_users WHERE cookie = '$userCookie'";
$row    = mysql_fetch_array(mysql_query($sql));
$fname  = $row['fname'];
$email  = $row['email'];

?>


Hello <?=$fname?> (<?=$email?>)! You are logged in.

