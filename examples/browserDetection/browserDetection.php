<!-- OKTOSHOW -->

<title>Browser Detection</title>

<a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>


<br/><br/>



<?
/*-------------------------------------------------------------------------------------------------
browserDisposal
-------------------------------------------------------------------------------------------------*/
function browserDisposal($diffValuesArray) { 

    $u_agent   = $_SERVER['HTTP_USER_AGENT']; 
    $bname     = 'Unknown';
    $platform  = 'Unknown';
    $version   = "";

    // Get the name of the useragent
    if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)) 
    { 
        $bname = 'Internet Explorer'; 
        $ub = "MSIE"; 
    } 
    elseif(preg_match('/Firefox/i',$u_agent)) 
    { 
        $bname = 'Mozilla Firefox'; 
        $ub = "Firefox"; 
    } 
    elseif(preg_match('/Chrome/i',$u_agent)) 
    { 
        $bname = 'Google Chrome'; 
        $ub = "Chrome"; 
    } 
    elseif(preg_match('/Safari/i',$u_agent)) 
    { 
        $bname = 'Apple Safari'; 
        $ub = "Safari"; 
    } 
    elseif(preg_match('/Opera/i',$u_agent)) 
    { 
        $bname = 'Opera'; 
        $ub = "Opera"; 
    } 
    elseif(preg_match('/Netscape/i',$u_agent)) 
    { 
        $bname = 'Netscape'; 
        $ub = "Netscape"; 
    } 
    
    // see how many we have
    $i = count($matches['browser']);
    if ($i != 1) {
        //we will have two since we are not using 'other' argument yet
        //see if version is before or after the name
        if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
            $version= $matches['version'][0];
        }
        else {
            $version= $matches['version'][1];
        }
    }
    else {
        $version= $matches['version'][0];
    }
   
    // Find the value we need
    $returnValue = $diffValuesArray[$ub];
    
    # Catch all case, use the "Other value"
	if($returnValue == "") $returnValue =  $diffValuesArray['other'];

	return $returnValue;
    
     
} 




/*-------------------------------------------------------------------------------------------------
Example
-------------------------------------------------------------------------------------------------*/
$diffValuesArray = array("Firefox" => 100, "Safari" => 200, "MSIE" => 300, "other" => 900);

$width = browserDisposal($diffValuesArray);

# User our variable: PHP displays HTML
echo "<div id='footer' style='width:px".$width."'></div>";

?>

<!-- OR: HTML displays PHP -->
<div id='footer' style='width:<?=$width?>px;  height:100px'>FOOTER</div>



