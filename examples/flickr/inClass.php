<!-- OKTOSHOW --><a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>
<?
error_reporting(-1);

# Include the PHP Wrapper
require_once("phpFlickr.php");

# Create a new PHP Object
$f = new phpFlickr("48cae78cf83cc1c27f10629e4e451568");

# Fetch all recent photos
$recent = $f->photos_getRecent($jump_to = NULL, $extras = NULL, $per_page = 5, $page = NULL);

foreach($recent['photos']['photo'] as $thisPhoto) {

	$photoId  = $thisPhoto['id'];
	
	$photoUrl = $f->buildPhotoURL($thisPhoto, $size = "Medium");
	
	echo "<img src='$photoUrl'><br/>";

}


?>



 




