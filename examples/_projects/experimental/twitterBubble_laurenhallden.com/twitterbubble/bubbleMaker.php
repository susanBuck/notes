

<style type="text/css">
body {
	background-color: transparent;
	overflow: hidden;
	}
</style>

<!-- Table to vertically center the tweets in their content divs !-->
<table border="0">
<tr>
<td style="vertical-align:middle; align:center; height:110px;"><center>
<?

# Load the data from the external site
        $curl_handle = curl_init();
        curl_setopt($curl_handle,CURLOPT_URL,'http://search.twitter.com/search.atom?q=bubble');
        curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
        $contents = curl_exec($curl_handle);
        curl_close($curl_handle);
		
		$tweets= array();
   
# Parse out all the titles
while($title != "" OR $cursor == 0) {
        $title = get_string_between($contents, "<title>", "</title>");
		# ignore the cURL title
		if ($title != "bubble - Twitter Search") {
          $tweet= "<div style='font-size:12px; font-family:arial; font-weight:bold; text-align:center; color:white'>".$title."</div><br/>";
		  array_push ($tweets, $tweet);
		  }
		}

$randomnumber=rand (0,15);
echo $tweets[$randomnumber];

# This function will let us parse out strings
function get_string_between($string, $start, $end) {

        global $cursor;
        $string = " ".$string;
        $ini = strpos($string,$start,$cursor);
        if ($ini == 0) return "";
        $ini += strlen($start);
        $len = strpos($string,$end,$ini) - $ini;
        $cursor = $ini;
        return substr($string,$ini,$len);
		}
?>
</center>
</td>
</tr>
</table>
