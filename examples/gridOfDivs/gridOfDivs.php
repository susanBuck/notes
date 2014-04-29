<!-- OKTOSHOW -->
<html>

<head>
	<title>Class Example</title>

</head>

<body>

  <a href='/classes/viewSource/?path=http://susanbuck.net/classes/inclass/exercises/gridOfDivs/gridOfDivs.php'>View Source</a><br/><br/>
  

  <div style='position:absolute; top:100px; left:300px'>
  
	  <?php
	  
	  $left = -50;
	  $top  = 0;  
	   
	  for($i = 0; $i < 25; $i++) {
	 	    
	    // Is it time to make a new line
	    if($i % 5 == 0 && $i != 0) {
	    
	    	// Make a new line
	    	
	    	// Bump the top down 20
	    	$top += 50;  // This is a shortcut for saying $top = $top + 20;
	    	
	    	// Reset the left to 0
	    	$left = 0;
	    }
	    else {
	    	$left += 50;
	    }
	    
	 	
	  	echo "<div style='position:absolute; top:".$top."px; left:".$left."px; width:50px; height:50px; border:1px solid red;'>";
	  	echo $top.",".$left;
	  	echo "</div>";
	
	  }
	  
	  ?>
	</div>
  
</body>

</html>