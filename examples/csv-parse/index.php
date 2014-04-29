<html>

<head>

	<title>CSV-Parse</title>

	<?
	# Load the data
	$handle = fopen("data.csv", "r");
	?>
	
	
</head>

<body>

	<a href='/source/<?=$_SERVER['PHP_SELF']?>'>View Source</a>

	<a href='data.csv'>data.csv</a><br><br>

	<!-- Loop through the data -->
	<? while (($data = fgetcsv($handle, 5000, ",")) !== FALSE): ?>
	
		<?=$data[0]?> was born on <?=$data[1]?>, <?=$data[2]?> <?=$data[3]?><br>
	
	<? endwhile; ?>
	
</body>