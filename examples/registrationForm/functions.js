/*-------------------------------------------------------------------------------------------------
slideCheck()
-------------------------------------------------------------------------------------------------*/
function slideCheck(whichElement) {

	var curPos = parseFloat($(whichElement).getStyle("left"));
	var newPos = curPos + 18;
		
	$(whichElement).tween('left', newPos);
}




/*-------------------------------------------------------------------------------------------------
checkEmail()
-------------------------------------------------------------------------------------------------*/
function checkEmail(){

	var email = $('email').value;

	var filter=/^.+@.+\..{2,4}$/
			
	// Pass
	if (filter.test(email)) {
		$('email').style.backgroundColor = "white";
		$('email_error').tween('opacity', 0);
		return true;
	}

	// Fail
	else {
	   $('email').style.backgroundColor = "#ff7d7d";
	   $('email_error').tween('opacity', 1);

	   return false;
	}
}

/*-------------------------------------------------------------------------------------------------
checkPassword() 
-------------------------------------------------------------------------------------------------*/
function checkPassword() {

	var password      = $('password').value;
	var passwordAgain = $('passwordAgain').value;

	
	// Pass
	if(password == passwordAgain) {
		$('password').style.backgroundColor      = "white";
		$('passwordAgain').style.backgroundColor = "white";
		$('password_error').tween('opacity', 0);
	}
	// Fail
	else {
		$('password').style.backgroundColor      = "#ff7d7d";
		$('passwordAgain').style.backgroundColor = "#ff7d7d";
		$('password_error').tween('opacity', 1);
	}

}

/*-------------------------------------------------------------------------------------------------
checkDescription()
-------------------------------------------------------------------------------------------------*/
function checkDescription(description) {

	var maxChar     = 200;
	
	var description = $('description');
	
	if (description.value.length > maxChar) {
		description.value = description.value.substring(0, maxChar);
	} 
	else {
		$('charCount').value = maxChar - description.value.length;
	}


}

/*-------------------------------------------------------------------------------------------------
errorName()
-------------------------------------------------------------------------------------------------*/
function errorName() {
	$('error_name').tween('opacity', 1);
}




/*-------------------------------------------------------------------------------------------------
checkForErrors()
-------------------------------------------------------------------------------------------------*/
function checkForErrors() {

	var emailError = $('email_error').getStyle('opacity');
	var passwordError = $('password_error').getStyle('opacity');

	// Pass
	if(emailError == 0 && passwordError == 0) {
		$('generic_error').tween('opacity', 0);
		return true;
	}
	// Fail
	else {
		$('generic_error').tween('opacity', 1);
		return false;
	}
	
	
	
}