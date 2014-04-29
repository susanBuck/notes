<?php

session_start();
require_once('twitteroauth.php');
require_once('config.php');

# If access tokens are not available redirect to connect page. 
if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
    header('Location: ./clearsessions.php');
}

if (CONSUMER_KEY === '' || CONSUMER_SECRET === '') die('You need a consumer key and secret to test the sample code. Get one from <a href="https://twitter.com/apps">https://twitter.com/apps</a>');

# Get user access tokens out of the session. 
$access_token = $_SESSION['access_token'];

# Create a TwitterOauth object with consumer/user tokens. 
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

# If method is set change API call made. Test is called by default. 
$content = $connection->get('account/rate_limit_status');

# Get logged in user
$user = $connection->get('account/verify_credentials');

?>

API Hits remaining: <?=$content->remaining_hits?>
<br><br>
<a href='post.php'>Post</a>
<br>
<a href='clearsessions.php'>Disconnect</a>

 