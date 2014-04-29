<!-- OKTOSHOW -->
<?
/*-------------------------------------------------------------------------------------------------
returnDimensions()	
-------------------------------------------------------------------------------------------------*/	
function getDimensions($image) {

	list($width,$height) = getimagesize($image);
	
	return "Dimensions: ".$width."x".$height."<br/><br/>";

}
	 
	

	
/*-------------------------------------------------------------------------------------------------
createThumb()
-------------------------------------------------------------------------------------------------*/
function createthumb($originalImage,$newName,$new_w,$new_h) {
	
	$src_img  = imagecreatefromjpeg($originalImage);
	$newName .= ".jpg";
	
	# Maintain proportions
		$old_x = imageSX($src_img);
		$old_y = imageSY($src_img);
		
		if ($old_x > $old_y) {
			$thumb_w = $new_w;
			$thumb_h = $old_y*($new_h/$old_x);
		}
		if ($old_x < $old_y) {
			$thumb_w = $old_x*($new_w/$old_y);
			$thumb_h = $new_h;
		}
		if ($old_x == $old_y) {
			$thumb_w = $new_w;
			$thumb_h = $new_h;
		}
	
	# Create destination-image-resource
		$dst_img = ImageCreateTrueColor($thumb_w,$thumb_h);
	
	# Copy source-image-resource to destination-image-resource
		imagecopyresampled($dst_img,$src_img,0,0,0,0,$thumb_w,$thumb_h,$old_x,$old_y); 
	  
	# Create the final image from the destination-image-resource
		imagejpeg($dst_img,$newName); 
	
	# Delete our image-resources
		imagedestroy($dst_img); 
	    imagedestroy($src_img); 
	 
	 # Show results
	 	return $newName;
	 
}




/*-------------------------------------------------------------------------------------------------
writeOnImage
-------------------------------------------------------------------------------------------------*/
function writeOnImage($image,$string) {
	
	# Create destination-image-resource		
		$dst_img = imagecreatefromjpeg($image);  
	
	# Set our color		
		$color   = imagecolorallocate($dst_img, 255, 255, 255); 
	
	# Write on the destination-image-resource
		imagestring($dst_img, 3, 0, 0, $string, $color);  
	
	# Generate a jpg from the destimation-image-resource
		imagejpeg($dst_img,$image);  

}
?>