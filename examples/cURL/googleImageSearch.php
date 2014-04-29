<!-- OKTOSHOW --><a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>

<title>Google Image Parse</title>


<?
/*-------------------------------------------------------------------------------------------------
Ping Google image search
http://code.google.com/apis/websearch/docs/reference.html
-------------------------------------------------------------------------------------------------*/

# Settings
	$keyword        = "puppies";
	$howManyResults = 8; # Max is 8

# What page of search results should it pull from?
	$randomPage = rand(1,50); # Pick a random page. Make the last number smaller if you wan't more relevant results.

# Ping Google

	$url = "http://ajax.googleapis.com/ajax/services/search/images?start=".$randomPage."&rsz=".$howManyResults."&v=1.0&q=".$keyword;

	echo "URL We're fetching from: <a href='$url'>$url</a><br/><br/>";

	# Make cURL call
		$curlResults = makeCurlCall($url);

	# Parse the results of the cURL call into an array	
		$images = stringExtractor($curlResults,'unescapedUrl":"','","');
	
	# Loop through the array showing all the images
		foreach($images as $thisImage) {
			echo "<img style='width:100px; height:100px' src='$thisImage'/><br/>";
		}
	
	
		
	
/*-------------------------------------------------------------------------------------------------
makeCurlCall
-------------------------------------------------------------------------------------------------*/
function makeCurlCall($url) {

	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$curlResults = curl_exec($ch);	
	curl_close($ch);
	
	return $curlResults;
	
}

	
	
	
/*-------------------------------------------------------------------------------------------------
stringExtractor
Returns array of strings found between two target strings
-------------------------------------------------------------------------------------------------*/
function stringExtractor($string,$start,$end) {
				
	# Setup
		$foundString             = -1; 
		$stringExtractor_results = Array();
	 		
	# Extract  		
	while($foundString != 0) {
		$ini     = strpos($string,$start,$cursor);
		$ini    += strlen($start);
		$len     = strpos($string,$end,$ini) - $ini;
		$cursor  = $ini;
		$result  = substr($string,$ini,$len);
		array_push($stringExtractor_results,$result);
		$foundString = strpos($string,$start,$cursor);	
	}
	
	return $stringExtractor_results;
	
}
