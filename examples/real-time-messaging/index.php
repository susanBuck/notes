<style type='text/css'>
	#box {
		border:1px solid grey;
		width:400px;
		height:400px;
	}
	
	input {
		width:402px;
	}
</style>


<div id='box'></div>

<br>

<input id='input' placeholder='Your message...'>
<br><small>(press enter to submit)</small>

<div id='pubnub' pub-key='demo' sub-key='demo'></div>

<script src=http://cdn.pubnub.com/pubnub-3.1.min.js></script>

<script type='text/javascript'>
(function(){

	var box     = PUBNUB.$('box');
	var input   = PUBNUB.$('input')
	var channel = 'chat';
	
	PUBNUB.subscribe({
		channel : channel,
		callback : function(text) { 
			box.innerHTML = (''+text).replace( /[<>]/g, '' ) + '<br>' + box.innerHTML; 
		}
	});
	PUBNUB.bind( 'keyup', input, function(e) {
		(e.keyCode || e.charCode) === 13 && PUBNUB.publish({
			channel : channel, message : input.value, x : (input.value='')
		});
	});
	
})();
</script>