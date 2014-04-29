<!DOCTYPE html>

<head>

	<? require_once("DB.php"); ?>
	
	<?
	$contestants = DB::instance()->select_rows("SELECT * FROM susan_contestants");
	?>

</head>

<body>

	<? require_once("menu.php") ?>
	
	<br><br>

	<table border=1>
	
		<tr>
			<th>Contestant Id</th>
			<th>First Name</th>
			<th>Winner?</th>
		</tr>
	
		<? foreach($contestants as $index => $contestant) { ?>
			<tr>
				<? foreach($contestant as $field => $value) { ?>
					<td><?=$value?></td>
				<? } ?>
			</tr>
		
		<? } ?>
	</table>
		
</body>

