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

+ The **key** of the array matches the **name of the field(s)** you're validating (in this case, `email` and `password`).
+ The **values** are the **rule(s)** you're validating against.
+ You can apply multiple rules to the same field, by separating them with a pipe (ex. `email|unique:users,email`). 
+ Some rules include values, which are indicated with a colon (ex. `min:6`).

For a full list and description of available rules, see [Laravel Docs: Available Validation Rules](http://laravel.com/docs/validation#available-validation-rules)


## Step 2) Run the rules and your data through the Validator

[`Validator::make()`](http://devdocs.io/laravel/api/4.2/illuminate/validation/validator#method___construct) accepts the following parameters:

1. **Array of data** to validate
2. **Array of rules** to validate against
3. Array of custom messages (optional, not included in this example)
4. Array of custom attributes (optional, not included in this example)

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
		->with('flash_message', 'Sign up failed; please fix the errors listed below.')
		->withInput()
		->withErrors($validator);
}

[...Rest of the code to add a user goes here...]
```


View:
```php
@foreach($errors->all() as $message) 
	<div class='error'>{{ $message }}</div>
@endforeach

[...Form for adding a user goes here...]
```



## Validating URL Input
In addition to the basic form validation described above, there are other fail points that may exist in your application.

For example, here's a show action for a Foobooks Tag:

```php
public function show($id) {
	
	$tag = Tag::find($id);
		
	return View::make('tag_show')->with('tag', $tag);
}
```

This action would be called via the URL `http://localhost/tag/{tag_id}`.

But what happens if this route is called with a tag id that doesn't exist?

When debugging is turned on, the error will trickle down into the View when it first attempts to use the `$tag` collection:

```php
Trying to get property of non-object (View: /Users/Susan/Sites/dwa15-summer2014/foobooks/app/views/tag_show.blade.php)
```

When debugging is turned off, the user will see a generic error message.

We can improve upon this via two steps:

1. Replace the `find()` method with `findOrFail()` which will return an exception if the tag is not found.
2. Use a PHP [try catch](http://php.net/manual/en/language.exceptions.php) to handle the exception.

```php
public function show($id) {
	
		try {
			$tag = Tag::findOrFail($id);
		}
		catch(Exception $e) {
			return Redirect::to('/tag')->with('flash_message', 'Tag not found');
		}
							
		return View::make('tag_show')->with('tag', $tag);
	}
```

