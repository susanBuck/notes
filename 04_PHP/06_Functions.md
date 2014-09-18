## User defined

<img src='http://thewc.co.s3.amazonaws.com/challenges/php-wikipedia-definition-of-function.png'>

[Functions](http://us1.php.net/manual/en/language.functions.php) are bits of reusable code that you can either create yourself, or exist already in PHP.

Functions allow you to easily repeat tasks without repeating code.

Example: 

```php
function calculate_total($subtotal, $discount, $shipping_method) {

    if($shipping_method == 'priority') {
        $shipping_rate = 5;
    }
    elseif($shipping_method == 'express') {
        $shipping_rate = 15;
    }

    $tax = .09 * $subtotal;

    $total = $subtotal + $shipping_rate - $discount;

    return $total;

}
```

You would then use the above function like this:	

```php
Your total is <?=calculate_total(10,3,'priority')?>
```
	
	

## Arguments
Functions may accept arguments which provide extra info a function may use to get its job done. In the above example the arguments were subtotal (10), discount (3) and shipping method ('priority').

If a function doesn't need arguments, then the parentheses would be left empty. Example:

```php	
function add_new_user() {
 
     # Code here that would add a new user...
 
     return $new_user_id;
 
}
 
$new_user = add_new_user();
```
	
## Return
Some functions may return values upon completion. For example, in the previous challenge, we could turn our *"Is the savings goal met?"* logic into a function called `get_goal_image` that would return the appropriate image name.

Try it...what would a `get_goal_image()` function look like?


## Built-in functions

In addition to creating your own functions, PHP has many useful [built-in (internal)](http://us2.php.net/manual/en/functions.internal.php) functions. 

```php
string date ( string $format [, int $timestamp = time() ] )
```

Use the [PHP date function](http://us1.php.net/manual/en/function.date.php) to produce the following time formats:

* 4:30pm
* 16 hundred hours
* April 14, 2014 4:00pm