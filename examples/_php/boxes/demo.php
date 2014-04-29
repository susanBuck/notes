<? require_once($_SERVER['DOCUMENT_ROOT'].'/view-source/ok-to-show.php'); ?>
<!DOCTYPE html>

<html>

<head>

	<?php
	require_once('logic.php');
	?>
	
	<style>
	    .box {
	        width:50px;
	        height:50px;
	        float:left;
	        margin:4px;
	        background-color:red;
	    }       
	</style>

	
</head>

<body>

	<?=$boxes?>
	
</body>
</html>