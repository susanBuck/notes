## Deploy to the live server
Your local server is setup, running your first app. Next, you need to mirror this setup on your live server.

First, you'll need a copy of the `core` repository. SSH into your live server and navigate to your `public_html` directory then run this command:

	git clone git://github.com/susanBuck/core

Note, we're cloning via the `git:\\` protocol which works most consistently on different servers. The `git://` protocol is a one way street&mdash; you can only use it to pull data; this is okay for the framework core, though, because you only have read access to this repository anyway.

Next, you'll need a copy of your app repository. Also in `public_html`, run this command (with your own details):

	git clone https://github.com/your-username/p2.yourdomain.com
	
If this command gives you problems on your server, you'll have to try one of the other protocols (`http://`, `git://`, or SSH). Revisit the <a target='_blank' href='/Version_Control/Common_problems'>Version Control Common Problems doc</a> for complete instructions.


When you're done, your live server should look something like this (give or take any other files you may have had up there):

	/public_html/
			/core/
			/p1.yourdomain.com/
			/p2.yourdomain.com/
			
## environment.php for the live server
Because `environment.php` is purposefully not version controlled, it wasn't included in either of the previous clones. Given this, you need to manually put an environment.php file on the live server.

Create a new file in `public_html/` called `environment.php` and fill it with the code from the [sample-environment.php](http://github.com/susanBuck/core/blob/master/samples/sample-environment.php). If your command line editing skills are a little rusty, the easiest way to do this is via your code editor and FTP.

After you create the environment file from the sample, there's couple lines you need to tweak.

First, you need to set the IN_PRODUCTION constant to be true (Since the live server is considered in production):

	define('IN_PRODUCTION', TRUE);
	
Next, you want to toggle DISPLAY_ERRORS to false, so no error messages ever show to your users:

	define('DISPLAY_ERRORS', FALSE);

Enable outgoing email:

	define('ENABLE_OUTGOING_EMAIL', TRUE);
	
And finally, specify that you want this app to connect to the remote database once it's setup:

	define('REMOTE_DB', TRUE);

Those are the only changes we need to make right now, but we'll come back to this file when it's time to configure databases.
	
After you save your new live environment.php file your live directory structure might look something like this (at the very least it should have `environment.php`, `p2.yourdomain.com` and `core/`):

<img src='http://making-the-internet.s3.amazonaws.com/framework-live-server-give-or-take.png'>
			


## Live domain

Remember when you had to set it up so http://localhost pointed to our application? Now you need to do the same thing on our live server, but instead of http://localhost, you want to use the actual domain&mdash; in this case http://p2.yourdomain.com.

To do this, you'll follow the same procedures you did for P1 of setting up a subdomain.

1. Goto cPanel (usually just your URL followed by :2083), example: http://yourdomain.com:2083
2. In cPanel look for the subdomains option ([screenshot](http://note.io/1appQlE)).
3. Add a new subdomain called `p2`. The document root for the subdomain should be `/public_html/p2.yourdomain.com`.
<img src='http://making-the-internet.s3.amazonaws.com/framework-p2-subdomain.png'>
4. Finish creating the subdomain, wait a few minutes then test it out in your browser. You should see the same "hello world" page you saw when you set up your local server.

If your subdomain isn't propgating, try the troubleshooting techniqes outlined in [Class 1](http://dwa15.com/Classes/Class_1) (clearing cache, [flushing DNS](http://docs.cpanel.net/twiki/bin/view/AllDocumentation/ClearingBrowserCache), [testing via proxy](http://www.megaproxy.com/freesurf/)).





## Checkpoint
At this point your basic installation and setup for both the framework and your first app are complete. You should be able to view your application on both your local and your live server. 

Moving forward, we'll start digging into the mechanics of how to use the framework and start building your app's features.