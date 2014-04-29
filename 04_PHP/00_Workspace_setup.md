## Mac

Download and install MAMP: <https://www.mamp.info/en/>

Create a new directory in your `Documents` folder called `Sites`

<img src='http://note.io/1ie3glN' style='width:300px'>

In MAMP preferences, set your document root to this new directory:

<img src='http://note.io/1ie3vwY' style='width:300px'>

Also in preferences, under Ports click *Set Apache & MySQL* ports to 80 & 3306

<img src='http://note.io/1ie2pBF' style='width:300px'>

Create a new file in your code editor and save it as `helloworld.php` in your `Sites` directory

Fill your `helloworld.php` file with the code below.

Load your helloworld.php file in your browser ala `http://localhost/helloworld.php`






## Windows

Download and install MAMP: <http://www.mamp.info/en/mamp_windows_beta.html>

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
