<!DOCTYPE html>

<head>

	<title></title>

	<link rel="stylesheet" href="/storage/code/includes/code.css" type="text/css">

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
	
	<?
	// PHP code goes here
	$color = $_GET['color'];
	
	?>
	
	<style type='text/css'>
			
		b {
			background-color:yellow;
		}
		
		div {
			width:100px;
			height:100px;
			background-color:<?=$color?>;
			border:1px solid black;
		}

	</style>
	
	
</head>


<body>
	
	Query Strings are variables we append to URL's, to give that page information on how it should run.<br>
	To start a Query String just write add <code>?=</code> to the end of your URL: <br>
	
	<pre>http://students.susanbuck.net/storage/code/query-strings/index.php<b>?color=red</b></pre>
	
	<br><br>
	
	To add multiple Query Strings, separate them with an &<br>
	
	<pre>http://students.susanbuck.net/storage/code/query-strings/index.php<b>?color=red&size=big</b></pre>
	
	<br><br>
	
	The purpose of Query Strings is to pass information to our page, so we need to be able to read the Query String in our PHP file. That looks like this:
	
	<pre>
	&lt;?
	$color = $_GET['color'];
	?&gt;
	</pre>
	
	Once we load the Query String into a variable we can use it anywhere we want in the HTML (or CSS) by writing something like this:
	
	<pre>
	The color is &lt;?=$color&gt;
	</pre>
	
	
	This page is programmed is read a QS called "color" and style this div with it:<br><br>
	
	<div></div>
	<br>
	Try it out:<br>
	
	<a href='/storage/code/query-strings/index.php?color=red'>http://students.susanbuck.net/storage/code/query-strings/index.php?color=red</a><br>
	<a href='/storage/code/query-strings/index.php?color=blue'>http://students.susanbuck.net/storage/code/query-strings/index.php?color=blue</a>
	<br><br>
	Try typing your own color into the URL bar.
	<br><br>
	<a href='/source/<?=$_SERVER['PHP_SELF']?>'>View Source code for this page</a><br><br>
	
		
</body>

</html>