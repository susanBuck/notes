/*-------------------------------------------------------------------------------------------------
addUser()
-------------------------------------------------------------------------------------------------*/
function addUser() {

	// Grab our variables
		var fname    = $('fname').value; 		
		var email    = $('email').value; 
		var password = $('password').value; 
		
		password = hex_sha1("classdemopw" + password);
		
	 	
	// Do the Ajax!!
		new Request.HTML({
		   url: 'bookClub_ajax.php',
		   onRequest: function(){ $("addUser_results").set('html', '<img src="loader.gif">'); },
		   onComplete: function(response){
		       $("addUser_results").empty().adopt(response);
		   },
		
		   data: {
		   action: 'addUser',
		   fname: fname,
		   email: email,
		   password: password
		   }
		
		}).send();
}




/*-------------------------------------------------------------------------------------------------
addUser()
-------------------------------------------------------------------------------------------------*/
function deleteUser() {
	
	// Grab our variables
	//var fname = document.getElementById('fname').value; // Grab element via old fashiond JS
		var fname = $('fname').value; // Grab element via MooTools
		
	// Do the Ajax!!
		new Request.HTML({
		   url: 'bookClub_ajax.php',
		   onRequest: function(){ $("addUser_results").set('text', 'Saving...'); },
		   onComplete: function(response){
		       $("addUser_results").empty().adopt(response);
		   },
		
		   data: {
		   action: 'deleteUser',
		   fname: fname
		   }
		
		}).send();
}