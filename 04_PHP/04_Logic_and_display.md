## Separation of Concerns

<img src='http://thewc.co.s3.amazonaws.com/challenges/php-separation-of-concerns.jpg'>

## Procedure

Remove the PHP code from the `<head>` of `bank.php` and put it in a new file called `logic.php`.

Then use PHP's [require statement](http://us3.php.net/require) to connect `logic.php` to `bank.php`.

```php
<?php require 'logic.php'; ?>
```

## Things to note

* Separating out your logic from your display page (`bank.php`) does not mean you're removing PHP completely from `bank.php`. You still need to use PHP for display purposes such as echo'ing out the results in the body of the page.
* You don't need a doctype, head, body or other HTML elements in `logic.php` since it's not concerned with displaying any information on the page. Furthermore, `logic.php` is being included in `bank.php` which already has all those elements.
* Both `bank.php` and `logic.php` use the `.php` extension since both files need to run PHP code.


