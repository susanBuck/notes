<!-- OKTOSHOW -->

<!-- Source of our encryption function -->
<script type="text/javascript" src="/classes/includes/sha1.js"></script>

<!-- MooTools to help make the Ajax calls -->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/mootools/1.3.0/mootools-yui-compressed.js"></script>

<!-- in house functions -->
<script type="text/javascript" src="login_functions.js"></script>

<?
# Connect to the database
require_once($_SERVER['DOCUMENT_ROOT']."/classes/code/includes/db_classdemos.php");

?>

<!-- Source code links -->
	<a href='http://susanbuck.net/classes/viewSource/?path=http://susanbuck.net/classes/inclass/exercises/login/login_ajax.php'>View Source of login_ajax.php</a><br/><br/>
	<a href='http://susanbuck.net/classes/viewSource/?path=http://susanbuck.net/classes/inclass/exercises/login/login.php'>View Source of this page</a><br/><br/>
	<a href='http://susanbuck.net/classes/viewSource/?path=http://susanbuck.net/classes/inclass/exercises/login/login_iframe.php'>View Source of login_iframe.php</a><br/><br/>


<!-- THE LOGIN FORM -->
	<div class="titleBox" style="width:300px">
	
	<!-- email -->
	<span class="regularSmall">E-mail Address</span><br/>
	<input type="text" id="email" name="loginPageEmail" style="text-align:center; font-size:16pt;" value=""><br/><br/>
	<br/>
	
	<!-- password -->
	<span class="regularSmall">Secret Password</span><br/>
	<input type="password" id="password" name="loginPagePass" style="text-align:center; font-size:16pt;" value=""><br/>
	<br/>
	
	<!-- submitme -->
	<input type="button" value="Login" style='font-size:16pt' onclick="submitLogin()">
	
	<!-- results -->
	<br/><br/>
	<div id="loginPageResults" style="width:300px; padding:15px" class="regularSmall">&nbsp;</div>

	
<!-- Registration link -->	
	<a href='/classes/inclass/exercises/ajax/bookClub.php'>Register</a>	



