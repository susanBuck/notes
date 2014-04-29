// Set start times for generting the bubbles, fade the logo
function startBubbles() {
	var timer = setTimeout("startBubble1()",14000);
	var timer = setTimeout("startBubble2()",21000);
	var timer = setTimeout("startBubble3()",1000);
	var timer = setTimeout("startBubble4()",7000);
	var timer = setTimeout("fadeLogo()",5000);
	}	
	
// Fade logo
function fadeLogo() {
	playSound('/twitterbubble/sounds/pop.wav');
	$("logo").set("morph", {duration:2000, link:"chain"})
	.morph({'opacity': 0})
	}

// Generate bubbles
function startBubble1() {
	generateBubble1();
	}

function startBubble2() {
	generateBubble2();
	}

function startBubble3() {
	generateBubble3();
	}
	
function startBubble4() {
	generateBubble4();
	}
	
// Load bubble content, set interval for floating up
function generateBubble1() {
	var newContent = "<iframe frameborder='0' allowtransparency='true' style='height:150px; width:200px; overflow:hidden' src='bubbleMaker.php'></iframe>";
	$("content1").innerHTML =  newContent;
	moveBubble("bubble1", "2800");
	}

function generateBubble2() {
	var newContent = "<iframe frameborder='0' allowtransparency='true' style='height:150px; width:200px; overflow:hidden' src='bubbleMaker.php'></iframe>";
	$("content2").innerHTML = newContent;
	moveBubble("bubble2", "3100");
	}
	
function generateBubble3() {
	var newContent = "<iframe frameborder='0' allowtransparency='true' style='height:150px; width:200px; overflow:hidden' src='bubbleMaker.php'></iframe>";
	$("content3").innerHTML = newContent;
	moveBubble("bubble3", "2900");
	}
	
function generateBubble4() {
	var newContent = "<iframe frameborder='0' allowtransparency='true' style='height:150px; width:200px; overflow:hidden' src='bubbleMaker.php'></iframe>";
	$("content4").innerHTML = newContent;
	moveBubble("bubble4", "3000");
	}
	
// Float bubble up, left and right
function moveBubble(whichDiv, speed) {
	$(whichDiv).set("morph", {duration:speed, link:"chain", transition:"linear"})
	.morph({'top': 1000, 'left': 0})
	.morph({'top': 900, 'left': 20})
	.morph({'top': 800, 'left': 40})
	.morph({'top': 700})
	.morph({'top': 600, 'left': 20})
	.morph({'top': 500, 'left': 0})
	.morph({'top': 400})
	.morph({'top': 300, 'left': 20})
	.morph({'top': 200, 'left': 40})
	.morph({'top': 100})
	.morph({'top': 0, 'left': 20})
	.morph({'top': -100, 'left': 0})
	.morph({'top': -250})
	}
	
// Check where the top of each bubble is every second
function startLooking() {
		var timer = setInterval("whereIsIt()",1000);
		}
		
// If the bubble position moves off the top of the page...
function whereIsIt() {
	var spot1 = $('bubble1').getPosition();
	var spot2 = $('bubble2').getPosition();
	var spot3 = $('bubble3').getPosition();
	var spot4 = $('bubble4').getPosition();
	if (spot1.y < "-220") {
		placeBubble("bubble1");
		}
	if (spot2.y < "-220") {
		placeBubble("bubble2");
		}
	if (spot3.y < "-220") {
		placeBubble("bubble3");
		}
	if (spot4.y < "-220") {
		placeBubble("bubble4");
		}
	}

// ...Put the bubble at the bottom and reload content
function placeBubble(whichDiv) {
	$(whichDiv).setPosition({x: 20, y: 1100});
	$(whichDiv).set("opacity", 1)
	if (whichDiv == "bubble1") {
		generateBubble1();
		}
	if (whichDiv == "bubble2") {
		generateBubble2();
		}
	if (whichDiv == "bubble3") {
		generateBubble3();
		}
	if (whichDiv == "bubble4") {
		generateBubble4();
		}
	}

// If the bubble is clicked, play the pop sound, fade the opacity and pause for 3 seconds...
function popIt(whichDiv) {
	playSound('/twitterbubble/sounds/pop.wav');
	$(whichDiv).set("morph", {duration:1000, link:"chain"})
	.morph({'opacity': 0})
	if (whichDiv == "bubble1") {
		setTimeout(function(){recycle("bubble1")},3000);
		}
	if (whichDiv == "bubble2") {
		setTimeout(function(){recycle("bubble2")},3000);
		}
	if (whichDiv == "bubble3") {
		setTimeout(function(){recycle("bubble3")},3000);
		}
	if (whichDiv == "bubble4") {
		setTimeout(function(){recycle("bubble4")},3000);
		}
	}
	
// (The pop sound)
function playSound(wav) {
	$("wavLoader").innerHTML = "<embed src='" + wav + "' hidden=true autostart=true loop=false>";
	}	
	
// ...Then place the bubble at the bottom again
function recycle(whichDiv) {
	if (whichDiv == "bubble1") {
		placeBubble("bubble1");
		}
	if (whichDiv == "bubble2") {
		placeBubble("bubble2");
		}
	if (whichDiv == "bubble3") {
		placeBubble("bubble3");
		}
	if (whichDiv == "bubble4") {
		placeBubble("bubble4");
		}
	}

	