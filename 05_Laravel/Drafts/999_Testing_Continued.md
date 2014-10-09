Reference: <http://codeception.com/docs/modules/WebDriver>

Assumptions: You've already [installed Node and are able to run `npm` (Node Package Manager)](https://github.com/susanBuck/notes/blob/master/05_Laravel/Node.md).

Install selenium and Chrome driver (using [this handy node package](https://github.com/vvo/selenium-standalone)):

```bash
$ npm install --production selenium-standalone@latest -g
start-selenium
```

Start the selenium server:

```bash
$ start-selenium -debug
```

```php
# /app/tests/acceptance.suite.yml
# Codeception Test Suite Configuration

# suite for acceptance tests.
# perform tests in browser using the WebDriver or PhpBrowser.
# If you need both WebDriver and PHPBrowser tests - create a separate suite.

class_name: AcceptanceTester
modules:
    enabled:
        - WebDriver
        - AcceptanceHelper
        - Laravel4
    config:
        WebDriver:
            url: 'http://localhost/'
            browser: chrome
```

Update:
```bash
$ composer build          
```






```bash
$ codecept run --report
```

```bash
$ codecept run --report --fail-fast
```

```bash
$ php artisan db:seed --env=testing
```
