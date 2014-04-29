<?

// Generate a unique identifier for the file - timestamp will do the trick
	$timestamp = time();

// Append .csv
	$file_name = $timestamp.".txt";

// Grab the canvas data being pased in via ajax
	$canvas = $_GET['canvas'];

// Create the file handler
	$file_handler = fopen("saved/".$file_name, 'c+') or die("error opening file");
	$file_size    = @filesize($file_name);

// Read the contents of the file
	// Don't need to do this in this case, but leaving it here in case we ever need to
	//$contents = fread($file_handler, $file_size);

// Write the canvas to the file
	fwrite($file_handler, $canvas);

// Close the file
	fclose($file_handler);

// Pass back a success message
	echo "You can access your saved work via this url:<br><input type='text' id='url' value='".$_SERVER['HTTP_HOST']."/storage/code/save-screen-contents/save-screen-contents.php?saved=".$timestamp."'>";

?>

