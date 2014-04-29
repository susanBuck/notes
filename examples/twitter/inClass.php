<?
# Include our Wrapper
require_once("twitter.php");

# Creates a new connection to the Twitter API
$twitter = new Twitter('2jSDrs6wyzxVyPKn4ex3LQ', 'vVXyzrcwPFDAQ8fxrgjgfkZ274QejvadOHKUp3MyNS0');

# Identification information for Twitter user "upennClassDemos"
$token  = "252211321-1twXTQ78LW0WmynHQQN50WTP9yecDyixSWlm1N3v";
$secret = "V7vQD4X873ELJP2Oeje9fbCcB71jTPtY7m6jtJhg";

# AUthenticate user 
$twitter->setOAuthToken($token);
$twitter->setOAuthTokenSecret($secret);

$userTimeline = $twitter->statusesUserTimeline();

//print_r($userTimeline);

foreach($userTimeline as $thisTweet) {

	echo $thisTweet['text']."<br>";
}


?>









<!-- OKTOSHOW -->
<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>