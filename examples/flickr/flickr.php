<!-- OKTOSHOW -->

<title>Flickr API Demo</title>

<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>


<a href='http://code.google.com/p/phpflickr/downloads/detail?name=phpFlickr-3.1.zip&can=2&q='>Download PHP Flickr wrapper</a>

<?
error_reporting(-1);

require_once("phpFlickr.php");

$f = new phpFlickr("6f4cef6d4517da4aac9e13770e414b0d");


/*-------------------------------------------------------------------------------------------------
photos_getRecent
-------------------------------------------------------------------------------------------------*/
echo "<h1>photos_getRecent</h1>\n\n";
$recent = $f->photos_getRecent($jump_to = NULL, $extras = NULL, $per_page = 5, $page = NULL);

foreach ($recent['photos']['photo'] as $photo) {
   
    # Get info about this owner
    $owner = $f->people_getInfo($photo['owner']);
    
    # Link to photo
    echo "<a href='http://www.flickr.com/photos/" . $photo['owner'] . "/" . $photo['id'] . "/'>".$photo['title']."</a>";
    
    # Link to user
    echo " by <a href='http://www.flickr.com/people/" . $photo['owner'] . "/'>".$owner['username']."</a>";

	echo "<br/>";
}




/*-------------------------------------------------------------------------------------------------
photos_search
-------------------------------------------------------------------------------------------------*/
echo "<h1>photos_search (new york cit)</h1>";
$search = $f->photos_search(array("per_page"=>"5","tags"=>"new york city"));

foreach ($search['photo'] as $photo) {
    
    # Build photo url
	$photoUrl = $f->buildPhotoURL($photo, $size = "Square");
	echo "<img src='$photoUrl'>";

    # Link to photo
    echo "<a href='http://www.flickr.com/photos/" . $photo['owner'] . "/" . $photo['id'] . "/'>".$photo['title']."</a>";
    	
	echo "<br/>";
}




?>