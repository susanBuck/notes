// JavaScript Document

//are 2C or IEEE representation turned on
var twoC = 0;
var iE = 0;

//Take in a number and base, output result array such that result[0] = decimal, [1] = binary, [2] = hex
function convert (num, base) {
	var result = new Array();
	var bin;
	var hex;
	var dec;
	
	//Check base
	if(base == "hex"){
		hex = num;
		
		dec = hexToDec(num);
		bin = decToBin(dec);
	}
	if(base == "dec"){
		//Check input is an int
		var theNum = parseInt(num);
		
		dec = num;
		
		bin = decToBin(theNum);
		hex = decToHex(theNum);		
	}
	if(base == "negdec"){
		//Check input is an int
		var theNum = Math.abs(parseInt(num));
		
		dec = num;
		
		bin = decToBin(theNum);
		bin = negate(bin);
		hex = decToHex(theNum);		
	}
	if(base == "bin"){
		var theNum = parseInt(num);
		bin = num;
		
		dec = binToDec(num);
		var first = bin.charAt(0);
	/*Check negative or positive*/
		if(first == '1'){
			hex = '**!!NOT SUPPORTED!!**';
		}
		else if(first == '0'){
			hex = decToHex(dec);
		}
	}

	//Fill in results
	result[0] = dec;
	result[1] = bin;
	result[2] = hex;
	
	return result;
}

function negate(input){	
	var mal = input;
	for(i = 0; i < mal.length; i++){
		if(mal.charAt(i) == '1'){
			mal = setCharAt(mal,i,'0');
		}
		else if(mal.charAt(i) == '0'){
			mal = setCharAt(mal,i,'1');
		}
	}
	
	mal = '0' + mal;
	
	for(i = mal.length-1; i >= 0; i--){
		if(mal.charAt(i) == '0'){
			mal = setCharAt(mal,i,'1');
			break;
		}
		else {
			mal = setCharAt(mal,i,'0');
		}
	}
	return mal;
}

function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	var start = str.substr(0,index);
	var end = str.substr(index+1);
	return start + chr + end;
}


function hexToDec(digit){
	var hex = new String(digit);
	var length = String(digit).length;
	var sum = 0;
	
	for(i = 0; i < length; i++){
		var n = conDig(hex.charAt(i));
		sum += n * Math.pow(16, length-i-1);
	}
	
	return sum;	
}

function binToDec(digit){
	var bin = new String(digit);
	var sum = 0;
	
	if(bin == '0'){return 0;}
	else if(bin == '1'){return 1;}
	
	var first = bin.charAt(0);
	bin = bin.substr(1);
	var length = bin.length;
	/*Check negative or positive*/
	if(first == '1'){
		bin = negate(bin);
		for(i = 0; i < length; i++){
			var n = parseInt(bin.charAt(i));
			sum += n * Math.pow(2, length-i-1);
		}
		sum = 0 - sum;
	}
	else if(first == '0'){
		for(i = 0; i < length; i++){
			var n = parseInt(bin.charAt(i));
			sum += n * Math.pow(2, length-i-1);
		}
	}
	
	return sum;	
}

function decToBin(digit){
	var sum = digit;
	var bin = "";
	var temp = "";
	//Compute Decimal to Hex Conversion		
	while(sum != 0){
		temp = String(sum%2);
		bin = temp.concat(bin);
		sum = Math.floor(sum/2);
	}
	
	return bin;
}

function decToHex(digit){
	if(digit == 0){return 0;}
	var sum = digit;
	var hex = "";
	var temp = "";
	//Compute Decimal to Hex Conversion		
	while(sum != 0){
		temp = String(conHex(sum%16));
		hex = temp.concat(hex);
		sum = Math.floor(sum/16);
	}
	
	return hex;
}

function conHex(digit){
	if (digit <= 9 && digit >=0){
		return digit;
	}
	if (digit == 10){
		return "A";
	}
	if (digit == 11){
		return "B";
	}
	if (digit == 12){
		return "C";
	}
	if (digit == 13){
		return "D";
	}
	if (digit == 14){
		return "E";
	}
	if (digit == 15){
		return "F";
	}
}

function conDig(digit){
	var dig = parseInt(digit);
	if (dig <= 9 && dig >=0){
		return dig;
	}
	if (digit == "A"){
		return 10;
	}
	if (digit == "B"){
		return 11;
	}
	if (digit == "C"){
		return 12;
	}
	if (digit == "D"){
		return 13;
	}
	if (digit == "E"){
		return 14;
	}
	if (digit == "F"){
		return 15;
	}
}
