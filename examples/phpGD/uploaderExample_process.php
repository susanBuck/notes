<!-- OKTOSHOW -->
<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/>
 
<title>uploaderExample_process.php</title> 
 
<?
require_once($_SERVER['DOCUMENT_ROOT']."/classes/code/phpGD/uploaderExample_functions.php");

# When debugging we can print our array of upload variables
	#print_r($_FILES)."<br/><br/>";

# From the FILES array find out what the name of our file is. Basename will extract just the name.
	$fileName = basename($_FILES['fileUploader']['name']);

# Specify where we want to file to be uploaded to
	$uploadTo = "uploads/".$fileName; 

# Find out what the temporary name is - this is set by the server and we'll need it to move it
	$tempFileName = $_FILES['fileUploader']['tmp_name'];
 
# To upload means just moving the temporary file to a specific space on our server
	if(move_uploaded_file($tempFileName, $uploadTo)) {
	    echo "<br/><br/>Successfully uploaded $uploadTo <br/><br/>";
	    
	    # Create thumb
	    	$thumb = createthumb($fileName,100,100);
	    	echo "Successfully created thumb ($thumb):<br/> <img src='uploads/$thumb'>"; 
	} 
	else {
	    echo "<br/><br/>Error uploading $fileName";
	}

?>

<br/><br/><a href='uploaderExample.php'>Go back to uploader</a>