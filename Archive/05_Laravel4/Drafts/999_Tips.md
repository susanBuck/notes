## Setting an active class for navigation. 

Laravel provides a `Request::is()` method which can be used for just this situation. 

Here is an example:

```php
<a href='/about' class="{{{ Request::is( 'about') ? 'current' : '' }}}">About</a>
<a href='/blog' class="{{{ Request::is( 'blog/*') ? 'current' : '' }}}">Blog</a>
```

The `Request::is()` accepts a string and internally uses the str_is helper, which allows an asterisk to be used as a wildcard.

Source: [laravel-news](http://laravel-news.com/)