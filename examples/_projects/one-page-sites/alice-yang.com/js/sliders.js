// alice-yang.com
// sliders.js: Toggles view of each section of my resume and work divs
// code from http://demos111.mootools.net/Fx.Slide

/*-------------------------------------------------------------------------------------------------
Global Variables
-------------------------------------------------------------------------------------------------*/
var resumeDivs;
var resumeSliders;

/*-------------------------------------------------------------------------------------------------
initResumeSliders(): initializes the slider, div, and div status arrays. Only called once when page is loaded
-------------------------------------------------------------------------------------------------*/
function initResumeSliders(){
	// Div Array
	var education = $("resume-education");
	var work = $("resume-work");
	var skills = $("resume-skills");
	var courses = $("resume-courses");
	
	resumeDivs = new Array();
	resumeDivs[0] = education;
	resumeDivs[1] = work;
	resumeDivs[2] = skills;
	resumeDivs[3] = courses;
	
	//Slider Array
	var educationSlider = new Fx.Slide('resume-education', {duration: 500});
	var workSlider = new Fx.Slide('resume-work', {duration: 500});
	var skillsSlider = new Fx.Slide('resume-skills', {duration: 500});
	var coursesSlider = new Fx.Slide('resume-courses', {duration: 500});
	
	resumeSliders = new Array();
	resumeSliders[0] = educationSlider;
	resumeSliders[1] = workSlider;
	resumeSliders[2] = skillsSlider;
	resumeSliders[3] = coursesSlider;
	
	//Slide in the hidden divs (everything after education)
	for(i = 1; i < divs.length; i++){
		resumeSliders[i].slideOut();
	}
}



 /*-------------------------------------------------------------------------------------------------
 showResumeDiv: slides out arg panel and hides all others
 -------------------------------------------------------------------------------------------------*/
function showResumeDiv(arg){
	for(i = 0; i < resumeDivs.length; i++){
		if(resumeDivs[i].id == arg){
			resumeSliders[i].slideIn();
		}
		else
			resumeSliders[i].slideOut();
	}	
}















