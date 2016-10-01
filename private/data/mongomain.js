var mongoose = require('mongoose');
var args = require('../services/args.js');

var connectionHandlers = [];
var failureHandlers = [];

exports.init = function(config) {
    const dbPath = `mongodb://${config.dbHost}:27017/${config.database}`;

    console.log(`Trying to connect to: ${dbPath}`);

    mongoose.connect(dbPath, function(err) {
	      if(err) {
		        console.log('connection error when connecting to repo', err);
		        failureHandlers.forEach(function(entry){
			          entry();
		        });
	      } else {
		        console.log(`Successfully connected to ${dbPath}`);
		        connectionHandlers.forEach(function(entry){
			          entry();
		        });
	      }
    });
};
exports.registerConnectionHandlers = function(onComplete, onError){
	connectionHandlers.push(onComplete);
	failureHandlers.push(onError);
}

exports.handle = mongoose;
