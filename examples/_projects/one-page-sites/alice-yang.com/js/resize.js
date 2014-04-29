/*-------------------------------------------------------------------------------------------------
getBrowserSize()
-------------------------------------------------------------------------------------------------*/
function getBrowserSize() {
	var myWidth = 0, myHeight = 0;
	
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
		//alert("width: "+ myWidth + " height: "+ myHeight);
	}
	else if( 
		document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} 
	
	var sizes = new Array(myWidth,myHeight);
	return sizes;
	
}
	
/*-------------------------------------------------------------------------------------------------
getElementsByClass()
-------------------------------------------------------------------------------------------------*/
function getElementsByClass( searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	} 
	return el;
} 

	
/*-------------------------------------------------------------------------------------------------
resize()
-------------------------------------------------------------------------------------------------*/
function resize() {

	var sizes   = getBrowserSize();
	var myWidth  = sizes[0];// / 2;
	var myHeight = sizes[1];// / 2;
	
	
	document.getElementById("demo-wrapper").style.width  = myWidth + "px";
	document.getElementById("demo-wrapper").style.height = myHeight + "px";

	//document.getElementById("demo-inner").style.width  = myWidth*5 + "px";
	document.getElementById("demo-inner").style.height  = myHeight + "px";
	
	// Takes care of home/about/work/resume/contact sessions
	var panels = getElementsByClass('scrolling-content');
	//alert("height:" + myHeight + " width: " + myWidth );
	
	
	//Resize height if larger than 640
	if(myHeight > 640){
		for(i = 0; i < panels.length; i++){
			//panels[i].style.width = myWidth + "px";
			panels[i].style.height = myHeight + "px";
			//panels[i].style.left =  myWidth*i + "px";
		}
	}
	
	//Make sure the menu bubble is visible at all times
	var menu = document.getElementById("menu");
	//alert(myHeight);
	if(myHeight < 768){
		menu.style.top = myHeight-275 + "px";
	}
	else{
		menu.style.top = 550 + "px";
	}
	
	
	// Resize Resume content divs to prevent info going off-screen (create overflow bar if necessary)
	var education = $("resume-education");
	var work = $("resume-work");
	var skills = $("resume-skills");
	var courses = $("resume-courses");
	
	divs = new Array();
	divs[0] = education;
	divs[1] = work;
	divs[2] = skills;
	divs[3] = courses;
	
	for(i = 0; i < divs.length; i++){
		//offsetHeight retrieves the div height even if it's not specified in CSS
		if(divs[i].offsetHeight > myHeight-300) // 300 accounts for all the space on top of the div
			divs[i].style.height = myHeight-310 + "px";
	}
	
	//Resize Work content divs to prevent info going off-screen (create overflow bar if necessary)
	var works = $("work-content");
	if(works.offsetHeight > myHeight-300){
		works.style.height = myHeight-250 + "px";
	}
}
