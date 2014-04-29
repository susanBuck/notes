<title>cURL example for Yahoo News</title>

<!-- OKTOSHOW --><a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>

<?
# What URL should we download?
	$url = "http://rss.news.yahoo.com/rss/mostviewed";
	echo "URL We're fetching from: <a href='$url'>$url</a><br/><br/>";

# Make curl call
	$curlResponse = makeCurlCall($url);
	
# Parse the results of the curl call, grabbing all the title instances
	$titles = stringExtractor($curlResponse, '<title>','</title>');

# Loop through the titles printing them all out
	foreach($titles as $thisTitle) {
		echo $thisTitle."<br/>";
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





?>