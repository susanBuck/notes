<!-- OKTOSHOW --><a href='/classes/viewSource/?path=<?=$_SERVER['PHP_SELF']?>' target='_blank'>View Source</a><br/><br/><br/>

<?

  function analyzeImageColors($im, $xCount =3, $yCount =3)
  {
  
    
    //get dimensions for image
    $imWidth =imagesx($im);
    $imHeight =imagesy($im);
    //find out the dimensions of the blocks we're going to make
    $blockWidth =round($imWidth/$xCount);
    $blockHeight =round($imHeight/$yCount);
    //now get the image colors...
    for($x =0; $x<$xCount; $x++) { //cycle through the x-axis
      for ($y =0; $y<$yCount; $y++) { //cycle through the y-axis
        //this is the start x and y points to make the block from
        $blockStartX =($x*$blockWidth);
        $blockStartY =($y*$blockHeight);
        //create the image we'll use for the block
        $block =imagecreatetruecolor(1, 1);
        //We'll put the section of the image we want to get a color for into the block
        imagecopyresampled($block, $im, 0, 0, $blockStartX, $blockStartY, 1, 1, $blockWidth, $blockHeight );
        //the palette is where I'll get my color from for this block
        imagetruecolortopalette($block, true, 1);
        //I create a variable called eyeDropper to get the color information
        $eyeDropper =imagecolorat($block, 0, 0);
        $palette =imagecolorsforindex($block, $eyeDropper);
        $colorArray[$x][$y]['r'] =$palette['red'];
        $colorArray[$x][$y]['g'] =$palette['green'];
        $colorArray[$x][$y]['b'] =$palette['blue'];
        //get the rgb value too
        $hex =sprintf("%02X%02X%02X", $colorArray[$x][$y]['r'], $colorArray[$x][$y]['g'], $colorArray[$x][$y]['b']);
        $colorArray[$x][$y]['rgbHex'] =$hex;
        //destroy the block
        imagedestroy($block);
      }
    }
    //destroy the source image
    imagedestroy($im);
    return $colorArray;
  }

echo analyzeImageColors("/home/content/s/u/s/susanbuck/html/upenn/examples/images/clouds0.jpg");

?>


Done