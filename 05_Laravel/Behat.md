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

The first part, after `Feature:` is just a general description for you. The `Secenario:` part is the important part of this file.

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

If your test fails, you can get more info by adding the verbose flag when running behat:

```bash
$ behat -v
```


See a list of all possible commands:
```bash
$ behat -h
```


