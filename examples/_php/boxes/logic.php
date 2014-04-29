<? require_once($_SERVER['DOCUMENT_ROOT'].'/view-source/ok-to-show.php'); ?>
<?php
$boxes = "";
for($i = 0; $i < 10; $i++) {
	$w = rand(100,500);
	$h = rand(100,500);
    $boxes = $boxes."<div class='box' style='width:".$w."px; height:".$h."px;'>".$i."</div>";
}
