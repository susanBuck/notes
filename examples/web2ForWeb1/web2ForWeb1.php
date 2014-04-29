<!-- OKTOSHOW -->
<html>

<head>
		
	<title>web2ForWeb1</title>	
		
	<?
	/*-------------------------------------------------------------------------------------------------
	Connect to database
	-------------------------------------------------------------------------------------------------*/
	$hostname  = "classdemos.db.2080440.hostedresource.com";
	$username  = "classdemos";
	$password  = "Temp123";    
	
	mysql_connect($hostname,$username,$password);
	mysql_select_db("classdemos");
	?>	
		
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/mootools/1.3.0/mootools-yui-compressed.js"></script> 	
		
	<script type='text/javascript'>
		
	/*-------------------------------------------------------------------------------------------------
	submitForm();	
	-------------------------------------------------------------------------------------------------*/
	function submitForm() {
		
		// Fetch the form input
		var firstName = $('firstName').value;
		var comment   = $('comment').value;
		
		// Ajax request
		new Request.HTML({
		    url: '/classes/code/web2ForWeb1/submitForm_ajax.php',
		    onRequest: function(){ $("submitForm_ajaxResults").set('text', 'Loading...'); },
		    onSuccess: function(responseText, responseXML) {
		    },
		
		    onComplete: function(response){
		        $("submitForm_ajaxResults").empty().adopt(response); // Inject results
		    },
		
		    data: {
		        firstName: firstName,
				comment: comment
		    }
		
		}).send();  
		
		
	}	
		
	</script>

</head>

<body>

	<!-- LINKS TO VIEW SOURCE CODE -->
		<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/>
		<a href='/classes/viewSource/?path=/classes/code/web2ForWeb1/submitForm_ajax.php' target='_blank'>View Source of submitForm_ajax.php</a><br/><br/><br/>


	<!-- NAME -->
		Your name: <br/>
		<input type='text' id='firstName' value='Bob'>
		
		<br/><br/>
	
	<!-- COMMENTS -->
		Your comments:<br/>
		<textarea id='comment'>This is a test</textarea>
		
		<br/><br/>
	
	
	<!-- SEND -->
		<input type='button' value='Send Comments' onClick='submitForm()'>
	
	
	<!-- RESULTS -->
		<br/>
		Ajax Results:<div style='width:300px; height:100px; border:1px solid red' id='submitForm_ajaxResults'></div>
		<br/><br/>
		
		
	<!-- PREVIOUS USERS -->
		<b>Users that have been here before:</b><br/><br/>
		
		<?
		# Loop through and print out the entries from the db
		$sql    =  "SELECT * FROM `web2ForWeb1`";
		$result =  mysql_query($sql) or die(mysql_error());
		while ($row = mysql_fetch_array($result)) {
		
			$firstName = $row['firstName'];
			$comment   = $row['comment'];
			
			echo $firstName." said: ".$comment."<br/>";
			
		}
		?>

</body>



