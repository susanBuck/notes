<title>Google Image Parse</title>

<a href='http://pastebin.ca/1992370'>View Source Code</a><br/><br/>


Some things that will be helpful to know working with this script:
<ul>
<li>Your page needs to be saved as .php</li>
<li>Variables in PHP start with $</li>
<li>In JavaScript we use +'s to concatenate strings and variables, but in PHP we use .'s</li>
<li>Query Strings are paramaters you can pass with urls, they look like this index.html?keyword=dinosaur</li>
<li>You can have multiple QS's - just seperate them with &.  index.html?keyword=dinosaur&fileType=jpg</li>
</ul>

<a href='index.php?keyword=Clouds'>Clouds</a><br/>
<a href='index.php?keyword=Pineapples'>Pineapples</a><br/>
<a href='index.php?keyword=Dinosaurs'>Dinosaurs</a><br/>


<?

/*-------------------------------------------------------------------------------------------------
Ping Google image search
-------------------------------------------------------------------------------------------------*/

# This grabs the keyword off the url -- index.php?keyword=Clouds
$keyword = $_GET['keyword'];


# only do this if we've already passed in a keyword (i.e. it's not blank)

if($keyword != "") {
	# Load the data from Google via cURL
		$curl_handle = curl_init();
		curl_setopt($curl_handle,CURLOPT_URL,"http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=".$keyword);
		curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
		$contents = curl_exec($curl_handle);
		curl_close($curl_handle);
	
	# Parse out all the images 
	while($image != "" OR $cursor == 0) {
	
		$image = get_string_between($contents, 'unescapedUrl":"', '",');
		
		# Only display the image if our function verifies it's valid
		if (checkRemoteFile($image)){ 
			echo "<img src='".$image."' style='width:100px; height:100px'><br/>";
		
		}
	
	}
}



/*-------------------------------------------------------------------------------------------------
get_string_between
Allows us to parse out strings from our results
-------------------------------------------------------------------------------------------------*/
function get_string_between($string, $start, $end){

	global $cursor;

	$string = " ".$string;
	$ini = strpos($string,$start,$cursor);
	if ($ini == 0) return "";
	$ini += strlen($start);
	$len = strpos($string,$end,$ini) - $ini;
	$cursor = $ini;
	return substr($string,$ini,$len);
}


/*-------------------------------------------------------------------------------------------------
checkRemoteFile
Will make sure the image path is valid before we try and load it (prevents broken images)
-------------------------------------------------------------------------------------------------*/
function checkRemoteFile($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    // don't download content
    curl_setopt($ch, CURLOPT_NOBODY, 1);
    curl_setopt($ch, CURLOPT_FAILONERROR, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    if(curl_exec($ch)!==FALSE) {
        return true;
    }
    else {
        return false;
    }
}


?>




