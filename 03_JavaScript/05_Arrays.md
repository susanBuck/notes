Arrays in JavaScript are technically objects.

Resources:

* [Mozilla Developer Network: JavaScript Arrays](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array?redirectlocale=en-US&redirectslug=Core_JavaScript_1.5_Reference%2FGlobal_Objects%2FArray)
* [Mastering JavaScript Arrays](http://www.hunlock.com/blogs/Mastering_Javascript_Arrays)

<!-- Example application using data seeded in an array: Stock Utility -->


### Single-dimension arrays

	// Create a new array object using square bracket notation
	var stocks = []; 
	stocks['aapl']= -4.23;
	stocks['dell']= -1;
	
	// Access a single element in the above array
	console.log("The value of the Apple stock changed by " + stocks['aapl']);
	
	// Loop through the elements in the above array
	for(i in stocks) {
		console.log("The value of the " + i + " stock changed by " + stocks[i]);
	}

### Multidimensional arrays

	// Create a new array object using square bracket notation
	var stocks = [];		
	stocks['AAPL'] = ['-1', '1', '6.4', '2.9'];
	stocks['DELL'] = ['-4.23', '5.4', '3.56', '-2.56'];
	
	// Loop through the elements in the above array
	for(i in stocks) {
		console.log("Stock values changes for " + stocks[i]);
		for(j in stocks[i]) {
			console.log(stocks[i][j]);
		}
	}

