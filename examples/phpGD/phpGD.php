<!-- OKTOSHOW -->
<html>
<head>
		
	<title>PHP GD</title>
	
	<?
	require_once("phpGD_functions.php");
	?>
	
</head>

<body>

	<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a> | 
	<a href='/classes/viewSource/?path=http://susanbuck.net/classes/code/phpGD/phpGD_functions.php' target='_blank'>View Source of phpGD_functions.php</a><br/><br/><br/>

	<?
	# Params
		$image = "puppy.jpg";
		
	# Display the image
		echo $image."<br/>";
		echo "<img src='".$image."'/><br/>";		

	# Print dimensions of image
		echo getDimensions($image);
		
	# Resize image to a thumb
		$newThumb = createthumb($image,"littlePuppy",100,100);
		
	# Write on the thumb	
		writeOnImage($newThumb,"Puppy!");
	
	# Display the thumb	
		echo "Resulting thumb:<br/>";
		echo "<img src='".$newThumb."'/>";	
	?>

</body>
</html>
