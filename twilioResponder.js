var http = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200);
res.end('<Response><Message>Hello Twilio</Message></Response>');
});

server.listen(8080);

