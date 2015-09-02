<?php
# wcc-hosting.com / mariposa / f********4
?>

## Task

Create a simple website for Mariposa Bakery in Cambridge

Background: <http://www.yelp.com/biz/mariposa-bakery-cambridge>

Example: <http://mariposa.wcc-hosting.com/>




## Create your directory structure and download images
Create a directory called `mariposa/` somewhere on your local computer.

Inside of it, create a subdirectory called `images/`.

Download a copy of the following images to `/mariposa/images`:

* <http://making-the-internet.s3.amazonaws.com/html-exercise-butterfly-logo.png>
* <http://making-the-internet.s3.amazonaws.com/html-exercise-coffee-and-snack.jpg>




## Build the index page
Next, create a file called `index.html` in the root of your `mariposa` folder.

Inside of `index.html` lay out the basic HTML structure for a page, and in the `<body>` include this heading element:

	<h1>Welcome to Mariposa Bakery</h1>

Load this file in your browser and make sure it works.

Now, continue to build out the index making it match the example:

* Remember to fill in your `<title>` element in the head of the page.
* Add the logo up top
* Use a `<h2>` element for the words `Central Square, Cambridge MA` that's right below the `<h1>`.
* Create a paragraph element for the description: `Quaint, brick-walled bakery with WiFi serving homemade goodies, sandwiches and espresso drinks.`
* Create a link to Mariposa's Yelp page.
	* The URL is `http://www.yelp.com/biz/mariposa-bakery-cambridge`.
	* This link should load in a new tab.
* Create a link to `menu.html`, which you'll create in the next step.


## Build the menu page

With the index page complete, move on to the menu page and make it match [the one in our example](http://mariposa.wcc-hosting.com/menu.html).

The menu of items is created using the HTML table element. We didn't cover tables explicitly, so here's an opportunity to put your reference skills to the test.

[Check out MDN's page about tables...](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)

There's a lot of details there, so skim down to the **Examples** and find the **Simple table with header** example.
You can copy that example and replace the info for your menu.

Note how `<tr>` elements are used to create rows, and `<td>` elements are used to create cells within those rows.
