<? require_once($_SERVER['DOCUMENT_ROOT'].'/view-source/ok-to-show.php'); ?>
<!DOCTYPE html>
<html>
<head>

	<title>Day/Night</title>
	
	<link rel="stylesheet" href="styles.css" type="text/css">
	
	<?php
	require_once('logic.php');	
	?>
	
</head>

<body class='<?=$body_class?>'>

	The hour is <?=$hour?><br>
	The class of the body should be set to <?=$body_class?>
	
</body>
</html>