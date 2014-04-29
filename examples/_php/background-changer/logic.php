<? require_once($_SERVER['DOCUMENT_ROOT'].'/view-source/ok-to-show.php'); ?>
<?php
# Set the timezone
date_default_timezone_set('America/New_York');

# Use PHP's date function to get the hour in military format.
$hour = date("G");

# When testing our code we can manually set the hour. When not using this, we just leave it commented out.
//$hour = 19;

# If the hour is greater than 20 hours (8pm) set our $body_class variable to be night
if($hour > 20 || $hour < 6) {
	$body_class = "night";
}
# Otherwise set it to day
else {
	$body_class = "day";
}

?>