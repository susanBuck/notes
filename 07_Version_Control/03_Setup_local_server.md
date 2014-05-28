In this class we're using what's commonly referred to as the LAMP stack:

+ The __L__ stands for __Linx__ - which is a common OS used for web servers. Your live servers will run on some flavor of Linux, but your local servers will actually run on Mac or Windows (more on that later).
+ The __A__ stands for __Apache__ - Open-source web server.
+ The __M__ stands for __MySQL__ - Open-source database server.
+ The __P__ stands for __PHP__ - Web scripting language.

When setting up a local server, you could individually download and install Apache, PHP and MySQL or use a all-in-one package such as [*Appsolute's* MAMP](http://www.mamp.info/en/).




## Mac

Download and install MAMP: <https://www.mamp.info/en/>.

<small>Note: The download includes both free *MAMP* and *MAMP Pro* (paid version). You'll only need to use the free MAMP version in this class.</small>

Create a new directory in your `Documents` folder called `Sites`

<img src='http://note.io/1ie3glN' style='width:300px'>

In MAMP preferences, set your *document root* to this new directory:

<img src='http://note.io/1ie3vwY' style='width:300px'>

Also in preferences, under *Ports* click *Set Apache & MySQL* ports to 80 & 3306:

<img src='http://note.io/1ie2pBF' style='width:300px'>

Create a new file in your code editor and save it as `helloworld.php` in your `Sites` directory

Fill your `helloworld.php` file with the code below.

Load your helloworld.php file in your browser ala `http://localhost/helloworld.php`.




## Windows

Download and install MAMP for Windows: <http://www.mamp.info/en/mamp_windows_beta.html>

Create a new file in your code editor and save it as `helloworld.php` in `c:\MAMP\htdocs`

Fill your `helloworld.php` file with the code below.

Load your helloworld.php file in your browser ala `http://localhost/helloworld.php`




## helloworld.php Code

	<!DOCTYPE html>
	<html>
	<head>
	  <title>Hello World</title>
	</head>
	<body>
	  <p>
		   Today is <?php echo date('l F jS'); ?> and 
		   you are visiting <?php echo $_SERVER['SERVER_NAME']?>.
	  </p>
	</body>
	</html>





