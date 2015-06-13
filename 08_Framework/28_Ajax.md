Before digging into examples of ajax within the context of this framework, you should be familiar with Ajax in general. <a href='http://mti.dwa15.com/JavaScript/Ajax'>This set of notes</a> elaborates on what ajax is and how it works.

Given that information, let's adapt the micro-blog so that instead of submitting new blog posts via traditional POST, it submits via ajax.

First, update your existing New Post form so it has a place to put the ajax results:

	<form method='post' action='/posts/p_add'>
		<textarea name='content'></textarea><br><br>
		<input type='Submit' value='Add new post'>
	</form>
	
	<!-- Ajax results will go here -->
	<div id='results'></div>

Next, create a new, blank JavaScript file called `posts_add.js` (you can call it whatever you like, but this convention coincides nicely with the controller/method names making it easy to locate).

For the contents of `posts_add.js`, set up the process-form-via-ajax code:
		
```javascript
// Set up the options for ajax
var options = { 
	type: 'POST',
	url: '/posts/p_add/',
	beforeSubmit: function() {
		$('#results').html("Adding...");
	},
	success: function(response) { 	
		$('#results').html("Your post was added.");
	} 
}; 
	
// Using the above options, ajax'ify the form
$('form').ajaxForm(options);
```


In the `add()` method in the posts controller, load both this new JS file and the [jQuery Form Plugin](https://github.com/malsup/form/). Don't forget to download add the `jquery.form.js` plugin to your app's `js/` directory.

`c_posts.php`:

```
public function add() {
	
	# Setup view
	$this->template->content = View::instance('v_posts_add');
	$this->template->title   = "Add a new post";
		
	# Load JS files
	$client_files_body = Array(
		"/js/jquery.form.js",
		"/js/posts_add.js"
	);
	    
	$this->template->client_files_body = Utils::load_client_files($client_files_body);   
			
	# Render template
	echo $this->template;	
}
```

Finally, you'll want to update the `p_add()` method. Previously, it was redirecting to the post's index, so let's change that just to return a simple confirmation: 

```php
public function p_add() {
	
	// Set up the data
	$_POST['user_id']  = $this->user->user_id;
	$_POST['created']  = Time::now();
	$_POST['modified'] = Time::now();
	
	// Insert the post
	DB::instance(DB_NAME)->insert('posts',$_POST);
	
	// Send a simple message back
	echo "Your post was added";
	
}
```
	
Now, after your submit your post, you should see something like this:

<img style='border:1px solid #ccc' src='http://making-the-internet.s3.amazonaws.com/framework-add-post-ajax-v1.png'>


## Receiving data back from Ajax
So far in this example, we've been able to send data to the server to have it entered into the database. However, no meaningful information has yet to be *received* from the server.

Let's look at two different strategies for receiving data back from ajax.

1. Returning **HTML**
2. Returning data via **JSON** (JavaScript Object Notation), which JavaScript can then parse through and distribute in the page where needed

>> JSON, or JavaScript Object Notation, is an open standard format that uses human-readable text to transmit data objects consisting of attribute-value pairs. It is used primarily to transmit data between a server and web application, as an alternative to XML.
Although originally derived from the JavaScript scripting language, JSON is a language-independent data format, and code for parsing and generating JSON data is readily available in a large variety of programming languages. - [Wikipedia](http://en.wikipedia.org/wiki/JSON)

JSON Example:

	{
	    "firstName": "John",
	    "lastName": "Smith",
	    "age": 25,
	    "address": {
	        "streetAddress": "21 2nd Street",
	        "city": "New York",
	        "state": "NY",
	        "postalCode": 10021
	    },
	    "phoneNumbers": [
	        {
	            "type": "home",
	            "number": "212 555-1234"
	        },
	        {
	            "type": "fax",
	            "number": "646 555-4567"
	        }
	    ]
	}


## Strategy 1. Receiving HTML
For this example, let's have the server respond to the *Add Post* request with some information about the post, which will be displayed in a view called `v_posts_p_add.php`. 

Note that when we set up this view, we're not using the master template; this is because this view fragment is going to be injected into the body of an existing view/template.
	
	public function p_add() {
		
		$_POST['user_id']  = $this->user->user_id;
		$_POST['created']  = Time::now();
		$_POST['modified'] = Time::now();
		
		$new_post_id = DB::instance(DB_NAME)->insert('posts',$_POST);
		
		# Set up the view
		$view = View::instance('v_posts_p_add');
		
		# Pass data to the view
		$view->created     = $_POST['created'];
		$view->new_post_id = $new_post_id;
		
		# Render the view
		echo $view;		
	}
	
The contents of the view (`v_posts_p_add.php`):
	
	Your post was created on <?=Time::display($created);?>; the new post id is <?=$new_post_id?>.
	
Now, let's adapt the JS code so that it receives the data and injects it in the page:

```javascript
var options = { 
	type: 'POST',
	url: '/posts/p_add/',
	beforeSubmit: function() {
		$('#results').html("Adding...");
	},
	success: function(response) { 
	
		// Whatever is echo'd out from the page we're calling will be
		// returned as the parameter "response".
		// Let's inject that data into the page	
		$('#results').html(response);
	} 
}; 
		
$('form').ajaxForm(options);
```		
	
Now, after submitting a new post, your page should look like this:
<img style='border:1px solid #ccc' src='http://making-the-internet.s3.amazonaws.com/framework-add-post-ajax.png'>


## 2. Receiving JSON
The above method is useful if you're dealing with data that is very HTML heavy and self-contained. Sometimes, though, you might need to deal with more granular results that need to be injected in several parts of your page rather than just one spot.

For an example, let's build a control panel for the micro-blog, which gives up-to-date information such as number of posts, number of users signed up, when the last post was made, etc. This control panel should be updated via ajax whenever the user hits a Refresh button.

Here are the different parts:

A method in `c_posts.php` to display the control panel:

	public function control_panel() {
		
		# Setup view
			$this->template->content = View::instance('v_posts_control_panel');
			$this->template->title   = "Control Panel";
		
		# JavaScript files
			$client_files_body = Array(
				'/js/jquery.form.js', 
				'/js/posts_control_panel.js');
			$this->template->client_files_body = Utils::load_client_files($client_files_body);
		
		# Render template
			echo $this->template;
	}
	
The `p_control_panel()` method which ajax will talk to:
```php
public function p_control_panel() {
	
	$data = Array();

	# Find out how many posts there are
	$q = "SELECT count(post_id) FROM posts";
	$data['post_count'] = DB::instance(DB_NAME)->select_field($q);
	
	# Find out how many users there are
	$q = "SELECT count(user_id) FROM users";
	$data['user_count'] = DB::instance(DB_NAME)->select_field($q);
	
	# Find out when the last post was created
	$q = "SELECT created FROM posts ORDER BY created DESC LIMIT 1";
	$data['most_recent_post'] = Time::display(DB::instance(DB_NAME)->select_field($q));

	# Send back json results to the JS, formatted in json
	echo json_encode($data);
}
```

	
The `v_posts_control_panel.php` view:

	<h1>Control Panel</h2>
	
	<!-- These empty divs are where JavaScript will inject the ajax results -->
	Number of posts: <div id='post_count'></div><br>
	Number of users: <div id='user_count'></div><br>
	Most recent post: <div id='most_recent_post'></div><br>	
	<button id='refresh-button'>Refresh</button>
	
The `posts_control_panel.js` JavaScript:

```javascript	
$('#refresh-button').click(function() {
 	
	$.ajax({
		type: 'POST',
		url: '/posts/p_control_panel',
		success: function(response) { 
		
			// For debugging purposes
			// console.log(response);
			
			// Example response: {"post_count":"9","user_count":"13","most_recent_post":"May 23, 2012 1:14am"}
			
			// Parse the JSON results into an array
			var data = $.parseJSON(response);
			
			// Inject the data into the page
			$('#post_count').html(data['post_count']);
			$('#user_count').html(data['user_count']);
			$('#most_recent_post').html(data['most_recent_post']);
						
		},
	});
});
```

To summarize what's going on above:

There's a view with three divs where data can be insterted (post_cont, user_count, most_recent_post). The view also includes a refresh button.

When the refresh button is clicked, JavaScript makes a call to `p_control_panel()` which gathers the latest details we want into an array. That array is converted into JSON via PHP's [json_encode()](http://us2.php.net/json_encode) method. <a href='http://en.wikipedia.org/wiki/JSON' target='_blank'>JSON</a> is a set syntax for writing data so that it can easily be parsed.

The results of `json_encode($data)` is a string which will look something like this:

	{"post_count":"9","user_count":"13","most_recent_post":"May 23, 2012 1:14am"}
	 
JavaScript receives these JSON results and parses it back into an array using jQuery's [parseJSON()](http://api.jquery.com/jQuery.parseJSON/). JavaScript pulls from that resulting array and inject the results in the appropriate divs.

The result, after hitting *Refresh*, looks like this:
<img style='border:1px solid #ccc' src='http://making-the-internet.s3.amazonaws.com/framework-control-panel.png'>

Note that this example did *not* use the jQuery form plugin, since there wasnt any form data to submit.
