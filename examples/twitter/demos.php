<!-- OKTOSHOW -->
<style type='text/css'>
body {
	font-size:8pt; font-family:lucida sans;
}
</style>

<?
/*-------------------------------------------------------------------------------------------------
SETUP
-------------------------------------------------------------------------------------------------*/
	/*
	Include our Twitter API wrapper
	By: http://classes.verkoyen.eu/twitter_oauth/docs
	*/
	require_once 'twitter.php'; 
	
	/* 
	APPLICATION LEVEL DETAILS
	Create new Twitter class instance with our 'consumer key' and 'consumer secret'
	Find this on your Twitter app page. Example: http://screencast.com/t/a5s93L91V
	*/
	$twitter = new Twitter('2jSDrs6wyzxVyPKn4ex3LQ', 'vVXyzrcwPFDAQ8fxrgjgfkZ274QejvadOHKUp3MyNS0');
	
	
	/*
	USER LEVEL DETAILS
	Uncomment the first chunk below ("GET TOKEN / SECRET") to find out this information
	*/
	$token        = "252211321-1twXTQ78LW0WmynHQQN50WTP9yecDyixSWlm1N3v";
	$secret       = "V7vQD4X873ELJP2Oeje9fbCcB71jTPtY7m6jtJhg";
	//$userId     = "252211321";
	//$screenName = "upennClassDemo";
	
	$twitter->setOAuthToken($token);
	$twitter->setOAuthTokenSecret($secret);
	
?>

<br/><br/>
<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>
<a href='http://classes.verkoyen.eu/modules/twitter_oauth/files/php_twitter_2_0_3.zip'>Download twitter.php (wrapper library)</a><br/><br/>

<?	
/*-------------------------------------------------------------------------------------------------
GET USER TIMELINE
-------------------------------------------------------------------------------------------------*/
	echo "<h2>User Timeline (upennClassDemos)</h2>";
	
	$userTimeline = $twitter->statusesUserTimeline();
	
	# Loop through the results
	foreach($userTimeline as $thisTweet) {
		
		# Echo out each tweet
		echo $thisTweet['text']."<br/>";
	}
	
	echo "<br/><br/>";
	
	# For debugging purposes we can echo out the full array of the results
	//print_r($userTimeline);

	
/*-------------------------------------------------------------------------------------------------
TRENDS
-------------------------------------------------------------------------------------------------*/
	echo "<h2>Trends</h2>";

	$trendsDaily = $twitter->trends();
	
	# Loop through the results
	foreach($trendsDaily['trends'] as $thisTrend) {
		
		# Echo out each tweet
		echo $thisTrend['name']."<br/>";
	}
	
	echo "<br/><br/>";
	
	# For debugging purposes we can echo out the full array of the results
	//print_r($trendsDaily['trends']);
	
	
/*-------------------------------------------------------------------------------------------------
SEARCH
-------------------------------------------------------------------------------------------------*/
	$keyword = "apples";

	echo "<h2>Search for '".$keyword."'</h2>";

	$searchResults = $twitter->search($keyword);
	
	# Loop through the results
	
	foreach($searchResults['results'] as $thisResult) {
		
		$tweet = $thisResult['text'];
		
		$tweet = str_ireplace($keyword,"<span style='background-color:yellow'>".$keyword."</span>",$tweet);
		
		echo $tweet."<br/><br/>";	

	}
	
	
	echo "<br/><br/>";
	
	# For debugging purposes we can echo out the full array of the results
	//print_r($searchResults);	



?> 


