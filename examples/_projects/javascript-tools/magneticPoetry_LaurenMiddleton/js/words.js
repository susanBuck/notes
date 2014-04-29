/*stores word lists*/
var nouns = ["honey", "horse", "spark", "diamond", "swirl", "bell", "hotel", "girl", "mother", "father", "siren", "tear", "waitress", "icicle", "aquarium", "parasol", "carbon", "doughnut", "merman",	"winter", "spring", "pancake", "bliss", "ocean", "voodoo", "time", "leather", "blood", "rose", "cloud", "boy", "monkey", "tether", "circuitry", "supernova", "swan", "gumdrop", "sky", "faery", "fate", "metal", "ivy", "butterfly", "soul", "general", "hole", "garden", "loon", "iris", "ribbon", "horizon", "snow", "glass", "apple", "dawn", "son", "daughter", "heaven", "cathedral", "sound", "wave", "precession", "wood", "hair", "tattoo", "violet", "bridge"];

var verbs = ["cool", "take", "resist", "shatter", "walk", "paint", "carry", "fly", "want", "caught", "riot", "love", "smell", "said", "take", "feed", "sleep", "linger", "fear", "grow", "swim", "save", "wait", "learn", "kneel", "get", "touch", "can", "judge", "feel", "stole", "disappear", "taste", "wander", "bilocate", "ride", "run", "kill", "bleed", "unravel", "crack", "hold", "unzip"];

var adj = ["raspberry", "strange", "velvet", "little", "crazy", "northern", "cruel", "silent", "purple", "professional", "sweet", "black", "big", "precious", "orange", "silken", "vitriolic", "happy", "dead", "underwater", "gold", "lost", "close", "red", "good", "peeled", "digital", "immune", "familiar", "secret", "free", "easy", "blue", "framed", "dried", "pretty", "crystalline", "forgotten", "mighty", "real", "alone", "sane", "sharp", "fresh", "green"];

var helpers = ["he", "she", "it", "was", "ing", "in", "at", "when", "is", "ed", "the", "a", "we", "us", "d", "her", "his", "our", "ly", "s", "and", "I", "est", "to", "re", "you", "me", "of", "am", "were", "no", "yes", "too", "for"];

var punctuation = [".", ",", "!", "-", ":", ";", "?", "'", "(", ")"];

/*generates noun draggables*/
function generateNouns(wordList) {
	$.each(wordList, function(index, value) {
		//console.log(this);
		$("#nouns-content").append("<a id='" + value + "' class='word noun draggable'>" + this + "</a>");
	});
}

/*generates verb draggables*/
function generateVerbs(wordList) {
	$.each(wordList, function(index, value) {
		$("#verbs-content").append("<a id='" + value + "' class='word verb draggable'>" + this + "</a>");
	});
}

/*generates adj draggables*/
function generateAdj(wordList) {
	$.each(wordList, function(index, value) {
		$("#adj-content").append("<a id='" + value + "' class='word adj draggable'>" + this + "</a>");
	});
}

/*generates helper draggables*/
function generateHelpers(wordList) {
	$.each(wordList, function(index, value) {
		$("#helpers-content").append("<a id='" + value + "' class='word helper draggable'>" + this + "</a>");
	});
}

/*generates punctuation draggables*/
function generatePunctuation(wordList) {
	$.each(wordList, function(index, value) {
		$("#punctuation-content").append("<a id='" + value + "' class='word punctuation draggable'>" + this + "</a>");
	});
}