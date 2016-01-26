var express = require('express'),
	app = express();

app.get('/', function(req, res){
	res.send('Hello World');
});

app.use(function(req, res){ //Caso a url for errada vai para 404
	res.sendStatus(404)
});

var server = app.listen(3000, function(){
	var port = server.address().port;
	console.log('Express server listening on port %s', port);
});