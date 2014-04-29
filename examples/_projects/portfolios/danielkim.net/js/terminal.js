/*****
* 
* Global variables. Initial values. Start functions.
*
*****/

//Globals.
var currLine;
var input = new Array();
var prevCommands = new Array();
var currCommand = 0;
var currLetter = 0;
var blinkStatus = 0;
var timer;
var numErrors = 0;
var helpCount = 0;
var isCat=0;
var currLoc='';
var help = new Array();
var dirList = new Array();
var whois = 'Daniel Kim is a computer scientist and web developer currently studying at the University of Pennsylvania.<br/>"I am an enthusiastic, dedicated person with an insatiable thirst for knowledge and an unhealthy love for new technologies."';
var contact = "Email: <a href='mailto:dki@seas.upenn.edu'>dki@seas.upenn.edu</a>";
var resume = IO("code/resume.txt");
var skills = IO("code/skills.txt");

//Explicitly set values for "help" array to be used when help command is called. Also used as to list all available commands.
help[0]=["cd","Changes current directory."];
help[1]=["cat","Prints contents of file."];
help[2]=["clear","Clears screen."];
help[3]=["whois","Who is Daniel Kim?"];
help[4]=["make","Ask terminal to make something."];
help[5]=["sudo","Execute command as superuser."];
help[6]=["ls","List contents of directory."];
help[7]=["help","Display this list."];
help[8]=["contact","Display contact information."];
help[9]=["confused","Explains how to use this site."];
help[10]=["whoami","Tells you who you are."];
help[11]=["hire","Hire Daniel Kim."];

//Explicitly set values for file system. Used as a faux directory hierarchy. Used for navigating file system and to check what arguments are valid for commands such as cat, cd, etc.
dirList[0]=["",["portfolio"],["resume.txt","skills.txt"]];
dirList[1]=["/portfolio",["c","java","python","websites"],[]];
dirList[2]=["/portfolio/c",[],["kinda-sh.c"]]; 
dirList[3]=["/portfolio/java",[],["prefixtree.java", "kevinbaconnumber.java"]]; 
dirList[4]=["/portfolio/python",[],["planetsim.py","sudoku.py"]]; 
dirList[5]=["/portfolio/websites",[],["PopCloud","Phuket", "PassGen"]]; 

//Set up keypress event handler so that keyboard inputs can be processed.
document.onkeypress = processStroke;

//Browser detection to make sure IE and Chrome can catch events such as tab, backspace, etc. IE and Chrome cannot pick up these keys with keypress events, which is what is used default.
if (navigator.appName=="Microsoft Internet Explorer"||navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
	document.onkeydown = processIEStroke;
}

//Init function. Prints welcome message and starts the prompt.
function startTerminal(){
	printMsg("Welcome to Daniel Kim's portfolio and resume.<br/>Copyright (c) 2010 Daniel Kim. All rights reserved.<br/><br/>Type 'help' for a list of available commands. Type 'confused' if you aren't sure how to use this website.");
	prompt();
}

//Prompt. Prints prompt and scrolls to appropriate point on the page. Also starts blinking cursor.
function prompt(){
	if(isCat){
		window.scroll(0,currLine.offsetTop);
	}
	reset();
	currLine = document.createElement('div');
	currLine.setAttribute("class","prompt");
	currLine.innerHTML="<span>visitor@danielkim.net"+currLoc+":~$ </span>";
	addBlank();
	document.body.appendChild(currLine);
	timer = self.setInterval("startBlink()",700);
	if(!isCat){
		window.scroll(0,document.body.clientHeight);
	}
	
}



/*****
* 
* Processing functions.
*
*****/

//Deals with command execution. Takes command and arguments as arguments and processes with switch case. Count consecutive help calls and consecutive errors to output humorous messages after certain number.
function execute(command,args){
	switch(command){
		case "clear":
			helpCount=0;
			numErrors=0;
			clear();
			break;
		case "help":
			helpCount++;
			numErrors=0;
			printTable(help);
			if(helpCount>5){
				printMsg("You seem to be desperate for help. Might I suggest speaking to a psychiatrist?");
			}
			break;
		case "cat":
			numErrors=0;
			helpCount=0;
			//Flag for if cat was successful or not.
			var goodCat = 0;
			//cat must have arguments.
			if(args!=""){
				//Flag for if cat was the last command called. This is because scrolling for cat is different than scrolling for other commands.
				isCat=1;
				//Runs through file structure till it finds the correct current location, then flips the successful cat flag, and pushes the file address to IO and prints output, which is file contents. 
				if(currLoc!="/portfolio/websites"){
					for(var i=0;i<dirList.length;i++){
						if((dirList[i][0]==currLoc) && (isIn(dirList[i][2],args))){
							goodCat=1;
							if(args=="resume.txt"){
								if(window.innerHeight < 470){
									isCat=1;
								}
								else{
									isCat=0;
								}
							}
							else if(args=="skills.txt"){
								if(window.innerHeight < 156){
									isCat=1;
								}
								else{
									isCat=0;
								}
							}
							printMsg(IO("code/"+ args.slice(0,args.lastIndexOf(".")) +".txt"));
							break;
						}
					}
				}
				//If it was unsuccessful, last command run was not cat. Print error message.
				if(goodCat==0){
					isCat=0;
					printMsg("cat: Invalid arguments.");
				}
			}
			else{
				isCat=0;
				printMsg("cat: Invalid arguments.");
			}
			break;
		case "cd": 
			numErrors=0;
			helpCount=0;
			var goodcd=0;
			//Allow ".." only if there is a parent directory.
			if((args == "..")&&(currLoc!="")){
				currLoc=currLoc.slice(0,currLoc.lastIndexOf("/"));
				goodcd=1;
			}
			else if(args!=""){
				for(var i=0;i<dirList.length;i++){
					if((dirList[i][0].slice(1)==args)){
						currLoc="/"+args;
						goodcd=1;
						break;
					}
					else if((dirList[i][0]==currLoc)&&(isIn(dirList[i][1],args))){
						currLoc=currLoc+"/"+args;
						goodcd=1;
						break;
					}
				}
			}
			if(!goodcd){
				printMsg("cd: Invalid arguments.");
			}
			break;
		case "ls":
			numErrors=0;
			helpCount=0;
			var loc;
			if(args==""){
				loc=currLoc;
			}
			else{
				loc=args;
			}
			switch(loc){
				case "":
					printMsg(formatLS(dirList[0][1],dirList[0][2],0));
					break;
				case "/portfolio":
					printMsg(formatLS(dirList[1][1],dirList[1][2],0));
					break;
				case "/portfolio/c":
					printMsg(formatLS(dirList[2][1],dirList[2][2],0));
					break;
				case "/portfolio/java":
					printMsg(formatLS(dirList[3][1],dirList[3][2],0));
					break;
				case "/portfolio/python":
					printMsg(formatLS(dirList[4][1],dirList[4][2],0));
					break;
				case "/portfolio/websites":
					printMsg(formatLS(dirList[5][1],dirList[5][2],1));
					break;
				default:
					printMsg(args+": Invalid address.");
			}
			break;
		case "sudo":
			numErrors=0;
			helpCount=0;
			if(args==""){
				printMsg("sudo: Please enter a command to execute.");
			}
			else if(args=="make me a sandwich"){
				printMsg("Ok.");
			}
			else if(args.slice(0,2)=="rm"){
				printMsg("sudo: Nice try...Denied.");
			}
			else{
				printMsg("sudo: Access denied.");
			}
			break;
		case "make":
			numErrors=0;
			helpCount=0;
			if(args==""){
				printMsg("make: Make what?");
			}
			else if(args=="me a sandwich"){
				printMsg("No. Make it yourself!");
			}
			else{
				printMsg("make: Don't know how to make "+args+". Stop.");
			}	
			break;
		case "contact":
			numErrors=0;
			helpCount=0;
			printMsg(contact);
			break;
		case "whois":
			numErrors=0;
			helpCount=0;
			printMsg(whois);
			break;
		case "whoami":
			numErrors=0;
			helpCount=0;
			printMsg("That's a strange question to ask a computer. Shouldn't you know who you are? But if you'd REALLY like to know...as far as I know, you are a person viewing my resume and portfolio. Probably.");
			break;
		case "confused":
			numErrors=0;
			helpCount=0;
			if(args==""){
				printMsg("Type 'ls' to see the contents of the current directory. Directories are blue and files are white. To access directories, type 'cd' followed by the name of the directory. To go back a directory, type 'cd ..'. To open files, type 'cat' followed by the name of the file. You can press tab to complete what you've started to type or see a list of possible completions. You can also use up and down arrows to go through the command history. If you are still confused, type 'confused still'.");
			}
			else if(args=="still"){
				printMsg("Still confused? No problem. Type 'whois' and press enter to find out who I am. Type 'cat resume.txt' to see my resume. Type 'cat skills.txt' to see my skills. Type 'contact' to see contact information. Type 'cd portfolio' to access my portfolio and type 'cd c' to access my c portfolio, 'cd java' to access my java portfolio, and so on so forth. Once you're in a language directory such as 'c' or 'java', you can type 'cat [insert filename here]' to see the code. Good luck. If you are <i>still</i> confused click <a href='javascript:void(0)' onclick='confusedResume()'>here</a>.");
			}
			break;
		case "hire":
			numErrors=0;
			helpCount=0;
			printMsg("You are a gentleman(woman) and a scholar and I see you have fantastic taste in employees. Please contact me at <a href='mailto:dki@seas.upenn.edu'>dki@seas.upenn.edu</a> with any job offers. Thank you.");
			break;
		default:
			printMsg(command+": Command not found");
			numErrors++;
			if(numErrors>5){
				printMsg("Please type 'help' to see a list of available commands...");
			}
	}
}

//Processing key strokes for input. Suppresses defaults for all necessary key strokes.
function processStroke(evt){
	// Firefox and Internet Explorer Handling
	if (!evt) evt = window.event;
	var code;
	code = evt.charCode || evt.keyCode;
	
	//Left Arrow
	if(code == 37){ 
		stopDefault(evt);
		if(currLetter > 0){
			unblink();
			currLetter--;
			blink();
		}
	}
	//Right arrow
	else if(code == 39){ 
		stopDefault(evt);
		if(currLetter < input.length-1){
			unblink();
			currLetter++;
			blink();
		}
	}
	//Up arrow
	else if (code == 38){ 
		stopDefault(evt);
		if(currCommand > 0){
			removeLetters(0);
			currCommand--;
			input=makeSpanList(prevCommands[currCommand]);
			addLetters();
			currLetter = input.length-1;
		}
	}
	//Down arrow
	else if (code == 40){ 
		stopDefault(evt);
		if(currCommand < prevCommands.length-1){
			removeLetters(0);
			currCommand++;
			input=makeSpanList(prevCommands[currCommand]);
			addLetters();
			currLetter = input.length-1;
		}
	}
	//Backspace
	else if(code == 8){ 
		stopDefault(evt);
		if(currLetter > 0){
			currLine.removeChild(input[currLetter-1]);
			input.splice(currLetter-1,1);
			currLetter--;
		}
	}
	//Tab
	else if(code == 9){ 
		stopDefault(evt);
		
		var extracted = extractLetters(input,1);
		var completion = tabComplete(extracted);
		if((completion!=-1) && (completion!=-2) && (completion)){
			//Split by if it's a command to be completed or an argument. Commands can just replace the entire line. Argument completions must change what is necessary.
			if(extracted[0]=="cmd"){
				removeLetters(0);
				input=makeSpanList(completion);
			}
			else{
				var newEnt = makeSpanList(completion);
				removeLetters(0);
				for(var i=extracted[1];i<extracted[1]+completion.length+1;i++){ 
					input[i]=newEnt[i-extracted[1]];
				}
			}
			addLetters();
			currLetter=input.length-1;
		}
		//If there are several possible completions.
		else if(completion == -2){
			clearTimeout(timer);
			unblink();
			prompt();
		}
	}
	//Enter
	else if(code == 13){ 
		isCat=0;
		stopDefault(evt);
		var com = parseCommand(extractLetters(input));
		if(com[0]!=""){
			execute(com[0],com[1]);
			prevCommands.push(extractLetters(input));
			currCommand=prevCommands.length;
		}
		clearTimeout(timer);
		unblink();
		prompt();
	}
	//Regular text input
	else if((code > 31) && (code < 127) && (code!=33) && (code!=34)){
		//Can't stop default for 116 because it coincides with F5, which is refresh.
		if(code!=116){
			stopDefault(evt);
		}
		
		unblink();
		input.splice(currLetter,0,document.createElement('span'));
		if(code == 32){
			input[currLetter].innerHTML = "&nbsp;";
		}
		else{
			input[currLetter].innerHTML = String.fromCharCode(code);
		}
		updateLine(currLetter+1);
		currLetter++;
	}
}

//Processing for IE and Chrome key downs because they don't process some keys for keypress.
function processIEStroke(evt){
	if (!evt) evt = window.event;
	var code;
	code = evt.charCode || evt.keyCode;
	
	//Left Arrow
	if(code == 37){ 
		stopDefault(evt);
		if(currLetter > 0){
			unblink();
			currLetter--;
			blink();
		}
	}
	//Right arrow
	else if(code == 39){ 
		stopDefault(evt);
		if(currLetter < input.length-1){
			unblink();
			currLetter++;
			blink();
		}
	}
	//Up arrow
	else if (code == 38){ 
		stopDefault(evt);
		if(currCommand > 0){
			removeLetters(0);
			currCommand--;
			input=makeSpanList(prevCommands[currCommand]);
			addLetters();
			currLetter = input.length-1;
		}
	}
	//Down arrow
	else if (code == 40){ 
		stopDefault(evt);
		if(currCommand < prevCommands.length-1){
			removeLetters(0);
			currCommand++;
			input=makeSpanList(prevCommands[currCommand]);
			addLetters();
			currLetter = input.length-1;
		}
	}
	//Tab
	else if(code == 9){ 
		stopDefault(evt);
		
		var extracted = extractLetters(input,1);
		var completion = tabComplete(extracted);
		if((completion!=-1) && (completion!=-2) && (completion)){
			if(extracted[0]=="cmd"){
				removeLetters(0);
				input=makeSpanList(completion);
			}
			else{
				var newEnt = makeSpanList(completion);
				removeLetters(0);
				for(var i=extracted[1];i<extracted[1]+completion.length+1;i++){ 
					input[i]=newEnt[i-extracted[1]];
				}
			}
			addLetters();
			currLetter=input.length-1;
		}
		//If there are several possible completions.
		else if(completion == -2){
			clearTimeout(timer);
			unblink();
			prompt();
		}
	}
	//Backspace
	else if(code == 8){ 
		stopDefault(evt);
		if(currLetter > 0){
			currLine.removeChild(input[currLetter-1]);
			input.splice(currLetter-1,1);
			currLetter--;
		}
	}
}

//Takes care of tab completions. Basically slices possibilities to the length of the input to complete and compares. If a match is made add it to list of possible completions. If there is only one return it. If there are several print all the possibilities. Else return -1 to know that there is something wrong.
function tabComplete(toComplete){
	var posCompletions = new Array();
	
	if(toComplete.length==0){
		for(var i=0;i<help.length;i++){
			posCompletions.push(help[i][0]);
		}
		printMsg(formatLS([],posCompletions,0));
		return -2;
	}
	
	else if(toComplete[0]=="cmd"){
		var test = parseCommand(toComplete.slice(1),1)[0];
		for(var i=0;i<help.length;i++){
			if(help[i][0].slice(0,toComplete.length-1)==test){
				posCompletions.push(help[i][0]);
			}
		}
		if(posCompletions.length==1){
			return posCompletions[0];
		}
		else if(posCompletions.length>1){
			printMsg(formatLS([],posCompletions,0));
			return -2;
		}
	}
	else{
		var test = parseCommand(toComplete.slice(2),1)[0];
		for(var i=0;i<dirList.length;i++){
			if(dirList[i][0]==currLoc){
				switch(toComplete[0]){
					case "cat":
						if(currLoc=="/portfolio/websites"){
							return -1;
						}
						for(var j=0;j<dirList[i][2].length;j++){
							if(dirList[i][2][j].slice(0,toComplete.length-2)==test){
								posCompletions.push(dirList[i][2][j]);
							}
						}
						if(posCompletions.length==1){
							return posCompletions[0];
						}
						else if(posCompletions.length>1){
							printMsg(formatLS([],posCompletions,0));
							return -2;
						}
						break;
					case "cd":
						for(var j=0;j<dirList[i][1].length;j++){
							if(dirList[i][1][j].slice(0,toComplete.length-2)==test){
								posCompletions.push(dirList[i][1][j]);
							}
						}
						if(posCompletions.length==1){
							return posCompletions[0];
						}
						else if(posCompletions.length>1){
							printMsg(formatLS(posCompletions,[],0));
							return -2;
						}
						break;
					default:
						return -1;
				}
			}
		}
	}
	return -1;
}



/*****
* 
* Simple Function break outs. Simple operators.
*
*****/


//Adds a blank to the end of a prompt for blinking cursor default.
function addBlank(){
	input[currLetter] = document.createElement('span');
	input[currLetter].innerHTML = "&nbsp;";
	currLine.appendChild(input[currLetter]);
}

//Alternate blinking and unblinking.
function startBlink(){
	if (!blink()){
		unblink();
	}
}

//Blink
function blink(){
	var toBlink = input[currLetter];
	if(blinkStatus == 0){
		toBlink.style.background="white";
		toBlink.style.color="black";
		blinkStatus=1;
		return 1;
	}
	return 0;
}

//Unblink
function unblink(){
	var toBlink = input[currLetter];
	if(blinkStatus == 1){
		toBlink.style.background="black";
		toBlink.style.color="white";
		blinkStatus=0;
	}
}

//Used for inserts. Remove the current displayed letters from a certain index. Then update.
function updateLine(start){
	removeLetters(start);
	addLetters();
}

//Remove current displayed letters from certain index.
function removeLetters(start){
	for(var i=start;i<input.length;i++){
		currLine.removeChild(input[i]);
	}
}

//Update current line.
function addLetters(){
	for(var i=0;i<input.length;i++){
		currLine.appendChild(input[i]);
	}
}

//Pull letters from display spans. Also accept optional argument for tab completion purposes. Returns array of characters.
function extractLetters(spanList,last){
	var strArr = new Array();
	
	if(spanList.length>1){
		if(!last){
			for(var i=0;i<spanList.length;i++){
				strArr.push(spanList[i].innerHTML);
			}
		}
		else{
			var lastIndex;
			var i = spanList.length-2;
			while(spanList[i].innerHTML!="&nbsp;"){
				strArr.unshift(spanList[i].innerHTML);
				i--;
				if(i<0){
					strArr.unshift("cmd");
					break;
				}
			}
			if(strArr[0]!="cmd"){
				lastIndex=i+1;
				var i=0;
				var cmd="";
				
				strArr.unshift(lastIndex);
				while(spanList[i].innerHTML!="&nbsp;"){
					cmd=cmd+spanList[i].innerHTML;
					i++;
				}
				strArr.unshift(cmd);
			}
		}
		return strArr;
	}
	else{
		return [];
	}
}

//Take string array as input and splits into command and arguments.
function parseCommand(strArr,tabComp){
	var command = new Array();
	var isCMD = 1;
	var lastSpace=1;
	command[0]="";
	command[1]="";
	if(tabComp){
		lastSpace=0;
	}
	
	for(var i=0;i<strArr.length-lastSpace;i++){
		if(strArr[i] == "&nbsp;"){
			if(isCMD==1){
				isCMD=0;
			}
			else{
				command[1]=command[1]+" ";
			}
		}
		else if(isCMD){
			command[0]=command[0]+strArr[i].toLowerCase();
		}
		else if(!isCMD){
			command[1]=command[1]+strArr[i].toLowerCase();
		}
	}
	return command;
}

//Takes an array of characters and builds a list of spans.
function makeSpanList(strArr){
	var spanList = new Array();
	for(var i=0;i<strArr.length;i++){
		spanList[i]=document.createElement('span');
		spanList[i].innerHTML=strArr[i];
	}
	if(strArr[strArr.length-1]!="&nbsp;"){
		spanList[strArr.length]=document.createElement('span');
		spanList[strArr.length].innerHTML="&nbsp;";
	}
	return spanList;
}

//Sorts and properly formats and colors elements for an ls or a general printing of commands, files, directories, etc. Specially handles websites so that they are links.
function formatLS(dirs,files,isWeb){
	var toPrint = "";
	var entries = dirs.concat(files);
	entries.sort();
	for(var i=0;i<entries.length;i++){
		
		if(isIn(dirs,entries[i])){ 
			toPrint = toPrint+ "<span class='dir'>"+entries[i]+"	</span>";
		}
		else if(!isWeb){
			toPrint = toPrint+ "<span>"+entries[i]+"	</span>";
		}
		else if(isWeb){
			var address = "http://danielkim.net/web1/" + entries[i].toLowerCase() + ".html";
			toPrint = toPrint+ "<a target='_blank' href="+address+">"+entries[i]+"</a>	";
		}
	}
	return toPrint;
}

//Tells you if certain string is in the array.
function isIn(arr,val){
	for(var i=0;i<arr.length;i++){
		if(arr[i].toLowerCase() == val.toLowerCase()){
			return 1;
		}
	}
	return 0;
}

//Custom sort function to sort a 2D array using the first element as criteria. Uses lexicographical sort.
function lexSort2D(a,b){
	if(a[0]<b[0]){
		return -1;
	}
	else if(a[0]>b[0]){
		return 1;
	}
	return 0;
}

//Prints important information such as who I am, resume, skills, etc for people that can't figure out how to use the terminal.
function confusedResume(){
	if(window.innerHeight < 735){
		isCat=1;
	}
	else{
		isCat=0;
	}
	unblink();
	clearTimeout(timer);
	printMsg(whois);
	printMsg(contact);
	printMsg(resume);
	printMsg(skills);
	prompt();
}

//Does browser detection and stops default event firing.
function stopDefault(evt) {
	if (evt &&evt.preventDefault) evt.preventDefault();
	else if (evt && window.event && window.event.returnValue)
		window.eventReturnValue = false;
		evt.returnValue=false;
}

//To read from server. Takes location of file an input and returns contents.
function IO(U,V) {
	/*
	var X = !window.XMLHttpRequest ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
	X.open(V ? 'PUT' : 'GET', U, false );
	X.setRequestHeader('Content-Type', 'text/html');
	X.send(V ? V : '');
	return X.responseText;
	*/
}	

//Used for properly formatting and printing the help table.
function printTable(toTable){
	var toPrint = document.createElement('div');
	var table = "<table>";
	toTable.sort(lexSort2D);
	
	for(var i=0;i<toTable.length;i++){
		table=table+"<tr><td>"+toTable[i][0]+"</td>";
		table=table+"<td>"+toTable[i][1]+"</td></tr>";
	}
	table=table+"</table><br/>"
	toPrint.innerHTML=table;
	document.body.appendChild(toPrint);
}

//Used to print any necessary messages.
function printMsg(msg){
	var message = document.createElement('div');
	message.innerHTML=msg+"<br/><br/>";
	document.body.appendChild(message);
}

//Clears screen.
function clear(){
	var toClear = document.body;
	if (toClear.hasChildNodes())
	{
		while (toClear.childNodes.length >= 1)
		{
			toClear.removeChild(toClear.firstChild);       
		} 
	}
}

//Resets some values.
function reset(){
	currLetter=0;
	input = new Array();
	blinkStatus=0;
}