<!-- OKTOSHOW -->
<?

	
/*-------------------------------------------------------------------------------------------------
createThumb()
-------------------------------------------------------------------------------------------------*/
function createthumb($originalImage,$new_w,$new_h) {
	
	$src_img  = imagecreatefromjpeg("uploads/".$originalImage);
	
	# Add the _t to our image name
		list($imageName,$extension) = explode(".",$originalImage);
		$newName = $imageName."_t.".$extension;
	
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
		imagejpeg($dst_img,"uploads/".$newName); 
	
	# Delete our image-resources
		imagedestroy($dst_img); 
	    imagedestroy($src_img); 
	 
	 # Show results
	 	return $newName;
	 
}


?>