When it comes to handling time in your apps, there are a number of factors to consider. First, you need to decide what data type you'll store your time as.

<img src='http://making-the-internet.s3.amazonaws.com/framework-time-options.png'>

There are MySQL specific formats such as DATETIME (`YYYY-MM-DD HH:MM:SS`) and then there's Unix Timestamps (stored as INT; number of seconds since Jan 1, 1970).

<blockquote>
"A Unix timestamp is a way to track time as a running total of seconds. This count starts at the Unix Epoch on January 1st, 1970. Therefore, the unix time stamp is merely the number of seconds between a particular date and the Unix Epoch." <a href='http://www.epochconverter.com/'>- epochconverter.com	</a></em>
</blockquote>

Here's a comparison of MySQL's DATETIME and Unix Timestamps to give you an idea of when you would use each:

(DATETIME) | Unix Timestamp (INT)
--- | ----
`YYYY-MM-DD HH:MM:SS` |  # of seconds since Jan 1, 1970
Works better with MySQL | Works better with PHP
Good for dates that might change; ex: a doctor's appt. | Good for fixed points in time; ex: when a new user signed up
Has no lower limit; makes it good for things like birthdays | Has a lower limit of Jan 1, 1970
Not as simple to calculate time differences. | Simple to calculate time differences - just subtract.

For our purposes, we'll be sticking with the Unix Timestamp format, so let's look at strategies for using them.

Before moving on, though, you may want to bookmark a Timestamp converter such as <http://www.epochconverter.com/> because it will come in handy when debugging.

## Timezones
Timezone management is important when dealing with users and servers who might all be in different timezones.

First, it's important to understand Unix Timestamps themselves are always set in UTC. It's only when you covert the timestamps to a human readable form do you notice the impact of timezones.

To demonstrate, look at the following code:
	
	# Start with NY timezone
	date_default_timezone_set('America/New_York');
	echo 'America/New_York<br>';
	echo date('M d Y g:ia').'<br>';	
	echo time().'<br><br>';
	
	# Now switch to LA
	date_default_timezone_set('America/Los_Angeles');
	echo 'America/Los_Angeles<br>';
	echo date('M d Y g:ia').'<br>';	
	echo time().'<br>';
		
Results:

	America/New_York
	Oct 16 2013 4:23am
	1381911831
	
	America/Los_Angeles
	Oct 16 2013 1:23am
	1381911831

Note how the human readable time shows a difference of 3 hours, but the Unix Timestamp is exactly the same. 

This information is important to understand when it comes time to displaying timezone-accurate information to your users (more on that in a bit).

## Configuring your app time
Before we cater your code to users's timezones, you have to set the default timezone for your app. This is done in `/app/config/config.php` via the TIMEZONE constant:

	define('TIMEZONE', 'America/New_York');

Here's a list of the timezones you can use: <a href='http://php.net/manual/en/timezones.php'>http://php.net/manual/en/timezones.php</a>

If you don't specify an app level timezone, core config will default to UTC.

While you're in settings, you may also want to edit your `TIME_FORMAT` which indicates in what format time will be displayed by default when using the Time library.
If you want to override what is set in the core (`F j, Y g:ia`), then add this line to your app's config file:

	define('TIME_FORMAT', 'F j, Y g:ia');

Visit [PHP date](http://php.net/manual/en/function.date.php) for a full list of time format options.


## Displaying time
With your timezone set, you can practice printing out some timestamps:

The built in PHP function `date()` can convert timestamps:

	$full_moon = 1326119760; # Jan 9, 2012 07:30 GMT
	echo date('M d Y', $full_moon);
	
Results: 

	Jan 09 2012

But you can also use the the core Time library. `Time::display()` does the same thing `date()` does but with some bonus features:
	
	$full_moon = 1326119760; # Jan 9, 2012 07:30 GMT

	# Print the time using the default TIME_FORMAT
	echo Time::display($full_moon);

	# You can override the default TIME_FORMAT on a case by case basis
	echo Time::display($full_moon, 'M D Y');

Results:

	January 9, 2012 9:36am
	Jan Mon 2012

One of the main reasons it's suggested you use `Time::display()` over just `date()` is because it factors in a framework config called `MIMIC_TIME` which is set in your environment files. Mimic time allows you to essentially go into timemachine mode with your app, making it believe it's running in the future or in the past, which is useful for testing.

For example, imagine you were writing a feature that needed to send a newsletter out every Friday at 9pm. To test this feature, you could set `MIMIC_TIME` to be Friday @ 9pm and then run your feature to see if it works as expected. 


## User Timezones
All of the above examples will display the time in the timezone you set for your app. But what about your users who may be logging in from across the world?

To manage this, you'll take advantage of `Time::display()`'s third parameter which accepts a Timezone string.

Examples:

	$full_moon = 1326119760; # Jan 9, 2012 07:30 GMT

	# Shows the time in your app's timezone
	echo '<br>App Timezone: '.Time::display($full_moon);

	# Hard code in the timezone you want to display via the third param
	echo '<br>Los Angeles Timezone: '.Time::display($full_moon, '', 'America/Los_Angeles');
	
	# Or, assuming you know your user's timezone, pass it in as the third param
	echo '<br>User's Timezone: '.Time::display($full_moon, '', $this->user->timezone);

Results:

	App Timezone: January 9, 2012 9:36am
	Los Angeles Timezone: January 9, 2012 6:36am
	User's Timezone: January 9, 2012 6:36am

## Getting and storing your user's timezone

The above code assumes you know what your user's timezone is, which gets a little tricky. PHP can detect a user's timezone but it's unreliable so JavaScript is often used instead.

To detect a user's timezone using JavaScript, the following jQuery plugin is suggested: <http://pellepim.bitbucket.org/jstz/> (requires jQuery, so make sure that's included too).

Once you've set up jstz, you can add a hidden field to your Sign Up form like so:

	<input type='hidden' name='timezone'>
	
Then, you'd use jQuery and jstz to fill that field with the user's timezone:

	<script>
		$('input[name=timezone]').val(jstz.determine().name());
	</script>

That hidden field, assuming it was placed with your other Sign Up fields, would then also get added to the database for that user.

Alternatively, if you didn't want to auto-detect your user's timezone using jstz, you could create a dropdown of options and have the user select their own timezone.
