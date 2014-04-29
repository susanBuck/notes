/**** IMPORTANT: Due to plug-in limitations, this project only works in Firefox and Safari browsers. ****/

$(document).ready(function() { // start doc ready; do not delete this!

	// Tabs functionality for Selection pane
	$('#tabs').tabs();

	// Variables specific to inner image color manipulation
	var image = document.getElementById('image');
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var originalPixels = null;
	var currentPixels = null;
	
	// Change color values from hexadecimal to RGB
	function hexToRGB(hex)
	{
    	var long = parseInt(hex.replace(/^#/, ""), 16);
    	return {
        	R: (long >>> 16) & 0xff,
        	G: (long >>> 8) & 0xff,
        	B: long & 0xff
    	};
	}
	
	// Change inner image color
	function changeColorForeground()
    {	
        if(!originalPixels) return; // Check if image has loaded
        var newColor = hexToRGB(document.getElementById('foreground').value);

        for(var I = 0, L = originalPixels.data.length; I < L; I += 4)
        {
            if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
            {
                currentPixels.data[I] = originalPixels.data[I] / 255 * newColor.R;
                currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * newColor.G;
                currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * newColor.B;
            }
        }

        ctx.putImageData(currentPixels, 0, 0);
        image.src = canvas.toDataURL('image/png');
    }
	
	// Change inner image color (specific to swap function)
	function changeColorBackground()
    {	
        if(!originalPixels) return; // Check if image has loaded
        var newColor = hexToRGB(document.getElementById('background').value);

        for(var I = 0, L = originalPixels.data.length; I < L; I += 4)
        {
            if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
            {
                currentPixels.data[I] = originalPixels.data[I] / 255 * newColor.R;
                currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * newColor.G;
                currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * newColor.B;
            }
        }

        ctx.putImageData(currentPixels, 0, 0);
        image.src = canvas.toDataURL('image/png');
    }
	
	// Get pixel info for inner image selected by user
	function getPixels(img)
	{
   	    canvas.width = img.width;
    	canvas.height = img.height;

    	ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
    	originalPixels = ctx.getImageData(0, 0, img.width, img.height);
   	    currentPixels = ctx.getImageData(0, 0, img.width, img.height);

    	img.onload = null;
	}

	// Default selection of image_1 upon page load
	var check1 = 0;
	var check2 = 0;

	if (check2 == 0) {
		$('#inner-image').css({ opacity: 0.5 });
		//$('#inner-image').html("<img src='/images/image_1.png' id='image'>");
		document.addEventListener ("load", getPixels(image), false);
		
		check2 = 1;
	}
	
	// Change inner image color (foreground) via color selection pane (utilizes JSColor plug-in)
	$('input[name=foreground]').click(function() {
		
		// Set the inner image to be that color
		changeColorForeground();

	});
	
	//Change background color (background) via color selection pane (utilizes JSColor plug-in)
	$('input[name=background]').click(function() {

		// Find out what background color was clicked;
		var background_color = $(this).css('background-color');

		// Set the canvas to be that color
		$('#texture-image').css('background-color', background_color);

	});
	
	
	// Swap foreground and background colors
	$('#swap').button().click(function() {
				
		var background_color = $('input[name=background]').css('background-color');
		var inner_image_color = $('input[name=foreground]').css('background-color');
			
		var x = document.getElementById('foreground').value;
		var y = document.getElementById('background').value;
				
		if (check1 == 0) {
			// Swap colors
			document.getElementById('foreground').style.backgroundColor = '#'+y;
			document.getElementById('background').style.backgroundColor = '#'+x;
		
			document.getElementById('foreground').value = y;
			document.getElementById('background').value = x;
			
			$('#texture-image').css('background-color', inner_image_color);
			changeColorForeground()
				
			check1 = 1;
		}
		else if (check1 == 1) {
			// Swap colors back
			document.getElementById('foreground').style.backgroundColor = '#'+y;
			document.getElementById('background').style.backgroundColor = '#'+x;
		
			document.getElementById('foreground').value = y;
			document.getElementById('background').value = x;
			
			$('#texture-image').css('background-color', inner_image_color);
			changeColorForeground();
				
			check1 = 0;
		}
    });
	
	
	// Reset foreground and background colors to white (#FFFFFF)
	$('#reset_colors').button().click(function() {
			
		document.getElementById('foreground').style.backgroundColor = '#FFFFFF';
		document.getElementById('background').style.backgroundColor = '#FFFFFF';
		
		document.getElementById('foreground').value = 'FFFFFF';
		document.getElementById('background').value = 'FFFFFF';
		
		var background_color = $('input[name=background]').css('background-color');
		var inner_image_color = $('input[name=foreground]').css('background-color');
			
		$('#texture-image').css('background-color', inner_image_color);
		changeColorForeground();
			
	});
	

	// Background texture option selector
	$('.texture-choice').click(function() {
		
		var image_that_was_chosen = $(this).css('background-image');
		$('#texture-image').css({ opacity: 0.5 });
		$('#texture-image').css('background-image', image_that_was_chosen);
		$('#texture_slider').slider({value:55});

	});
	
	
	// Reset background texture to empty
	$('#reset_textures').button().click(function() {
			
		var texture_default = 'url(/images/texture_7.png)';
		$('#texture-image').css('background-image', texture_default);
		$('#texture_slider').slider({value:55});
			
	});
	
	
	//Get Slider value and change texture opacity accordingly
	function textureOpacity(deg) {
		$('#texture-image').css({ opacity: (0.1*deg) });
	}
			
	$('#texture_slider').slider({
		slide: function(event, ui){
			var deg = (ui.value * (0.1));
			textureOpacity(deg);
		},
		value: 50,
		min:15,
		max:100
	});
	
	
	// Inner image option selector
	$('.inner-image-choice img').click(function() {
		document.mainpic.src = this.src;
		document.addEventListener ("load", getPixels(image), false);
		changeColorForeground();
		
	});
	
	//Get Slider value and change inner image opacity accordingly
	function imageOpacity(deg) {
		$('#inner-image').css({ opacity: (0.1*deg) });
	}
			
	$('#image_slider').slider({
		slide: function(event, ui){
			var deg = (ui.value * (0.1));
			imageOpacity(deg);
		},
		value: 55,
		min:1,
		max:100
	});
	
	
	// Get Slider value and scale image accordingly
	function enlargeImage(deg) {
		
		var x = -0.25333;
	    $('#inner-image img').width(deg);
	    $('#inner-image img').height(deg);
		$('#inner-image').css({ padding: ((x*deg+38))*2 });
		
	}
			
	$('#enlarge_slider').slider({
		step: 5,
        min: 1,
        max: 150,
        value: 75,
        slide: function(event, ui) {
            var deg = (ui.value);
			enlargeImage(deg);
        }
    });


	// Get Slider value and rotate accordingly	
	function rotateImage(deg) {
		$('#inner-image img').rotate(deg);
		
	}
			
	$('#rotate_slider').slider({
		slide: function(event, ui){
			var deg = (ui.value * (360/100));
			rotateImage(deg);
		}
	});
	
	// Apply square canvas to HTML background
	$('#submit1').button().click(function() {
        					
		var target = $('#texture-image');
		html2canvas(target, {
    		onrendered: function(canvas) {
    		var data = canvas.toDataURL();
			document.body.background = data;
    		//data is the Base64-encoded image
    		}
		});		
    });
	
	// Open square canvas as PNG image in new window for easy download
	$('#submit2').button().click(function() {
        					
		var target = $('#texture-image');
		html2canvas(target, {
    		onrendered: function(canvas) {
    		var data = canvas.toDataURL("image/png");
			window.open(data);
    		}
		});		
    });

}); // end doc ready; do not delete this!