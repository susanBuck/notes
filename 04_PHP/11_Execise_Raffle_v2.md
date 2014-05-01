## Goal

Your contestants are no longer hardcoded in an array called `$contestants`. Now, they're coming in via your form and the `$_POST` superglobal.

How can you adapt Raffle v1 so it's picking winners/losers and displaying the results using this new `$_POST` information?

<img src='http://making-the-internet.s3.amazonaws.com/php-raffle-v2.png'>

Because we're using the same page to accept and process the information, you might run into a warning in your code when you first land on the page. This is occurring because your processing code is attempting to run before there is anything to run.

The warning may look something like this:

	Warning: Invalid argument supplied for foreach() in...

What's going on here and how could you prevent this warning?

## Bonus Challenges

2. When you enter 5 contestants and hit submit it works, but then the form inputs are blank again. It'd be more elegant if they still had the names in the fields. How could you do this?

3. Instead of entering names for your contestants, enter email addresses. Then, as part of the processing, use the PHP `mail()` function to send an email to the winner(s) letting them know they've won.