## Install
Find codeception on packagist and add the latest version to your composer.json's require-dev.


See available commands

	vendor/bin/codecept
	
Bootstrap

	vendor/bin/codecept bootstrap app

This will generate a `codeception.yml` file a bunch of files in `app/tests`

Next, we need to do a bit of re-arranging. Because we'll be running our tests from the root, let's move the config file to the route:

	mv app/codeception.yml codeception.yml
	
Now, within codeception.yml update your paths to point to the apps folder where the tests directory lives:

	paths:
		tests: app/tests
		log: app/tests/_log
		data: app/tests/_data
		helpers: app/tests/_helpers


In `app/tests/acceptance.suite.yml` change `url` to your local dev url.


## New Test

Generate a test class:

	vendor/bin/codecept generate:cest acceptance Welcome


---

codeception/codeception suggests installing codeception/phpbuiltinserver (Extension to start and stop PHP built-in web server for your tests)

http://codeception.com/docs/modules/Laravel4