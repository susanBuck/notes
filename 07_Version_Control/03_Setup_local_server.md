In this class we're using what's commonly referred to as the LAMP stack:

+ The __L__ stands for __Linux__ - which is a common OS used for web servers. Your live servers will run on some flavor of Linux, but your local servers will actually run on Mac or Windows (more on that later).
+ The __A__ stands for __Apache__ - Open-source web server.
+ The __M__ stands for __MySQL__ - Open-source database server.
+ The __P__ stands for __PHP__ - Web scripting language.

When setting up a local server, you could individually download and install Apache, PHP and MySQL or use a all-in-one package such as [*Appsolute's* MAMP](http://www.mamp.info/en/).




## MAMP Setup on Mac

Download and install MAMP: <https://www.mamp.info/en/>.

<small>Note: The download includes both free *MAMP* and *MAMP Pro* (paid version). You'll only need to use the free MAMP version in this class.</small>

Create a new directory in your `Documents` folder called `Sites`:

<img src='http://making-the-internet.s3.amazonaws.com/vc-sites-in-documents@2x.png' style='width:100%; max-width:540px'>

In MAMP preferences, set your *document root* aka *root* to this new directory:

<img src='http://making-the-internet.s3.amazonaws.com/vc-set-root-in-mamp@2x.png' style='width:100%; max-width:540px'>

Also in preferences, under *Ports* click *Set Apache & MySQL* ports to `80` & `3306`:

<img src='http://making-the-internet.s3.amazonaws.com/vc-mamp-ports@2x.png' style='width:100%; max-width:540px'>

Next, create a new file in your code editor and save it as `helloworld.php` in your `Sites` directory.

Paste in [this code](https://gist.github.com/susanBuck/3f133c6d64be0f6f27a9) to your `helloworld.php` file.

Load your `helloworld.php` file in your browser ala `http://localhost/helloworld.php`.

<img src='http://making-the-internet.s3.amazonaws.com/vc-hello-world-done-on-mac@2x.png' class='' style='max-width:746px; width:100%' alt=''>

A note on ports: the default Apache port is 80, so setting it to 80 above makes it so you can access your local sites via the url `http://localhost`. If your Apache port is something else, for example, 8888, you'd have to access your sites via `http://localhost:8888`.



## MAMP Setup on Windows

Download and install MAMP for Windows: <http://www.mamp.info/en/mamp_windows_beta.html>.

During installation, you may be told that MAMP requires two additional pieces of software:

+ Microsoft .NET framework 4
+ Microsoft Visual C++

Follow all the prompts, instructions to install these add-ons. 

Once MAMP is installed, you should see this Window, and barring any conflicts, your Apache and MySQL server should be running:

<img src='http://making-the-internet.s3.amazonaws.com/vc-mamp-on-windows-running@2x.png' class='' style='max-width:1056px; width:100%' alt=''>

With your local server running, you can test out your first web page...

Create a new file in your code editor and save it as `helloworld.php` in `c:\MAMP\htdocs`. This directory, `c:\MAMP\htdocs` is your *document root* aka *root* for your local server.

Paste in [this code](https://gist.github.com/susanBuck/3f133c6d64be0f6f27a9) to your `helloworld.php` file.

Load your `helloworld.php` file in your browser ala `http://localhost/helloworld.php`.

<img src='http://making-the-internet.s3.amazonaws.com/vc-hello-world-done-on-pc@2x.png' class='' style='max-width:579px; width:100%' alt=''>



## Troubleshooting
If Apache or MySQL fails to start (as indicated by a lack of two green dots in the MAMP window), check for error logs in the following locations:

+ Mac: `/Applications/MAMP/logs`
+ Windows: `C:\MAMP\logs`

