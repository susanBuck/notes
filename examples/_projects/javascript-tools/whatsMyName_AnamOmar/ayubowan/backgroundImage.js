//generating a random picture as the background image 

	
	var imagenumber = 10 ;
	var randomnumber = Math.random() ;
	var rand1 = Math.round( (imagenumber-1) * randomnumber) + 1 ;
	images = new Array
	images[1] = "backgroundImages/1.jpg"
	images[2] = "backgroundImages/2.jpg"
	images[3] = "backgroundImages/3.jpg"
	images[4] = "backgroundImages/4.jpg"
	images[5] = "backgroundImages/5.jpg"
	images[6] = "backgroundImages/6.jpg"
	images[7] = "backgroundImages/7.jpg"
	images[8] = "backgroundImages/8.jpg"
	images[9] = "backgroundImages/9.jpg"
	images[10] = "backgroundImages/10.jpg"

	var image = images[rand1] ;
	var linknumber = 10 ;
	var img1 = Math.round( (linknumber-1) * randomnumber) + 1 ;
	document.write('"<img src="' + image + '" id="backgroundImage" onLoad="caption()">') ;
	
