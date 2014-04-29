
<!-- OKTOSHOW --><a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>


<?
$boxOfCrayons[] = "yellow";
$boxOfCrayons[] = "orange";
$boxOfCrayons[] = "green";

echo "<script type='text/javascript'>";
echo "crayons = new Array();";

foreach($boxOfCrayons as $thisCrayon) {
    echo "crayons.push('".$thisCrayon."');";
}
echo "</script>";

?>	
		
		
		
<script type='text/javascript'>

for (var i =0 ; i < crayons.length; i++ ){
  document.write(crayons[i]);
}

</script>
		