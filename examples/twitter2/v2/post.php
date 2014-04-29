<?php
session_start();
require_once('twitteroauth/twitteroauth.php');
require_once('config.php');

# If access tokens are not available redirect to connect page. */
if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
    header('Location: ./clearsessions.php');
}

# Get user access tokens out of the session. 
$access_token = $_SESSION['access_token'];

# Create a TwitterOauth object with consumer/user tokens. 
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

# Get logged in user
$user = $connection->get('account/verify_credentials');

$msg = "My test timestamp ".date("g:i:s a");

$tweet = $connection->post('statuses/update', array('status' => $msg));

var_dump($tweet);