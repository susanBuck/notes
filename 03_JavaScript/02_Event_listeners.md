## Recap
* We're learning JavaScript and jQuery at the same time.
* External jQuery include using the [script element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script): `<script src="/path/to/file.js"></script>`.
* We're loading jQuery from the Google API Library.
* Using the jQuery selector `$` you can interact with any element on the page.
* Using the jQuery method `.css()` you can change the style of any element on the page.

## Exercises from last class
* Write a line that will make the lucy div have a 3px solid red border.
* Write a line that will make both the lucy and the ricky divs yellow
* Write a line that will turn the body of the page yellow
* Write a line that will turn all the divs on your page green
* Write a line that will all the divs on your page disappear

## Events
At the start of the first class we talked about how JavaScript involves actions and reactions. Up until now you've been seeing a lot of reaction with things changing on the page, so now let's program the page to listen for actions. To do this we'll introduce events.

There's a full list of all the [jQuery event listeners here](http://api.jquery.com/category/events/), but let's focus in on some of the common ones:

* `.click()`
* `.dblclick()`
* `.hover()`
* `.keypress()`

The names of these methods should be pretty self-explanatory for what they do, but let's look at how to write code for them.

__Task: Write an event listener for the lucy div that when clicked, prints &ldquo;Hello World&rdquo; to the console.__


	
	$('#lucy').click(function() {	
		console.log("You clicked on Lucy.");
	});
		

	
## Practice
* When lucy is clicked, change her border to blue.
* When lucy is clicked change the width of ricky to 400px.
* When lucy is hovered, change her opacity to .5.
* When either lucy or ricky is clicked, change the height of lucy to 300px.
* When either lucy or ricky is clicked, make them disappear.
* Bonus: Create a text input on your page where a user can type in a color. When the user finishes typing in their color and clicks on the lucy div, it should change that div to whatever color they typed in. You'll want to lookup the `.val()` method to get this done.

