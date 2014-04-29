<?

$to      = "susan@susanbuck.net";
$subject = "Contact form submission from ".$_POST['name'];
$body    = $_POST['message'];

mail($to, $subject, $body);

echo "Sent!";

?>