var express = require('express'); //include npm module express for http processing
//var http = require('http');
var port = process.env.PORT || 8080; //set listening port
var wemoApp = express(); //create express app

var Wemo = require('wemo-client');   //include npm module wemo-client to control a wemo
var wemo = new Wemo(); //setup new wemo object
var wemoSetupUrl = "http://10.0.1.50:49153/setup.xml" //setup url for wemo


//placeholder for routes
wemoApp.get('/api/twilio/v1/gate', function(req, res) {

	//twilio api: https://www.twilio.com/docs/api/twiml/sms/twilio_request

	var messageSid = req.param('MessageSid');
	var smsSid = req.param('SmsSid');
	var accountSid = req.param('AccountSid');
	var messagingServiceSid = req.param('MessagingServiceSid');
	var smsFrom = req.param('From');
	var smsTo = req.param('To');
	var smsBody = req.param('Body');
	var smsNumMedia = req.param('NumMedia');
	var smsFromCity = req.param('FromCity');
	var smsFromState = req.param('FromState');
	var smsFromZip = req.param('FromZip');
	var smsFromCountry = req.param('FromCountry');
	var smsToCity = req.param('ToCity');
	var smsToState = req.param('ToState');
	var smsToZip = req.param('ToZip');
	var smsToCountry = req.param('ToCountry');	

	console.log('-----------------------------------------------------------------');
	wemoToggle(wemoSetupUrl);
	console.log('wemoToggle complete')
	res.send(smsFrom + ' ' + smsBody);
	console.log(smsFrom + ' ' + smsBody);
	});	


//wemo function.  accept as argument a wemo setup url
var wemoToggle = function(setupURL) {
	console.log('Loading Device xml');
	wemo.load(setupURL, function(deviceInfo) {
		console.log('Done Loading Device xml');
		console.log('entering wemoToggle');
		var client = wemo.client(deviceInfo);
		console.log('break1')
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

		console.log('wemoToggle if conditional complete');
		});
	console.log('wemo.lode end');
	});
	console.log('wemoToggle end');
}

//server start

wemoApp.listen(port);
console.log('Server started on port:' + port);

//var server = http.createServer(function(req, res) {
//	res.writeHead(200);
//res.end('Hello Http');
//});

//server.listen(8080);



