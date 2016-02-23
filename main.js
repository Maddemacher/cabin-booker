var cabinRepo = require(__dirname + '/private/data/cabinrepo.js');
var authentication = require(__dirname + '/private/authentication/authentication.js');

var fs = require('fs');
var bodyParser = require('body-parser'); 
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());  

app.get('/cabinbooker', function(request, response){
	response.sendfile('public/partials/index.html');
});

app.get('/cabinbooker/api/cabins', function(request, response){
	cabinRepo.Cabins(function(cabins){
		response.json(cabins);
	}, function(){
		console.log("On error called for get cabins");
	});
});

app.post('/cabinbooker/api/cabins', function(req, res) 
{
	console.log('post on cabins called: ' + req.body);

	if(req.body)
		cabinRepo.CreateCabin(req.body);
});

app.post('/cabinbooker/api/login', function(request, response)
{
	console.log('login request reegistered for: ' + request.body.userName + " " + request.body.password);

	var loginSuccess = function(token){
		console.log("login succeded");
		response.json({success: true, token: token});
	};

	var loginFailed = function(){
		console.log("login failed for user with name: " + request.body.userName);
		response.json({success: false, token: null});
	};

	authentication.Authenticate(request.body, loginSuccess, loginFailed);
});

app.listen(process.env.PORT);

console.log('cabin booker main loaded');



