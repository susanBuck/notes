//  Clear the result colors and captions, move them back to starting postions  //
		function clearIt() {
			$("complement").setPosition({x: 27, y: 27});
			$("analog1").setPosition({x: 27, y: 117});
			$("analog2").setPosition({x: 27, y: 117});
			$("triad1").setPosition({x: 27, y: 207});
			$("triad2").setPosition({x: 27, y: 207});
			$("tetrad1").setPosition({x: 27, y: 297});
			$("tetrad2").setPosition({x: 27, y: 297});
			$("tetrad3").setPosition({x: 27, y: 297});
			$("complementCaption").innerHTML = "";
			$("fillCaption1").innerHTML = "";
			$("fillCaption2").innerHTML = "";
			$("fillCaption3").innerHTML = "";
			$("fillCaption4").innerHTML = "";
			$("analogCaption1").innerHTML = "";
			$("analogCaption2").innerHTML = "";
			$("triadCaption1").innerHTML = "";
			$("triadCaption2").innerHTML = "";
			$("tetradCaption1").innerHTML = "";
			$("tetradCaption2").innerHTML = "";
			$("tetradCaption3").innerHTML = "";
			$("fillCaption1").setPosition({x: 27, y: 27});
			$("fillCaption2").setPosition({x: 27, y: 117});
			$("fillCaption3").setPosition({x: 27, y: 207});
			$("fillCaption4").setPosition({x: 27, y: 297});
			$("complementCaption").setPosition({x: 27, y: 27});
			$("analogCaption1").setPosition({x: 27, y: 117});
			$("analogCaption2").setPosition({x: 27, y: 117});
			$("triadCaption1").setPosition({x: 27, y: 207});
			$("triadCaption2").setPosition({x: 27, y: 207});
			$("tetradCaption1").setPosition({x: 27, y: 297});
			$("tetradCaption2").setPosition({x: 27, y: 297});
			$("tetradCaption3").setPosition({x: 27, y: 297});
			}

//  Fill the first results box with the selected color, slide captions //

		function fillColor(whichColor) {
			var myColor = (whichColor);
			$("fillColor1").setStyles({'background-color':myColor});
			$("fillColor2").setStyles({'background-color':myColor});
			$("fillColor3").setStyles({'background-color':myColor});
			$("fillColor4").setStyles({'background-color':myColor});
			$("fillCaption1").innerHTML = myColor;
			$("fillCaption2").innerHTML = myColor;
			$("fillCaption3").innerHTML = myColor;
			$("fillCaption4").innerHTML = myColor;
			$("commandText").setStyles({'visibility':'hidden'});
			//make result divs visible //
			makeVisible();
			//animate
			$("fillCaption1").set('morph', {link: 'chain'})
			.morph({'top': '81'})
			$("fillCaption2").set('morph', {link: 'chain'})
			.morph({'top': '171'})
			$("fillCaption3").set('morph', {link: 'chain'})
			.morph({'top': '261'})
			$("fillCaption4").set('morph', {link: 'chain'})
			.morph({'top': '351'})
			}
			
		//make result divs visible //
		function makeVisible() {
			$("fillColor1").setStyles({'visibility':'visible'});
			$("fillColor2").setStyles({'visibility':'visible'});
			$("fillColor3").setStyles({'visibility':'visible'});
			$("fillColor4").setStyles({'visibility':'visible'});
			$("complement").setStyles({'visibility':'visible'});
			$("analog1").setStyles({'visibility':'visible'});
			$("analog2").setStyles({'visibility':'visible'});
			$("triad1").setStyles({'visibility':'visible'});
			$("triad2").setStyles({'visibility':'visible'});
			$("tetrad1").setStyles({'visibility':'visible'});
			$("tetrad2").setStyles({'visibility':'visible'});
			$("tetrad3").setStyles({'visibility':'visible'});
			}
			
//  Set complement color and caption, animate them  //

  	function getComplement() {
			var myColor = $("fillCaption1").innerHTML;
			//maroon
			if (myColor == "800000") {
				$("complement").setStyles({'background-color':'#006600'});
				$("complementCaption").innerHTML = "006600";
				animateComplement();
				}
			//red
			else if (myColor == "FF0000") {
				$("complement").setStyles({'background-color':'#00CC00'});
				$("complementCaption").innerHTML = "00CC00";
				animateComplement();
				}
			//purple
			else if (myColor == "800080") {
				$("complement").setStyles({'background-color':'#9EBE00'});
				$("complementCaption").innerHTML = "9EBE00";
				animateComplement();
				}
			//fuschia
			else if (myColor == "FF00FF") {
				$("complement").setStyles({'background-color':'#D3FF00'});
				$("complementCaption").innerHTML = "D3FF00";
				animateComplement();
				}
			//navy
			else if (myColor == "000080") {
				$("complement").setStyles({'background-color':'#B78900'});
				$("complementCaption").innerHTML = "B78900";
				animateComplement();
				}
			//blue
			else if (myColor == "0000FF") {
				$("complement").setStyles({'background-color':'#FFBF00'});
				$("complementCaption").innerHTML = "FFBF00";
				animateComplement();
				}
			//teal
			else if (myColor == "008080") {
				$("complement").setStyles({'background-color':'#D56100'});
				$("complementCaption").innerHTML = "D56100";
				animateComplement();
				}
			//aqua
			else if (myColor == "00FFFF") {
				$("complement").setStyles({'background-color':'#FF7400'});
				$("complementCaption").innerHTML = "FF7400";
				animateComplement();
				}
			//green
			else if (myColor == "008000") {
				$("complement").setStyles({'background-color':'#A00000'});
				$("complementCaption").innerHTML = "A00000";
				animateComplement();
				}
			//lime
			else if (myColor == "00FF00") {
				$("complement").setStyles({'background-color':'#FF0000'});
				$("complementCaption").innerHTML = "FF0000";
				animateComplement();
				}
			//olive
			else if (myColor == "808000") {
				$("complement").setStyles({'background-color':'#390555'});
				$("complementCaption").innerHTML = "390555";
				animateComplement();
				}
			//yellow
			else if (myColor == "FFFF00") {
				$("complement").setStyles({'background-color':'#7109AA'});
				$("complementCaption").innerHTML = "7109AA";
				animateComplement();
				}
			else {
				alert("Please click on a color above!");
				}
				}
			//animate
			function animateComplement() {
				$("complement").set('morph', {link: 'chain'})
				.morph({'left': '117'})
				$("complementCaption").set('morph', {link: 'chain'})
				.morph({'left': '117'})
				.morph({'top': '81'})
				}
				
// Set analog colors and captions, animate them //

		function getAnalogs() {
			var myColor = $("fillCaption1").innerHTML;
			//maroon
			if (myColor == "800000") {
				$("analog1").setStyles({'background-color':'#803A00'});
				$("analog2").setStyles({'background-color':'#67003A'});
		 		$("analogCaption1").innerHTML = "803A00";
		 		$("analogCaption2").innerHTML = "67003A";
				animateAnalog();
		 		}
			//red
			else if (myColor == "FF0000") {
				$("analog1").setStyles({'background-color':'#FF7800'});
		 		$("analog2").setStyles({'background-color':'#C9007A'});
		 		$("analogCaption1").innerHTML = "FF7800";
		 		$("analogCaption2").innerHTML = "C9007A";
				animateAnalog();
		 		}
			//purple
			else if (myColor == "800080") {
				$("analog1").setStyles({'background-color':'#B00035'});
		 		$("analog2").setStyles({'background-color':'#400B86'});
		 		$("analogCaption1").innerHTML = "B00035";
		 		$("analogCaption2").innerHTML = "400B86";
				animateAnalog();
		 		}
			//fuschia
			else if (myColor == "FF00FF") {
				$("analog1").setStyles({'background-color':'#FF004D'});
		 		$("analog2").setStyles({'background-color':'#7A16FF'});
		 		$("analogCaption1").innerHTML = "FF004D";
		 		$("analogCaption2").innerHTML = "7A16FF";
				animateAnalog();
		 		}
			//navy
			else if (myColor == "000080") {
				$("analog1").setStyles({'background-color':'#35007C'});
		 		$("analog2").setStyles({'background-color':'#004376'});
		 		$("analogCaption1").innerHTML = "35007C";
		 		$("analogCaption2").innerHTML = "004376";
				animateAnalog();
		 		}
			//blue
			else if (myColor == "0000FF") {
				$("analog1").setStyles({'background-color':'#6D00FF'});
		 		$("analog2").setStyles({'background-color':'#0090FF'});
		 		$("analogCaption1").innerHTML = "6D00FF";
		 		$("analogCaption2").innerHTML = "0090FF";
				animateAnalog();
		 		}
			//teal
			else if (myColor == "008080") {
				$("analog1").setStyles({'background-color':'#103290'});
		 		$("analog2").setStyles({'background-color':'#11AF00'});
		 		$("analogCaption1").innerHTML = "103290";
		 		$("analogCaption2").innerHTML = "11AF00";
				animateAnalog();
		 		}
			//aqua
			else if (myColor == "00FFFF") {
				$("analog1").setStyles({'background-color':'#1B60FF'});
		 		$("analog2").setStyles({'background-color':'#00FF00'});
		 		$("analogCaption1").innerHTML = "1B60FF";
		 		$("analogCaption2").innerHTML = "00FF00";
				animateAnalog();
		 		}
			//green
			else if (myColor == "008000") {
				$("analog1").setStyles({'background-color':'#006060'});
		 		$("analog2").setStyles({'background-color':'#649500'});
		 		$("analogCaption1").innerHTML = "006060";
		 		$("analogCaption2").innerHTML = "649500";
				animateAnalog();
		 		}
			//lime
			else if (myColor == "00FF00") {
				$("analog1").setStyles({'background-color':'#00FFFF'});
		 		$("analog2").setStyles({'background-color':'#AAFF00'});
		 		$("analogCaption1").innerHTML = "00FFFF";
		 		$("analogCaption2").innerHTML = "AAFF00";
				animateAnalog();
		 		}
			//olive
			else if (myColor == "808000") {
				$("analog1").setStyles({'background-color':'#4C7700'});
		 		$("analog2").setStyles({'background-color':'#806900'});
		 		$("analogCaption1").innerHTML = "4C7700";
		 		$("analogCaption2").innerHTML = "806900";
				animateAnalog();
		 		}
			//yellow
			else if (myColor == "FFFF00") {
				$("analog1").setStyles({'background-color':'#98ED00'});
		 		$("analog2").setStyles({'background-color':'#FFD100'});
		 		$("analogCaption1").innerHTML = "98ED00";
		 		$("analogCaption2").innerHTML = "FFD100";
				animateAnalog();
		 		}
			else {
				alert("Please click on a color above!");
				}
				}
    	//animate
			function animateAnalog() {
				$("analog1").set('morph', {link: 'chain'})
				.morph({'left': '117'})
				$("analog2").set('morph', {link: 'chain'})
				.morph({'left': '207'})
				$("analogCaption1").set('morph', {link: 'chain'})
				.morph({'left': '117'})
				.morph({'top': '171'})
				$("analogCaption2").set('morph', {link: 'chain'})
				.morph({'left': '207'})
				.morph({'top': '171'})
				}
				
//  Set triad colors and captions, animate them  //

		function getTriad() {
    	var myColor = $("fillCaption1").innerHTML;
			//maroon
    	if (myColor == "800000") {
				$("triad1").setStyles({'background-color':'#807E00'});
		 		$("triad2").setStyles({'background-color':'#004F80'});
		 		$("triadCaption1").innerHTML = "807E00";
		 		$("triadCaption2").innerHTML = "004F80";
				animateTriad();
		 		}
			//red
			else if (myColor == "FF0000") {
				$("triad1").setStyles({'background-color':'#FFFC00'});
		 		$("triad2").setStyles({'background-color':'#009BFF'});
		 		$("triadCaption1").innerHTML = "FFFC00";
		 		$("triadCaption2").innerHTML = "009BFF";
				animateTriad();
		 		}
			//purple
			else if (myColor == "800080") {
				$("triad1").setStyles({'background-color':'#7F670D'});
		 		$("triad2").setStyles({'background-color':'#0D7F6F'});
		 		$("triadCaption1").innerHTML = "7F670D";
		 		$("triadCaption2").innerHTML = "0D7F6F";
				animateTriad();
		 		}
			//fuschia
			else if (myColor == "FF00FF") {
				$("triad1").setStyles({'background-color':'#FFC800'});
		 		$("triad2").setStyles({'background-color':'#00FFD8'});
		 		$("triadCaption1").innerHTML = "FFC800";
		 		$("triadCaption2").innerHTML = "00FFD8";
				animateTriad();
		 		}
			//navy
			else if (myColor == "000080") {
				$("triad1").setStyles({'background-color':'#802C00'});
		 		$("triad2").setStyles({'background-color':'#1D8000'});
		 		$("triadCaption1").innerHTML = "802C00";
		 		$("triadCaption2").innerHTML = "1D8000";
				animateTriad();
		 		}
			//blue
			else if (myColor == "0000FF") {
				$("triad1").setStyles({'background-color':'#FF5700'});
		 		$("triad2").setStyles({'background-color':'#3BFF00'});
		 		$("triadCaption1").innerHTML = "FF5700";
		 		$("triadCaption2").innerHTML = "3BFF00";
				animateTriad();
		 		}
			//teal
			else if (myColor == "008080") {
				$("triad1").setStyles({'background-color':'#80005E'});
		 		$("triad2").setStyles({'background-color':'#806B00'});
		 		$("triadCaption1").innerHTML = "80005E";
		 		$("triadCaption2").innerHTML = "806B00";
				animateTriad();
		 		}
			//aqua
			else if (myColor == "00FFFF") {
				$("triad1").setStyles({'background-color':'#FF00BB'});
		 		$("triad2").setStyles({'background-color':'#FFD600'});
		 		$("triadCaption1").innerHTML = "FF00BB";
		 		$("triadCaption2").innerHTML = "FFD600";
				animateTriad();
		 		}
			//green
			else if (myColor == "008000") {
				$("triad1").setStyles({'background-color':'#170080'});
		 		$("triad2").setStyles({'background-color':'#803800'});
		 		$("triadCaption1").innerHTML = "170080";
		 		$("triadCaption2").innerHTML = "803800";
				animateTriad();
		 		}
			//lime
			else if (myColor == "00FF00") {
				$("triad1").setStyles({'background-color':'#2E00FF'});
		 		$("triad2").setStyles({'background-color':'#FF6F00'});
		 		$("triadCaption1").innerHTML = "2E00FF";
		 		$("triadCaption2").innerHTML = "FF6F00";
				animateTriad();
		 		}
			//olive
			else if (myColor == "808000") {
				$("triad1").setStyles({'background-color':'#004A80'});
		 		$("triad2").setStyles({'background-color':'#800300'});
		 		$("triadCaption1").innerHTML = "004A80";
		 		$("triadCaption2").innerHTML = "800300";
				animateTriad();
		 		}
			//yellow
			else if (myColor == "FFFF00") {
				$("triad1").setStyles({'background-color':'#0094FF'});
		 		$("triad2").setStyles({'background-color':'#FF0500'});
		 		$("triadCaption1").innerHTML = "0094FF";
		 		$("triadCaption2").innerHTML = "FF0500";
				animateTriad();
		 		}
			else {
				alert("Please click on a color above!");
				}
				}
			//animate
			function animateTriad() {
				$("triad1").set('morph', {link: 'chain'})
				.morph({'left': '117'})
				$("triad2").set('morph', {link: 'chain'})
				.morph({'left': '207'})
				$("triadCaption1").set('morph', {link: 'chain'})
				.morph({'left': '117'})
				.morph({'top': '261'})
				$("triadCaption2").set('morph', {link: 'chain'})
				.morph({'left': '207'})
				.morph({'top': '261'})
				}

//  Set tetrad colors and captions, animate them  //

		function getTetrad() {
    	var myColor = $("fillCaption1").innerHTML;
			//maroon
    	if (myColor == "800000") {
				$("tetrad1").setStyles({'background-color':'#7F6400'});
		 		$("tetrad2").setStyles({'background-color':'#007F24'});
		 		$("tetrad3").setStyles({'background-color':'#000B7F'});
		 		$("tetradCaption1").innerHTML = "7F6400";
		 		$("tetradCaption2").innerHTML = "007F24";
		 		$("tetradCaption3").innerHTML = "000B7F";
				animateTetrad();
		 		}
			//red
			else if (myColor == "FF0000") {
				$("tetrad1").setStyles({'background-color':'#FFC800'});
		 		$("tetrad2").setStyles({'background-color':'#00FF48'});
		 		$("tetrad3").setStyles({'background-color':'#0016FF'});
		 		$("tetradCaption1").innerHTML = "FFC800";
		 		$("tetradCaption2").innerHTML = "00FF48";
		 		$("tetradCaption3").innerHTML = "0016FF";
				animateTetrad();
		 		}
			//purple
			else if (myColor == "800080") {
				$("tetrad1").setStyles({'background-color':'#00567F'});
		 		$("tetrad2").setStyles({'background-color':'#2A7F00'});
		 		$("tetrad3").setStyles({'background-color':'#7F4A00'});
		 		$("tetradCaption1").innerHTML = "00567F";
		 		$("tetradCaption2").innerHTML = "2A7F00";
		 		$("tetradCaption3").innerHTML = "7F4A00";
				animateTetrad();
		 		}
			//fuschia
			else if (myColor == "FF00FF") {
				$("tetrad1").setStyles({'background-color':'#00AEFF'});
		 		$("tetrad2").setStyles({'background-color':'#55FF00'});
		 		$("tetrad3").setStyles({'background-color':'#FF9500'});
		 		$("tetradCaption1").innerHTML = "00AEFF";
		 		$("tetradCaption2").innerHTML = "55FF00";
		 		$("tetradCaption3").innerHTML = "FF9500";
				animateTetrad();
		 		}
			//navy
			else if (myColor == "000080") {
				$("tetrad1").setStyles({'background-color':'#007F31'});
		 		$("tetrad2").setStyles({'background-color':'#7F6A00'});
		 		$("tetrad3").setStyles({'background-color':'#7F0400'});
		 		$("tetradCaption1").innerHTML = "007F31";
		 		$("tetradCaption2").innerHTML = "7F6A00";
		 		$("tetradCaption3").innerHTML = "7F0400";
				animateTetrad();
		 		}
			//blue
			else if (myColor == "0000FF") {
				$("tetrad1").setStyles({'background-color':'#00FF59'});
		 		$("tetrad2").setStyles({'background-color':'#FFD200'});
		 		$("tetrad3").setStyles({'background-color':'#FF0800'});
		 		$("tetradCaption1").innerHTML = "00FF59";
		 		$("tetradCaption2").innerHTML = "FFD200";
		 		$("tetradCaption3").innerHTML = "FF0800";
				animateTetrad();
		 		}
			//teal
			else if (myColor == "008080") {
				$("tetrad1").setStyles({'background-color':'#57007F'});
		 		$("tetrad2").setStyles({'background-color':'#7F3100'});
		 		$("tetrad3").setStyles({'background-color':'#687F00'});
		 		$("tetradCaption1").innerHTML = "57007F";
		 		$("tetradCaption2").innerHTML = "7F3100";
		 		$("tetradCaption3").innerHTML = "687F00";
				animateTetrad();
		 		}
			//aqua
			else if (myColor == "00FFFF") {
				$("tetrad1").setStyles({'background-color':'#AE00FF'});
		 		$("tetrad2").setStyles({'background-color':'#FF6200'});
		 		$("tetrad3").setStyles({'background-color':'#D0FF00'});
		 		$("tetradCaption1").innerHTML = "AE00FF";
		 		$("tetradCaption2").innerHTML = "FF6200";
		 		$("tetradCaption3").innerHTML = "D0FF00";
				animateTetrad();
		 		}
			//green
			else if (myColor == "008000") {
				$("tetrad1").setStyles({'background-color':'#002F7F'});
		 		$("tetrad2").setStyles({'background-color':'#7F0044'});
		 		$("tetrad3").setStyles({'background-color':'#7F5700'});
		 		$("tetradCaption1").innerHTML = "002F7F";
		 		$("tetradCaption2").innerHTML = "7F0044";
		 		$("tetradCaption3").innerHTML = "7F5700";
				animateTetrad();
		 		}
			//lime
			else if (myColor == "00FF00") {
				$("tetrad1").setStyles({'background-color':'#005DFF'});
		 		$("tetrad2").setStyles({'background-color':'#FF0088'});
		 		$("tetrad3").setStyles({'background-color':'#FFAE00'});
		 		$("tetradCaption1").innerHTML = "005DFF";
		 		$("tetradCaption2").innerHTML = "FF0088";
		 		$("tetradCaption3").innerHTML = "FFAE00";
				animateTetrad();
		 		}
			//olive
			else if (myColor == "808000") {
				$("tetrad1").setStyles({'background-color':'#7F2800'});
		 		$("tetrad2").setStyles({'background-color':'#44007F'});
		 		$("tetrad3").setStyles({'background-color':'#007F73'});
		 		$("tetradCaption1").innerHTML = "7F2800";
		 		$("tetradCaption2").innerHTML = "44007F";
		 		$("tetradCaption3").innerHTML = "007F73";
				animateTetrad();
		 		}
			//yellow
			else if (myColor == "FFFF00") {
				$("tetrad1").setStyles({'background-color':'#FF5100'});
		 		$("tetrad2").setStyles({'background-color':'#8800FF'});
		 		$("tetrad3").setStyles({'background-color':'#00FFE5'});
		 		$("tetradCaption1").innerHTML = "FF5100";
		 		$("tetradCaption2").innerHTML = "8800FF";
		 		$("tetradCaption3").innerHTML = "00FFE5";
				animateTetrad();
		 		}
			else {
				alert("Please click on a color above!");
				}
				}
			//animate
			function animateTetrad() {
				$("tetrad1").set('morph', {link: 'chain'})
				.morph({'left': '117'})
				$("tetrad2").set('morph', {link: 'chain'})
				.morph({'left': '207'})
				$("tetrad3").set('morph', {link: 'chain'})
				.morph({'left': '297'})
				$("tetradCaption1").set('morph', {link: 'chain'})
				.morph({'left': '117'})
				.morph({'top': '351'})
				$("tetradCaption2").set('morph', {link: 'chain'})
				.morph({'left': '207'})
				.morph({'top': '351'})
				$("tetradCaption3").set('morph', {link: 'chain'})
				.morph({'left': '297'})
				.morph({'top': '351'})
				}