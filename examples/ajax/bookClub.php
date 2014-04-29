<!-- OKTOSHOW -->

<title>Register for the Book Club</title>

<!-- MooTools to help make the Ajax calls -->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/mootools/1.3.0/mootools-yui-compressed.js"></script>

<!-- Source of our encryption function -->
<script type="text/javascript" src="/classes/includes/sha1.js"></script>

<!-- functions -->
<script type="text/javascript" src="bookClub_functions.js"></script>



<!-- Source code links -->

<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source of this file</a><br/><br/><br/>
<a href='http://susanbuck.net/classes/viewSource/?path=http://susanbuck.net/classes/code/ajax/bookClub_ajax.php'>View Source of bookClub_ajax.php</a><br/><br/>



<!-- FORM -->
	First name:<br/>
	<input type='text' id='fname'><br/><br/>
	
	Email:<br/>
	<input type='text' id='email'><br/><br/>
	
	Password:<br/>
	<input type='password' id='password'><br/><br/>
	
	<!-- Add user button -->
	<input type='button' onClick='addUser()' value='Add User'>
	
	<!-- Delete user button -->
	<input type='button' onClick='deleteUser()' value='Delete User'>

	<!-- Catch Ajax results from when we call addUser -->
	<div id='addUser_results' style=''></div>




<br/><br/>
<a href='/classes/inclass/exercises/login/login.php'>Login</a>



