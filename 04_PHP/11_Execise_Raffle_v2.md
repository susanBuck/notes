## Goal

Your contestants are no longer hardcoded in an array called `$contestants`. Now, they're coming in via your form and the `$_POST` superglobal.

How can you adapt Raffle v1 so it's picking winners/losers and displaying the results using this new `$_POST` information?

<img src='http://making-the-internet.s3.amazonaws.com/php-raffle-v2.png'>



## Challenges

2. When you enter 5 contestants and hit submit it works, but then the form inputs are blank again. It'd be more elegant if they still had the names in the fields. How could you do this?

3. Instead of entering names for your contestants, enter email addresses. Then, as part of the processing, use the PHP `mail()` function to send an email to the winner(s) letting them know they've won.