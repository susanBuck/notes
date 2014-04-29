<? require_once($_SERVER['DOCUMENT_ROOT'].'/view-source/ok-to-show.php'); ?>
<?php

# Credentials
	$host = "localhost";
	$user = "sandbox";
	$pass = "phpisawesome";
	$db   = "sandbox_webstartwomen_com";

# Connect to the database
	$conn = mysql_connect($host, $user, $pass, TRUE) or die(mysql_error());

# Select the database
	mysql_select_db($db, $conn);


function query($sql) {
	$result = mysql_query($sql) or die(mysql_error());
	return $result;
}


function sanitize($data) {

	if(is_array($data)){
		
		foreach($data as $k => $v){
			if(is_array($v)){
				$data[$k] = self::sanitize($v);
			} else {
				$data[$k] = mysql_real_escape_string($v);
			}
		}
		
	} else {
		$data = mysql_real_escape_string($data);
	}

	return $data;

}


function select_rows($sql) {

	$result = query($sql);

	while($row = mysql_fetch_assoc($result)) {
		$rows[] = $row;
	}

	return $rows;
}



