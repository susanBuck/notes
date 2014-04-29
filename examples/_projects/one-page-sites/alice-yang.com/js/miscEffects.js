// Misc Effects for Various Elements in alice-yang.com //

// Global Variables
var fx, element;

// shifts menu element to the right when hovered //
function shiftRight(arg){
	element = $(arg);
	fx = new Fx.Styles(element, {duration:200, wait:false});
	fx.start({
		'left': -15,
	});
}

// shifts menu element to the left when hovered //
function shiftLeft(arg){
	element = $(arg);
	fx = new Fx.Styles(element, {duration:200, wait:false});
	fx.start({
		'left': -25,
	});
}