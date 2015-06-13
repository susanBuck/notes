Before we move on, adding more pages to our app, let's build a simple navigational menu. Because we want the menu displayed on all the pages, we're going to put it directly in the master template.

`/views/_v_template.php` (shown here is just the `<body>` of the template):

	<body>	
	
		<div id='menu'>
	
			<a href='/'>Home</a>
		
			<!-- Menu for users who are logged in -->
			<?php if($user): ?>
				
				<a href='/users/logout'>Logout</a>
				<a href='/users/profile'>Profile</a>
			
			<!-- Menu options for users who are not logged in -->
			<?php else: ?>
			
				<a href='/users/signup'>Sign up</a>
				<a href='/users/login'>Log in</a>
				
			<?php endif; ?>
		
		</div>
		
		<br>
	
		<?php if(isset($content)) echo $content; ?>
	
	</body>

Note how we're displaying different options based on whether a user is logged in or not.

<img src='http://making-the-internet.s3.amazonaws.com/framework-menu.png'>