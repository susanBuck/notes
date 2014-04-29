<!-- OKTOSHOW -->
<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>

 
<?
/*
$_FILE
"An associative array of items uploaded to the current script via the HTTP POST method."
http://php.net/manual/en/reserved.variables.files.php
*/

# When debugging we can print our array of upload variables
	# print_r($_FILES)."<br/><br/>";

# From the FILES array find out what the name of our file is. Basename will extract just the name.
	$fileName = basename($_FILES['fileUploader']['name']);
	
	# Make it unique by adding a timestamp
	$fileName = time()."_".$fileName; 
	
# Specify where we want to file to be uploaded to
	$uploadTo = "files/".$fileName; 

# Find out what the temporary name is - this is set by the server and we'll need it to move it
	$tempFileName = $_FILES['fileUploader']['tmp_name'];
 
# To upload means just moving the temporary file to a specific space on our server
	if(move_uploaded_file($tempFileName, $uploadTo)) {
	    echo "<br/><br/>Successfully uploaded $fileName";
	} 
	else {
	    echo "<br/><br/>Error uploading $fileName";
	}

?>

<br/><br/><a href='uploader_basic.php'>Go back to uploader</a>