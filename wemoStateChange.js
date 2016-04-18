var Wemo = require('wemo-client');
var wemo = new Wemo();

//wemo.discover(function(deviceInfo) {
//	console.log('Wemo Device Found: %j', deviceInfo);

	//Get the client for the found device
//	var client = wemo.client(deviceInfo);
//});



//we already know the device address, so straight to working with it.
var doIt = function() {
	console.log('Loading Device xml');
	wemo.load("http://10.0.1.50:49153/setup.xml", function(deviceInfo) {
	console.log('Done Loading Device xml');
	var client = wemo.client(deviceInfo);
	client.getBinaryState(function(err, value){

	console.log('Device is currently %s', value === '1' ? 'on' : 'off')
	//console.log(value);
	if ( value < 1) {        
		console.log('Turning Device on');
		client.setBinaryState(1);
		console.log('Device turned on');
	} else { 
		console.log('Turning Device off');
		client.setBinaryState(0);
	 	console.log('Device turned off');
 	}
	
	});
	//console.log('Exiting?');	
	//setTimeout(doIt, 1000);
	//setTimeout(process.exit(0), 500);
	});
}

doIt();
