**FYI: This is an info only page; no action steps need to be taken**

Before we dig into customization, let's talk about the organization of applications. Each unique project you build should be considered its own application.

We're going to start off in our examples building one single application, but we want to build assuming that down the road you'll be constructing multiple applications, all of which can operate using the same framework core.

So imagine you're an entrepreneur who is starting an online store selling vitamins, but you also have a local coffee shop and a side hobby of organizing your family tree. 

You have one host from which you want to run these three separate projects.

Each project has its own domain: `myvitamins.com`, `javabeans.com` and `theobrienfamilytree.com`.

To set this up, you would want each project to have its own directory, parallel to your `core/` framework files. For convention's sake, you should use the domain name for each app as the directory name.

Example:

	/root/
		 /core/
		 /environment.php
		 /javabeans.com/
		 /myvitamins.com/
		 /theobrienfamilytree.com/
		 
That's more of a real world example. For course work, each app will exist on a subdomain, so this is what you'll end up with by the end of the semester:

	/root/
		 /core/ 
		 /environment.php
		 /p1.yourdomain.com/
		 /p2.yourdomain.com/
		 /p3.yourdomain.com/
		 /p4.yourdomain.com/
