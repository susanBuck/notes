/*-------------------------------------------------------------------------------------------------
checkPassword()
-------------------------------------------------------------------------------------------------*/
function checkPassword() {

	// Grab what password the user put in the first password field
	var password      = $('password').value;
	var passwordAgain = $('passwordAgain').value;
	
	// Pass
	if(password == passwordAgain) {
		$('password_error').tween('opacity', 0);
		$('password').style.backgroundColor = "white";
		$('passwordAgain').style.backgroundColor = "white";
	}
	// Fail
	else {			
		// Make the fade happen
		$('password').style.backgroundColor = "red";
		$('passwordAgain').style.backgroundColor = "red";
		$('password_error').tween('opacity', 1);
	}
					
}




/*-------------------------------------------------------------------------------------------------
checkDescription();
-------------------------------------------------------------------------------------------------*/
function checkDescription() {

	var description = $('description').value;
	
	var lengthOfDescription = description.length;
	
	$('charCount').innerHTML = lengthOfDescription;
	
	// Pass
	if(lengthOfDescription < 5) {
		$('description_error').tween('opacity', 0);
	}
	// Fail
	else {
		$('description').value = $('description').value.substring(0, 5);
		$('description_error').tween('opacity', 1);
	}

}




/*-------------------------------------------------------------------------------------------------
checkEmail()
-------------------------------------------------------------------------------------------------*/
function checkEmail() {

	var email = $('email').value;
	
	var filter = /^.+@.+\..{2,4}$/
	
	// Pass
	if (filter.test(email)) {
		$('email_check').tween('left', 210);
		$('email_error').tween('opacity', 0);
		return true;
	}
	// Fail
	else {
		$('email_error').tween('opacity', 1);
		return false;
	}

	
	

}
