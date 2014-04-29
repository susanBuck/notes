/*-------------------------------------------------------------------------------------------------
loginPageSubmit()
This function makes sure username and pass is there, then passes it to ajax to check against db
-------------------------------------------------------------------------------------------------*/
function submitLogin() {

	// Blank slate
	var msg  = "&nbsp"; var fail = false;	
	
	// Grab variables from form
	email     = $("email").value;
	password  = $("password").value;
	//password  = hex_sha1("classdemopw" + password);
	
	// Make sure they entered an email address
	if(email == undefined || email == "") {
		msg  = "Don't forget your E-mail.";
		fail = true;	
	}
	// Make sure they entered a password
	else if(password == "" || password == undefined){ 
		msg  = "Don't forget your password!";
		fail = true;
	}
	
	// If they passed all the tests (fail == false), then ajax the results
	if(fail == false) {
		
		// Do the Ajax!!
		new Request.HTML({
		   url: 'login_ajax.php',
		   onRequest: function(){ $("loginPageResults").set('html', '<img src="loader.gif">'); },
		   onComplete: function(response){
		       $("loginPageResults").empty().adopt(response);
		   },
		
		   data: {
			   email: email,
			   password: password
		   }
		
		}).send();
	
	}
	// Otherwise, show our error result
	else {
		document.getElementById("loginPageResults").innerHTML = msg;
		fade("loginPageResults");
	}
	
}
