<?
error_reporting(-1);

error_reporting(E_ALL ^ E_NOTICE);



$haystack = "
<title>The Fast Fix: A judge of few words 
    (The Newsroom)
</title>

 <link>http://us.rd.yahoo.com/dailynews/rss/yahoonewsroom/*http://news.yahoo.com/s/yblog_newsroom/20110221/pl_yblog_newsroom/the-fast-fix-a-judge-of-few-words</link>
 <guid isPermaLink=>yblog_newsroom/20110221/the-fast-fix-a-judge-of-few-words</guid>
<source>The Newsroom</source>
<category>politics</category>
<pubDate>Mon, 21 Feb 2011 03:21:40 GMT</pubDate>
<description>The Newsroom - Why has Justice Clarence Thomas remained silent for five years? Get The Fix in your e-mail inbox! Click here to sign-up for the Morning Fix newsletter. Click here for the Afternoon Fix newsletter. Follow The Fix on Twitter @thefix or &#8230;</description>
</item>
<item>
<title>The Fast Fix: Where are the candidates? 
    (The Newsroom)

</title>
 <link>http://us.rd.yahoo.com/dailynews/rss/yahoonewsroom/*http://news.yahoo.com/s/yblog_newsroom/20110218/pl_yblog_newsroom/the-fast-fix-where-are-the-candidates</link>
 <guid isPermaLink=>yblog_newsroom/20110218/the-fast-fix-where-are-the-candidates</guid>
<source>The Newsroom</source>
<category>politics</category>
<pubDate>Fri, 18 Feb 2011 14:04:04 GMT</pubDate>
<description>The Newsroom - When will the first GOP presidential candidate declare, and who will it be? Get The Fix in your e-mail inbox! Click here to sign-up for the Morning Fix newsletter. Click here for the Afternoon Fix newsletter. Follow The Fix on &#8230;</description>
</item>
<item>

<title>Love me, love my jeans 
    (The Newsroom)
</title>
 <link>http://us.rd.yahoo.com/dailynews/rss/yahoonewsroom/*http://news.yahoo.com/s/yblog_newsroom/20110217/od_yblog_newsroom/love-me-love-my-jeans</link>
 <guid isPermaLink=>yblog_newsroom/20110217/love-me-love-my-jeans</guid>
<source>The Newsroom</source>
<category>odd</category>
<pubDate>Thu, 17 Feb 2011 17:44:06 GMT</pubDate>
<description>The Newsroom - Girlfriends do it all the time - &#039;borrowing&#039; their boyfriend&#039;s T-shirt/sweatshirt/button-down shirt. It&#039;s a romantic gesture, right? (Ex-girlfriends do it too, although they tend not to wear the shirt so much as use it to clean the toilet). But boyfriends &#8230;</description>

</item>
<item>
<title>Pay attention: High court isn&#8217;t only for highbrow concepts 
    (The Newsroom)
</title>
";

$results = stringExtractor($haystack, "<title>","</title>");

foreach($results as $thisResult) {
	echo $thisResult."<br>";
}

/*-------------------------------------------------------------------------------------------------
stringExtractor
Returns array of strings found between two target strings
-------------------------------------------------------------------------------------------------*/
function stringExtractor($string,$start,$end) {
	
	# Setup
	global $cursor; global $stringExtractor_results; $foundString = -1; $string = " ".$string;
	if(!isset($stringExtractor_results)) $stringExtractor_results = Array();
	 		
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