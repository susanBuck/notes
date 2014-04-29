<!-- OKTOSHOW -->

<?
$cookie   = $_GET['cookie'];
?>

<script type="text/javascript">
var cookie 	    = '<?=$cookie?>';

// Set the cookie
document.cookie = 'classdemosUser=' + cookie + '; expires=Fri, 17 Dec 2020 10:00:00 GMT; path=/;';

// Then redirect to the add page
parent.location = "confirmation.php";

//document.write("Set the cookie 'classdemosUser' to " + cookie);

</script>


