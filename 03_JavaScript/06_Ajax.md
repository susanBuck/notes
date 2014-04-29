Imagine doing the following actions and having to wait for the entire page to refresh in order to see your change:

* Posting a comment on your friend's Facebook wall
* Adding an item to a shopping cart from an online store
* Dragging around a Google Map in order to see a new portion of that map

Fortunately, all of these interactions are enhanced with ajax, which is a technique that allows a site to communicate with its server (and the server to respond), even after the page has completed loading.

This means your user can invoke small actions throughout your page and get near-immediate feedback with no page load required.


## Web page processing via traditional POST
Before ajax came along, the primary way actions were processed on a web page was to submit a HTML form via POST (we'll call this "traditional POST"), which required the entire page to reload.

While this method can be slower, it is by no means obsolete and still makes sense in a lot of scenarios where ajax does not.

For example -

If you're purchasing an airline ticket online and you've filled out a long form of information, it makes sense to submit that form in whole when you're done. Upon submitting, you expect to land on a confirmation page. Assuming there are no errors in your information, there's no reason you'd want to stay on the checkout page after your order has been received.

In this case, it would make sense to process the information via traditional POST.

Keep this in mind as you work on projects. When developers first start using ajax they tend to start using it everywhere, when really it's best left for small page interactions where it makes sense to have the user stay-put after they submit their data.


## Technical definition
Ajax stands for **Asynchronous JavaScript** and **XML**. It's not one single technology but actually a combination of technologies.

Let's break down the different pieces:

**Asynchronous** describes the &ldquo;behind the scenes&rdquo; nature of ajax. Data is transferred from the browser to the server, all behind the scenes without interrupting the existing page. To understand the asynchronous nature of ajax, you can contrast it to it's lesser known cousin SJAX:

>> Synchronous Javascript and XML means that javascript will stop processing your program until a result has been obtained from the server. While the request is processing, the browser is effectively frozen. The browser treats the call like an alert box or a prompt box only it doesn't wait for input from the user, but on input by the remote server. 99.99% of the time the response is quick and fast enough so that there isn't any problems. If anything goes wrong in the request and/or the transfer of the file, however, the user's browser may freeze for over two minutes until the request times out.

**JavaScript** is in charge charge of sending the data from the browser to the server, commonly using a browser API called the [XMLHttpRequest](https://www.google.com/search?q=behind&oq=behind&aqs=chrome..69i57.158j0j7&sourceid=chrome&espv=210&es_sm=91&ie=UTF-8#es_sm=91&espv=210&q=XMLHttpRequest)). In addition to sending the request, JS is in charge of receiving and processing any data returned form the server.

**XML** stands for Extensible Markup Language and it's describing the format of the data that's sent back from the server. XML is similar to HTML in that it's a tag based language, but it's made specifically for transferring data between machines.

All that being said, you don't have to use XML as your data protocol. It's common to have the server respond with JSON, HTML or other formats.




## Making ajax happen...

For the first example, lets create a simple name reverser: [example](http://mti.dwa15.dev/examples/_ajax/manual-ajax/reverser.php). 

In this example, we're accomplishing something super basic on the server&mdash; reversing a string. What the server is doing isn't our focus though; we're more concerned with how the data is passed back and forth between the browser and the server. Once you've mastered this, you'll move on to more advanced processing on the server such as querying a database.

Digging in, you're first going to need two pages:

### Page 1, `reverser.php` 

This is where the interaction will occur, the main page.
It will need the following:

* jQuery include
* A script element ready for JS code (you can make this external JS if you'd like)
* A simple text input for the name
* A button that will trigger the ajax call
* A blank div with the id `#results` where the results of the ajax call will go
	
````
<!DOCTYPE html>
<head>
</head>
<body>
	<label for='name'>Enter your name:</label><br>
	<input type='text' id='name' name='name'>
	<br><br>
	
	<input type='button' id='process-btn' value='Reverse it!'>

	<div id='results'></div>
			
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script>
	</script>
</body>
</html>
````
	
<img style='border:1px solid #ccc' src='http://making-the-internet.s3.amazonaws.com/ajax-reverser-before.png'>

### Page 2, `process.php` 
This page will be in charge of receiving the ajax call behind the scenes and sending some response. Given that, it needs to accept the name, reverse it, and echo out the results.

	<?php
	# Reverse the string and echo it to the page
	echo strrev($_POST['name']);

### JavaScript ajax call
With that set, let's focus on the JavaScript and the following tasks inside `reverser.php`:

* Wire the `#process-btn` so that when its clicked it makes a ajax call
* The ajax call should be made to `process.php` 
* The ajax call needs to send some data with it - in this case, the name that the user typed in
* The ajax call also needs to accept the results from the server (the name reversed), and do something with those results - in this case, put them in the `#results` div

```javascript
$('#process-btn').click(function() {
	$.ajax({
		type: 'POST',
		url: 'process.php',
		success: function(response) { 
			
			// Enject the results received from process.php into the results div
			$('#results').html(response);
		},
		data: {
			name: $('#name').val(),
		},
	}); // end ajax setup
});

```

Test out your name reverser to make sure it works.

<img style='border:1px solid #ccc' src='http://making-the-internet.s3.amazonaws.com/ajax-reverser-after.png'>

In this example, we're using the [$.ajax](http://api.jquery.com/jQuery.ajax/) method which provides the most functionality. Note, though, that there are [5 different methods for making ajax calls in jQuery](http://net.tutsplus.com/tutorials/javascript-ajax/5-ways-to-make-ajax-calls-with-jquery/). 

## Debugging
When you're working on ajax calls, it's useful to have a browser web developer toolbar open because it can show you details of the call.

Here's the developer console in Chrome set on the Network tab after we ran the above work. Every time you make an ajax call it will get added to this window, and you can click on each call to see the details of what data was sent and what data was received from the server.

<img style='border:1px solid #ccc' src='http://making-the-internet.s3.amazonaws.com/ajax-debug.gif'>

## Submitting an entire form via ajax
In the first example, we used HTML form elements and wired our own behavior for that form: we attached a listener to the button making it act as a submit button, and we choose which data from the form got sent via ajax.

This is one way of building an ajax call, but you can also take a traditional HTML form and make it so that it submits via ajax instead of traditional POST.

Let's change up the HTML, formatting it as a complete form. This includes a start and end form tag, and an actual submit button.

	<form>
		<label for='name'>Enter your name:</label><br>
		<input type='text' id='name' name='name'><br><br>
		<input type='submit' value='Reverse It!'>		
	</form>
	
	<!--You'll put the results in this empty div -->
	<div id='results'></div>
	
If you didn't do anything else and hit submit the page would attempt to process the form by submitting the page to itself (because we didn't specify an action attribute).

What we want to do is prevent the form from doing this standard behavior, and instead force it to submit via ajax.

To do this, we're going to introduce a jQuery plugin called, simply, the *jQuery Form Plugin*. 
Download the plugin zip here: <https://github.com/malsup/form/>

After you download it, unzip the contents and put just `jquery.form.js` in your `js/` folder if you have one, or with the rest of your practice work.

Then, include the plugin, right after jQuery:

	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.form.js"></script>
	

Now, set up the ajax call using the plugin:
				
	// First, set up the options for the ajax submission
	var options = { 
		type: 'post',
		url: 'process.php',
		success: function(response) { 
		    // Load the results recieved from process.php into the results div
			$('#results').html(response);	    
		} 
	}; 

	// Then attach the ajax form plugin to this form so that when it's submitted, 
	// it will be submitted via ajax	
	$('form').ajaxForm(options);
	
The code above is relatively straightforward, but be sure to check out the [jQuery form plugin documentation](http://jquery.malsup.com/form/) for full details.

Test your code. You should see the same results as [this example...](http://mti.dwa15.com/examples/_ajax/form-ajax/reverser.php)

Note the actual experience for the user isn't at all different than the first example&mdash; the differences were only from the developer's perspective.



## Additional Options
Both the first and second method we just covered have numerous options you can set that determine how the ajax call works. 

You can learn about these options via the jQuery ajax doc and the jQuery Form Plugin page respectively, but let's look at one option we might add.

In the examples so far, the work the server has been doing in `process.php` happens pretty much instantaneously, but this won't always be the case. If you're doing something more complex, such as querying the database or pinging another server, the results could be delayed anywhere from a fraction of a second to multiple seconds, all depending on the speed of your server and your user's connection.

Because of this, it's useful to give the user some sort of feedback that work is being done. This usually comes in the form of a message that says &ldquo;Loading...&rdquo; or a little graphic that spins, indicating work is being done. Without this feedback, the user will hit the submit button and it will appear as if nothing is happening, which may cause them to leave mid-call.

Let's tweak the settings so that you can trigger something to happen when the ajax call starts. Specifically, we want to display a message on the page. When the work is done, we'll remove that message.

To do this, add a `beforeSend` option:
	
	beforeSend: function() {
		// Display a loading message while waiting for the ajax call to complete
		$('#results').html("Loading...");
	},

Here it is in place:
	
```javascript		
$('#process-btn').click(function() {
		
	$.ajax({
		type: 'POST',
		url: 'process.php',
		beforeSend: function() {
			// Display a loading message while waiting for the ajax call to complete
			$('#results').html("Loading...");
		},
		success: function(response) { 
              	// Load the results we get back from process.php into the results div
			$('#results').html(response);
		},
		data: {
			name: $('#name').val(),
		},
	}); // end ajax setup
		
}); // end process-btn wiring
```

In order to test this out, you'll need to purposely slow down the process page:

	<?php
	# Make this script slower so we can test our loader
	sleep(2);
	
	# Reverse the string and echo it to the page
	echo strrev($_POST['name']);


[Here's this example in action...](http://mti.dwa15.com/examples/_ajax/manual-ajax-with-loader/reverser.php)

Here's some [Image spinners](http://ajaxload.info/) or [CSS spinners](http://codepen.io/collection/HtAne/1) you can use in place of the text &ldquo;Loading...&rdquo;