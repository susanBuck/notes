>> Never trust data coming from the user or from any other third party sources. -[Sitepoint](http://www.sitepoint.com/php-security-cross-site-scripting-attacks-xss/)

XSS, or Cross Site Scripting, is a attack in which a hacker attempts to get your site to execute their malicious client-side script.

Consider the New Post feature of the micro-blog. What happened if the user input a bit of JavaScript code?

<img style='border:1px solid #ccc' src='http://making-the-internet.s3.amazonaws.com/framework-xss-js.png'>

Whenever any other user saw this post in their stream, they would see this scary looking alert:
<img style='border:1px solid #ccc' src='http://making-the-internet.s3.amazonaws.com/framework-xss-alert.png'>

This example is just the tip of the iceberg of the kind of no-good a hacker may attempt. 

Fortunately, most modern browsers have many checks in place to help combat XSS attacks, but there's still important steps you should take to secure your content.

## Output Escaping: htmlspecialchars()

With SQL injection attacks, your plan of prevention is to escape data on input, before it gets to the database. For XSS attacks, though, you want to escape on output, before data is displayed to the page.

For this, you want to use PHP's [htmlspecialchars()](http://us3.php.net/htmlspecialchars) function.

>> Certain characters have special significance in HTML, and should be represented by HTML entities if they are to preserve their meanings. The htmlspecialchars() function returns a string with these conversions made.

`&` (ampersand) becomes `&amp;`

`"` (double quote) becomes `&quot;` when ENT_NOQUOTES is not set.

`'` (single quote) becomes `&#039;` (or &apos;) only when ENT_QUOTES is set.

`<` (less than) becomes `&lt;`

`>` (greater than) becomes `&gt;`

To clarify here, an HTML entity is a character code that can represent a special character. For example, instead of writing a `<` (less than sign) you can write `&lt;` and see the same results on the page.

By replacing HTML entities with character codes, you're forcing the browser to just display these characters rather than actually interpret them.

Example:

	$string = "<script>alert(/XSS Attack!/)</script>"
	echo htmlspecialchars($string);
	
Would create this HTML:

	&lt;script&gt;alert(/XSS Attack!/)&lt;/script&gt;
	
Which would look like this on the page:

	<script>alert(/XSS Attack!/)</script>

To make this method even more secure, add two additional paramaters:

	htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
	
`ENT_QUOTES` will force single quotes to also get encoded, and `UTF-8` will ensure that any output is `UTF-8` compliant. 

Given this is a function you'll want to use a lot, you may want to make a shortcut for it:

	function clean($string) {
		return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
	}
 
**Any output coming from your database that was entered by a user should be run through this filter.**

Example:

	Hello <?=clean($first_name);?>!

Reference:

* [Sunny Tuts: Preventing Cross Site Scripting (XSS)](http://www.sunnytuts.com/article/preventing-cross-site-scripting-xss)

## A note on other commonly referenced methods
When researching XSS you may also hear mention of [htmlentites()](http://php.net/manual/en/function.htmlentities.php) and [strip_tags()](http://php.net/manual/en/function.strip-tags.php) as other methods used to excape your output.

htmlentities() is just like htmlspecialchars() except it will encode *any* HTML entities (not just ampersands, quotes and less than / greater than signs). This method is suggested in place of htmlspecialchars() if you're not using UTF-8.

There's also strip_tags() which will completely strip out any tags. 

Example:

	$post = "<script>alert(/XSS Attack!/)</script>";
	echo strip_tags($post);	

Would result in this:

	alert(/XSS Attack!/)

The problem with strip_tags() is it might remove harmless characters from your user's input, for example, a math equation `10 < 100` or a heart emoticon: `<3`.

Furthermore, simply removing tags won't prevent all XSS attacks; there are plenty of attacks that could be, for example, inserted into HTML attributes which might already be in tags. 


## Allowing users to enter HTML
If you're building an app that requires a user be able to enter HTML code, for example, a forum about coding, you should take a look at [HTMLPurifier](http://htmlpurifier.org/).

>> HTML Purifier will not only remove all malicious code (better known as XSS) with a thoroughly audited, secure yet permissive whitelist, it will also make sure your documents are standards compliant, something only achievable with a comprehensive knowledge of W3C's specifications. Tired of using BBCode due to the current landscape of deficient or insecure HTML filters? Have a WYSIWYG editor but never been able to use it? Looking for high-quality, standards-compliant, open-source components for that application you're building? HTML Purifier is for you!


## Why not just clean the data before saving it?

Above it was mentioned that XSS prevention is done on output. Here's a few reasons why:

* If you make a mistake, you'll break all the data you're storing and you won't have an original copy to refer back to.

* You might want to escape differently for different output methods. For example, perhaps you need to output data into a PDF instead of HTML.

* Different data may need to be escaped differently, or your method of escaping may change over time. Doing the escaping on output gives you that flexibility.



## Content Security Policy (CSP)

An additional level of protection against XSS attacks can be executed with a CSP - Content Security Policy. 

>> Instead of blindly trusting everything that a server delivers, CSP defines the Content-Security-Policy HTTP header that allows you to create a whitelist of sources of trusted content, and instructs the browser to only execute or render resources from those sources. Even if an attacker can find a hole through which to inject script, the script won’t match the whitelist, and therefore won’t be executed. -[HTML5rocks.com: Content Security Policy](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)

* Disables all inline scripts and styles
* CSP is currently supported by Chrome 16+, Safari 6+, Firefox 4+ with limited support in IE 10

Example:

	<meta http-equiv="Content-Security-Policy" content='default-src; script-src https://ajax.googleapis.com;'>

References:

* [Twitter: Improving Browser Security with CSP](https://blog.twitter.com/2011/improving-browser-security-csp)
* [HTML5rocks.com: Content Security Policy](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)


