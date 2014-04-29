<?php

/* Load required lib files. */
session_start();
require_once('twitteroauth.php');
require_once('config.php');

if (CONSUMER_KEY === '' || CONSUMER_SECRET === '') {
  echo 'You need a consumer key and secret to test the sample code. Get one from <a href="https://twitter.com/apps">https://twitter.com/apps</a>';
  exit;
}
?>


<a href='redirect.php'>Connect to twitter</a>

 