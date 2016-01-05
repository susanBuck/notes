## Reference

+ [Laracasts: Acceptance Testing with Behat](https://laracasts.com/lessons/acceptance-testing-with-behat#)


## Setup 
Add the following packages to your `require-dev` section in `composer.json` to pull in Behat:

```
"behat/behat": "2.5.*",
"behat/mink": "1.5.*",
"behat/mink-extension": "*",
"behat/mink-goutte-driver": "*"
```

(Mink is a wrapper for browser drivers)

Run `composer update` to pull in the files.

Once it's done, run `vendor/bin/behat` to test it works. If you haven't already, you can add `vendor/bin` to your path so you don't have to specify the full path when calling `behat`.

Next: configuration. Create `behat.yml` in the root of your project and fill it with the following, updating the `base_url` to whatever your local URL is on the app your tesitng.

```
default:
    paths:
        features: app/tests/acceptance
    extensions:
        Behat\MinkExtension\Extension:
            goutte: ~
            base_url: http://localhost
```

Initiate:

```bash
$ behat —init

```

Open up `/app/tests/acceptance/bootstrap/FeatureContext.php`

Add at the top, after the other `use` statements, add this:

```php
use Behat\MinkExtension\Context\MinkContext;
```

And update the class extend `MinkContext` instead of `BehatContext`:

```php
class FeatureContext extends MinkContext
{
```


## Create your first feature test

In `/app/tests/acceptance` create a new file `Login.Feature`

Here's an example of what a feature may look like:

```
Feature: Allow guest users to log in to the site
	In order to log in and use the site
	As a guest
	I want to log in

	Scenario: User fills out login form
	Given I am on "/login"
	And I fill in "email" with "sam@gmail.com"
	And I fill in "password" with "sam1234"
	And I press "Submit"
	Then I should see "Welcome"
```

The first part, after `Feature:` is just a general description for you. The `Scenario:` part is the important part of this file.

Once your feature/scenario is complete, try running it:

```
$ behat
```

Example output of a succesful test:

```
$ behat
Feature: Allow guest users to log in to the site
  In order to log in and use the site
  As a guest
  I want to login

  Scenario: User fills out login form                  # app/tests/acceptance/Users.feature:6
    Given I am on "/login"                             # FeatureContext::visit()
    And I fill in "email" with "sam@gmail.com" # 
    FeatureContext::fillField()
    And I fill in "password" with "sam1234"  # 
    FeatureContext::fillField()
    And I press "Submit"                         # FeatureContext::pressButton()
    Then I should see "Welcome"                      # FeatureContext::assertPageContainsText()

1 scenario (1 passed)
5 steps (5 passed)
0m0.94s
```



## Step definitions

Step definitions allow you to create macros/functions for your tests. Sometimes you may want to do this so you can do something special (like generate a random value) or because you need to do something repeatedly in multiple steps.

Behat can help you create step definitions - start by doing something in your test that does not already have a definition.

For example, the second step on this scenario was made up on the fly:

```
Scenario: User enters their first name
  Given I am on "/"
  And I fill in 'first_name' with a random value
```

If you were to run the above test, Behat would recognize it as an undefined step and offer a suggestion for creating it:

```
You can implement step definitions for undefined steps with these snippets:

    /**
     * @Given /^I fill in \'([^\']*)\' with a random value$/
     */
    public function iFillInWithARandomValue($arg1)
    {
        throw new PendingException();
    }
```

You could copy the above code and put it in `FeatureContext.php`, *or* you can have Behat do it for you by running this command:

```bash
$ behat --append-snippets
```

This will prompt Behat to go through your tests, look for any undefined steps and create them for you.

After you run the above, if you open `FeatureContext.php` you should see the new function `iFillInWithARandomValue`, which you can them fill in the body of.

Example: 

```php
 /**
* @Given /^I fill in \'([^\']*)\' with a random value$/
*/
public function iFillInWithARandomValue($arg1)
{
        $this->fillField($arg1,time());
}
```



## Cleaning out database tables

Tell Behat about framework

FeatureContext.php:

```php
/**
* Get access to Laravel
*/
public static function bootstrapLaravel() {
  
  $unitTesting = true;
  $testEnvironment = 'testing';

  require_once __DIR__.'../../../../bootstrap/start.php'

}
```



## Tips

If your test fails, you can get more info by adding the verbose flag when running behat:

```bash
$ behat -v
```

See a list of all possible commands:
```bash
$ behat -h
```

Interrupt tests if one fails:
```bash
$ behat --stop-on-failure
```

Run a test for a specific feature:
```bash
$ behat --name "name-of-feature"
```

See a list of available definitions
```bash
$ behat -dl
```


