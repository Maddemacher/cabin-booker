var mongoose = require('mongoose');

var connectionHandlers = [];
var failureHandlers = [];

mongoose.connect('mongodb://localhost:27017/CabinBooker', function(err) {
	if(err) {
		console.log('connection error when connecting to repo', err);
		failureHandlers.forEach(function(entry){
			entry();
		});
	} else {
		console.log('repoconnection successful');
		connectionHandlers.forEach(function(entry){
			entry();
		});
	}
});

exports.registerConnectionHandlers = function(onComplete, onError){
	connectionHandlers.push(onComplete);
	failureHandlers.push(onError);
}

exports.handle = mongoose;