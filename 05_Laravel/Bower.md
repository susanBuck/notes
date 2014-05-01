## Bower: Front-end package manager

Resources: 
	* <https://laracasts.com/lessons/save-time-with-bower>
	* <http://blog.teamtreehouse.com/getting-started-bower>
	* <http://code.tutsplus.com/tutorials/meet-bower-a-package-manager-for-the-web--net-27774>

Assumptions: You've already installed Node and have access to npm

Now, install Bower:

	$ npm install -g bower
	
Common Problems: [1](http://stackoverflow.com/questions/21616785/bower-installation-errors)

Test that bower is installed:

	$ bower
	
See what commands you have available to you with bower:

	$ bower help
	
Get help about a specific command, for example `list`

	$ bower help list

Search for plugins, for example jQuery:

	$ bower search jquery
	
FYI: Regular old jQuery should be all the way at the top.

You can also browse for packages ala <http://bower.io/search/>

Before you install anything, let's tell bower where to put stuff. 
In the root of your Laravel app create a file called `.bowerrc` and fill it with this JSON:

	{
	
		"directory": "public/components/"
		
	}
	
Now, bower will install everything in `public/components/`. The reason we're putting it in a dir called `componenets` instead of just `js` is because backages you'll be installing can have .css files, images, etc.&mdash; not just .js files.

Now create a `bower.json` file in the root of your app which is where you can list your dependencies. Set a value `name` to be the name of your app. We'll start with one dependency: jQuery. 

	{
	  "name": "Foobar",
	  "dependencies": {
	    "jquery": "~1.x"
	  }
	}

Now, whenever you run `bower install` it will grab all the dependencies you have listed in this file (just like when you do `composer install` and grab PHP dependencies)
	
You should now have jQuery installed in `/public/components/jquery`

In your master view, you can now link in jQuery in the head of the page:

	<script src='/components/jquery/dist/jquery.min.js' type='text/javascript'></script>

Tip: for future packages, if you want to skip the step of manually editing `bower.json` you can just run a command like this:

	$ bower install jquery -S

Make sure you include the -S flag (Save) so it will also update your `bower.json` file.

If you want to remove a package:

	$ bower uninstall jquery -S
	
Again, the -S flag here makes sure it not only deletes the jquery files but also updates your `bower.json` file.




## Production

If you're working on a production server that supports Node/npm you'd want to tell git to ignore the `public/componenents/` so your components aren't transferred via Git. 

This is similar how we don't want Composer's `vendor/` directory to be tracked in Version Control, since the server (and any teammates) will run `composer install` and get the needed dependencies.

*However*, Pagoda doesn't currently support Node so we can't actually run Bower there. Given that, we'll let all the components travel with Git.
