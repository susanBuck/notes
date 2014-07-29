## Reference

+ <http://laravel.com/docs/validation>
+ <http://daylerees.com/codebright/validation>

## Validation

Validation is an essential part of any application.

For an example of why, let's consider some of the critical ways a User sign up form could go wrong if validation is not applied:

+ Blank password
+ Blank email
+ Invalid email (ex: `sam@gmailcom`)
+ Duplicate email

Beyond critical issues, there may be added criteria you want to validate against such as a minimum length for a password.

For Laravel applications, the validation process has 3 steps:

1. Define the rules
2. Run the rules and your data through the Validator
3. Give the user feedback on any issues


## Step 1) Define the rules

```php
$rules = array(
	'email' => 'email|unique:users,email',
	'password' => 'min:6'	
);	
```

Rules are defined in an array:

+ The **key** of the array matches the **name of the field(s)** you're validating (in this case, `email` and `password`)
+ The **values** are the **rule** you're validating against.
+ You can apply multiple rules to the same field, by separating them with a pipe `|` (ex. `email|unique:users,email` 
+ Some rules include values, which are indicated with a colon (ex. `min:6`).

For a full list and description of available rules, see [Laravel Docs: Available Validation Rules](http://laravel.com/docs/validation#available-validation-rules)


## Step 2) Run the rules and your data through the Validator

`Validator::make()` accepts two params:

1. The data
2. The array of rules

```php
$validator = Validator::make(Input::all(), $rules);
```

## Step 3) Give the user feedback on any issues

Here's one common way to give the user feedback on the issues with their data:

```php
if($validator->fails() {
	return Redirect::to('/signup')
					->with('flash_message', 'Sign up failed; please try again.')
					->withInput()
					->withErrors($validator);
}
```

Notes on the above:

+ `$validator->fails()` will return `True` if the validation failed, and `False` if it passed. 
+ If the validation fails, send the user back to the form from which the errors came from.
+ Include `withInput()` so the form fields can be re-filled.
+ Include `withErrors($validator)` so you'll have access to the errors in the View.

Then, in your View you can echo out any errors:

```php
@foreach($errors->all() as $message) 
	<div class='error'>{{ $message }}</div>
@endforeach
```


## Summary

Sign up Route or Controller:

```php
$rules = array(
	'email' => 'email|unique:users,email',
	'password' => 'min:6'	
);			
			
$validator = Validator::make(Input::all(), $rules);

if($validator->fails()) {
	
	return Redirect::to('/signup')
		->with('flash_message', 'Sign up failed; please try again.')
		->withInput()
		->withErrors($validator);
}

[...Rest of the code to add a user goes here...]
```


View:
```
@foreach($errors->all() as $message) 
	<div class='error'>{{ $message }}</div>
@endforeach

[...Form for adding a user goes here...]
```
