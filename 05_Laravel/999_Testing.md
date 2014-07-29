## Reference

http://codeception.com/docs/modules/Laravel4


## Testing Tools
+ PHPUnit - Standard. Not good at translating business expectations.
+ PHPSpec - Isolated unit tests
+ Behat - Translate business expectations into executable code
+ Codeception - Streamlined. 


## Test Types
### Acceptance

### Functional

### Unit



## Install
Find Codeception on [Packagist](http://packagist.org) add the latest version to your `composer.json` under `require-dev`.
	
```json
"require-dev": {
	"codeception/codeception": "dev-master"
},
``` 

Note: This will install Codeception locally in your project. It can also be installed globally on your computer like you installed Composer.

See available commands

```bash
$ vendor/bin/codecept
```
	
Bootstrap

```
$ vendor/bin/codecept bootstrap app
```

This will generate a `codeception.yml` file a bunch of files in `app/tests`

Next, we need to do a bit of re-arranging. Because we'll be running our tests from the root, let's move the config file to the route:

	mv app/codeception.yml codeception.yml
	
Now, within `codeception.yml` update your paths to point to the apps folder where the tests directory lives:

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


## Further reading

[Laravel Testing Decoded by Jeffery Way](http://www.amazon.com/Laravel-Testing-Decoded-Jeffrey-Way-ebook/dp/B00D8O19O6/ref=sr_1_1?ie=UTF8&qid=1406620301&sr=8-1&keywords=laravel+testing)