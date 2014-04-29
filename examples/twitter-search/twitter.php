<html>

<head>
	<?
	
	# Documentation: 
	# http://www.ibm.com/developerworks/opensource/library/x-twitsrchapi/index.html
	# https://dev.twitter.com/docs/using-search
	
	/*-------------------------------------------------------------------------------------------------
	Setup the search
	-------------------------------------------------------------------------------------------------*/
		// yyyy-mm-dd
		$today 	   = date("Y-m-d");
		$yesterday = date("Y-m-d",strtotime("-1 day"));
		
		$search = $_GET['search']. " since:".$yesterday." until:".$today; 
		
			
	/*-------------------------------------------------------------------------------------------------
	Talk to Twitter
	-------------------------------------------------------------------------------------------------*/
		$batch        = simplexml_load_file("http://search.twitter.com/search.rss?rpp=100&q=".$search);
		$result_count = sizeof($batch->channel->item);
		
		# When testing you can uncomment this to print the tweets
			//for($j = 0; $j <= $result_count; $j++) {
			//	echo "<b>".$batch->channel->item[$j]->pubDate."</b>";
			//	echo  $batch->channel->item[$j]->title."<br><br>";		
			//	}
	?>
</head>

</body>

<body>

	<?=$result_count?>
		
</body>