<!-- OKTOSHOW -->
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
	$twitter = new Twitter('2jSDrs6wyzxVyPKn4ex3LQ', 'vVXyzrcwPFDAQ8fxrgjgfkZ274QejvadOHKUp3MyNS0'); # !!
		

/*-------------------------------------------------------------------------------------------------
GET TOKEN / SECRET
-------------------------------------------------------------------------------------------------*/
	
	// get a request token
	$twitter->oAuthRequestToken('http://susanbuck.net/classes/inclass/exercises/twitter/authorize.php'); # !!
	
	// authorize
	if(!isset($_GET['oauth_token'])) $twitter->oAuthAuthorize();
	
	// get tokens
	$response = $twitter->oAuthAccessToken($_GET['oauth_token'], $_GET['oauth_verifier']);
	
	print_r($response);
	

?>

<title>Twitter API Authorize</title>

<br/><br/>
<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>
<a href='http://classes.verkoyen.eu/modules/twitter_oauth/files/php_twitter_2_0_3.zip'>Download twitter.php (wrapper library)</a><br/><br/>