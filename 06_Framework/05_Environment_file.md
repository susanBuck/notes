**FYI: This is an info only page; no action steps need to be taken.**

When we talk about environments, we're referring to either you **local environment** (MAMP or WAMP running on your computer) or your **live environment** (your ASmallOrange server). Sometimes these are referred to as *development* and *production*, respectively.

During the install process, you created your local server's `environment.php` file, so now let's talk about what it's doing.

The purpose of an environment file is to set configurations that might be different based on which environment you're working in.

For example:

* Your local environment file may enable the display of **PHP errors** (always good for debugging), but you live environment file may hide such errors (don't want users to see errors!).
* Your local environment can determine whether your application should connect to a local copy of your **database**, or your live database that your users are accessing.
* Your local environment will be configured to display the raw errors of any **MySQL issues**, whereas your live environment will suppress such details and instead email the app admin while showing a graceful error to the user.
* Your local environment may prevent **outgoing emails** (to avoid accidentally spamming all your users when debugging), whereas your live environment file would allow outgoing emails.
* Your local environment will display the yellow system bar (seen at the end of the [Install](/Framework/Install) process), whereas your live server would not.

## Local's environment.php
The framework comes with a sample environment file called `sample-environment.php`. You've already duplicated that into your root and renamed it as `environment.php`.

Go ahead and open `environment.php` in your code editor to see what's going on. You will see a series of lines that look like this:

	define('IN_PRODUCTION', FALSE);
	
Here we're using the PHP function [define()](http://php.net/manual/en/function.define.php) to set [Constants](http://us1.php.net/manual/en/language.constants.php). Constants are similar to variables in that they store information, but as the name implies those values don't ever change&mdash; they're constant throughout your app. Conventions calls for constants to be written in all capital letters.

`environment.php` is well commented to help you understand what is going on, so give it a thorough read through. Right now you don't need to change any settings, but you will when we get to databases.

## environment.php is not tracked in your repository
Note that `environment.php` lives just outside of your project directory. This is important for a couple reasons:

1) The same environment.php file can be used with multiple applications running this framework.

2) By living outside the project directory, it's not included in version control. This is good, because while everything else in your project should be exactly mirrored between your local and live server, environment.php will actually differ. 


