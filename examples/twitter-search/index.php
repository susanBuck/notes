<html>

<head>
	<?php
	# Documentation: 
	# http://www.ibm.com/developerworks/opensource/library/x-twitsrchapi/index.html
	# https://dev.twitter.com/docs/using-search
	
	/*-------------------------------------------------------------------------------------------------
	Variables
	-------------------------------------------------------------------------------------------------*/
	
	// Search for a specific term
	$search = "kittens";
	
	
	// Or search for tweets from a specific user
	// $search = "from%3A"."APLUSK";

	// How many pages of results do you want?
	$pages  = 2;
	
	
	/*-------------------------------------------------------------------------------------------------
	Talk to Twitter
	-------------------------------------------------------------------------------------------------*/
	for($i = 1; $i <= $pages; $i++) {
	
		$batch        = simplexml_load_file("http://search.twitter.com/search.rss?page=".$i."&q=".$search);
		$result_count = sizeof($batch->channel->item);
		
		for($j = 0; $j <= $result_count; $j++) {
			$tweets[] = $batch->channel->item[$j]->title;
		}
	}
	
	?>
</head>

</body>

<body>

	<a href='/source/<?=$_SERVER['PHP_SELF']?>'>View Source</a><br><br>

	<? foreach($tweets as $tweet): ?>
	
		<?=$tweet?><br><br>
		
	<? endforeach; ?>

</body>