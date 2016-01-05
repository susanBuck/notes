## Software Testing: Code to check your code

Developing and managing an application can be an overwhelming endeavor. Often times you have many overlapping pieces: this feature touches that feature which impacts that other feature. 

Furthermore, each of those features may have a multitude of variables (ex: logged in vs. not logged in) that may multiply the possible ways a feature should operate.

When you touch a piece of this interconnected network, it can have a rippling effect, breaking things you never would have expected.

Enter software testing.

Software testing is the process of writing code to check your code.

Here's a bare-bones example: Imagine you've crafted a function called `generate_password()` which accepts some string input, reverses the input and adds the numbers `123` to the end. Not the smartest password generator, but you get the idea.

```php
function generate_password($input) {
	return strrev($input).'123';
}
```

What might a test of this function look like?

```php
$input = 'Hello World';

$expectation = 'dlrowolleh123';

$reality = generate_password('helloworld');

if($expectation === $reality) {
	echo 'Test passed';
}
else {
	echo 'Test failed';
}
```

This is an example of a *Unit Test* because it's testing one individual component of your application in isolation. As long as you have this test on hand, you can rest assured knowing that the `generate_password()` function is doing the job you expect it to do.

Software testing eases many of the pains of development because you'll have checks in place ensuring your application is working as expected...even as you add new features, add new developers, or return to your codebase after months of being away.



## Test Driven Development (TDD)

*Test Driven Development* is the process of writing tests during development to make sure individual components are working as expected.

TDD can slow the overall development process, but the benefits are worth it. When you have tests in place, you don't have to worry (as much) about waking up in the morning to find out some code change you pushed the day before impacted some feature in a way you didn't realize.

Here are the typical steps of a TDD workflow:

1. Write a test that will fail
2. Write the code that will make it pass
3. Refactor




## Example Test Types

There are many different kinds of tests, and the definitions of these tests sometimes vary and overlap depending on who you're talking to. 

That being said, let's take a look at 3 of the most common types of tests:

### Unit Tests
+ Tests your codebase from the programmer's perspective.
+ Not looking at the big picture, but at each individual component (i.e. a class, method or a function).
+ Is that component doing its job?

Example:

```php
# Componenet
public function getUser($id) {

	try {
    	$user = User::findOrFail($id);
    }
    catch(Exception $e) {
    	return false;
    }

    return $user;
}

# Test
function testGetUser() {

	# User exists...
    $user = User::getUser(1);
    $this->assertIsA($user, array);
    $this->assertTrue($user->first_name, 'Sam');  
    
    # User does not exist...
    $user = User::getUser(999);
    $this->assertFalse($user);
    
}
```

### Functional Tests
+ Tests your site from a user's perspective.
+ Software is used to emulate browser requests.

Example:

```php
$I = new FunctionalTester($scenario);
$I->amOnPage('/');
$I->click('Sign Up');
$I->submitForm('#signup', array('username' => 'MilesDavis', 'email' => 'miles@davis.com'));
$I->see('Thank you for Signing Up!');
$I->seeEmailSent('miles@davis.com', 'Thank you for registration');
$I->seeInDatabase('users', array('email' => 'miles@davis.com'));
```


### Acceptance Tests
+ Like functional testing, but run on a server and sometimes on a browser.
+ Named from the idea that a user or client might do this testing and determine whether to &ldquo;accept&rdquo; the application.
+ No manipulation of the code in your tests. 

Example: 

```php
$I = new AcceptanceTester($scenario);
$I->amOnPage('/');
$I->click('Sign Up');
$I->submitForm('#signup', array('username' => 'MilesDavis', 'email' => 'miles@davis.com'));
$I->see('Thank you for Signing Up!');
```



## Testing Tools - PHPUnit & Codeception

Out of the box, Laravel supports **PHPUnit**, the most popular PHP testing framework. 

On top of that, we also recommend **Codeception** (<http://codeception.com>) which is a modern PHP testing framework built on top of PHPUnit.

>> *Codeception is PHPUnit on steroids.* -<http://codeception.com>

Codeception follows a **Behavioral Driven Development (BDD)** testing style&mdash; which simply means  tests are written in a very descriptive manner with a focus on behavior. BDD tests read like stories and tend to be more readable than PHPUnit tests, especially to non-programmers.

Codeception works with these kinds of tests:

+ Acceptance
+ Functional
+ Unit

Some benefits of Codeception:

+ Has modules for working with PHP Frameworks (like Laravel!)
+ Uses the Selenium web driver, which is a tool that lets you write code to &ldquo;drive&rdquo; the browser.
+ Nice HTML or JSON reports of your tests which are great for sharing with clients, bosses, etc.
+ If you're already familiar with PHPUnit you can write PHPUnit style tests in your Codeception tests.





## Codeception Setup

Find Codeception on [Packagist](http://packagist.org) add the latest version to your `composer.json` under `require-dev`. We're adding this in `require-dev` because we'll only run tests locally.
	
```json
"require-dev": {
	"codeception/codeception": "dev-master"
},
``` 

(FYI: This will install Codeception locally in your project but it can also be installed globally on your computer just like when you installed Composer.)

From within your project root, you can now trigger Codeception from the command line. 

Test it out&mdash; this should show you what Codeception commands are available:

```bash
$ vendor/bin/codecept
```

You'll be running codecept from command line a lot, so it's worth adding `vendor/bin` to your PATH. Once you do that you should be able to trigger Codeception with this simplified command:

```bash
$ codecept
```

Moving on...
	
Initiate a Codeception test suite in your project, generating all the required files.
```
$ codecept bootstrap app
```

The result of this command will be a rundown of useful information about directories and files that were created:

```
File codeception.yml created       <- global configuration
tests/unit created                 <- unit tests
tests/unit.suite.yml written       <- unit tests suite configuration
tests/functional created           <- functional tests
tests/functional.suite.yml written <- functional tests suite configuration
tests/acceptance created           <- acceptance tests
tests/acceptance.suite.yml written <- acceptance tests suite configuration
tests/_bootstrap.php written <- global bootstrap file
Building initial Tester classes
Building Actor classes for suites: acceptance, functional, unit
AcceptanceTester includes modules: PhpBrowser, AcceptanceHelper
AcceptanceTester.php generated successfully. 46 methods added
FunctionalTester includes modules: Filesystem, FunctionalHelper
FunctionalTester.php generated successfully. 13 methods added
UnitTester includes modules: Asserts, UnitHelper
UnitTester.php generated successfully. 15 methods added

Bootstrap is done. Check out /tests directory
```

Next, we need to do a bit of re-arranging. Because we'll be running tests from the root of our Laravel project, we need to move the main Codeception configuration file (`codeception.yml`) out of the `app` folder.

From the root of your project, that can be done with this command:

```bash
$ mv app/codeception.yml codeception.yml
```
	
Now, within `codeception.yml` add `app/` to the start of each of the paths so Codeception knows where to find your test files:

```php
paths:
	tests: app/tests
	log: app/tests/_log
	data: app/tests/_data
	helpers: app/tests/_helpers
```

The next configuration you need to make is specific to Acceptance tests. Because Acceptance tests are run on a server you need to tell Codeception the URL of your application.

Open `/app/tests/acceptance.suite.yml` and change `url` to whatever your local URL is (most likely `http://localhost/` unless you've set up VirtualHosts). 

Also, add `laravel4` as one of the *enabled modules*.

```yml
# Codeception Test Suite Configuration

# suite for acceptance tests.
# perform tests in browser using the WebDriver or PhpBrowser.
# If you need both WebDriver and PHPBrowser tests - create a separate suite.

class_name: AcceptanceTester
modules:
    enabled:
        - PhpBrowser
        - AcceptanceHelper
        - Laravel4
    config:
        PhpBrowser:
            url: 'http://localhost/'
```

After you save these changes, prompt Codeception to regenerate the base classes for all suites:

```bash
$ codecept build
```





## New Tests

For our first example, lets create an Acceptance test for the Foobooks homepage.

You can manually create your test files or have Codeception generate them for you:

```bash
$ codecept generate:cept acceptance Homepage
```

The above command will generate a file at `/app/tests/acceptance/HomepageCept.php`. 

Open it up and write your first test:

```php
<?php 

# Codeception tests are built around the idea of narrative "Scenarios" - little stories about your application.
# A Scenario always starts with Actor class initialization
$I = new AcceptanceTester($scenario);

# After that, you can use write out your scenario...

# Start by definining your goal of this test...
$I->wantTo('Ensure that the home page works');

# Specify where you are...
$I->amOnPage('/'); 

# Make some assertions...
$I->see('Log In');
$I->see('Sign Up');
```

We'll dig deeper into the above code in a second, but first, let's run the tests...

## Run Tests

```bash
$ codecept run
```

Here's the output from our run on Foobooks:

```bash
$ codecept run
Codeception PHP Testing Framework v2.1.0
Powered by PHPUnit 4.1.4 by Sebastian Bergmann.

Acceptance Tests (1) -----
Trying to Ensure that the home page works (HomepageCept)                                                                             Ok

Functional Tests (0) ----

Unit Tests (0) ----

Time: 269 ms, Memory: 10.00Mb

OK (1 test, 2 assertions)
```

Looks good! 

This test checked that when the url `/` is visited, there's a *Log in* and *Sign up* button.

If your application doesn't follow this pattern, update the above test code to validate something that is true, then run the test again to see if you can get it to pass.

__Tips:__

Run just acceptance tests, and report back full details:
```bash
$ codecept run acceptance --steps
```

Run just one test:
```bash
$ codecept run acceptance HomeCept.php
```

Tests with debugging info:
```bash
$ codecept run --debug
```


## Digging Deeper

Let's look more closely at what was going on in the test we wrote above.

Codeception structures tests around this idea of a person or actor who is using your application. You saw this in action in the first line in the code above:

```php
$I = new AcceptanceTester($scenario);
```

Here are the possible Codeception Actor classes you can use:

+ `UnitTester`, who executes functions and tests the code. 
+ `FunctionalTester`, a qualified tester, who tests the application as a whole, with knowledge of its internals. 
+ `AcceptanceTester`, a user who works with our application through an interface that we provide.

Once the actor is defined, you put that actor through the paces of testing a feature. 

Along the way, the Actor will make comments about what they want to do...
```php
$I->wantTo('Sign up');
```

where they are...
```php
$I->amOnPage('/signup');
```

what they're going to do...
```php
$I->amGoingTo('Fill in the sign up form with valid values');
```

what they actually do...
```php
$I->fillField('email', 'test@gmail.com');
$I->fillField('password', 'foobar12345');
```

and what they click...
```php
$I->click('Submit');
```

At the end (and sometimes along the way) your actor will make **assertions**. Assertions compare an expected outcome or value with an actual outcome or value.

```php
$I->see('Welcome to Foobooks!');
```

Assertions are the crux of tests. If the assertions are true, your tests will pass and you know you're code is more likely to be in working order. If they fail, you know you've got kinks to work out.

To learn more about the actions available to you, read the [Codeception guide on Acceptance Testing](http://codeception.com/docs/04-AcceptanceTests).


## Moving forward...

In this document we've covered the essentials of what testing is in addition to how to write and run tests using Codeception. 

We could spend a whole semester on the ins-and-outs of testing, so consider this a starting point. As you move forward, here are some resources you can dig into:

### General Testing
+ [Chardonnet's guide to testing](http://gnugat.github.io/2014/02/12/tests-tools-overview.html): A general overview look at testing. 


### Laravel Specific
+ [Laravel Docs: Testing](http://laravel.com/docs/testing): Laravel comes with PHPUnit built in; this doc covers basic PHPUnit functionality as it applies to Laravel.

+ [Laravel Testing Decoded by Jeffery Way](http://www.amazon.com/Laravel-Testing-Decoded-Jeffrey-Way-ebook/dp/B00D8O19O6/ref=sr_1_1?ie=UTF8&qid=1406620301&sr=8-1&keywords=laravel+testing) Full book on testing as it applies to Laravel. Highly recommended if you really want to move towards mastering testing.

+ [Codeception's Laravel4 Module](http://codeception.com/docs/modules/Laravel4): Codeception Modules allow you to expand on the functionality of Codeception; this particular module adds features that tap into Laravel.


### Codeception Specific

+ [Codeception guide to Functional tests](http://codeception.com/docs/05-FunctionalTests): Functional tests are very similar to Acceptance Tests with some key differences: rather than running the tests on a web server, Codeception will mimic http requests to your application. This means you can't test JavaScript or Ajax calls, but your tests will run much quicker.

+ [Codeception guide to Unit tests](http://codeception.com/docs/06-UnitTests): Unit Tests are geared less at how your application as a whole is used and more how your code itself is used. When writing Unit Tests you'll make assertions about how your controllers, models, etc. are supposed to behave.

+ [Tutsplus: Modern Testing in PHP with Codeception](http://courses.tutsplus.com/courses/modern-testing-in-php-with-codeception): Also by Jeffery Way; screencast series devoted to testing in Codeception.





<!--
**Stubs**
Substitutes of an object which forces it to return a given value. When a System Under Test (SUT, the class you're testing) has collaborators (classes used by the SUT, also called dependencies), we can stub them so their behavior is completely controlled.

**Mocks**
Substitutes of an object which checks if its methods have been called. When a System Under Test (SUT, the class you're testing) has collaborators (classes used by the SUT, also called dependencies), we can mock them to monitor their use.

Stubs are used to force a collaborator's method to return a wanted value, and mocks are used to check if a colaborator's method have been called.

**Suites**
Independent groups of tests with a common purpose.
-->