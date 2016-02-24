var cabinRepo = require(__dirname + '/private/data/cabinrepo.js');
var authentication = require(__dirname + '/private/authentication/authentication.js');

var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/', function(request, response){
	response.sendfile('index.html');
});

app.get('/api/cabins', function(request, response){
	cabinRepo.Cabins(function(cabins){
		response.json(cabins);
	}, function(){
		console.log("On error called for get cabins");
	});
});

app.post('/api/cabins', function(req, res)
{
	console.log('post on cabins called: ' + req.body);

	if(req.body)
		cabinRepo.CreateCabin(req.body);
});

app.delete('/api/session/:id', function(request, response){
		console.log('trying to delete session for user ' + request.params.id);
		authentication.DeleteSessionById(request.params.id).then(function() {response.send();});
});

app.get('/api/session/:id', function(request, response){
	authentication.ValidateSession(request.params.id).then(function(session){
		if(session){
			console.log("session validated");
			response.json({valid: true});
		}
		else{
			console.log("session not validated");
			response.json({valid: false});
		}
	}, function(){
		response.json({valid: false})
	});
});

app.post('/api/login', function(request, response)
{
	console.log('login request reegistered for: ' + request.body.userName + " " + request.body.password);

	var loginSuccess = function(session){
		console.log("login succeded");
		response.json({success: true, session: session});
	};

	var loginFailed = function(){
		console.log("login failed for user with name: " + request.body.userName);
		response.json({success: false, session: null});
	};

	authentication.Authenticate(request.body, loginSuccess, loginFailed);
});

var port = process.env.PORT | 3000;
console.log("Server listening on port " + port)
app.listen(port);
